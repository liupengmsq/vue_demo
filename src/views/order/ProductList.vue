<template>
    <div class="product_list">
        <div class="products" v-for="item in getProductsWithShopInfo" :key="item.id">
            <div class="product__item">
                <div class="products__title">{{ item.shopName }}</div>
                <div class="products__item" v-for="productItem in item.productList" :key="productItem.id">
                    <img class="products__item__img" :src="productItem.imageUrl">
                    <div class="products__item__detail">
                        <h4 class="products__item__detail__title">{{ productItem.name }}</h4>
                        <p class="products__item__detail__price">
                            <span class="products__item__detail__price__single">
                                <span class="products__item__detail__price__single__yen">&yen;</span>
                                {{ productItem.price }} x {{ productItem.count }}
                            </span>
                            <span class="products__item__detail__price__total">
                                <span class="products__item__detail__price__single__yen">&yen;</span>
                                {{ productItem.totalPrice }}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="products__shopTotal">总价 &yen;{{ item.shopTotalPrice }} <span class="iconfont products__shopTotal__expand">&#xe697;</span></div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    setup () {
        const store = useStore();

        // 获取购物车中有效的商品列表，每个商品特意添加了其所属商店的shopId。
        const getProductsWithShopInfo = computed(() => store.getters.getFilteredProductsWithShopInfo);

        return { getProductsWithShopInfo }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.product_list {
    overflow-y: auto;
    position: absolute;
    margin-top: .1rem;
    left: 0;
    right: 0;
    top: 2rem;
    bottom: .1rem;
    background-color: #EEE;
}
.products {
    margin: 0 .18rem 0 .18rem;
    padding-bottom: .1rem;
    background: $bgColor;
    &__title {
        padding: .16rem .16rem 0 .16rem;
        font-size: .16rem;
        color: $content-fontcolor;
    }
    &__item {
        position: relative;
        display: flex;
        padding: .16rem;
        &__img {
            width: .48rem;
            height: .48rem;
            margin-right: .16rem;
        }
        &__detail {
            overflow: hidden;
            flex: 1;
            &__title {
                margin: 0;
                line-height: .2rem;
                font-size: .14rem;
                color: $content-fontcolor;
                @include ellipsis;
            }
            &__price {
                display: flex;
                margin: .06rem 0 0 0;
                line-height: .2rem;
                font-size: .14rem;
                color: $hightlight-fontColor;
                width: 100%;
                &__single {
                    width: 1rem;
                    &__yen {
                        font-size: .12rem;
                    }
                }
                &__total {
                    flex: 1;
                    text-align: right;
                    color: #000;
                    &__yen {
                        font-size: .12rem;
                    }
                }
            }
        }
    }
    &__shopTotal{
        width: 3rem;
        height: .28rem;
        line-height: .28rem;
        background: $search-bgColor;
        margin: 0 .2rem 0 .2rem;
        text-align: center;
        font-size:.14rem;
        color: $light-fontColor;
        &__expand {
            transform: rotate(-90deg);
            position: absolute;
            margin-left: .1rem;
            font-size: .2rem;
        }
    }
}
</style>
