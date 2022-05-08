var socket = new WebSocket("ws://127.0.0.1:9002");

socket.onopen = function() {
    console.log('onopen');
    setInterval(sendTask(), 1000);
};

socket.onclose = function(event) {
    console.log('Connection closed');
};

socket.onmessage = function(event) {
    console.log(event.data);
};

socket.onerror = function(error) {
    console.log('oops');
};

function sendTask() {
    let method = (n) => {return 2 * n; };

    socket.send(JSON.stringify({
        type: 'task',
        id: 123,
        method: method.toString(),
        arg: 2,
    }));
}