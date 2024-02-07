// function newFn() {
//   let obj = new Object();
//   let Constructor = [].shift.call(arguments);
//   obj.__proto__ = Constructor.prototype;
//   let ret = Constructor.apply(obj, arguments);
//   return typeof ret === "object" ? ret : obj;
// }

function newFn(...args) {
  const constructor = args.shift();
  const obj = Object.create(constructor.prototype);
  const result = constructor.apply(obj, args);
  return typeof result === "object" && result !== null ? result : obj;
}

function Person(name) {
  this.name = name;
}

const p = newFn(Person, "Nash");
console.log(p);
console.log("p.name :>> ", p.name); // p.name :>>  Nash
