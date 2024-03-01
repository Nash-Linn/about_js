function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

class SuperTask {
  constructor(parallelCount = 2) {
    this.parallelCount = parallelCount;
    this.tasks = [];
    this.runningCount = 0;
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push({
        task,
        resolve,
        reject,
      });
      this.#run();
    });
  }

  #run() {
    while (this.runningCount < this.parallelCount && this.tasks.length) {
      const { task, resolve, reject } = this.tasks.shift();
      this.runningCount++;
      Promise.resolve(task())
        .then(resolve, reject)
        .finally(() => {
          this.runningCount--;
          this.#run();
        });
    }
  }
}

// const superTask = new SuperTask();

// function addTask(time, name) {
//   superTask
//     .add(() => timeout(time))
//     .then(() => {
//       console.log(`任务${name}执行完毕`);
//     });
// }

// addTask(10000, 1); // 10000ms后输出: 任务1执行完毕
// addTask(5000, 2); // 5000ms后输出: 任务2执行完毕
// addTask(3000, 3); // 8000ms后输出: 任务3执行完毕
// addTask(4000, 4); // 12000ms后输出: 任务4执行完毕
// addTask(5000, 5); // 15000ms后输出: 任务5执行完毕

// 最多只能处理两个任务
// 1 和 2 同时执行  --> 10s   5s
// 2 结束 3补上     --> 此时 1 还在执行  2 + 3 总共耗时 8s
// 3 结束 4补上     --> 2 + 3 + 4 总共耗时 12s
// 1 在 10s 结束  5 补上  --> 1 + 5 总共耗时 15s

//-------------------------------------------

// 模拟5个异步任务

const p1 = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("success1");
    }, 10000);
  });
};

const p2 = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("success2");
    }, 5000);
  });
};

const p3 = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("success3");
    }, 3000);
  });
};

const p4 = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("success4");
    }, 4000);
  });
};

const p5 = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("success5");
    }, 5000);
  });
};

const superTask = new SuperTask();

superTask.add(p1).then((res) => {
  console.log(res);
});
superTask.add(p2).then((res) => {
  console.log(res);
});
superTask.add(p3).then((res) => {
  console.log(res);
});
superTask.add(p4).then((res) => {
  console.log(res);
});
superTask.add(p5).then((res) => {
  console.log(res);
});
