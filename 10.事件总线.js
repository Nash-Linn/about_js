// 事件总线（发布订阅模式）

class EventEmitter {
  constructor() {
    this.cache = {};
  }

  on(name, fn) {
    if (this.cache[name]) {
      this.cache[name].push(fn); //将任务函数推入对应的任务数组中
    } else {
      this.cache[name] = [fn]; //如果任务数组不存在，则创建一个任务数组，并将任务函数推入
    }
  }

  off(name, fn) {
    let tasks = this.cache[name]; //获取对应的任务函数数组
    if (tasks) {
      let index = tasks.findIndex((f) => f === fn || f.callback === fn); //找到对应的任务函数
      if (index >= 0) {
        tasks.splice(index, 1); //删除对应的任务函数
      }
    }
  }

  emit(name, once = false, ...args) {
    if (this.cache[name]) {
      // 创建副本，如果回调函数内继续注册相同事件，会造成死循环
      let tasks = this.cache[name].slice();
      //执行任务函数
      tasks.forEach((task) => {
        task(...args);
      });
      if (once) {
        //如果是一次性订阅，则清空任务队列
        delete this.cache[name];
      }
    }
  }
}
