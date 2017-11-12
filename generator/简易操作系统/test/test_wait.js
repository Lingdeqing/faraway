const Scheduler = require('../scheduler').Scheduler;
const GetTid = require('../system_call').GetTid;
const NewTask = require('../system_call').NewTask;
const WaitTask = require('../system_call').WaitTask;

function* foo() {
    var tid = yield new GetTid();
    for(var i = 0; i < 1; i++){
        console.log(`I'm foo ${tid}`);
        yield
    }
}

function* main() {
    var child = yield new NewTask(foo());
    console.log(`Waiting for child`);
    yield new WaitTask(child);
    console.log('child done')
}
var sched = new Scheduler();
sched.new(main());
sched.mainloop();