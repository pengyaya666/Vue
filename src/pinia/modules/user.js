import { defineStore } from 'pinia'

// 定义用户Store
export const useUserStore = defineStore('user', {
  // 状态：存储用户信息、token等
  state: () => ({
    token: localStorage.getItem('adminToken') || '',
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}
  }),
  // 计算属性：派生状态
  getters: {
    // 获取用户姓名
    getUserName: (state) => state.userInfo.name || '',
    // 获取用户角色
    getUserRole: (state) => state.userInfo.role || ''
  },
  // 方法：修改状态（支持异步）
  actions: {
    // 登录：存储token和用户信息
    login(data) {
      this.token = data.token
      this.userInfo = data.userInfo
      // 持久化存储（防止页面刷新丢失）
      localStorage.setItem('adminToken', data.token)
      localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
    },
    // 退出登录：清除状态和本地存储
    logout() {
      this.token = ''
      this.userInfo = {}
      localStorage.removeItem('adminToken')
      localStorage.removeItem('userInfo')
    }
  }
})