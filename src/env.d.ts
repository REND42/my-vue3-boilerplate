/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// env.d.ts文件内进行 环境变量智能提示配置
interface ImportMetaEnv {
  VITE_APP_TITLE: string,
  VITE_APP_PORT: string,
  VITE_APP_BASE_URL: string
}