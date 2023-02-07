<template>
    <div class="content">
        <div class="category">
            <div class="category__item category__item--active">全部商品</div>
            <div class="category__item">秒杀</div>
            <div class="category__item">新鲜水果</div>
            <div class="category__item">休闲食品</div>
            <div class="category__item">时令蔬菜</div>
            <div class="category__item">肉弹家禽</div>
        </div>
        <div class="product">
            <div class="product__item">
                <img class="product__item__img" src="@/assets/images/near.png">
                <div class="product__item__detail">
                    <h4 class="product__item__detail__title">番茄250g/份</h4>
                    <p class="product__item__detail__sales">月售10件</p>
                    <p class="product__item__detail__price">
                        <span class="product__item__detail__price__yen">&yen;</span>33.6
                        <span class="product__item__detail__price__origin">&yen;66.6</span>
                    </p>
                </div>
                <div class="product__item__number">
                    <span class="product__item__number__minus">-</span>
                    0
                    <span class="product__item__number__plus">+</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';

.content {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 1.6rem;
    bottom: .5rem;
}
.category {
    overflow-y: scroll; // 设置内容超出所在区域后如何处理，这里设置的是显示滚动条
    height: 100%;
    width: .76rem;
    background-color: $search-bgColor;
    &__item {
        line-height: .4rem;
        text-align: center;
        font-size: .14rem;
        color: $content-fontcolor;
        &--active {
            background: $bgColor;
        }
    }
}
.product {
    overflow-y: scroll; // 设置内容超出所在区域后如何处理，这里设置的是显示滚动条
    flex: 1;
    &__item {
        position: relative;
        display: flex;
        padding: .12rem 0;
        margin: 0 .16rem;
        border-bottom: .01rem solid $content-bgColor;
        &__img {
            width: .68rem;
            height: .68rem;
            margin-right: .16rem;
        }
        &__detail {
            overflow: hidden;
            &__title {
                margin: 0;
                line-height: .2rem;
                font-size: .14rem;
                color: $content-fontcolor;
                @include ellipsis;
            }
            &__sales {
                margin: .06rem 0;
                line-height: .16rem;
                font-size: .12rem;
                color: $content-fontcolor;
            }
            &__price {
                margin: 0;
                line-height: .2rem;
                font-size: .14rem;
                color: $hightlight-fontColor;
                &__yen {
                    font-size: .12rem;
                }
                &__origin {
                    line-height: .2rem;
                    font-size: .12rem;
                    color: $light-fontColor;
                    text-decoration: line-through;
                }
            }
        }
        &__number {
            position: absolute;
            right: 0;
            bottom: .2rem;
            &__minus, &__plus {
                display: inline-block;
                width: .2rem;
                line-height: .16rem;
                height: .2rem;
                border-radius: 50%;
                border: .01rem solid $medium-fontColor;
                font-size: .2rem;
                text-align: center;
            }
            &__minus {
                border: .01rem solid $medium-fontColor;
                color: $medium-fontColor;
                margin-right: .05rem;
            }
            &__plus {
                background: $btn-bgColor;
                color: $search-bgColor;
                margin-left: .05rem;
            }
        }
    }
}
</style>
