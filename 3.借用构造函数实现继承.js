function Animal(name) {
  this.name = name;
  this.colors = ["black"];
  this.getName = function () {
    return this.name;
  };
}

function Dog(name) {
  Animal.call(this, name);
}

let dog1 = new Dog("dog1");
console.log(dog1.getName()); //dog1

let dog2 = new Dog("dog2");
console.log(dog2.getName()); //dog2

dog1.colors.push("white");
console.log(dog1.colors); //["black", "white"]
console.log(dog2.colors); //["black"]

/*
  借用构造函数继承的优点：
  1.避免了引用类型的属性被所有实例共享；
  2.可以在Child中向Parent传参。
  借用构造函数继承的缺点：
  1.方法都在构造函数中定义，每次创建实例都会创建一遍方法。
*/
