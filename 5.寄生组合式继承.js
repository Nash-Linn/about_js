/*
  组合继承已经相对完善了，但还是存在问题，他的问题就是调用了2次父类构造函数，
  第一次是在 new Animal(),第二次是在Animal.call()。

  所以解决方案就是不直接调用父类构造函数给子类原型赋值，
  而是通过创建空函数F获取父类原型的副本



  clone 函数用于创建一个新的对象，该对象的原型链（prototype）指向传入的对象 o。
  这是通过创建一个空的构造函数 F，然后将 F 的原型设置为 o，最后返回一个新的 F 实例来实现的。
  
  inheritPrototype 函数用于实现子类 child 继承父类 parent 的原型。
  首先，通过 clone 函数创建一个新的对象，该对象的原型链指向父类的原型。
  然后，将新对象的构造函数属性设置为子类，最后将子类的原型设置为新对象。
  这种方式的好处是，子类可以继承父类原型上的所有属性和方法，同时还保持了子类的构造函数属性。
  这样，子类的实例就可以正确地访问到父类原型上的属性和方法，同时还能保持正确的构造函数引用。
*/

// function clone(o) {
//   function F() {}
//   F.prototype = o;
//   return new F();
// }

// function inheritPrototype(child, parent) {
//   let prototype = clone(parent.prototype);
//   prototype.constructor = child;
//   child.prototype = prototype;
// }

function inheritPrototype(child, parent) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}

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

inheritPrototype(Dog, Animal);

let dog1 = new Dog("dog1", 1);
console.log(dog1); //Dog { name: 'dog1', colors: [ 'black' ], age: 1 }
console.log(dog1.getName()); //dog1

let dog2 = new Dog("dog2", 2);
console.log(dog2); //Dog { name: 'dog2', colors: [ 'black' ], age: 2 }
console.log(dog2.getName()); //dog2

/*
  寄生组合继承的优点是：
    1.只调用了一次父类构造函数，避免了在子类原型上创建不必要的、多余的属性；
    2.原型链还能保持不变，可以正常使用 instanceof 和 isPrototypeOf；
    3.函数可复用。

  寄生组合继承的缺点是：
    多了一个 inheritPrototype 函数，增加了复杂度。
*/
