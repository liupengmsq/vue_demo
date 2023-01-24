import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/home/HomePage.vue'
import LoginPage from '../views/login/LoginPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    // 每次将要跳转到此路由之前，都会调用此beforeEnter方法。
    // to: 将要跳转的页面
    // from: 从哪个页面跳转来的
    // next: 调用next()表示允许跳转。调用 next({name: 'aaa'}) 表示跳转到aaa上去。
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage;
      if (isLogin) {
        // 如果已经登录了，那就没必要再访问登录页面了，直接路由到home页面去。
        next({ name: 'home' });
      } else {
        // 如果还没登录的，可以放行，允许其访问登录页面。
        next();
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
// next: 调用next()表示允许跳转。调用 next({name: 'aaa'}) 表示跳转到aaa上去。
router.beforeEach((to, from, next) => {
  // 从浏览器的local store中获取isLogin字段
  const { isLogin } = localStorage;
  if (isLogin || to.name === 'login') {
    // 当已经登录了，或者是想跳转到登录页面，则放行
    next();
  } else {
    // 当还没登录，也不是要去登录页面，则直接将路由转到登录页面去，要求用户先登录才能访问其他页面
    next({ name: 'login' });
  }
})

export default router
