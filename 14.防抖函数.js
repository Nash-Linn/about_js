//防抖函数
/*
  触发高频事件N秒后只会执行一次，如果N秒内高频事件再次被触发，则重新计算时间
*/

//简单版：函数内部支持this和event对象

function debounce(func, wait) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

//最终版：函数内部支持this，event对象，并且可以立即执行，立即停止

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;

    if (timeout) clearTimeout(timeout);
    // 是否在某一批事件中首次执行
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
        func.apply(context, args);
        immediate = true;
      }, wait);
      if (callNow) {
        func.apply(context, args);
      }
      immediate = false;
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
        immediate = true;
      }, wait);
    }
  };
}
