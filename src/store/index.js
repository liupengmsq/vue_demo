import { createStore } from 'vuex'

export default createStore({
  state: {
    // 保存购物车的数据
    cartList: {
      /*
      // 购入车第一层存放的是shop id，就是一个商店的id
      1: {
        // 购物车第二层存放的是该商店下的用户选择的商品信息，与购买的数量
        11: {
          name: '番茄250g/份 for 1-all',
          imageUrl: 'near.png',
          sales: 10,
          price: 33.6,
          oldPrice: 43.6,
          count: 2 // 购买次商品的数量
        },
        12: {

        }
      },
      2: {
        21: {

        },
        22: {

        }
      }

    */
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
