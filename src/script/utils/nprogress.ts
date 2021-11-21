import NProgress from "nprogress"
import 'nprogress/nprogress.css'

NProgress.configure({
  easing: 'ease',      // 动画模式
  speed: 1000,         // 递增进度条的速度
  showSpinner: false,  // 是否显示加载ico
  trickleSpeed: 200,   // 自动递增间隔
  minimum: 0.3         // 初始化时的最小百分比
})

export const start = () => {
  NProgress.start()
}

export const close = () => {
  NProgress.done()
}