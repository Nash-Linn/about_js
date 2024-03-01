// 手写 Promise 满足A+规范

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  // #变量名  私有属性
  #state = "pending";
  #result = undefined;
  #handlers = [];

  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(FULFILLED, data);
    };

    const reject = (reason) => {
      this.#changeState(REJECTED, reason);
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  #changeState(state, result) {
    if (this.#state !== "pending") return;
    this.#state = state;
    this.#result = result;

    this.#run();
  }

  #isPromiseLike(value) {
    if (
      value !== null &&
      (typeof value === "object" || typeof value === "function")
    ) {
      return typeof value.then === "function";
    }
    return false;
  }

  //将任务放到微任务队列中
  #runMicroTask(func) {
    if (typeof process === "object" && typeof process.nextTick === "function") {
      // node 环境
      process.nextTick(func);
    } else if (typeof MutationObserver === "function") {
      //浏览器环境
      const ob = new MutationObserver(func); // 创建一个观察者 当文本节点的值发生变化时，会触发回调函数
      const textNode = document.createTextNode("1"); // 创建文本节点
      ob.observe(textNode, { characterData: true }); // 观察文本节点的变化
      textNode.data = "2"; // 修改文本节点的值
    } else {
      setTimeout(func, 0);
    }
  }

  #runone(callback, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof callback !== "function") {
        const settled = this.#state === FULFILLED ? resolve : reject;
        settled(this.#result);
        return;
      }

      try {
        const data = callback(this.#result);
        if (this.#isPromiseLike(data)) {
          data.then(resolve, reject);
        } else {
          resolve(data);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  #run() {
    if (this.#state === PENDING) return;
    while (this.#handlers.length) {
      const { onFulfilled, onRejected, resolve, reject } =
        this.#handlers.shift();

      if (this.#state === FULFILLED) {
        this.#runone(onFulfilled, resolve, reject);
      } else if (this.#state === REJECTED) {
        this.#runone(onRejected, resolve, reject);
      }
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      });

      this.#run();
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  finally(onFinally) {
    // 状态透明（穿透） 保持状态不变
    return this.then(
      (data) => {
        onFinally();
        return data;
      },
      (err) => {
        onFinally();
        throw err;
      }
    );
  }

  // 静态方法
  static resolve(value) {
    if (value instanceof MyPromise) return value;
    let _resolve, _reject;
    // 需要用到 #isPromiseLike 但是静态方法中不可以调用实例方法 所以要先创建一个 Promise
    const p = new MyPromise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });

    if (p.#isPromiseLike(value)) {
      value.then(_resolve, _reject);
    } else {
      _resolve(value);
    }
    return p;
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
}

// 测试 MyPromise 和 Promise  互相调用

// const p = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("success1");
//   }, 1000);
// });

// p.then((res) => {
//   console.log("res1", res);
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("success2");
//     }, 1000);
//   });
// }).then((res) => {
//   console.log("res2", res);
// });

// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("success3");
//   }, 1000);
// });

// p2.then((res) => {
//   console.log("res3", res);
//   return new MyPromise((resolve) => {
//     setTimeout(() => {
//       resolve("success4");
//     }, 1000);
//   });
// }).then((res) => {
//   console.log("res4", res);
// });

//--------------------------------------------------
//使用 async await 测试
// function delay(duration = 1000) {
//   return new MyPromise((resolve) => {
//     setTimeout(() => {
//       resolve(duration);
//     }, duration);
//   });
// }

// async function test() {
//   await delay(1000);
//   console.log("done");
// }

// test();

//--------------------------------------------------
//测试任务队列是否正常
// setTimeout(() => {
//   console.log(1);
// }, 0);

// new MyPromise((resolve) => {
//   console.log(2);
//   resolve(3);
// }).then((res) => {
//   console.log("res", res);
// });

// console.log(4);

//--------------------------------------------------
// finally
// const p = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("success");
//   }, 1000);
// })
//   .then((res) => {
//     console.log("res", res);
//   })
//   .finally(() => {
//     console.log("finally");
//   });

//--------------------------------------------------
//resolve
// const p = MyPromise.resolve(1).then((res) => {
//   console.log("res", res);
// });

//-----------------------------------------------------
//reject
// const p = MyPromise.reject("error").catch((err) => {
//   console.log(err);
// });
