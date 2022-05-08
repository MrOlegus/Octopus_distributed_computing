var socket = new WebSocket("ws://127.0.0.1:9001");

socket.onopen = function() {
};

socket.onclose = function(event) {
};

socket.onmessage = function(event) {
    let msg = JSON.parse(event.data);
    console.log(msg);

    switch (msg.type) {
        case 'test': performTest(msg); break;
        case 'ping': performPing(msg); break;
        case 'task': performTask(msg); break;
        case 'multitask': break;
    }
};

socket.onerror = function(error) {
};

function performTest(test) {
    socket.send(JSON.stringify({
        type: 'test',
    }));
}

function performPing(test) {
    socket.send(JSON.stringify({
        type: 'ping',
    }));
}

function performTask(task) {
    let f = eval(task.method);
    let res = f(task.arg);

    console.log(f);
    console.log(res);

    let ans = {
        type: 'task',
        id: task.id,
        res: res,
    }
    socket.send(JSON.stringify(ans));
}