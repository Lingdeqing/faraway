const Task = require('./task').Task;
const SystemCall = require('./system_call').SystemCall;

class Scheduler {
    constructor(){
        this.ready = [];
        this.exit_waiting = [];
        this.taskmap = {};
    }
    new(target){
        var newTask = new Task(target);
        this.taskmap[newTask.tid] = newTask;
        this.schedule(newTask);
        return newTask.tid;
    }
    schedule(task){
        this.ready.push(task)
    }
    exit(task){
        console.log(`Task ${task.tid} terminated`);
        delete this.taskmap[task.tid];

        var tasks = this.exit_waiting[task.tid] || [];
        delete this.exit_waiting[task.tid]
        for(var task of tasks){
            this.schedule(task)
        }

    }
    waitforexit(task, waittid){
        if(waittid in this.taskmap){
            (this.exit_waiting[waittid] || (this.exit_waiting[waittid] = [])).push(task)
            return true;
        } else {
            return false;
        }
    }
    mainloop(){
        while(Object.keys(this.taskmap).length > 0){
            var task = this.ready.shift();
            var result = task.run();
            if(result.value instanceof SystemCall){
                var syscall = result.value;
                syscall.task = task;
                syscall.sched = this;
                syscall.handle()
                continue
            }
            if(!result.done){
                this.schedule(task);
            } else {
                this.exit(task);
            }
        }
    }
}

exports.Scheduler = Scheduler

