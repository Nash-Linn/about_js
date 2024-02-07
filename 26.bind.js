Function.prototype.myBind = function (context) {
  //判断 context 是否传入，如果未传入则设置windows
  context = context || window;
  //将调用函数设为对象方法
  context.fn = this;
  //获取参数
  let args = [...arguments].slice(1);
  //返回一个函数
  return function () {
    //调用函数
    let result = context.fn(...args);
    //删除添加的属性
    delete context.fn;
    //返回结果
    return result;
  };
};

let p = {
  name: "Tom",
  age: 18,
};

let q = {
  name: "Jack",
  age: 20,
  sayHello(a, b, c) {
    console.log(`Hello, ${this.name}`);
    console.log(a);
    console.log(b);
    console.log(c);
  },
};

let newSay = q.sayHello.myBind(p, 3, 4, 5);
newSay();
// Hello, Tom
// 3
// 4
// 5
