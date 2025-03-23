import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 根据需要配置，比如：
    port: 5173,
    // 如果你的后端在本地其他端口，可以开启下面的代理
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 后端地址
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  // 构建配置
  build: {
    outDir: 'dist'
  }
})
