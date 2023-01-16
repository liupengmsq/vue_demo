<template>
  <div class="wrapper">
    <div class="position">
      <span class="iconfont position__icon">&#xe619;</span> <!-- 字体图标 -->
      北京理工大学国防科技园2号楼10层
      北京理工大学国防科技园2号楼10层
      北京理工大学国防科技园2号楼10层
      <span class="iconfont position__notice">&#xe63f;</span> <!-- 字体图标 -->
    </div>
    <div class="search">
      <span class="iconfont search__icon">&#xe6ac;</span>
      <span class="search__text">搜索内容搜索内容</span>
    </div>

    <div class="banner">
      <img class="banner__img" src="@/assets/images/banner.jpg" alt="">
    </div>

    <div class="icons">
      <div class="icons__item">
        <img src="@/assets/images/超市.png" alt="" class="icons__item__img">
        <p class="icons__item__desc">超市便利</p>
      </div>
      <div class="icons__item">
        <img src="@/assets/images/菜市场.png" alt="" class="icons__item__img">
        <p class="icons__item__desc">菜市场</p>
      </div>
      <div class="icons__item">
        <img src="@/assets/images/水果店.png" alt="" class="icons__item__img">
        <p class="icons__item__desc">水果店</p>
      </div>
      <div class="icons__item">
        <img src="@/assets/images/鲜花.png" alt="" class="icons__item__img">
        <p class="icons__item__desc">鲜花绿植</p>
      </div>
      <div class="icons__item">
        <img src="@/assets/images/医药健康.png" alt="" class="icons__item__img">
        <p class="icons__item__desc">医药健康</p>
      </div>
      <div class="icons__item">
        <img src="@/assets/images/家居.png" alt="" class="icons__item__img">
        <p class="icons__item__desc">家居时尚</p>
      </div>
      <div class="icons__item">
        <img src="@/assets/images/蛋糕.png" alt="" class="icons__item__img">
        <p class="icons__item__desc">烘培蛋糕</p>
      </div>
      <div class="icons__item">
        <img src="@/assets/images/签到.png" alt="" class="icons__item__img">
        <p class="icons__item__desc">签到</p>
      </div>
      <div class="icons__item">
        <img src="@/assets/images/大牌免运.png" alt="" class="icons__item__img">
        <p class="icons__item__desc">大牌免运</p>
      </div>
      <div class="icons__item">
        <img src="@/assets/images/红包.png" alt="" class="icons__item__img">
        <p class="icons__item__desc">红包套餐</p>
      </div>
    </div>
    <div class="gap"></div>

  </div>

  <div class="docker">
    <!-- 使用了Sass的BEM命名方式来命名css：block__element--Modifier -->
    <span class="docker__item docker__item--active">
      <div class="iconfont">&#xe600;</div>  <!-- 字体图标 -->
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
@import './style/variables.scss';
@import './style/mixins.scss';

.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: .5rem;
  right: 0;
  padding: 0 .18rem
}
.position {
  position: relative;
  padding: .16rem .24rem .16rem 0;
  line-height: .22rem;
  font-size: .16rem;
  @include ellipsis; //引入mixins.scss中定义的字体超出范围显示省略号的样式
  .position__icon { //不用&连接父子选择器相当于是.position .position__icon
    position: relative;
    top: .01rem;
    font-size: .2rem;
  }
  .position__notice {
    position: absolute; //子绝父相，相对定位于父框.position
    right: 0;
    top: .17rem;
    font-size: .2rem;
  }
  color: $content-fontcolor; //使用位于variables.scss中定义的变量
}

.search {
  margin-bottom: .12rem;
  line-height: .32rem;
  background-color: #F5F5F5;
  color: #B7B7B7;
  border-radius: .16rem;
  font-size: .14rem;
  .search__icon {
    position: relative;
    top: .02rem;
    display: inline-block;
    padding: 0 .12rem 0 .16rem;
    font-size: .16rem;
  }
  &__text {
    display: inline-block;
  }
}

.banner {
  //当网速过慢时，banner内的img还没显示出来，
  //为了防止banner下方的html元素自动占据当前img的位置导致页面布局抖动
  //我们使用了如下三个css样式来添加一个占位的白板
  //当图片没显示的时候，此白板（也就是banner容器的内衬底边的高度）被显示出来
  //导致位于bannner下方的html元素不会上移
  //当图片显示出来的时候，此底部的内衬会被图片挤到下方，而由于设置了overflow: hidden
  //导致溢出的底部内衬不显示出来，页面布局不受影响。
  height: 0;
  overflow: hidden;
  //设置占位白板的高度的百分比是banner下的img图片的"高度"除以"宽度"的百分比。
  //css中以百分比设置值时，是去计算当前所在的容器的宽度的百分比。
  //而当前容器的宽度就是img图片所在的容器宽度，这个百分比计算得到就是远了image的高度。
  padding-bottom: 25.4%;

  //banner下的图片
  &__img {
    width: 100%; //控制banner图片banner.jpg的大小
  }
}

.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: .16rem;
  &__item {
    width: 20%;
    &__img {
      // 将img的inline改为block，
      // 让下面的margin生效实现图片的居中(相对于当前容器icons__item居中)
      display: block;
      width: .4rem;
      height: .4rem;
      margin: 0 auto;
    }
    &__desc {
      margin: .06rem 0 .16rem 0;
      text-align: center;
      color: $content-fontcolor;
    }
  }
}

.gap {
  margin: 0 -.18rem; // 设置margin的left与right为负值，表达的意思是向左右撑满整个行
  height: .1rem;
  background-color: $content-bgColor;
}

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
    .iconfont {
      margin: .07rem 0 .02rem 0;
      font-size: .2rem; //设置字体图标的大小
    }
    &--active { //相当于选择器是.docker__item--active
      color: #1FA4FC;
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
