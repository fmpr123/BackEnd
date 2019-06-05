function Person(firstName,lastName){
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype.greet = function(){
    console.log("Olá" + this.firstName + " " + this.lastName + ". Tu tens " + this.age + " anos.");
}

Person.prototype.age = null;

var pedro = new Person(" Pedro","Andrade");
pedro.age=45;
pedro.greet();

var maria = new Person(" Maria","Fernandes");
maria.age=53;
maria.greet();

// console.log(pedro.__proto__);
// console.log(maria.__proto__);