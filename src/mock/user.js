export default function userMock(Mock) {
  Mock.mock('/api/user/login', 'post', (req) => {
    const { username, password } = JSON.parse(req.body)
    if (username === 'admin' && password === '123456') {
      return {
        code: 200,
        msg: '登录成功',
        data: {
          token: Mock.Random.guid(),
          userInfo: {
            id: Mock.Random.id(),
            name: '管理员',
            role: 'admin'
          }
        }
      }
    } else {
      return {
        code: 500,
        msg: '用户名或密码错误',
        data: null
      }
    }
  })
}