// src/mock/user.js - 正确的默认导出
export default [
  {
    url: '/api/user/login',
    method: 'post',
    response: ({ body }) => {
      if (body.username === 'admin' && body.password === '123456') {
        return { code: 200, msg: '登录成功', data: { token: 'admin-token-123' } }
      }
      return { code: 500, msg: '账号或密码错误' }
    }
  }
]