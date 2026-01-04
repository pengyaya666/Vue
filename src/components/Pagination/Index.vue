<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pageNum"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    v-bind="$attrs"
  >
  </el-pagination>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// 定义props
const props = defineProps({
  pageNum: {
    type: Number,
    required: true,
    default: 1
  },
  pageSize: {
    type: Number,
    required: true,
    default: 10
  },
  total: {
    type: Number,
    required: true,
    default: 0
  }
})

// 定义事件
const emits = defineEmits(['size-change', 'current-change'])

// 每页条数改变
const handleSizeChange = (val) => {
  emits('size-change', val)
}

// 页码改变
const handleCurrentChange = (val) => {
  emits('current-change', val)
}
</script>

<style scoped></style>