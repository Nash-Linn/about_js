const getJSON = function (url) {
  return new Promise((resovle, reject) => {
    /* 
      1.创建 XMLHttpRequest 对象：这是所有 AJAX 应用的基础，用于在后台与服务器交换数据。
    */
    const xhr = XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject("Mscrosoft.XMLHttp");

    /*
      2.初始化请求：使用 XMLHttpRequest 对象的 open 方法初始化一个请求。
      需要提供请求的类型（如 GET、POST 等）、请求的 URL 和是否异步处理请求（true 表示异步，false 表示同步）。
    */

    xhr.open("GET", url, false);
    xhr.setRequestHeader("Accept", "application/json");

    /*
      3.发送请求：使用 XMLHttpRequest 对象的 send 方法发送请求，
      如果是 POST 请求，需要在 send 方法中传入请求体，
      如果是 GET 请求，send 方法中不需要传入参数。
    */
    xhr.send();

    /*
      4.注册事件处理器：设置 XMLHttpRequest 对象的 onreadystatechange 事件处理器，当请求的状态（readyState）发生变化时，事件处理器会被调用。
    */
    xhr.onreadystatechange = function () {
      /*
      5.处理响应：在 onreadystatechange 事件处理器中，
      可以通过 XMLHttpRequest 对象的 status 和 readyState 属性来判断请求是否成功，
      以及是否收到了响应。当 readyState 等于 4 并且 status 等于 200 时，表示请求成功并且收到了响应。
    */
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200 || xhr.status === 304) {
        resovle(xhr.responseText);
      } else {
        reject(new Error(xhr.responseText));
      }
    };
  });
};
