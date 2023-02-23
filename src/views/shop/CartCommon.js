import store from '@/store';

// 将当前的商店中的商品加入到购物车中
export const addItemToCart = (shopId, shopName, productId, product) => {
    console.log(shopId, productId, product);
    store.dispatch('addItemToCart', {
        shopId,
        shopName,
        productId,
        product
    });
}

// 将当前的商店中的商品从购物车移除
export const removeItemFromCart = (shopId, productId, product) => {
    console.log(shopId, productId, product);

    // 先获取当前选中的商品在购物车中的数量
    // 如果数量currentProductCount大于0，说明当前商品在购物车中，可以继续调用removeItemFromCart将商品从购物车移除。
    // 如果数量currentProductCount等于0，说明当前商品就不在购物车中，不需要继续后面的操作了。
    store.dispatch('getProductCountInCart', {
        shopId,
        productId,
        product
    }).then(currentProductCount => {
        console.log('currentProductCount: ', currentProductCount);
        if (currentProductCount > 0) {
            store.dispatch('removeItemFromCart', {
                shopId,
                productId,
                product
            });
        }
    });
}
