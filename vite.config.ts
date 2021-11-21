import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vitejs.dev/config/
export default({command, mode}) => {
  return defineConfig({
    plugins: [vue()],
    // 服务器配置
    server: {
      host: '0.0.0.0',
      // port: 3001,
      port: Number(loadEnv(mode, process.cwd()).VITE_APP_PORT),
      strictPort: true,  // 端口被占用直接退出
      https: false,
      open: true,        // 在开发服务器启动时自动在浏览器中打开应用
      // 代理配置
      cors: true,
      proxy: {
        '^/api': {
          target: loadEnv(mode, process.cwd()).VITE_APP_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      hmr: {
        overlay: true  // 屏蔽服务器报错
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        // 引入var.scss
        scss: {
          additionalData: '@import "@/assets/styles/global.scss";'
        }
      }
    },
    // 分块打包配置
    build: {
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if(id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
    }
  })
}  

