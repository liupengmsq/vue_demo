<template>
    <div class="cart">
        <div class="check">
            <div class="check__icon">
                <img class="check__icon__img" src="@/assets/images/basket.svg" alt="">
                <div class="check__icon__tag">{{ totalCountInCart }}</div>
            </div>
            <div class="check__info">
                总计：<span class="check__info__price">&yen;{{ totalPriceInCart }}</span>
            </div>
            <div class="check__btn" @click="countSumOfCart">
                去结算
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'CartPart',
    setup () {
        const store = useStore();
        return {
            // 将购物车总数与总价格都加入计算属性中，当其值更改时会响应到UI上
            totalCountInCart: computed(() => store.getters.getTotalCountInCart),
            totalPriceInCart: computed(() => store.getters.getTotalPriceInCart.getValue())
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/style/variables.scss';

.cart {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
}

.check {
    display: flex;
    height: .49rem;
    border-top: .01rem solid $content-bgColor;
    &__icon {
        position: relative;
        width: .84rem;
        &__img {
            display: block;
            margin: .12rem auto;
            width: .28rem;
            height: .26rem;
        }
        &__tag {
            position: absolute;
            right: .2rem;
            top: .04rem;
            width: .2rem;
            height: .2rem;
            line-height: .2rem;
            background-color:  $hightlight-fontColor;
            border-radius: 50%;
            font-size: .12rem;
            text-align: center;
            color: #fff;
            transform: scale(.5);
        }
    }
    &__info {
        flex: 1;
        line-height: .49rem;
        color: $content-fontcolor;
        font-size: .12rem;
        &__price {
            color: $hightlight-fontColor;
            font-size: .18rem;
        }
    }
    &__btn {
        width: .98rem;
        line-height: .49rem;
        background-color: #4FB0F9;
        color: #FFF;
        font-size: .14rem;
        text-align: center;
    }
}
</style>
