<template>
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
</template>

<script>
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
    setup () {
        // 左上角的后退按钮
        const { handleBackClick } = useBackRouterEffect();
        return { handleBackClick }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
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
        color: $bgColor;
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
        background: $bgColor;
        border-radius: .04rem;
        &__title {
            padding: .16rem 0 .14rem .16rem;
            font-size: .16rem;
            color: $content-fontcolor;
        }
        &__address {
            line-height: .2rem;
            padding: 0 .4rem 0 .16rem;
            font-size: .14rem;
            color: $content-fontcolor;
        }
        &__info {
            padding: .06rem 0 0 .16rem;
            &__name {
                margin-right: .16rem;
                line-height: .18rem;
                font-size: .12rem;
                color: $medium-fontColor;
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

</style>
