/*
  数组扁平化就是将[1,[2,[3]]] 这种多层数组拍平成[1,2,3] 这种一维数组。
  使用 Array.prototype.flat() 方法可以将多维数组拉平成一维数组。
*/

function flatten(arr) {
  return arr.flat(Infinity);
}

// ES5 实现 : 递归
function flatten1(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      // 如果是数组，调用递归
      res = res.concat(flatten1(arr[i]));  
    } else {
      // 如果不是数组，直接push
      res.push(arr[i]);
    }
  }
  return res;
}

// ES6
function flatten2(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

let arr = [1, [2, [3]]];
let res = flatten1(arr);
console.log(res);
