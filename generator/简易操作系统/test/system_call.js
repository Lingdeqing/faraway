const Scheduler = require('../scheduler').Scheduler;
const GetTid = require('../system_call').GetTid;

function* foo() {
    var tid = yield new GetTid();
    for(var i = 0; i < 1; i++){
        console.log(`I'm foo ${tid}`);
        yield
    }
}
function* bar() {
    var tid = yield new GetTid();
    for(var i = 0; i < 2; i++){
        console.log(`I'm bar ${tid}`);
        yield
    }
}

var sched = new Scheduler();
sched.new(foo());
sched.new(bar());
sched.mainloop();