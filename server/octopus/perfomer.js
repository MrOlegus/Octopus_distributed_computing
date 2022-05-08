const WebSocket = require('ws');
const { getClient } = require('./client');
const { popTask } = require('./dump');

let wsServer;
let performers = new Set();

function startListening() {
    wsServer = new WebSocket.Server({ port: process.env.CLIENT_PORT });
    wsServer.on('connection', onConnect);
}

function stopListening() {
    wsServer.close();
}

function onConnect(wsClient) {
    performers.add(wsClient);

    wsClient.on('message', onMessage);
    wsClient.on('close', onClose);

    wsClient.send(JSON.stringify({ type: 'ping' }));
    wsClient.send(JSON.stringify({ type: 'test' }));
}

function onMessage(msg) {
    let data = JSON.parse(msg);

    switch (data.type) {
        case 'task': onMessageTask(this, data); break
        case 'multitask': onMessageMultitask(this, data); break;
        case 'test': onMessageTest(this, data); break;
        case 'ping': onMessagePing(this, data); break;
        default: throw `Undefined type of response ${data.type}`;
    }
}

function onClose() {
    performers.delete(this);
}


// message handlers start //

function onMessageTask(wsClient, task) {
    getClient().send(JSON.stringify(task));
}

function onMessageMultitask(wsClient, multitask) {
    getClient().send(JSON.stringify(multitask));
}

function onMessageTest(wsClient, test) {
}

function onMessagePing(wsClient, ping) {
}

// message handlers finish //

module.exports.startListeningPerfomers = startListening;
module.exports.stopListeningPerfomers = stopListening;