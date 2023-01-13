import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css' // 添加normalize css的功能
import './style/base.scss' // 导入本项目的基本css
import './style/iconfont.css' // 导入字体图标css

createApp(App).use(store).use(router).mount('#app')
