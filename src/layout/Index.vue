<template>
  <div class="layout-container">
    <!-- 侧边栏 -->
    <el-aside width="200px" class="layout-aside">
      <el-menu
        default-active="/dashboard"
        class="layout-menu"
        router
        background-color="#2e3b4e"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <!-- 遍历静态路由，渲染侧边栏菜单（后续优化为动态遍历） -->
        <el-menu-item index="/dashboard">
          <el-icon><HomeFilled /></el-icon>
          <template #title>首页仪表盘</template>
        </el-menu-item>
        <el-sub-menu index="/user">
          <template #title>
            <el-icon><User /></el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/user/list">用户列表</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/role">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>角色管理</span>
          </template>
          <el-menu-item index="/role/list">角色列表</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <!-- 主内容区（头部 + 内容） -->
    <el-container class="layout-main">
      <!-- 头部 -->
      <el-header class="layout-header">
        <div class="header-left">Vue3-Admin-Pro 企业后台管理系统</div>
        <div class="header-right">
          <span>欢迎，{{ userStore.getUserName }}</span>
          <el-button type="text" @click="handleLogout">退出登录</el-button>
        </div>
      </el-header>
      <!-- 内容区域 -->
      <el-main class="layout-content">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { useUserStore } from '@/pinia'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

// 获取用户Store和路由实例
const userStore = useUserStore()
const router = useRouter()

// 退出登录
const handleLogout = () => {
  userStore.logout()
  ElMessage.success('退出登录成功')
  router.push('/login')
}
</script>

<style scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  display: flex;
}

.layout-aside {
  height: 100vh;
  background-color: #2e3b4e;
}

.layout-menu {
  height: 100%;
  border-right: none;
}

.layout-main {
  flex: 1;
  height: 100vh;
  overflow: hidden;
}

.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  padding: 0 20px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.layout-content {
  padding: 20px;
  height: calc(100vh - 60px);
  overflow-y: auto;
  background-color: #f5f5f5;
}
</style>