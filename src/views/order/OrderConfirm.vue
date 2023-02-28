<template>
    <div class="wrapper">
        <div class="top">
            <div class="top__header">
                <div class="iconfont top__header__back">&#xe697;</div>
                <span>确认订单</span>
            </div>
            <div class="top__receiver">
                <div class="top__receiver__title">收获地址</div>
                <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
                <div class="top__receiver__info">
                    <span class="top__receiver__info__name">姓名</span>
                    <span class="top__receiver__info__name">12312123487</span>
                </div>
                <div class="iconfont top__receiver__enter">&#xe697;</div>
            </div>
        </div>
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
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'OrderConfirm',
    setup () {
        const store = useStore();

        // 获取购物车中有效的商品列表，每个商品特意添加了其所属商店的shopId。
        const getProductsWithShopInfo = computed(() => store.getters.getFilteredProductsWithShopInfo);
        console.log('getFilteredProductsWithShopInfo', getProductsWithShopInfo.value);

        return { getProductsWithShopInfo }
    }
}
</script>

<css lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';

.wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #EEE;
}
.top {
    height: 1.96rem;
    background-size: 100% 1.59rem;
    background-color: #EEE;
    background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%);
    background-repeat: no-repeat;
    position: relative;

    &__header {
        position: relative;
        padding-top: .26rem;
        line-height: .24rem;
        color: #FFF;
        text-align: center;
        font-size: .16rem;
        &__back {
            position: absolute;
            left: .18rem;
            font-size: .22rem;
        }
    }

    &__receiver {
        position: absolute;
        left: .18rem;
        right: .18rem;
        bottom: 0;
        height: 1.11rem;
        background: #FFF;
        border-radius: .04rem;
        &__title {
            padding: .16rem 0 .14rem .16rem;
            font-size: .16rem;
            color: #333;
        }
        &__address {
            line-height: .2rem;
            padding: 0 .4rem 0 .16rem;
            font-size: .14rem;
            color: #333;
        }
        &__info {
            padding: .06rem 0 0 .16rem;
            &__name {
                margin-right: .16rem;
                line-height: .18rem;
                font-size: .12rem;
                color: #666;
            }
        }
        &__enter {
            transform: rotate(180deg);
            position: absolute;
            right: .16rem;
            top: .5rem;
            font-size: .2rem;
        }
    }
}
.products {
    margin: .16rem .18rem 0 .18rem;
    background: #FFF;
    &__title {
        padding: .16rem .16rem 0 .16rem;
        font-size: .16rem;
        color: #333333;
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
}
</css>
