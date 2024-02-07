// ES5版
function unique(arr) {
  var res = arr.filter((item, index, array) => {
    // indexOf返回第一个匹配项的索引  如果当前索引不是第一个匹配项的索引，说明重复了
    return array.indexOf(item) === index;
  });
  return res;
}

// ES6版
let unique1 = (arr) => [...new Set(arr)];

let arr = [
  1, 2, 2, 3, 4, 5, 5, 5, 6, 7, 7, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
];

console.log(unique(arr)); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
