<template>
  <div class="user-container">
    <el-card>
      <!-- 搜索表单 -->
      <el-form :model="searchForm" inline class="search-form">
        <el-form-item label="用户名">
          <el-input v-model="searchForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="searchForm.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUserList">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 新增按钮 -->
      <el-button type="primary" @click="handleAdd" class="add-btn">新增用户</el-button>

      <!-- 用户表格 -->
      <el-table :data="userList" border stripe style="width: 100%; margin-top: 20px" v-loading="loading">
        <el-table-column prop="id" label="ID" width="80" align="center" />
        <el-table-column prop="name" label="用户名" align="center" />
        <el-table-column prop="age" label="年龄" width="80" align="center" />
        <el-table-column prop="phone" label="手机号" align="center" />
        <el-table-column prop="email" label="邮箱" align="center" />
        <el-table-column prop="createTime" label="创建时间" align="center" />
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" danger @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
        style="margin-top: 20px; text-align: right"
      >
      </el-pagination>
    </el-card>

    <!-- 新增/编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form
        ref="userFormRef"
        :model="userForm"
        :rules="userRules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="userForm.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="userForm.age" type="number" placeholder="请输入年龄" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userForm.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" placeholder="请输入邮箱" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUserListApi } from '@/api/user'
import { ElMessage } from 'element-plus'

// 加载状态
const loading = ref(false)
// 搜索表单
const searchForm = ref({
  username: '',
  phone: ''
})
// 用户列表
const userList = ref([])
// 分页信息
const pageInfo = ref({
  pageNum: 1,
  pageSize: 10,
  total: 0
})
// 弹窗相关
const dialogVisible = ref(false)
const dialogTitle = ref('新增用户')
const userFormRef = ref(null)
// 用户表单
const userForm = ref({
  id: '',
  name: '',
  age: '',
  phone: '',
  email: ''
})
// 表单校验规则
const userRules = ref({
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  age: [{ required: true, message: '请输入年龄', trigger: 'blur', type: 'number' }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ]
})

// 获取用户列表
const getUserList = async () => {
  loading.value = true
  try {
    const res = await getUserListApi({
      ...searchForm.value,
      pageNum: pageInfo.value.pageNum,
      pageSize: pageInfo.value.pageSize
    })
    userList.value = res.data.list
    pageInfo.value.total = res.data.total
  } catch (error) {
    ElMessage.error('获取用户列表失败')
    console.error('获取用户列表错误：', error)
  } finally {
    loading.value = false
  }
}

// 重置搜索
const resetSearch = () => {
  searchForm.value = {
    username: '',
    phone: ''
  }
  getUserList()
}

// 页码改变
const handleCurrentChange = (val) => {
  pageInfo.value.pageNum = val
  getUserList()
}

// 每页条数改变
const handleSizeChange = (val) => {
  pageInfo.value.pageSize = val
  pageInfo.value.pageNum = 1
  getUserList()
}

// 新增用户
const handleAdd = () => {
  dialogTitle.value = '新增用户'
  // 重置表单
  userForm.value = {
    id: '',
    name: '',
    age: '',
    phone: '',
    email: ''
  }
  dialogVisible.value = true
}

// 编辑用户
const handleEdit = (row) => {
  dialogTitle.value = '编辑用户'
  // 回显数据
  userForm.value = { ...row }
  dialogVisible.value = true
}

// 删除用户
const handleDelete = (row) => {
  ElMessage.success(`删除用户【${row.name}】成功（Mock数据，未真实删除）`)
  // 重新获取用户列表
  getUserList()
}

// 提交表单（新增/编辑）
const handleSubmit = async () => {
  if (!userFormRef.value) return
  await userFormRef.value.validate(async (valid) => {
    if (valid) {
      // 模拟提交（后续对接真实接口）
      ElMessage.success(`${dialogTitle.value}成功`)
      dialogVisible.value = false
      // 重新获取用户列表
      getUserList()
    }
  })
}

// 组件挂载后获取用户列表
onMounted(() => {
  getUserList()
})
</script>

<style scoped>
.user-container {
  width: 100%;
  height: 100%;
}

.search-form {
  margin-bottom: 20px;
}

.add-btn {
  margin-bottom: 20px;
}
</style>