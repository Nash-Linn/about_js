//  浅拷贝

//  1. for...in 只循环第一层
function simpleCopy(obj) {
  let obj2 = Array.isArray(obj) ? [] : {};
  for (let i in obj) {
    obj2[i] = obj[i];
  }
  return obj2;
}

//  2. Object.assign()
let o1 = {
  a: 1,
  b: 2,
};
let o2 = Object.assign(o1);
o2.a = 3;
console.log(o1, o2); //{ a: 3, b: 2 } { a: 3, b: 2 }

// 3.直接用 = 赋值
let a = [0, 1, 2, 3];
let b = a;
console.log(a == b); // true
a[0] = 1;
console.log(a, b); // [ 1, 1, 2, 3 ] [ 1, 1, 2, 3 ]

//深拷贝

// 递归
function deepCopy(obj) {
  let objClone = Array.isArray(obj) ? [] : {};
  for (let i in obj) {
    if (typeof obj[i] === "object") {
      objClone[i] = deepCopy(obj[i]);
    } else {
      objClone[i] = obj[i];
    }
  }
  return objClone;
}

let do1 = {
  a: 1,
  b: {
    b1: "b1",
    b2: {
      b21: "b21",
    },
  },
  c: [1, 2, 3],
  d: (a) => {
    console.log(a);
  },
};

let do2 = deepCopy(do1); //深拷贝
do2.b.b1 = "b11";
console.log(do1);
console.log(do2);
