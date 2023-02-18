import { createStore } from 'vuex'

export default createStore({
  state: {
    // 保存购物车的数据
    cartList: {
      /*
      // 购入车第一层存放的是shop id，就是一个商店的id
      shopId_a: {
        // 购物车第二层存放的是该商店下的用户选择的商品信息，与购买的数量
        productId_a: {
          name: '番茄250g/份 for 1-all',
          imageUrl: 'near.png',
          sales: 10,
          price: 33.6,
          oldPrice: 43.6,
          count: 2 // 购买次商品的数量
        },
        productId_b: {
          ...
        },
        productId_c: {
          ...
        },
      },
      shopId_b: {

      },
      shopId_c: {

      },
      ...
    */
    }
  },
  getters: {
  },
  mutations: {
    // 将一件商品加入购物车的逻辑
    addItemToCart (state, payload) {
      const { shopId, productId, product } = payload;

      // 从carList中获取对应的shopInfo，
      // shopInfo表示当前这个商店中多有产品的信息
      let shopInfo = state.cartList[shopId];
      // carList中如果没有对应的shopId，就new一个新的对象
      if (!shopInfo) {
        shopInfo = {};
      }

      // 从shopInfo中获取对应的商品信息对象
      let productInfo = shopInfo[productId];
      // 如果对应商店中没有对应的产品，就将传入的product对象作为新的对象写入store中
      if (!productInfo) {
        productInfo = product;
        productInfo.count = 0;
      }

      // 将count加一
      productInfo.count += 1;

      // 设置正确的数据结构，将商店下对应的产品id映射到对应的产品对象上来
      shopInfo[productId] = productInfo;

      // 设置正确的数据结构，将购物车下对应的商店id映射到对应的店铺对象上来
      state.cartList[shopId] = shopInfo;

      console.log(state.cartList);
    }
  },
  actions: {
  },
  modules: {
  }
})
