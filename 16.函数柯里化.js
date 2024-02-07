/*

  函数柯里化（curry）是函数式编程里面的概念。curry的概念很简单：柯里化是把接受多个参数的函数转变为接受一个单一参数的函数，并且返回接受余下的参数且返回结果的新函数。
  简单说就是：每次调用函数时，它只接收一部分参数，并返回一个函数，直到传递完所有的参数为止。

*/

// 例子1 参数复用
function f(x, y, z) {
  return (x + y) * z;
}
// 假如求：（2 + 3）* 5  （2 + 5）* 6 （2 + 1）* 7 （2 + 9）* 8
// 发现有一个参数是固定的，那么可以使用柯里化函数

let newF = curring(f, 2);

console.log(newF(3, 5)); // 25
console.log(newF(5, 6)); // 42
console.log(newF(1, 7)); // 21
console.log(newF(9, 8)); // 88

function curring(fn) {
  // 先把参数转化为数组
  let args = Array.prototype.slice.call(arguments, 1);
  return function () {
    // 将参数转化为数组
    let newArgs = args.concat(Array.prototype.slice.call(arguments));
    return fn.apply(this, newArgs);
  };
}

// 例子2 提前返回
/*
  解决浏览器绑定事件兼容问题
  IE 8 及以下不支持 addEventListener 方法，但是支持 attachEvent 方法。
  所以我们可以通过柯里化函数来解决这个问题。
*/

const whichEvent = (function () {
  if (window.addEventListener) {
    return function (el, type, fn, capture) {
      el.addEventListener(
        type,
        function (e) {
          fn.call(el, e);
        },
        capture
      );
    };
  } else if (window.attachEvent) {
    return function (el, type, fn) {
      el.attachEvent("on" + type, function (e) {
        fn.call(el, e);
      });
    };
  }
})();

// 例子3  延迟执行
function add(...args) {
  return args.reduce((a, b) => a + b);
}

function currying(fn) {
  let args = [];
  return function temp(...newArgs) {
    if (newArgs.length) {
      args = [...args, ...newArgs];
      return temp;
    } else {
      let val = fn.apply(this, args);
      args = [];
      return val;
    }
  };
}

let addCurry = currying(add);

console.log(addCurry(1)(2)(3)(4, 5)());
console.log(addCurry(1)(2)(3, 4, 5)());
console.log(addCurry(1)(2, 3, 4, 5)());
