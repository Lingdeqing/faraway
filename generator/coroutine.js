let fs = require('fs');

// coroutine协程
// 将generator函数改为第一次next就可以传值的
function coroutine(generator) {
    return function (...args) {
        let generateObj = generator(...args);
        generateObj.next();
        return generateObj;
    }
}

function* grep(pattern) {
    console.log(`Looking for ${pattern}`);
    while(true){
        let line = yield ;
        if(pattern.test(line)){
            console.log(line)
        }
    }
}
grep = coroutine(grep);
let co = grep(/javascript/);
co.next('hello world');
co.next('python');
co.next('javascript');


// 协程管道
// source(生成数据流)
function* source(file, target) {
    let content = fs.readFileSync(file);
    let lines = content.toString().split('\n');
    for(let line of lines){
        target.next(line);
    }
}
// filter1(处理数据流)
function* filter(pattern, target) {
    while(true){
        let line = yield ;
        if(pattern.test(line)){
            target.next(line)
        }
    }
}
// filter2(处理数据流)
function* logger(target) {
    let num = 0;
    while(true){
        let line = yield ;
        num ++;
        console.log(`${num}:${line}`);
        target.next(line)
    }
}
// sink(收集数据)
function* printer() {
    while(true){
        let line = yield ;
        console.log('printer:', line);
    }
}
source = coroutine(source)
filter = coroutine(filter)
logger = coroutine(logger)
printer = coroutine(printer)
source('mock/log', logger(filter(/javascript/, printer())))

//broadcast模式
function* broadcast(targets) {
    while(true){
        let line = yield ;
        for(let target of targets){
            target.next(line)
        }
    }
}
broadcast = coroutine(broadcast);
source('mock/log', broadcast([
    filter(/javascript/, printer()),
    filter(/hello/, printer()),
    filter(/world/, printer())
]))