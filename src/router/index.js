import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/Index.vue' // 后续创建的布局组件

// 静态路由（所有用户都能访问：登录页、404页）
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Index.vue'), // 懒加载
    hidden: true // 侧边栏不显示该路由
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/dashboard', // 重定向到首页
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/Index.vue'),
        meta: {
          title: '首页仪表盘', // 侧边栏显示的标题
          icon: 'HomeFilled' // 侧边栏图标（Element Plus图标）
        }
      }
    ]
  },
  // 404页面
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/404/Index.vue'),
    hidden: true
  }
]

// 动态路由（需要权限控制：用户管理、角色管理等，后续补充）
export const asyncRoutes = [
  {
    path: '/user',
    name: 'User',
    component: Layout,
    meta: {
      title: '用户管理',
      icon: 'User'
    },
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/views/user/Index.vue'),
        meta: {
          title: '用户列表'
        }
      }
    ]
  },
  {
    path: '/role',
    name: 'Role',
    component: Layout,
    meta: {
      title: '角色管理',
      icon: 'UserFilled'
    },
    children: [
      {
        path: 'list',
        name: 'RoleList',
        component: () => import('@/views/role/Index.vue'),
        meta: {
          title: '角色列表'
        }
      }
    ]
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes // 先只加载静态路由
})

// 路由守卫（登录拦截：未登录无法访问后台页面，后续完善）
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('adminToken')
  // 访问登录页：已登录则重定向到首页，未登录则放行
  if (to.path === '/login') {
    if (token) {
      next('/dashboard')
    } else {
      next()
    }
  } else {
    // 访问其他页面：未登录则重定向到登录页，已登录则放行
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router