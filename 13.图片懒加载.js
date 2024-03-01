// 图片懒加载
/*
  与普通的图片懒加载不同，如下这个多做了2个处理

  1.图片全部加载完成后，移除事件监听
  2.加载完的图片，从imgList移出
*/

export function imgLazyLoad() {
  let imgList = [...document.querySelectorAll("img")]; // 获取页面中所有的 img 元素，并将 NodeList 转换为数组

  const imgLazyLoad = function () {
    let deleteIndexList = []; // 记录已加载的图片的索引
    imgList.forEach((img, index) => {
      let rect = img.getBoundingClientRect(); // 获取图片的位置信息
      if (rect.top <= window.innerHeight) {
        // 如果图片位于可见区域
        // 获取图片的真实地址
        // <img src="" loadsrc="https://img1.baidu.com/it/u=1865592685,4088896322&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500" alt=""></img>
        let src = img.getAttribute("loadsrc");
        img.src = src; // 将图片的 src 属性设置为获取到的src属性，开始加载图片
        deleteIndexList.push(index); // 将已加载的图片的索引添加到 deleteIndexList
      }
    });
    imgList = imgList.filter((img, index) => {
      // 过滤掉已加载的图片
      return !deleteIndexList.includes(index);
    });

    if (imgList.length == 0) {
      // 如果所有图片都已加载
      document.removeEventListener("scroll", imgLazyLoad); // 移除滚动事件监听器，停止懒加载
    }
  };

  imgLazyLoad();
  document.addEventListener("scroll", imgLazyLoad);
}
