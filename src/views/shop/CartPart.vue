<template>
    <!-- 点击蒙层的时候会自动将购物车隐藏掉 -->
    <div class="mask" v-if="showCart" @click="handleCartShowChange"></div>
    <div class="cart">
        <div class="product" v-if="showCart">
            <div class="product__header">
                <div class="product__header__all" @click="toggleCheckAllProductsInCart">
                    <!-- 使用allProductsHaveBeenCheckedInCart决定显示checked还是unchecked的字体图标 -->
                    <div class="product__item__checked iconfont"
                        v-html="allProductsHaveBeenCheckedInCart ? '&#xe618;' : '&#xe66c;'"
                    >
                    </div>
                    全选
                </div>
                <div class="product__header__clear" @click="removeAllItemsFromCart">清空购物车</div>
            </div>
            <div class="product__item" v-for="item in productListInCart" :key="item.id" >
                <!-- 使用item.checked是否为true来决定展示哪个字体图标。并在click的时候将checked的true或false替换  -->
                <div class="product__item__checked iconfont"
                    v-html="item.checked ? '&#xe618;' : '&#xe66c;'"
                    @click="() => {
                        item.checked = !item.checked;
                        saveToLocalStorage();
                    }">
                </div>

                <img class="product__item__img" :src="item.imageUrl">
                <div class="product__item__detail">
                    <h4 class="product__item__detail__title">{{ item.name }}</h4>
                    <p class="product__item__detail__sales">月售{{ item.sales }}件</p>
                    <p class="product__item__detail__price">
                        <span class="product__item__detail__price__yen">&yen;</span>{{ item.price.getValue() }}
                        <span class="product__item__detail__price__origin">&yen;{{ item.oldPrice }}</span>
                    </p>
                </div>
                <div class="product__item__number">
                    <!-- 注意！！ 这里传入的shopId不能去路由中的shopId，因为购物车中可以包含其他商店的商品。所以这里的shopId是从store.getters.getCurrentProductsInCart返回的shopId，是商品所属的商店Id -->
                    <span class="product__item__number__minus"
                        @click="() => { removeItemFromCart(item.shopId, item.id, item) }">-</span>
                    {{ item.count || 0 }}
                    <span class="product__item__number__plus"
                        @click="() => { addItemToCart(item.shopId, item.shopName, item.id, item) }">+</span>
                </div>
            </div>
        </div>
        <div class="check">
            <div class="check__icon">
                <img class="check__icon__img" src="@/assets/images/basket.svg" alt="" @click="handleCartShowChange">
                <div class="check__icon__tag">{{ totalCountInCart }}</div>
            </div>
            <div class="check__info">
                总计：<span class="check__info__price">&yen;{{ totalPriceInCart }}</span>
            </div>
            <router-link to="/">
                <div class="check__btn">
                    去结算
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

// 使用封装到CartCommon模块中的方法
import { addItemToCart, removeItemFromCart } from './CartCommon';

// 购物车相关的逻辑
const useCartEffect = () => {
    const store = useStore();

    // 将购物车总数与总价格都加入计算属性中，当其值更改时会响应到UI上
    const totalCountInCart = computed(() => store.getters.getTotalCountInCart);
    const totalPriceInCart = computed(() => store.getters.getTotalPriceInCart.getValue());

    // 获取购物车中有效的商品列表，每个商品特意添加了其所属商店的shopId。
    const productListInCart = computed(() => store.getters.getCurrentProductsInCart);

    // 购物车中的商品全部取消选中
    const toggleCheckAllProductsInCart = () => {
        if (store.getters.allProductsInCartHaveBeenChecked) {
            // uncheck all
            store.dispatch('unCheckAllProductsInCart');
        } else {
            // check all
            store.dispatch('checkAllProductsInCart');
        }
    };

    // 将所有商品从购物车移除的逻辑
    const removeAllItemsFromCart = () => {
        store.dispatch('removeAllItemsFromCart');
    };

    // 获取购物车中是否所有商品都被选中了的boolean结果
    const allProductsHaveBeenCheckedInCart = computed(() => store.getters.allProductsInCartHaveBeenChecked);

    const saveToLocalStorage = () => {
        store.dispatch('saveCartList');
    };

    return {
        totalCountInCart,
        totalPriceInCart,
        productListInCart,
        addItemToCart,
        removeItemFromCart,
        toggleCheckAllProductsInCart,
        removeAllItemsFromCart,
        allProductsHaveBeenCheckedInCart,
        saveToLocalStorage
    }
}

// 展示与隐藏购物车的逻辑
const toggleCartEffect = () => {
    // 表示是否显示购物车的页面
    const showCart = ref(false);

    // 更改购物车显示与否的状态
    const handleCartShowChange = () => {
        showCart.value = !showCart.value;
    }

    return {
        showCart,
        handleCartShowChange
    }
}

export default {
    name: 'CartPart',
    setup () {
        const {
            totalCountInCart,
            totalPriceInCart,
            productListInCart,
            addItemToCart,
            removeItemFromCart,
            toggleCheckAllProductsInCart,
            removeAllItemsFromCart,
            allProductsHaveBeenCheckedInCart,
            saveToLocalStorage
        } = useCartEffect();

        const {
            showCart,
            handleCartShowChange
        } = toggleCartEffect();

        return {
            totalCountInCart,
            totalPriceInCart,
            productListInCart,
            addItemToCart,
            removeItemFromCart,
            toggleCheckAllProductsInCart,
            removeAllItemsFromCart,
            allProductsHaveBeenCheckedInCart,
            saveToLocalStorage,
            showCart,
            handleCartShowChange
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/style/variables.scss';
@import '../../style/mixins.scss';

.mask {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0,0,0,.5);
    z-index: 1;
}

.cart {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: $bgColor;
    z-index: 2;

    // 设置购物车的最大高度是80%，超出后显示滚动条
    overflow-y: scroll;
    max-height: 80%;
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
            color: $bgColor;
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
        color: $bgColor;
        font-size: .14rem;
        text-align: center;
    }
    a {
        text-decoration: none;
    }
}
.product {
    overflow-y: scroll; // 设置内容超出所在区域后如何处理，这里设置的是显示滚动条
    flex: 1;
    background: $bgColor;
    &__header {
        display: flex;
        line-height: .52rem;
        border-bottom: 1px solid $content-bgColor;
        &__all {
            display: flex;
            width: .64rem;
            font-size: .14rem;
            flex: 1;
            margin-left: .16rem;
            color: $content-fontcolor;
        }
        &__clear {
            // flex: 1;
            margin-right: .16rem;
            text-align: right;
            font-size: .14rem;
            color: $content-fontcolor;
        }

    }
    &__item {
        position: relative;
        display: flex;
        padding: .12rem 0;
        margin: 0 .16rem;
        border-bottom: .01rem solid $content-bgColor;
        &__checked {
            line-height: .5rem;
            margin-right: .2rem;
            color: #0091FF;
            font-size: .2rem;
        }
        &__img {
            width: .46rem;
            height: .46rem;
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
                margin: .06rem 0 0 0;
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
