const WebSocket = require('ws');

let wsServer;
let clients = new Set();

function startWsServer() {
    wsServer = new WebSocket.Server({ port: process.env.SOCKETS_PORT });
    wsServer.on('connection', onConnect);
}

function stopWsServer() {
    wsServer.close();
}

function onConnect(wsClient) {
    wsClient.on('message', onMessage);
    wsClient.on('close', onClose);
}

function onMessage(msg) {
    let data = JSON.parse(msg);
    switch (data.type) {
        case 'task': onMessageTask(data); break
        case 'multitask': onMessageMultitask(data); break;
        case 'test': onMessageTest(data); break;
        case 'ping': onMessagePing(data); break;
        default: throw `Undefined type of response ${data.type}`;
    }
}

function onClose() {
    clients.delete(this);
}


// message handlers start //

function onMessageTask(data) {
    
}

// message handlers finish //


module.exports.startWsServer = startWsServer;
module.exports.stopWsServer = stopWsServer;