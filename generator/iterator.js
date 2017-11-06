// 列表迭代器
class Countdown{
    constructor(n){
        this.n = n;
    }

    * [Symbol.iterator](){
        while (this.n > 0){
            yield this.n --;
        }
    }
}

let cnt = new Countdown(10);
let arr = [...cnt];
console.log(arr);

// 树形迭代器
class Tree{
    constructor(val, left=null, right=null){
        this.val = val;
        this.left = left;
        this.right = right;
    }

    // 中序遍历
    *[Symbol.iterator](){
        if(this.left){
            yield* this.left;
        }
        yield this.val;
        if(this.right){
            yield* this.right;
        }
    }
}

let left = new Tree(1);
let right = new Tree(3);
let root = new Tree(2, left, right);
console.log([...root])

let fs = require('fs')
function* lines(file) {
    let content = fs.readFileSync(file);
    let lines = content.toString().split('\n');
    for(var line of lines){
        yield line;
    }
}
function* grep(pattern, lines) {
    for(var line of lines){
        if(pattern.test(line)){
            yield line;
        }
    }
}
let logfile = 'mock/log';
let loglines = lines(logfile);
let result = grep(/javascript/, loglines);
for(let line of result){
    console.log(line)
}
