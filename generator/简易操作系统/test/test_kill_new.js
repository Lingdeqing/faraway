const Scheduler = require('../scheduler').Scheduler;
const GetTid = require('../system_call').GetTid;
const NewTask = require('../system_call').NewTask;
const KillTask = require('../system_call').KillTask;

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

function* sometask() {
    var tid = yield new GetTid()
    console.log(`I'm sometask ${tid}`)
    var t1 = yield new NewTask(bar());
    console.log(`Before killing`);
    yield new KillTask(t1);
}
var sched = new Scheduler();
sched.new(sometask());
sched.mainloop();