import Mock from 'mockjs'
import userMock from './user'

// 正确导出Mock初始化方法
export function setupMockServer() {
  // 挂载用户相关Mock接口
  userMock(Mock)
}