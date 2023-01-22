<template>
  <div class="wrapper">
    <Static /> <!-- 页面头部的组件 -->
    <Nearby /> <!-- 页面中部的组件 -->
  </div>
  <Docker /> <!-- 页面底部docker栏 -->
</template>

<script>
import StaticPart from './StaticPart.vue'
import NearbyPart from './NearbyPart.vue'
import DockerPart from './DockerPart.vue'

export default {
  name: 'HomePage',
  components: {
    Static: StaticPart,
    Nearby: NearbyPart,
    Docker: DockerPart
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  // 当一个块级元素（div 元素、p 元素之类的）
  // 的内容在垂直方向发生溢出时，
  // 此属性决定如何处理溢出的内容。
  // auto表示如何处理取决于浏览器本身。
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: .5rem;
  right: 0;
  padding: 0 .18rem .2rem .18rem
}
</style>
