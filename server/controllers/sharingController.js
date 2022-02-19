import pkg from 'rethinkdb';
import { dbConnection } from '../database/connect.js';

const { table, row } = pkg;

const connection = await dbConnection();
connection.use('code_sharing');

const upsertRoomDetails = async (userId, guest, userType, live) => {
    return table('sharing')
        .insert({
            userId,
            guest,
            userType,
            live,
            users: [],
            timestamp: new Date(),
        }, { conflict: 'replace' })
        .run(connection);
}

const getSharingFromDb = async (sharingId) => {
    return table('sharing')
        .get(sharingId)
        .run(connection);
}

export const createOrUpdateRoom = async (req, res) => {
    const { userId, guest, userType, live } = req.body;

    try {
        await upsertRoomDetails(userId, guest, userType, live);
    } catch (e) {
        console.error(`Something went wrong when creating/updating room for user ${userId}.`, e);
        res.status(500);
        return;
    }

    const sharingUrl = 'http://localhost:3000/sharing/' + userId;

    res.status(201).json({ sharingUrl });
};

export const isSharingActive = async (req, res) => {
    const { sharingId } = req.params

    try {
        const response = await getSharingFromDb(sharingId);

        if (!response) {
            res.status(200).json({ active: false });
            return;
        }

        res.status(200).json({ active: response.live });
    } catch (e) {
        console.log('An error occurred while connecting to the database.', e);
        res.status(500);
    }
};

export const stopSharing = async (req, res) => {
    const { sharingId } = req.params;

    try {
        await upsertRoomDetails(sharingId, false, false, false);
    } catch (e) {
        console.log('An error while stopping the sharing.', e);
        res.status(500);
        return;
    }

    res.status(200);
};

export const getSharing = async (req, res) => {
    const { sharingId } = req.params;

    try {
        const sharing = await getSharingFromDb(sharingId);

        if (!sharing) {
            res.status(404).json("Not found");
            return;
        }

        res.status(200).json(sharing);
    } catch (e) {
        res.status(500);
    }
};

export const joinSharing = async (req, res) => {
    const { sharingId } = req.params;
    let userToJoin = req.body;

    try {
        if (!userToJoin.email) {
            userToJoin = { name: 'Guest', email: 'guest@guest.guest', img: 'fooooo'};
        }

        const sharing = await getSharingFromDb(sharingId);
        const isUnique = sharing.users.filter(user => user.email === userToJoin.email).length === 0;        
        if (isUnique) {
            await table('sharing').get(sharingId).update({users: row('users').append(userToJoin)}).run(connection);
        }

        res.status(200);
    } catch(e) {
        res.status(500);
    }
};

export const getUsersForSharing = async (req, res) => {
    const { sharingId } = req.params;

    try {
        const sharing = await getSharingFromDb(sharingId);

        if (!sharing) {
            res.status(404);
            return;
        }

        res.status(200).json(sharing.users);
    } catch(e) {
        res.status(500);
    }
};