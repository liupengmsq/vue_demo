<template>
    <div class="content">
        <div class="category">
            <div
                :class="{'category__item': true, 'category__item--active': currentTab === item.tab}"
                v-for="item in categories"
                :key="item.name"
                @click="handleTabClick(item.tab)">
                {{ item.name }}
            </div>
        </div>
        <div class="product">
            <div class="product__item" v-for="item in list" :key="item.id" >
                <img class="product__item__img" :src="item.imageUrl">
                <div class="product__item__detail">
                    <h4 class="product__item__detail__title">{{ item.name }}</h4>
                    <p class="product__item__detail__sales">月售{{ item.sales }}件</p>
                    <p class="product__item__detail__price">
                        <span class="product__item__detail__price__yen">&yen;</span>{{ item.price }}
                        <span class="product__item__detail__price__origin">&yen;{{ item.oldPrice }}</span>
                    </p>
                </div>
                <div class="product__item__number">
                    <span class="product__item__number__minus">-</span>
                    {{ cartList?.[shopId]?.[item.id]?.count || 0 }}
                    <span class="product__item__number__plus"
                        @click="() => { addItemToCart(shopId, item.id, item) }">+</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { get } from '../../utils/request.js';
import { getImgUrl } from '../../utils/common';

const categories = [
    {
        name: '全部商品',
        tab: 'all'
    },
    {
        name: '秒杀',
        tab: 'seckill'
    },
    {
        name: '新鲜水果',
        tab: 'fruit'
    }
];

// 切换左侧分类tab的逻辑
const useTabEffect = () => {
    // 代表用户当前选中的那个分类项, 默认是第一个分类
    const currentTab = ref(categories[0].tab);

    // 用户点击左侧分类tab后，页面传入的参数是所选的tab，
    // 此方法会将currentTab的值更改为传入的tab
    // 由于这个currentTab是响应式的对象，它更改会反映到页面端，
    // 导致css的代码'category__item--active': currentTab === item.tab 会将当前的tab高亮显示
    // 而且由于currentTab是被下面的useCurrentListEffect依赖的，而且是被getContentData依赖的
    // getContentData是在watchEffect中的，那么currentTab的值有个更改就会触发getContentData的调用
    // 而getContentData的调用会导致向后端服务器发送currentTab对应的数据请求，最终将返回的商品信息显示到右侧商品列表中
    const handleTabClick = (tab) => {
        console.log('click', tab);
        currentTab.value = tab;
    };

    return { currentTab, handleTabClick };
};

// 购物车相关的逻辑
const useCartEffect = () => {
    const store = useStore();
    // store中的数据vue会帮我们转换为reactive的类型，这里如果需要结构reactive类型的数据，就需要使用toRefs了
    const { cartList } = toRefs(store.state);
    const addItemToCart = (shopId, productId, product) => {
        console.log(shopId, productId, product);
        store.commit('addItemToCart', {
            shopId,
            productId,
            product
        });
    }
    return {
        cartList, addItemToCart
    };
}

// 从后端获取商品列表相关内容的逻辑
const useCurrentListEffect = (currentTab, shopId) => {
    const content = reactive({
        // 代表右侧商品信息的列表
        list: []
    });

    const getContentData = async () => {
        const result = await get(`/api/shop/${shopId}/products`, { tab: currentTab.value });
        if (result?.errorno === 0 && result?.data?.length) {
            for (const item of result.data) {
                item.imageUrl = getImgUrl(item.imageUrl);
            }
            content.list = result.data;
        }
    }

    // 将getContnetData方法写到watchEffect中，vue会分析此方法外部依赖，如果依赖有变化，就会重新调用此方法来获取api的数据。
    // 此getContentData依赖的就是currentTAb，只要用户选择的tab有变化就会重新调用此方法刷新数据。
    // 刷新的数据就是contenat中的list，是响应式的数据，会实时显示在界面上
    watchEffect(() => {
        getContentData();
    });

    const { list } = toRefs(content);
    return { list };
};

export default {
    name: 'ContentPart',
    setup () {
        const route = useRoute();
        const shopId = route.params.id;
        const { currentTab, handleTabClick } = useTabEffect();
        const { list } = useCurrentListEffect(currentTab, shopId);
        const { cartList, addItemToCart } = useCartEffect();

        return {
            list,
            categories,
            currentTab,
            handleTabClick,
            shopId,
            cartList,
            addItemToCart
        };
    }
}

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
