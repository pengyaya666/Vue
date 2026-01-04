import { defineStore } from 'pinia'

// 定义并导出用户Store
export const useUserStore = defineStore('user', {
  // 状态：存储token和用户信息
  state: () => ({
    token: localStorage.getItem('adminToken') || '',
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}
  }),
  // 操作：修改状态的方法
  actions: {
    // 登录：存储token和用户信息（同步到localStorage）
    login(userData) {
      this.token = userData.token
      this.userInfo = userData.userInfo
      // 持久化存储，避免页面刷新丢失
      localStorage.setItem('adminToken', this.token)
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
    },
    // 退出登录：清空状态和本地存储
    logout() {
      this.token = ''
      this.userInfo = {}
      localStorage.removeItem('adminToken')
      localStorage.removeItem('userInfo')
    }
  }
})