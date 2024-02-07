// let [a, b] = {
//   x: 1,
//   y: 2,
// };

/*
  TypeError: {(intermediate value)(intermediate value)} is not iterable
  这段代码会进行报错，报错信息显示不可迭代。
*/

/*
  那么什么是迭代？ 那就要提到迭代器和生成器,迭代器和生成器都是用于遍历数据集合的工具，但是它们的实现方式和使用方法有所不同。
*/

//迭代器
/*
迭代器是一种对象，它提供了一种访问集合元素的方式，而不需要暴露集合的内部结构。
迭代器对象有一个 next() 方法，每次调用该方法都会返回集合中的下一个元素，直到所有元素都被遍历完毕。
如果没有更多的元素可供遍历，next() 方法会返回一个特殊的值 undefined。
迭代器的实现方式是通过定义一个对象，
该对象包含一个 next() 方法和一个 done 属性。
done 属性表示是否还有更多的元素需要遍历，如果还有，done 属性为 false，否则为 true。
*/

//模拟一个迭代器

// function createIterator(item) {
//   var i = 0;
//   return {
//     // 返回一个迭代器对象
//     next: function () {
//       //迭代器对象一定有next()方法
//       var done = i > item.length;
//       var value = !done ? item[i++] : undefined;

//       return {
//         //next()方法返回结果对象
//         value: value,
//         done: done,
//       };
//     },
//   };
// }

// var it = createIterator([10, 2, 3, 4, 5]);

// let next = it.next();
// while (!next.done) {
//   console.log(next.value);
//   next = it.next();
// }

// ===========================================

// var arr = [10, 2, 3, 4, 5]; //数组是一个迭代器

// // 使用for..of..来遍历迭代器
// for (var v of arr) {
//   console.log(v); // 10  2  3  4  5
// }

// //也可以使用ES6提供的next()方法手工遍历

// var it = arr[Symbol.iterator]();
// console.log(it.next().value); // 10
// console.log(it.next().value); // 2
// console.log(it.next().value); // 3

// ==========================================================

// function createIterator(item) {
//   var i = 0;
//   return {
//     // 返回一个迭代器对象
//     //看，模仿原生迭代器添加Symbol.iterator方法

//     [Symbol.iterator]: function () {
//       return this;
//     },

//     next: function () {
//       //迭代器对象一定有next()方法
//       var done = i >= item.length;
//       var value = !done ? item[i++] : undefined;

//       return {
//         //next()方法返回结果对象
//         value: value,
//         done: done,
//       };
//     },
//   };
// }
// //执行函数后返回一个人造迭代器对象
// var it = createIterator([10, 2, 3, 4, 5]);
// for (var v of it) {
//   // 使用迭代器的循环机制遍历
//   console.log(v);
// }

/*
  可以看到这是完全可以的。只要在返回的对象中添加Symbol.iterator属性，就可以达到ES6设定的迭代器成立条件。
  所以我认为，一个数据结构只要有Symbol.iterator方法和next()方法，就可以认为它是迭代器，是可迭代的(iterable)。
*/

/*
  可迭代对象(iterable)
  在ES6中，所有的集合对象(数组、Set集合和Map集合)和字符串都是可迭代对象，可迭代对象都绑定了默认的迭代器。for..of循环之所以能够遍历可迭代对象，正是利用了可迭代对象上的默认迭代器。大致过程是：for-of循环每执行一次都会调用可迭代对象的next()方法，并将迭代器返回的结果对象的value属性存储在变量中，循环将继续执行这一过程直到返回对象的done属性的值为true。
  如果只需要迭代数组或集合中的值，用for..of循环代替普通for循环是个好选择。
*/

//访问默认迭代器
/*
所有的可迭代对象，必定会有一个Symbol.iterator方法，通过调用可迭代对象的Symbol.iterator方法就能获取默认迭代器，这一过程是由JS引擎完成的。
*/

// 可以用Symbol.iterator来检测对象是否为可迭代对象

// function isIterator(obj) {
//   // return typeof obj[Symbol.iterator] === "function";   // 这种方法也可以选用
//   return Object.prototype.toString.call( obj[Symbol.iterator] ) === "[object Function]";
// }
// console.log(isIterator([10, 2, 3, 4, 5]));      // true
// console.log(isIterator(new Set()));             // true
// console.log(isIterator(new Map()));             // true
// console.log(isIterator("abc"));                 // true

//=========================================================================

//生成器
/*
生成器是一种特殊的函数，它可以在执行过程中暂停并返回一个中间结果，然后再次从暂停的地方继续执行。
生成器函数使用 function* 关键字定义，其中包含一个或多个 yield 语句，每次调用 yield 语句都会返回一个中间结果，并暂停函数的执行。
生成器函数返回的是一个迭代器对象，可以通过调用 next() 方法来遍历生成器函数返回的中间结果。
当生成器函数执行完毕时，迭代器对象的 done 属性为 true。
*/

// function* createIterator(item) {
//   for (let i = 0; i < item.length; i++) {
//     yield item[i];
//   }
// }

// var it = createIterator([10, 2, 4, 5, 6]); // 生成器函数执行返回一个新的迭代器实例it
// // 调用迭代器it的next()方法
// console.log(it.next()); // {value: 10, done: false}
// console.log(it.next()); // {value: 2, done: false}
// console.log(it.next()); // {value: 4, done: false}
// console.log(it.next()); // {value: 5, done: false}
// console.log(it.next()); // {value: 6, done: false}
// console.log(it.next()); // {value: undefined, done: true}
// // 注意，以下代码与上面不在同一个执行流程中
// // 或者使用迭代器统一遍历器 for...of
// for (var v of it) {
//   console.log(v); // 10  2  4  5  6
// }

//===================================================================================

// 生成器
// function* createIterator() {
//   var a = yield 1;
//   var b = yield a + 2;
//   yield b + 3;
// }

// // 创建迭代器实例
// var it = createIterator();

// // 启动迭代器
// console.log(it.next(2)); // {value: 1, done: false}
// console.log(it.next(2)); // {value: 4, done: false}
// console.log(it.next(2)); // {value: 5, done: false}
// console.log(it.next(2)); // {value: undefined, done: true}

//总结
/*
迭代器和生成器都是用于遍历数据集合的工具，但是它们的实现方式和使用方法有所不同。
迭代器是一种对象，它提供了一种访问集合元素的方式，而不需要暴露集合的内部结构；
生成器是一种特殊的函数，它可以在执行过程中暂停并返回一个中间结果，然后再次从暂停的地方继续执行。
生成器函数返回的是一个迭代器对象，可以通过调用 next() 方法来遍历生成器函数返回的中间结果。
*/

// Object.prototype[Symbol.iterator] = function () {
//   let arr = Object.values(this);
//   return arr[Symbol.iterator]();
// };

Object.prototype[Symbol.iterator] = function* () {
  let arr = Object.values(this);
  yield* arr[Symbol.iterator]();
};

let [a, b] = {
  x: 1,
  y: 2,
};

console.log(a, b);
