import router from './index'
import { store } from "../store/index"
import { start, close } from "@/script/utils/nprogress"


async function getUserInfo() {
  let userInfo = await getUserInfo()
  console.log(777, userInfo)
  store.commit('SET_USERINFO', userInfo)
}


router.beforeEach((to: any, from: any, next: any) => {
  start()
  // console.log('tooooooooo', Object.keys(store.state.userInfo).length)
  // if(Object.keys(store.state.userInfo).length = 0) {
  //   getUserInfo()
  // }
  if(to.meta.title) {
    document.title = String(to.meta.title)
  } else {
    document.title = 'Skylark'
  }
  // console.log('tooooo', store.state.token)
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