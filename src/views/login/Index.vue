<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">Vue3 企业后台管理系统</h2>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-width="80px"
        class="login-form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item class="login-btn-item">
          <el-button type="primary" @click="handleLogin" class="login-btn"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/pinia'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { loginApi } from '@/api/user' // 后续创建接口

// 表单引用
const loginFormRef = ref(null)
// 路由实例
const router = useRouter()
// 用户Store
const userStore = useUserStore()

// 登录表单数据
const loginForm = ref({
  username: 'admin', // 测试用户名
  password: '123456' // 测试密码
})

// 表单校验规则
const loginRules = ref({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

// 登录处理
const handleLogin = async () => {
  // 表单校验
  if (!loginFormRef.value) return
  await loginFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        // 调用登录接口（后续对接Mock）
        const res = await loginApi(loginForm.value)
        // 存储用户信息和token
        userStore.login({
          token: res.data.token,
          userInfo: res.data.userInfo
        })
        // 跳转到首页
        router.push('/dashboard')
        ElMessage.success('登录成功')
      } catch (error) {
        ElMessage.error('登录失败，请检查用户名或密码')
        console.error('登录错误：', error)
      }
    }
  })
}
</script>

<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

.login-card {
  width: 400px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
  color: #1989fa;
}

.login-form {
  margin-top: 20px;
}

.login-btn-item {
  text-align: center;
  margin-top: 10px;
}

.login-btn {
  width: 100%;
}
</style>