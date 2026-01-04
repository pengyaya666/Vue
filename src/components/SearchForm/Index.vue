<template>
  <el-form :model="formData" inline class="search-form" v-bind="$attrs">
    <slot />
    <el-form-item>
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

// 定义props
const props = defineProps({
  initForm: {
    type: Object,
    required: false,
    default: () => ({})
  }
})

// 定义事件
const emits = defineEmits(['search', 'reset'])

// 表单数据
const formData = ref({ ...props.initForm })

// 监听初始表单变化
watch(
  () => props.initForm,
  (newVal) => {
    formData.value = { ...newVal }
  },
  { deep: true }
)

// 查询
const handleSearch = () => {
  emits('search', { ...formData.value })
}

// 重置
const handleReset = () => {
  formData.value = { ...props.initForm }
  emits('reset', { ...formData.value })
}

// 暴露表单数据（供父组件修改）
defineExpose({
  formData
})
</script>

<style scoped>
.search-form {
  margin-bottom: 20px;
}
</style>