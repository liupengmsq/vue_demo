<template>
    <div class="wrapper_order">
        <Top />
        <ProductList />
    </div>
    <Order />
</template>

<script>
import TopPart from './TopPart.vue'
import ProductList from './ProductList.vue'
import OrderTotal from './OrderTotal.vue'

export default {
    name: 'OrderConfirm',
    components: {
        Top: TopPart,
        ProductList: ProductList,
        Order: OrderTotal
    }
}
</script>

<css lang="scss" scoped>
.wrapper_order {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0.5rem;
    background-color: #EEE;
}
</css>
