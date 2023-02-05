import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/HomePage.vue')
  },
  {
    path: '/shop/:id',
    name: 'shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/ShopPage.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login_page" */ '../views/login/LoginPage.vue'),
    // 每次将要跳转到此路由之前，都会调用此beforeEnter方法。
    // to: 将要跳转的页面
    // from: 从哪个页面跳转来的
    // return: 返回false或抛出Error则取消路由导航。
    beforeEnter (to, from) {
      const { isLogin } = localStorage;
      if (isLogin) {
        // 如果已经登录了，那就没必要再访问登录页面了，直接路由到home页面去。
        console.log('已经登录了，那就没必要再访问登录页面了，直接路由到home页面去');
        return { name: 'home' };
      } else {
        // 如果还没登录的，可以放行，允许其访问登录页面。
        console.log('还没登录的，可以放行，允许其访问登录页面');
      }
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register_page" */ '../views/register/RegisterPage.vue'),
    beforeEnter (to, from) {
      const { isLogin } = localStorage;
      if (isLogin) {
        // 如果已经登录了，那就没必要再访问注册页面了，直接路由到home页面去。
        console.log('已经登录了，那就没必要再访问注册页面了，直接路由到home页面去');
        return { name: 'home' };
      } else {
        // 如果还没登录的，可以放行，允许其访问登录页面。
        console.log('还没登录的，可以放行，允许其访问登录页面');
      }
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// *** 路由守卫功能 ***
// 任何路由每次跳转前都调用此方法
// to: 将要跳转的页面
// from: 从哪个页面跳转来的
// return: 返回false或抛出Error则取消路由导航。
router.beforeEach((to, from) => {
  // 从浏览器的local store中获取isLogin字段
  const { isLogin } = localStorage;
  if (isLogin || to.name === 'login' || to.name === 'register') {
    // 当已经登录了，或者是想跳转到登录或注册页面，则放行
    console.log('已经登录了，或者是想跳转到登录或注册页面，则放行');
  } else {
    // 当还没登录，也不是要去登录页面，则直接将路由转到登录页面去，要求用户先登录才能访问其他页面
    return { name: 'login' };
  }
})

export default router
