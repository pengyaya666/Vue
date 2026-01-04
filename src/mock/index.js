// src/mock/index.js - 适配vite-plugin-mock最新版的写法
// 移除旧的 createProdMockServer 导入（新版已不支持）
// 直接简化mock注册逻辑，适配开发环境即可

// 导入mock接口文件
import userMock from './user.js'

// 新版vite-plugin-mock会自动扫描mockPath下的文件，无需手动注册prod mock
// 只需保证mock接口文件格式正确，插件会自动加载
export default function setupMock() {
  // 开发环境下插件已通过vite.config.js的配置自动加载mock，此处留空即可
}