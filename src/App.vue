<template>
  <div class="docker">
    <!-- 使用了Sass的BEM命名方式来命名css：block__element--Modifier -->
    <span class="docker__item docker__item--active">
      <div class="iconfont">&#xf0174;</div>  <!-- 字体图标 -->
      <div class="docker__title">首页</div>
    </span>
    <span class="docker__item">
      <div class="iconfont">&#xe645;</div>
      <div class="docker__title">购物车</div>
    </span>
    <span class="docker__item">
      <div class="iconfont">&#xe643;</div>
      <div class="docker__title">订单</div>
    </span>
    <span class="docker__item">
      <div class="iconfont">&#xe60d;</div>
      <div class="docker__title">我的</div>
    </span>
  </div>
</template>

<style lang="scss">
.docker {
  display: flex; // 启用浮动布局
  box-sizing: border-box; // 告诉浏览器：你想要设置的边框和内边距的值是包含在 width 内的。
  position: absolute; // 绝对定位，相对于整个浏览器页面的偏移量
  padding: 0 .18rem; //左右内边距为18px
  left: 0;
  bottom: 0;
  width: 100%;
  height: .49rem;
  border-top: 1px solid #F1F1F1;
}
.docker__item { // 此种命名表示是在.docker里面的item
  flex: 1; // 没有浮动块的伸展设置，设置平均撑满整个剩余空间。
  text-align: center;
  .iconfont {
    margin: .07rem 0 .02rem 0;
    font-size: .2rem; //设置字体图标的大小
  }
}
.docker__item--active {
  color: #1FA4FC;
}
.docker__title {
  // 对于中文浏览器(英文没有问题)，chrome最小字体限制是12px，这里需要使用transform scale缩小字体为需要的10px
  font-size: .2rem;
  transform: scale(.5, .5); //设置缩放比例，是20px的50% = 10px
  transform-origin: center top; //定义缩放的中心点
}
</style>
