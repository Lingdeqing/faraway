const Task = require('../task').Task;

function* foo() {
    console.log('part 1')
    yield
        console.log('part 2')
    yield
}

var t1 = new Task(foo());
t1.run();
t1.run()