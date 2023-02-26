import { createStore } from 'vuex';
import BigDecimal from 'js-big-decimal';

// 将购物车持久化到浏览器的localStorage中
const saveCartListToLocalStorage = (state) => {
  const { cartList } = state;
  const cartListString = JSON.stringify(cartList);
  localStorage.cartList = cartListString;
}

// 从浏览器的localStorage中获取购物车数据
const getCartListFromLocalStorage = () => {
  if (localStorage.cartList) {
    return JSON.parse(localStorage.cartList);
  }
  return {};
}

export default createStore({
  state: {
    // 保存购物车的数据
    cartList: getCartListFromLocalStorage()
      /*
      // 购入车第一层存放的是shop id，就是一个商店的id
      shopId_a: {
        shopName: '沃尔玛',
        // 购物车第二层存放的是该商店下的用户选择的商品信息，与购买的数量
        productList: {
          productId_a: {
            name: '番茄250g/份 for 1-all',
            imageUrl: 'near.png',
            sales: 10,
            price: 33.6,
            oldPrice: 43.6,
            count: 2, // 购买次商品的数量
            check: true //是否在购物车中被选中
          },
          productId_b: {
            ...
          },
          productId_c: {
            ...
          },
        }
      },
      shopId_b: {

      },
      shopId_c: {

      },
      ...
    */
  },
  getters: {
    // 获取购物车中的商品数量
    getTotalCountInCart (state, getters) {
      const currentPrudcts = getters.getCurrentProductsInCart;
      let total = 0;
      currentPrudcts.forEach(product => {
        if (product.checked) {
          total += product.count;
        }
      });
      return total;
    },

    // 购物车中的总价格，使用外部库的BigDecimal来计算小数
    getTotalPriceInCart (state, getters) {
      const currentPrudcts = getters.getCurrentProductsInCart;
      let total = new BigDecimal(0);
      currentPrudcts.forEach(product => {
        if (product.checked) {
          console.log('In getTotalPriceInCart:', product);
          console.log('In getTotalPriceInCart - product.price:', product.price);
          total = total.add(new BigDecimal(product.price).multiply(new BigDecimal(product.count)));
        }
      });
      return total;
    },

    // 获取在购物车中所有产品的count不是0的产品列表
    // 也就是当前购物车中有效的product lsit
    getCurrentProductsInCart (state) {
      console.log('current cart list: ', state.cartList);
      const productInCart = [];

      // 获取所有的shopId，并进行循环
      const shopIdList = Object.keys(state.cartList);
      shopIdList.forEach((shopId, index) => {
        // 取得每个shopId对应的商品列表
        console.log(`shopId=${shopId}: ${state.cartList[shopId]}`);
        const shopInfo = state.cartList[shopId];
        const shopName = shopInfo.shopName;
        const productIdList = Object.keys(shopInfo.productList);
        console.log('productIdList: ', productIdList);

        // 循环每个商品列表中的商品
        productIdList.forEach((productId, index) => {
          console.log(`productId=${productId}: ${shopInfo.productList[productId]}`);
          const productInfo = shopInfo.productList[productId];

          // 这里需要把当前商品所属的shopId带上，因为在购物车里的商品列表不能通过路由获取shopId，因为它指的
          // 是当前页面的商店Id，而购物车中的商品不一定属于此商店。
          productInfo.shopId = shopId;
          productInfo.shopName = shopName;

          console.log('productInfo: ', productInfo);

          // 如果商品在购物车中的数量大于0，就加入结果中
          if (productInfo.count > 0) {
            productInCart.push(productInfo);
          }
        })
      })
      return productInCart;
    },

    allProductsInCartHaveBeenChecked (state, getters) {
      const currentPrudcts = getters.getCurrentProductsInCart;
      let allChecked = true;

      // 注意这里的array#forEach里面如果写了return会被忽略掉：
      // because array#forEach simply does not care for the return value of its worker
      // function. It just executes the worker function for each array element.
      currentPrudcts.forEach(product => {
        if (!product.checked) {
          console.log('allProductsInCartHaveBeenChecked', product, false);
          allChecked = false;
        }
      });
      console.log('allProductsInCartHaveBeenChecked', allChecked);
      return allChecked;
    }
  },
  mutations: {
    // 将一件商品加入购物车的逻辑
    addItemToCart (state, payload) {
      const { shopId, shopName, productId, product } = payload;

      console.log(shopId, shopName, productId, product);
      console.log('current cart list before adding new: ', state.cartList);

      // 从carList中获取对应的shopInfo，
      // shopInfo表示当前这个商店中多有产品的信息
      let shopInfo = state.cartList[shopId];
      // carList中如果没有对应的shopId，就new一个新的对象
      if (!shopInfo) {
        shopInfo = {};
        shopInfo.shopName = shopName;
        shopInfo.productList = {};
      }

      // 从shopInfo中获取对应的商品信息对象
      let productInfo = shopInfo.productList[productId];
      // 如果对应商店中没有对应的产品，就将传入的product对象作为新的对象写入store中
      if (!productInfo) {
        productInfo = product;
        productInfo.count = 0;
      }

      // 将count加一
      productInfo.count += 1;

      // checked表示在购物车计算时是否计算在内，默认是true
      productInfo.checked = true;

      // 设置正确的数据结构，将商店下对应的产品id映射到对应的产品对象上来
      shopInfo.productList[productId] = productInfo;

      // 设置正确的数据结构，将购物车下对应的商店id映射到对应的店铺对象上来
      state.cartList[shopId] = shopInfo;

      console.log(state.cartList);
      saveCartListToLocalStorage(state);
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

      const productInfo = shopInfo.productList[productId];
      // 商店下的商品信息没在store中，说明该商品从来没加入过，所以不用继续执行了，直接退出即可
      if (!productInfo) {
        console.log('找不到对应的productId');
        return;
      }

      // 只在count大于0的时候将count减一，防止出现负数
      if (productInfo.count > 0) {
        productInfo.count -= 1;
      }
      saveCartListToLocalStorage(state);
    },

    // 将所有商品从购物车移除的逻辑
    removeAllItemsFromCart (state, { getters }) {
      const currentPrudcts = getters.getCurrentProductsInCart;
      currentPrudcts.forEach(product => {
        product.count = 0;
      });
      saveCartListToLocalStorage(state);
    },

    // 购物车中的商品全部选中
    checkAllFromChart (state, { getters }) {
      const currentPrudcts = getters.getCurrentProductsInCart;
      currentPrudcts.forEach(product => {
        product.checked = true;
      });
      saveCartListToLocalStorage(state);
    },
    // 购物车中的商品全部取消选中
    unCheckAllFromChart (state, { getters }) {
      const currentPrudcts = getters.getCurrentProductsInCart;
      currentPrudcts.forEach(product => {
        product.checked = false;
      });
      saveCartListToLocalStorage(state);
    }
  },
  actions: {
    // 将一件商品加入购物车的逻辑
    addItemToCart ({ commit }, payload) {
      commit('addItemToCart', payload);
    },

    // 将一件商品从购物车移除的逻辑
    removeItemFromCart ({ commit }, payload) {
      commit('removeItemFromCart', payload);
    },

    // 将所有商品从购物车移除的逻辑
    removeAllItemsFromCart ({ commit, getters }) {
      commit('removeAllItemsFromCart', { getters });
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

      const productInfo = shopInfo.productList[productId];
      // 商店下的商品信息没在store中，说明该商品从来没加入过，所以不用继续执行了，直接退出即可
      if (!productInfo) {
        console.log('找不到对应的productId');
        return 0;
      }
      return productInfo.count;
    },

    // 购物车中的商品全部选中
    checkAllProductsInCart ({ commit, getters }) {
      commit('checkAllFromChart', { getters });
    },

    // 购物车中的商品全部取消选中
    unCheckAllProductsInCart ({ commit, getters }) {
      commit('unCheckAllFromChart', { getters });
    },

    // 将购物车当前的数据持久化到浏览器的localstorage中
    saveCartList ({ state }) {
      saveCartListToLocalStorage(state);
    }
  },
  modules: {
  }
})
