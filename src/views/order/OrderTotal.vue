<template>
    <div class="order">
        <div class="order__price">实付金额 <b>&yen; {{ totalPriceInCart }}</b></div>
        <div class="order__btn" @click="handleShowOrderDialog" >提交订单</div>
    </div>
    <div v-if="showOrderDialog" class="mask">
        <div class="mask__content">
            <div class="mask__content__title">确认提交订单</div>
            <p class="mask__content__desc">请尽快完成支付</p>
            <div class="mask__content__btns">
                <div class="mask__content__btns__btn mask__content__btns__btn--first" @click="handleDismissOrderDialog">取消订单</div>
                <div class="mask__content__btns__btn mask__content__btns__btn--last" @click="handleConfirmOrder">确认支付</div>
            </div>
        </div>
    </div>
    <Toast v-if="show" :message="toastMessage" />
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { post } from '../../utils/request';
import ToastComponent, { useToastEffect } from '../../components/ToastComponent.vue'

// 控制是否显示订单确认对话框
const useOrderConfirmDialogEffect = () => {
    const showOrderDialog = ref(false);
    const handleShowOrderDialog = () => {
        showOrderDialog.value = true;
    }
    const handleDismissOrderDialog = () => {
        showOrderDialog.value = false;
    }

    return {
        showOrderDialog,
        handleShowOrderDialog,
        handleDismissOrderDialog
    }
}

// 发送订单信息到后端接口
const sendOrderInfoToBackendEffect = (showToast) => {
    const store = useStore();
    const router = useRouter();

    // 此方法用于产生发给后端的payload对象
    const generatePayloadForOrder = () => {
        const productWithShopInfoList = store.getters.getFilteredProductsWithShopInfo;

        // 设置payload的初始值
        const orderPayload = {
            addressId: 123,
            isCanceled: false,
            shopOrders: []
        };

        // 从购物车的getter方法getFilteredProductsWithShopInfo中获取order后端API所需的数据
        const shopIds = Object.keys(productWithShopInfoList);
        shopIds.forEach((shopId, index) => {
            const shopOrder = {};
            shopOrder.shopId = shopId;
            shopOrder.shopName = productWithShopInfoList[shopId].shopName;
            shopOrder.productList = productWithShopInfoList[shopId].productList;
            orderPayload.shopOrders.push(shopOrder);
        })
        return orderPayload;
    }

    // 确认订单后将订单信息发送给后端服务区，并清空当前的购物车
    const handleConfirmOrder = async () => {
        const payLoadForOrder = generatePayloadForOrder();
        try {
            const result = await post('/api/order', payLoadForOrder);
            if (result?.errorno === 0) {
                // 订单提交成功后，清空购物车
                store.dispatch('removeAllItemsFromCart')
                router.push({ name: 'home' });
            } else {
                showToast('订单结算失败');
            }
        } catch (e) {
            showToast('订单结算请求失败');
        }
    }
    return { handleConfirmOrder };
}

export default {
    components: {
        Toast: ToastComponent
    },
    setup () {
        // 控制显示或隐藏订单确认对话框
        const { showOrderDialog, handleShowOrderDialog, handleDismissOrderDialog } = useOrderConfirmDialogEffect();

        // 获取所有商店中商品的总价
        const store = useStore();
        const totalPriceInCart = computed(() => store.getters.getTotalPriceInCart.getValue());

        // 发送订单信息到后端服务器
        const { show, toastMessage, showToast } = useToastEffect();
        const { handleConfirmOrder } = sendOrderInfoToBackendEffect(showToast);

        return {
            totalPriceInCart,
            handleConfirmOrder,
            show,
            toastMessage,
            showToast,
            showOrderDialog,
            handleShowOrderDialog,
            handleDismissOrderDialog
        }
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

.mask {
    // 设置整个对话框外的蒙层效果
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.50);
    &__content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 3rem;
        height: 1.56rem;
        background: #FFF;
        border-radius: .04rem;;
        &__title {
            margin: .24rem 0 0 0;
            line-height: .26rem;
            font-size: .18rem;;
            color: #333;
            text-align: center;
        }
        &__desc {
            margin: .08rem 0 0 0;
            font-size: .14rem;;
            color: #666;
            text-align: center;
        }
        &__btns {
            display: flex;
            margin: .24rem .58rem;
            &__btn {
                flex: 1;
                width: .8rem;
                line-height: .32rem;
                border-radius: .16rem;
                text-align: center;
                &--first {
                    margin-right: .12rem;
                    border: .01rem solid #4FB0F9;
                    color: #4FB0F9;
                }
                &--last {
                    margin-left: .12rem;
                    background-color: #4FB0F9;
                    color: #FFF;
                }
            }
        }
    }
}

</style>
