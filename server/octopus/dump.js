let queue = [];

// постановка новой задачи в очередь
function pushTask(task) {
    queue.push(task);
}

// получение задачи для клиента
function popTask(client) {
    let task = queue.shift();
    return task;
}

module.exports.pushTask = pushTask;
module.exports.popTask = popTask;