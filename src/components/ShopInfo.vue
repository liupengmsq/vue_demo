<template>
    <div class="shop">
        <img class="shop__img" :src="item.imageUrl" alt="">
        <div :class="{
            'shop__content': true,
            //使用组件入参showBorder控制是否显示下划线
            'shop__content--bordered': showBorder
            }">
            <div class="shop__content__title">{{ item.name }}</div>
            <div class="shop__content__tags">
                <span class="shop__content__tags__tag" v-for="(innerItem, innerIndex) in item.tags" :key="innerIndex">
                    {{ innerItem.name }}
                </span>
            </div>
            <p class="shop__content__highlight">{{ item.slogan }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShopInfo',
    props: ['item', 'showBorder']
}
</script>

<style lang="scss" scoped>
@import '@/style/variables.scss';

.shop {
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
        &--bordered {
            border-bottom: 1px solid $content-bgColor;
        }

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
            color: $hightlight-fontColor;
        }
    }
}
</style>
