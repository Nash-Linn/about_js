/*
  组合继承结合了原型链和盗用构造函数，将两者的优点集中了起来。
  基本的思路是使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。
  这样，既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性。
*/

function Animal(name) {
  this.name = name;
  this.colors = ["black"];
}

Animal.prototype.getName = function () {
  return this.name;
};

function Dog(name, age) {
  Animal.call(this, name);
  this.age = age;
}

Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;

let dog1 = new Dog("dog1", 1);
dog1.colors.push("white");

let dog2 = new Dog("dog2", 2);

console.log(dog1); //Dog { name: 'dog1', colors: [ 'black', 'white' ], age: 1 }
console.log(dog2); //Dog { name: 'dog2', colors: [ 'black' ], age: 2 }
console.log(dog1.getName()); //dog1
console.log(dog2.getName()); //dog2

/**
  组合继承的优点是：
    1.既可以继承实例属性，又可以继承原型属性；
    2.不存在引用属性共享问题；
    3.可传参；
    4.函数可复用。

  组合继承的缺点是：
    1.调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了）；
    2.子类原型上多了不需要的父类实例属性，造成内存浪费。

 */
