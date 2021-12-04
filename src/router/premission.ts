import router from './index'
import { store } from "../store/index"
import { start, close } from "@/script/utils/nprogress"

router.beforeEach((to: any, from: any, next: any) => {
  start()
  if(to.meta.title) {
    document.title = String(to.meta.title)
  } else {
    document.title = 'Skylark'
  }
  if(!store.state.token) {
    // 未登录
    if(to.matched.length > 0 && !to.matched.some((record: any) => record.meta.auth)) {
      next()
    } else {
      next({path: '/login'})
    }
  } else {
    // 用户已经登录，
    if(!store.state.userInfo) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  close()
})