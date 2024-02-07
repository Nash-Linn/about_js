// 节流函数

function throttle(fn, wait) {
  let nowTime;
  let lastTime;
  let self = this;
  return function (...args) {
    nowTime = +new Date();
    console.log(nowTime);
    if (!lastTime || nowTime - lastTime >= wait) {
      fn.apply(self, args);
      lastTime = nowTime;
    }
  };
}
