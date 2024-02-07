/*
  想要通过一个函数实现多种功能，但是参数的个数和类型不确定，这时候就需要用到函数重载
*/

// function getUsers(...args) {}

// getUsers(); //得到所有用户
// getUsers(1); //得到第一页的用户，默认10个
// getUsers(1, 20); //得到第一页的用户，20个
// getUsers("张"); //得到所有姓名包含张的用户
// getUsers("张", "男"); //得到所有姓名包含张并且性别为男的用户

// 方法一： 通过判断参数的个数来实现函数重载
/*
  缺陷：
  1.需要创建一个新对象
  2.如果参数的类型不同，但是个数相同，就会出现问题
*/
// 定义一个函数 addMethod，用于在对象上添加方法
function addMethod(object, name, fn) {
  // 保存对象上原有的同名方法
  const old = object[name];
  // 在对象上添加新的方法
  object[name] = function (...args) {
    // 如果新添加的方法的参数个数和实际传入的参数个数相同
    if (fn.length === args.length) {
      // 则调用新添加的方法
      return fn.apply(this, args);
    } else if (typeof old === "function") {
      // 否则，如果原有的同名方法是一个函数
      // 则调用原有的同名方法
      return old.apply(this, args);
    }
  };
}

const searcher = {};

addMethod(searcher, "getUsers", function () {
  console.log("查询所有用户");
});

addMethod(searcher, "getUsers", function (page, limit) {
  console.log("根据页码查询用户");
});

// searcher.getUsers(); //查询所有用户
// searcher.getUsers(1, 10); //根据页码查询用户

// 方法二

function _typeOf(obj) {
  let res = Object.prototype.toString.call(obj).split(" ")[1];
  res = res.substring(0, res.length - 1).toLowerCase();
  return res;
}

const createOverload = () => {
  const fnMap = new Map();
  function overload(...args) {
    const key = args.map((it) => _typeOf(it)).join(",");
    const fn = fnMap.get(key);
    if (!fn) {
      throw new TypeError("没有找到对应的函数");
    }
    return fn.apply(this, args);
  }
  overload.addImpl = function (...args) {
    //获取需要执行的函数
    const fn = args.pop();
    if (typeof fn !== "function") {
      throw new TypeError("最后一个参数必须是函数");
    }
    const key = args.join(",");
    fnMap.set(key, fn);
  };
  return overload;
};

const getUsers = createOverload();

getUsers.addImpl(() => {
  console.log("查询所有用户");
});

const searchPage = (page, size = 10) => {
  console.log("按照页码和数量查询用户");
};

getUsers.addImpl("number", searchPage);
getUsers.addImpl("number", "number", searchPage);

getUsers.addImpl("string", (name) => {
  console.log("按照姓名查询用户");
});

getUsers.addImpl("string", "string", (name, gender) => {
  console.log("按照姓名和性别查询用户");
});

getUsers(); //查询所有用户
getUsers(1); //按照页码和数量查询用户
getUsers(1, 10); //按照页码和数量查询用户
getUsers("张", "男"); //按照姓名和性别查询用户
