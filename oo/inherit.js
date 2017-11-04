function inheritPrototype(Parent, Son) {
    if(Object.create){
        Son.prototype = Object.create(Parent.prototype);
    } else {
        function F() {}
        F.prototype = Parent.prototype;
        Son.prototype = new F();
    }
    Son.prototype.constructor = Son;
}

function Parent(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'yellow'];
}
Parent.prototype.sayName = function () {
    console.log(this.name)
}

function Son(name, age){
    Parent.call(this, name);
    this.age = age;
}
inheritPrototype(Parent, Son);
Son.prototype.sayAge = function () {
    console.log(this.age)
}

// test
var ins1 = new Son('fuchunji', 23);
ins1.colors.push('black');
console.log(ins1.colors);
ins1.sayName();
ins1.sayAge();

var ins2 = new Son('fuchunji', 23);
console.log(ins2.colors);
ins2.sayName();
ins2.sayAge();
console.log(ins2.constructor)
console.log(ins2 instanceof Son)
console.log(ins2 instanceof Parent)
