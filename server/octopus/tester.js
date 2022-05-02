// время выполнения n операций с плавающей запятой
function timeN(n) {
    let a = Math.random();
    let b = 0;
    let max = a * n;

    let time = performance.now();
        while (b < max) b += a;
    let dt = performance.now() - time;
    return dt;
}

// производительность процессора во флопсах
// time - время тестирования в миллисекундах
// ожидаемое время тестирование - time/2...time
function flops(t) {
    let start = performance.now();

    let time = 0;
    let currN = 10e1 / 2;
    let n = 0;
    while (performance.now() - start < t / 2) {
        currN *= 2;
        time = timeN(currN);
    }

    return currN / (time / 1000);
}

module.exports.flops = flops;