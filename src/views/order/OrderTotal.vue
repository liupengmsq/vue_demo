<template>
    <div class="order">
        <div class="order__price">实付金额 <b>&yen; {{ totalPriceInCart }}</b></div>
        <div class="order__btn">提交订单</div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
    setup () {
        const store = useStore();
        // 获取所有商店中商品的总价
        const totalPriceInCart = computed(() => store.getters.getTotalPriceInCart.getValue());

        return { totalPriceInCart }
    }
}
</script>

<style lang="scss" scoped>
.order {
    // 设置order下的子div横向排列
    display: flex;

    // 设置整体的order div放在整个界面的下方
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;

    // 设置文字在order中垂直居中
    height: .49rem;
    line-height: .49rem;

    background: #FFF;

    &__price {
        flex: 1;
        text-indent: .24rem;
        font-size: .14rem;
        color: #333;
    }
    &__btn {
        width: .98rem;
        background: #4FB0F9;
        color: #FFF;
        text-align: center;
        font-size: .14rem;
    }
}
</style>
