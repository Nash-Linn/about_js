// 渲染模板字符串
function render(template, date) {
  const reg = /\{\{(\w+)\}\}/; // 匹配{{}}中间的内容
  if (reg.test(template)) {
    // 判断模板中是否有{{}}
    const name = reg.exec(template)[1]; // 获取模板里第一个{{}}中间的内容
    template = template.replace(reg, date[name]); // 将{{}}替换为对象的属性值
    return render(template, date); // 递归的替换{{}}
  }

  return template; // 如果模板中没有{{}}直接返回模板
}

let template = "我是{{name}}，年龄{{age}}，性别{{sex}}";
let person = {
  name: "张三",
  age: 18,
  sex: "男",
};
let result = render(template, person);
console.log(result); //我是张三，年龄18，性别男
