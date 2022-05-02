let performance = new Map(); // id -> производительность
let queue = new Map(); // id -> массив задач в очереди
let current = new Map(); // id -> id текущей задачи

// постановка новой задачи в очередь
function pushTask(task) {
    let taskList = queue.get(id);
    if (!taskList) taskList = new [];
    taskList.push(task);
}

// получение задачи для клиента
function shiftTask(id) {
    let taskList = map.get(id);
    let task = taskList?.shift();
    return task;
}

