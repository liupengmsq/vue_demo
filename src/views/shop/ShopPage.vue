<template>
    <div class="wrapper">
        <div class="search">
            <div class="search__back iconfont" @click="handleBackClick">&#xe697;</div>
            <div class="search__content">
                <span class="search__content__icon iconfont">&#xe6ac;</span>
                <input class="search__content__input" placeholder="请输入商品名称" />
            </div>
        </div>
        <!-- 为了防止当网速慢的时候图片没加载出来，在页面上显示一个红叉，这里使用v-show控制，只当图片加载完成后才显示整个的shopinfo组建 -->
        <ShopInfo :item="item" :showBorder="false" v-show="item.imageUrl" />
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImgUrl } from '../../utils/common';
import { get } from '../../utils/request';
import ShopInfo from '@/components/ShopInfo.vue';

const useShopInfoEffect = () => {
    const route = useRoute();
    const data = reactive({
        item: {}
    });
    const getItemData = async () => {
        // 使用路由对象route获取传入组件的路由路径中id参数的值
        const result = await get(`/api/shop/${route.params.id}`);
        console.log(result);
        if (result?.errorno === 0 && result?.data !== null) {
            result.data.imageUrl = getImgUrl(result.data.imageUrl);
            console.log(result);
            data.item = result.data;
        }
    }

    const { item } = toRefs(data);
    return { item, getItemData };
};

const useBackRouterEffect = () => {
    const router = useRouter();
    // 点击后退按钮返回主页
    const handleBackClick = () => {
        router.back();
    };

    return { handleBackClick };
}

export default {
    name: 'ShopDetail',
    components: { ShopInfo },
    setup () {
        const { item, getItemData } = useShopInfoEffect();
        const { handleBackClick } = useBackRouterEffect();

        getItemData();

        return { item, handleBackClick };
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.wrapper {
    padding: 0 .18rem;
}

.search {
    display: flex;
    margin: .2rem 0 .16rem 0;
    line-height: .32rem;
    &__back {
        width: .3rem;
        font-size: .24rem;
        color: #B6B6B6;
    }
    &__content {
        display: flex;
        flex: 1;
        background: $search-bgColor;
        border-radius: .16rem;
        &__icon {
            width: .44rem;
            text-align: center;
            color: $search-fontColor;
        }
        &__input {
            display: block;
            width: 100%;
            padding-right: .2rem;
            border: none;
            outline: none;
            background: none;
            height: .32rem;
            color: $content-fontcolor;
            font-size: .14rem;
            &::placeholder {
                color: $content-fontcolor;
            }
        }
    }
}
</style>
