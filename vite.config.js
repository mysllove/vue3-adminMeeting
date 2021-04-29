import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  alias: {
    '~': path.resolve(__dirname, './'),
    '@': path.resolve(__dirname, 'src')
  },
  server: {
    host: "0.0.0.0",
    open:true,
    port:9527,
    proxy: {
      "/dory-mrbs": {
        target: "http://192.168.3.103:8080",
        changeOrigin: true,
        secure: false,
        ws:true,
        pathRewrite: {
          "^/dory-mrbs": ""
        }
      }
    },
  }
})
