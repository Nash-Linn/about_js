// 实现 Array.prototype.filter

Array.prototype.myFilter = function (callback, thisArg) {
  let _this = thisArg != null ? thisArg : this;

  // 如果当前上下文（this）为 null 或 undefined，抛出一个 TypeError
  if (_this == null) {
    throw new TypeError("this is null or not defined");
  }

  // 如果 callback 不是一个函数，抛出一个 TypeError
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  // 将当前上下文转化为对象，并获取其长度

  const O = Object(_this);

  // >>> 0 保证 len 为数字且为正整数
  const len = O.length >>> 0;

  // 初始化索引值
  let k = 0;

  let res = [];

  // 遍历对象
  while (k < len) {
    // 如果对象中存在当前索引，调用回调函数
    if (k in O) {
      // 使用 call 方法调用回调函数，可以指定回调函数中 this 的值
      // 回调函数接收三个参数：当前元素、当前索引和原数组
      if (callback.call(_this, O[k], k, O)) {
        res.push(O[k]);
      }
    }
    k++;
  }

  return res;
};

let arr = [1, 2, 3, 4, 5];

let newArr = arr.myFilter((item, index, arr) => {
  return item > 2;
});

console.log(newArr);
