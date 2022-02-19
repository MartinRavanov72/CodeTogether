import * as http from 'http';
import pkg from 'rethinkdb';
import { Server } from 'socket.io';
import { dbConnection } from '../database/connect.js';

const { table, row } = pkg;

const connection = await dbConnection();
connection.use('code_sharing')

function subscribeToCode({ userId, client, connection }) {
    table('code')
        .filter(row('userId').eq(userId))
        .changes({ includeInitial: true })
        .run(connection)
        .then((cursor) => {
            cursor.each((err, codeRow) => client.emit(`code:${userId}`, codeRow.new_val));
        });
}

function saveCode({ userId, code, connection }) {
    table('code')
        .insert({
            userId,
            code,
            timestamp: new Date(),
        }, { conflict: 'replace' })
        .run(connection)
        .then(() => console.log(`Successfully saved code ${code} for userId ${userId}.`))
}

function deleteHost({ hostId, connection }) {
    return table('sharing')
        .get(hostId)
        .delete({ returnChanges: true })
        .run(connection);
}

function deleteSpectator({ hostId, spectatorId, connection }) {
    return table('sharing')
        .get(hostId)
        .update({
            users: row('users').filter(item => item('email').ne(spectatorId))
        })
        .run(connection)
        .then(({ replaced }) => {
            if (replaced !== 0) {
                console.log(`Successfully removed ${spectatorId} from ${hostId}.`);
            }
        });
}

const connections = new Map();
const hostSpectatorMap = new Map();

async function setupSocket(app) {
    const httpServer = http.createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (client) => {
        client.on('subscribeToCode', (userId) => subscribeToCode({
            userId,
            client,
            connection
        }));

        client.on('saveCode', ({ userId, code }) => saveCode({
            userId,
            code,
            connection
        }));

        client.on('addHost', (hostId) => {
            connections.set(client, { hostId, isHost: true });
        });

        client.on('removeHost', (hostId) => {
            deleteHostAndDisconnectSpectators({ hostId }, connection);
        })

        client.on('addSpectator', ({ spectatorId, hostId }) => {
            let spectator = {
                hostId,
                isSpectator: true
            }

            if (!spectatorId) {
                spectatorId = 'guest@guest.guest';
                spectator = { ...spectator, isGuest: true, spectatorId };
            } else {
                spectator = { ...spectator, spectatorId };
            }
            connections.set(client, spectator);

            const currValues = hostSpectatorMap.get(hostId);
            if (!currValues) {
                const spectators = new Set();
                spectators.add(spectatorId);
                hostSpectatorMap.set(hostId, spectators);
            } else {
                currValues.add(spectatorId);
            }
        });

        client.on('disconnect', async () => {
            const disconnectedUser = connections.get(client);

            if (!disconnectedUser) return;

            if (disconnectedUser.isHost) {
                deleteHostAndDisconnectSpectators(disconnectedUser, client);
            } else if (disconnectedUser.isSpectator) {
                deleteSpectator({ hostId: disconnectedUser.hostId, spectatorId: disconnectedUser.spectatorId, connection });
                connections.delete(client);
            }
        });
    });

    io.listen(8000);
    console.log('socket.io listening on port 8000');
}

async function deleteHostAndDisconnectSpectators(disconnectedUser, client) {
    const { deleted } = await deleteHost({ hostId: disconnectedUser.hostId, connection });
    connections.delete(client);
    const spectators = hostSpectatorMap.get(disconnectedUser.hostId);
    if (spectators) {
        spectators.forEach(spectatorId => {
            for (const key of connections.keys()) {
                const value = connections.get(key);

                if ((value.spectatorId === spectatorId) || (value.isGuest && spectatorId === 'guest@guest.guest')) {
                    key.disconnect();
                    connections.delete(key);
                }
            }
        });
    }

    if (deleted === 1) {
        console.log('Successfully deleted host', disconnectedUser.hostId)
    }
}


export {
    setupSocket
}