const WebSocket = require('ws');
const { pushTask } = require('./dump');

let wsServer;
let client;

function startListening() {
    wsServer = new WebSocket.Server({ port: process.env.TASK_PORT });
    wsServer.on('connection', onConnect);
}

function stopListening() {
    wsServer.close();
}

function onConnect(wsClient) {
    client = wsClient;
    wsClient.on('message', onMessage);
    wsClient.on('close', onClose);
}

function onMessage(msg) {
    let task = JSON.parse(msg);
    console.log(task);
    pushTask(task);
}

function onClose() {
}

module.exports.startListeningClient = startListening;
module.exports.stopListeningClient = stopListening;
module.exports.getClient = () => { return client };