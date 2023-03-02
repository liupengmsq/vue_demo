<template>
    <div class="wrapper_order">
        <div class="top">
            <div class="top__header">
                <div class="iconfont top__header__back" @click="handleBackClick">&#xe697;</div>
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
    </div>
    <div class="order">
        <div class="order__price">实付金额 <b>&yen; {{ totalPriceInCart }}</b></div>
        <div class="order__btn">提交订单</div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const useBackRouterEffect = () => {
    const router = useRouter();
    // 点击后退按钮返回主页
    const handleBackClick = () => {
        router.back();
    };

    return { handleBackClick };
}

export default {
    name: 'OrderConfirm',
    setup () {
        const store = useStore();

        // 获取购物车中有效的商品列表，每个商品特意添加了其所属商店的shopId。
        const getProductsWithShopInfo = computed(() => store.getters.getFilteredProductsWithShopInfo);
        console.log('getFilteredProductsWithShopInfo', getProductsWithShopInfo.value);

        const totalPriceInCart = computed(() => store.getters.getTotalPriceInCart.getValue());

        const { handleBackClick } = useBackRouterEffect();

        return { getProductsWithShopInfo, totalPriceInCart, handleBackClick }
    }
}
</script>

<css lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';

.wrapper_order {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0.5rem;
    background-color: #EEE;
}
.top {
    position: relative;
    height: 1.96rem;
    background-size: 100% 1.59rem;
    background-color: #EEE;
    background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%);
    background-repeat: no-repeat;

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
    &__shopTotal{
        width: 3rem;
        height: .28rem;
        line-height: .28rem;
        background: #F5F5F5;
        margin: 0 .2rem 0 .2rem;
        text-align: center;
        font-size:.14rem;
        color: #999999;
        &__expand {
            transform: rotate(-90deg);
            position: absolute;
            margin-left: .1rem;
            font-size: .2rem;
        }
    }
}
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
</css>
