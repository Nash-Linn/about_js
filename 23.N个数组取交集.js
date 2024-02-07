const getIntersection = (...arrs) => {
  let Arr = arrs.reduce((pre, cur) => {
    return cur.filter((item) => pre.includes(item));
  });
  return Array.from(new Set(Arr));
};

console.log(getIntersection([1, 2, 3, 3], [2, 3, 4], [3, 4, 5]));
