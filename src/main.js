import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css' // 添加normalize css的功能
import './style/index.scss'

createApp(App).use(store).use(router).mount('#app')
