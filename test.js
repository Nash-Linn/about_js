function change(n) {
  n += 10;
}

let b = 1;
change(b);
console.log(b);

let obj = { a: 1 };
change(obj.a);
console.log(obj);
