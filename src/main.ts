import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "@/assets/styles/body.scss";
import * as ElIcons from "@element-plus/icons";
import App from './App.vue'
import { key, store } from './store'
import router from './router'
import './router/premission'

const app = createApp(App)

// 批量注入icon图标组件
Object.keys(ElIcons).forEach(key => {
  app.component(key, ElIcons[key])
})

app.use(ElementPlus)
app.use(store, key)
app.use(router)
app.mount('#app')