class Animal {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

class Dog extends Animal {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
}

let dog1 = new Dog("dog1", 1);
console.log(dog1);
console.log(dog1.getName());

let dog2 = new Dog("dog2", 2);
console.log(dog2);
console.log(dog2.getName());
