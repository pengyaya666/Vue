import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig({
  plugins: [
    vue(),
    // 修改/补充该Mock配置
    viteMockServe({
      mockPath: 'src/mock', // Mock文件目录
      enable: true, // 开启Mock服务
      logger: true, // 打印Mock请求日志
      supportTs: false, // 新增：关键配置，解决Mock解析报错
      watchFiles: true, // 监听Mock文件变化，自动重载
      injectCode: `
        import { setupMockServer } from './mock/index.js';
        setupMockServer();
      ` // 新增：强制注入Mock初始化代码，避免延迟
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // 路径别名
    }
  },
  server: {
    port: 5173,
    open: true,
    cors: true
  },
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia', 'axios'],
          elementPlus: ['element-plus'],
          echarts: ['echarts']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})