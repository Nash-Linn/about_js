Function.prototype.myApply = function (context) {
  //判断 context 是否传入，如果未传入则设置windows
  context = context || window;
  //将调用函数设为对象方法
  context.fn = this;
  //取出剩余参数
  let args = arguments[1];
  //调用函数
  let result = null;
  if (args.length) {
    result = context.fn(...args);
  } else {
    result = context.fn();
  }

  //删除添加的属性
  delete context.fn;
  //返回结果
  return result;
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

q.sayHello.myApply(p, [3, 4, 5]);
// Hello, Tom
// 3
// 4
// 5
