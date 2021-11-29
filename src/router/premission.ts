import router from './index'
import { store } from "../store/index"

router.beforeEach((to, from, next) => {
  if(!store.state.token) {
    // 未登录
    if(to.matched.length > 0 && !to.matched.some(record => record.meta.auth)) {
      next()
    } else {
      next({path: '/login'})
    }
  } else {
    // 用户已经登录， 
    next()
  }
})