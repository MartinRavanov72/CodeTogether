import openSocket from 'socket.io-client';

var socket = openSocket('http://localhost:8000');

function saveCode(userId, code) {
    socket.emit('saveCode', { userId, code });
}

function subscribeToCodeEditor(userId, connectCb) {
    socket.on(`code:${userId}`, connectCb);
    socket.emit('subscribeToCode', userId);
}

function addHost(hostId) {
    socket.emit('addHost', hostId);
}

function addSpectator(spectatorId, hostId) {
    socket.emit('addSpectator', { spectatorId, hostId });
}

function removeHost(hostId) {
    socket.emit('removeHost', hostId);
}

export {
    subscribeToCodeEditor,
    saveCode,
    addHost,
    addSpectator,
    removeHost
}