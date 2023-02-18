import { createStore } from 'vuex';
import BigDecimal from 'js-big-decimal';

export default createStore({
  state: {
    // 购物车中的总价格，使用外部库的BigDecimal来计算小树
    cartTotalPrice: new BigDecimal(0),

    // 购物车中的商品数量
    cartTotalCount: 0,

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
    // 获取购物车中的商品数量
    getTotalCountInCart (state) {
      return state.cartTotalCount;
    },

    // 获取购物车商品的总价
    getTotalPriceInCart (state) {
      return state.cartTotalPrice;
    }
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
    },

    // 将一件商品从购物车移除的逻辑
    removeItemFromCart (state, payload) {
      const { shopId, productId } = payload;

      const shopInfo = state.cartList[shopId];
      // 商店信息没在store中，说明从来没加入过，所以不用继续执行了，直接退出即可
      if (!shopInfo) {
        console.log('找不到对应的shopId');
        return;
      }

      const productInfo = shopInfo[productId];
      // 商店下的商品信息没在store中，说明该商品从来没加入过，所以不用继续执行了，直接退出即可
      if (!productInfo) {
        console.log('找不到对应的productId');
        return;
      }

      // 只在count大于0的时候将count减一，防止出现负数
      if (productInfo.count > 0) {
        productInfo.count -= 1;
      }
    },

    // 增加购物车的数量
    increaseCountInCart (state) {
      state.cartTotalCount += 1;
    },

    // 增加购物车的总价
    increateTotalPricesInCart (state, newPrice) {
      state.cartTotalPrice = state.cartTotalPrice.add(newPrice);
    },

    // 减少购物车的数量
    decreaseCountInCart (state) {
      if (state.cartTotalCount > 0) {
        state.cartTotalCount -= 1;
      }
    },

    // 减少购物车的总价
    decreateTotalPricesInCart (state, newPrice) {
      if (state.cartTotalPrice.subtract(newPrice).getValue() > 0) {
        state.cartTotalPrice = state.cartTotalPrice.subtract(newPrice);
      } else {
        state.cartTotalPrice = new BigDecimal(0);
      }
      console.log('state.cartTotalPrice)', state.cartTotalPrice);
    }

  },
  actions: {
    // 将一件商品加入购物车的逻辑
    addItemToCart ({ commit }, payload) {
      commit('addItemToCart', payload);
      commit('increaseCountInCart');
      commit('increateTotalPricesInCart', payload.product.price);
    },

    // 将一件商品从购物车移除的逻辑
    removeItemFromCart ({ commit }, payload) {
      commit('removeItemFromCart', payload);
      commit('decreaseCountInCart');
      commit('decreateTotalPricesInCart', payload.product.price);
    },

    // 返回对应商店的商品在购物车的数量
    getProductCountInCart ({ state }, payload) {
      const { shopId, productId } = payload;

      const shopInfo = state.cartList[shopId];
      // 商店信息没在store中，说明从来没加入过，所以不用继续执行了，直接退出即可
      if (!shopInfo) {
        console.log('找不到对应的shopId');
        return 0;
      }

      const productInfo = shopInfo[productId];
      // 商店下的商品信息没在store中，说明该商品从来没加入过，所以不用继续执行了，直接退出即可
      if (!productInfo) {
        console.log('找不到对应的productId');
        return 0;
      }
      return productInfo.count;
    }
  },
  modules: {
  }
})
