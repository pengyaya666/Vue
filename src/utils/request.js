import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建Axios实例
const service = axios.create({
  // 临时注释：Mock接口无需baseURL，后续配置.env文件后恢复
  // baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000 // 放宽超时时间，避免本地Mock超时
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 临时用localStorage存token，后续替换为Pinia
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('请求错误：', error)
    ElMessage.error('请求发送失败，请检查网络')
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 适配Mock接口：若有code则判断，无则直接返回（兼容两种格式）
    if (res.code && res.code !== 200) {
      ElMessage.error(res.msg || '操作失败')
      return Promise.reject(res)
    }
    // 移除统一成功提示，避免和业务层重复
    return res
  },
  (error) => {
    console.error('响应错误：', error)
    ElMessage.error(error.message || '服务器内部错误')
    return Promise.reject(error)
  }
)

export default service