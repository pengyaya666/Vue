import { createPinia, defineStore } from 'pinia'

// 创建Pinia实例
const pinia = createPinia()

// 定义用户Store（登录/退出用）
export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('adminToken') || '',
    userInfo: {}
  }),
  actions: {
    login({ token, userInfo = {} }) {
      this.token = token
      this.userInfo = userInfo
      localStorage.setItem('adminToken', token)
    },
    logout() {
      this.token = ''
      this.userInfo = {}
      localStorage.removeItem('adminToken')
    }
  }
})

export default pinia