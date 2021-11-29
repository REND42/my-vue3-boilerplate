import { createApp } from 'vue'
import ElementPlus, { ElNotification } from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from "@element-plus/icons";
// import { Edit, Share } from "@element-plus/icons"
import { start, close } from "@/script/utils/nprogress";
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

// 设置路由导航，修改浏览器标题
// router.beforeEach((to, from, next) => {
//   start()
//   // console.log(to, from)
//   if(to.meta.title) {
//     document.title = String(to.meta.title)
//   } else {
//     document.title = 'Skylark'
//   }
//   // 路由出错处理
//   if(to.matched.length === 0 && !to.name) {
//     console.log('无效路由')
//     ElNotification({
//       title: '错误错误',
//       message: `【${to.fullPath}】找不到对应页面，请切换到首页`,
//       type: 'error',
//       duration: 3000
//     })
//     // router.push('/home')
//   }
//   next()
// })

// router.afterEach(() => {
//   close()
// })