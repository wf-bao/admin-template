import { createApp } from 'vue'
import './style.css'
import '@/assets/fonts/iconfont'
import App from './App.vue'
import router from './router'
import SvgIcon from '@/components/SvgIcon.vue'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import store from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.component('SvgIcon', SvgIcon)
app.use(store)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')