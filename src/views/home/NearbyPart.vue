<template>
    <div class="nearby">
      <h3 class="nearby__title">附近店铺</h3>
      <div class="nearby__item">
        <img class="nearby__item__img" src="@/assets/images/near.png" alt="">
        <div class="nearby__item__content">
          <div class="nearby__item__content__title">沃尔玛</div>
          <div class="nearby__item__content__tags">
            <span class="nearby__item__content__tags__tag">月售1万+</span>
            <span class="nearby__item__content__tags__tag">起送¥0</span>
            <span class="nearby__item__content__tags__tag">基础运费¥5</span>
          </div>
          <p class="nearby__item__content__highlight">VIP尊享满89元减4元运费券（每月3张）</p>
        </div>
      </div>
      <div class="nearby__item">
        <img class="nearby__item__img" src="@/assets/images/near.png" alt="">
        <div class="nearby__item__content">
          <div class="nearby__item__content__title">沃尔玛</div>
          <div class="nearby__item__content__tags">
            <span class="nearby__item__content__tags__tag">月售1万+</span>
            <span class="nearby__item__content__tags__tag">起送¥0</span>
            <span class="nearby__item__content__tags__tag">基础运费¥5</span>
          </div>
          <p class="nearby__item__content__highlight">VIP尊享满89元减4元运费券（每月3张）</p>
        </div>
      </div>
      <div class="nearby__item">
        <img class="nearby__item__img" src="@/assets/images/near.png" alt="">
        <div class="nearby__item__content">
          <div class="nearby__item__content__title">沃尔玛</div>
          <div class="nearby__item__content__tags">
            <span class="nearby__item__content__tags__tag">月售1万+</span>
            <span class="nearby__item__content__tags__tag">起送¥0</span>
            <span class="nearby__item__content__tags__tag">基础运费¥5</span>
          </div>
          <p class="nearby__item__content__highlight">VIP尊享满89元减4元运费券（每月3张）</p>
        </div>
      </div>
      <div class="nearby__item">
        <img class="nearby__item__img" src="@/assets/images/near.png" alt="">
        <div class="nearby__item__content">
          <div class="nearby__item__content__title">沃尔玛</div>
          <div class="nearby__item__content__tags">
            <span class="nearby__item__content__tags__tag">月售1万+</span>
            <span class="nearby__item__content__tags__tag">起送¥0</span>
            <span class="nearby__item__content__tags__tag">基础运费¥5</span>
          </div>
          <p class="nearby__item__content__highlight">VIP尊享满89元减4元运费券（每月3张）</p>
        </div>
      </div>
      <div class="nearby__item">
        <img class="nearby__item__img" src="@/assets/images/near.png" alt="">
        <div class="nearby__item__content">
          <div class="nearby__item__content__title">沃尔玛</div>
          <div class="nearby__item__content__tags">
            <span class="nearby__item__content__tags__tag">月售1万+</span>
            <span class="nearby__item__content__tags__tag">起送¥0</span>
            <span class="nearby__item__content__tags__tag">基础运费¥5</span>
          </div>
          <p class="nearby__item__content__highlight">VIP尊享满89元减4元运费券（每月3张）</p>
        </div>
      </div>
      <div class="nearby__item">
        <img class="nearby__item__img" src="@/assets/images/near.png" alt="">
        <div class="nearby__item__content">
          <div class="nearby__item__content__title">沃尔玛</div>
          <div class="nearby__item__content__tags">
            <span class="nearby__item__content__tags__tag">月售1万+</span>
            <span class="nearby__item__content__tags__tag">起送¥0</span>
            <span class="nearby__item__content__tags__tag">基础运费¥5</span>
          </div>
          <p class="nearby__item__content__highlight">VIP尊享满89元减4元运费券（每月3张）</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'NearbyPart'
}
</script>

<style lang="scss">
@import '../../style/variables.scss';
@import '../../style/mixins.scss';

.nearby {
  &__title {
    margin: .16rem 0 .02rem 0;
    font-size: .18rem;
    font-weight: normal;
    color: $content-fontcolor;
  }
  &__item {
    display: flex; // 弹性布局只作用于子dom元素, 不会再作用于孙子dom元素
    padding-top: .12rem;
    &__img {
      margin-right: .16rem;
      width: .56rem;
      height: .56rem;
    }
    &__content {
      flex: 1;
      padding-bottom: .12rem;
      border-bottom: 1px solid $content-bgColor;
      &__title {
        line-height: .22rem;
        font-size: .16rem;
        color: $content-fontcolor;
      }
      &__tags {
        margin-top: .08rem;
        line-height: .18rem;
        font-size: .13rem;
        color: $content-fontcolor;
        &__tag {
          margin-right: .16rem;
        }
      }
      &__highlight {
        margin: .08rem 0 0 0; //p标签自带的上下的margin，需要设置为0剔除掉默认设置。
        line-height: .18rem;
        font-size: .13rem;
        color: #E93B3B;
      }
    }
  }
}
</style>
