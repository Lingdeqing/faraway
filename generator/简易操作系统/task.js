class Task{
    constructor(target){
        Task.targetid ++;
        this.tid = Task.targetid;
        this.target = target;
        this.sendval = null;
    }

    run(){
        return this.target.next(this.sendval)
    }
}
Task.targetid = 0;


exports.Task = Task