/**
 *  typeof 可以正确识别：Undefined、Boolean、Number、String、Symbol、Function等类型的数据，
 * 但是对于其他的都会认为是object,比如 Null，Date等,
 * 所以通过typeof来判断数据类型并不是十分准确。
 * 但是可以使用Object.prototype.toString来解决这个问题。
 */

function _typeOf(obj) {
  let res = Object.prototype.toString.call(obj).split(" ")[1];
  res = res.substring(0, res.length - 1).toLowerCase();
  return res;
}

let t1 = _typeOf([]);
let t2 = _typeOf({});
let t3 = _typeOf(new Date());

console.log(t1);
console.log(t2);
console.log(t3);

//typeof
console.log("测试 String", typeof "1"); // string
console.log("测试 Number", typeof 1); // number
console.log("测试 Boolean", typeof true); // boolean
console.log("测试 Null", typeof null); // object
console.log("测试 Undefined", typeof undefined); // undefined
console.log("测试 Object", typeof {}); // object
console.log("测试 Symbol", typeof Symbol()); // symbol
console.log("测试 Function", typeof function () {}); // function
console.log("测试 Array", typeof []); // object
console.log("测试 Date", typeof new Date()); // object
console.log("测试 RegExp", typeof new RegExp()); // object
console.log("测试 Error", typeof new Error()); // object
console.log("测试 Map", typeof new Map()); // object
console.log("测试 Set", typeof new Set()); // object

console.log("---------------------------------------------");

//instanceof
console.log("测试 String", "1" instanceof String); // false
console.log("测试 Number", 1 instanceof Number); // false
console.log("测试 Boolean", true instanceof Boolean); // false
// console.log("测试 Null", null instanceof null);  // 报错
// console.log("测试 Undefined", undefined instanceof undefined);  // 报错
console.log("测试 Object", {} instanceof Object); // true
console.log("测试 Symbol", Symbol() instanceof Symbol); // false
console.log("测试 Function", function () {} instanceof Function); // true
console.log("测试 Array", [] instanceof Array); // true
console.log("测试 Date", new Date() instanceof Date); // true
console.log("测试 RegExp", new RegExp() instanceof RegExp); // true
console.log("测试 Error", new Error() instanceof Error); // true
console.log("测试 Map", new Map() instanceof Map); // true
console.log("测试 Set", new Set() instanceof Set); // true

console.log("---------------------------------------------");

// constructor
console.log("测试 String", "1".constructor === String); // true
console.log("测试 Number", (1).constructor === Number); // true
console.log("测试 Boolean", true.constructor === Boolean); // true
// console.log("测试 Null", null.constructor === null);  // 报错
// console.log("测试 Undefined", undefined.constructor === undefined);  // 报错
console.log("测试 Object", {}.constructor === Object); // true
console.log("测试 Symbol", Symbol().constructor === Symbol); // true
console.log("测试 Function", function () {}.constructor === Function); // true
console.log("测试 Array", [].constructor === Array); // true
console.log("测试 Date", new Date().constructor === Date); // true
console.log("测试 RegExp", new RegExp().constructor === RegExp); // true
console.log("测试 Error", new Error().constructor === Error); // true
console.log("测试 Map", new Map().constructor === Map); // true
console.log("测试 Set", new Set().constructor === Set); // true

console.log("---------------------------------------------");

//Object.prototype.toString
console.log("测试 String", Object.prototype.toString.call("1")); // [object String]
console.log("测试 Number", Object.prototype.toString.call(1)); // [object Number]
console.log("测试 Boolean", Object.prototype.toString.call(true)); // [object Boolean]
console.log("测试 Null", Object.prototype.toString.call(null)); // [object Null]
console.log("测试 Undefined", Object.prototype.toString.call(undefined)); // [object Undefined]
console.log("测试 Object", Object.prototype.toString.call({})); // [object Object]
console.log("测试 Symbol", Object.prototype.toString.call(Symbol())); // [object Symbol]
console.log(
  "测试 Function",
  Object.prototype.toString.call(function () {})
); // [object Function]
console.log("测试 Array", Object.prototype.toString.call([])); // [object Array]
console.log("测试 Date", Object.prototype.toString.call(new Date())); // [object Date]
console.log("测试 RegExp", Object.prototype.toString.call(new RegExp())); // [object RegExp]
console.log("测试 Error", Object.prototype.toString.call(new Error())); // [object Error]
console.log("测试 Map", Object.prototype.toString.call(new Map())); // [object Map]
console.log("测试 Set", Object.prototype.toString.call(new Set())); // [object Set]
