function Animal() {
  this.colors = ["black", "white"];
}

Animal.prototype.getColor = function () {
  return this.colors;
};

function Dog() {}
Dog.prototype = new Animal();

let dog1 = new Dog();
dog1.colors.push("brown");
let dog2 = new Dog();
console.log(dog2.colors);

// 会造成dog1和dog2的colors属性都是["black", "white", "brown"]，
// 这是因为dog1和dog2的原型都是同一个实例，
// 所以修改dog1的colors属性会影响到dog2的colors属性。

/*
  原型链继承存在的问题：
  1.原型中包含的引用类型属性将被所有实例共享；
  2.子类在实例化的时候不能给父类构造函数传参。
*/
