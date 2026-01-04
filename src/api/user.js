import request from '@/utils/request'

// 登录接口
export const loginApi = (data) => {
  return request({
    url: '/api/user/login', 
    method: 'post',
    data
  })
}

// 获取用户列表接口
export const getUserListApi = (params) => {
  return request({
    url: '/api/user/list', 
    method: 'get',
    params
  })
}