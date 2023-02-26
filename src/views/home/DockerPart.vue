<template>
  <div class="docker">
    <!-- 使用了Sass的BEM命名方式来命名css：block__element--Modifier -->
    <span
      v-for="(item, index) in dockerList"
      :key="item.icon"
      :class="{
        'docker__item': true,
        'docker__item--active': index === 0 // 第一个span项目才会使用docker__item--active
        }"
    >
      <router-link :to="item.to">
        <!-- 字体图标, 为了避免vue自动将插值表达式中的内容转移，使用v-html输出raw html -->
        <div class="iconfont" v-html="item.icon" />
        <div class="docker__title">{{ item.text }}</div>
      </router-link>
    </span>
  </div>
</template>

<script>
export default {
  name: 'DockerPart',
  setup () {
    const dockerList = [
      { icon: '&#xe600;', text: '首页', to: { name: 'home' } },
      { icon: '&#xe645;', text: '购物车', to: { name: 'cartList' } },
      { icon: '&#xe643;', text: '订单', to: { name: 'orderConfirm' } },
      { icon: '&#xe60d;', text: '我的', to: { name: 'home' } }
    ]
    return {
      dockerList
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';

.docker {
  display: flex; // 启用浮动布局
  box-sizing: border-box; // 告诉浏览器：你想要设置的边框和内边距的值是包含在 width 内的。
  position: absolute; // 绝对定位，相对于整个浏览器页面的偏移量
  padding: 0 .18rem; //左右内边距为18px
  left: 0;
  bottom: 0;
  width: 100%;
  height: .49rem;
  border-top: 1px solid $content-bgColor;
  color: $content-fontcolor; //使用位于variables.scss中定义的变量
  &__item { // 此种命名表示是选择器是.docker__item
    flex: 1; // 没有浮动块的伸展设置，设置平均撑满整个剩余空间。
    text-align: center;
    a {
      color: $content-fontcolor; //使用位于variables.scss中定义的变量
      text-decoration: none;
    }
    .iconfont {
      margin: .07rem 0 .02rem 0;
      font-size: .2rem; //设置字体图标的大小
    }
    &--active { //相当于选择器是.docker__item--active
      a {
        color: #1FA4FC;
      }
    }
  }
  &__title { // 此选择器相当于是.docker__title
    // 对于中文浏览器(英文没有问题)，chrome最小字体限制是12px，这里需要使用transform scale缩小字体为需要的10px
    font-size: .2rem;
    transform: scale(.5, .5); //设置缩放比例，是20px的50% = 10px
    transform-origin: center top; //定义缩放的中心点
  }
}
</style>
