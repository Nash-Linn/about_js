// instanceof 就是判断构造函数的 prototype 属性是否出现在实例的原型链上。

function myInstanceof(left, right) {
  let proto = left.__proto__;
  let prototype = right.prototype;
  while (true) {
    if (proto === null) return false;
    if (proto === prototype) return true;
    proto = proto.__proto__;
  }
}
