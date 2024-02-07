// 实现 Array.prototype.reduce
Array.prototype.myReduce = function (...args) {
  let arr = this;
  let fn = args[0];
  let initialValue, index;
  if (args.length > 1) {
    initialValue = args[1];
    index = 0;
  } else {
    initialValue = arr[0];
    index = 1;
  }
  let value = initialValue;

  for (let i = index, len = arr.length; i < len; i++) {
    value = fn(value, arr[i], i, arr);
  }
  return value;
};

let arr = [1, 2, 3, 4, 5];

let sum = arr.myReduce((prev, cur, index, arr) => {
  console.log("prev", prev);
  console.log("cur", cur);
  console.log("index", index);
  console.log("arr", arr);
  return prev + cur;
}, 10);

console.log(sum);
