<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <!-- 数据卡片 -->
      <el-col :span="6" v-for="item in cardList" :key="item.id">
        <el-card class="data-card">
          <div class="card-title">{{ item.title }}</div>
          <div class="card-value">{{ item.value }}</div>
          <div class="card-desc" :style="{ color: item.trend > 0 ? '#67c23a' : '#f56c6c' }">
            <el-icon v-if="item.trend > 0"><ArrowUp /></el-icon>
            <el-icon v-else><ArrowDown /></el-icon>
            {{ Math.abs(item.trend) }}% 同比
          </div>
        </el-card>
      </el-col>
      <!-- 图表区域 -->
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="chart-title">用户访问量统计</div>
          </template>
          <div id="visitChart" class="chart-container"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="chart-title">业务数据占比</div>
          </template>
          <div id="businessChart" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import echarts from 'echarts'

// 数据卡片列表
const cardList = ref([
  { id: 1, title: '今日访问量', value: '12,345', trend: 12.5 },
  { id: 2, title: '今日新增用户', value: '368', trend: 8.2 },
  { id: 3, title: '今日订单数', value: '892', trend: -3.1 },
  { id: 4, title: '今日销售额', value: '¥56,789', trend: 18.9 }
])

// 初始化访问量图表
const initVisitChart = () => {
  const chartDom = document.getElementById('visitChart')
  const myChart = echarts.init(chartDom)
  const option = {
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'line',
        smooth: true,
        itemStyle: {
          color: '#409EFF'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(64, 158, 255, 0.6)' },
              { offset: 1, color: 'rgba(64, 158, 255, 0.1)' }
            ]
          }
        }
      }
    ],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    }
  }
  myChart.setOption(option)
  // 窗口大小变化时重绘图表
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}

// 初始化业务数据图表
const initBusinessChart = () => {
  const chartDom = document.getElementById('businessChart')
  const myChart = echarts.init(chartDom)
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '0%',
      left: 'center'
    },
    series: [
      {
        name: '业务占比',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 335, name: '用户管理' },
          { value: 310, name: '角色管理' },
          { value: 234, name: '菜单管理' },
          { value: 135, name: '数据统计' },
          { value: 1548, name: '其他业务' }
        ]
      }
    ]
  }
  myChart.setOption(option)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}

// 组件挂载后初始化图表
onMounted(() => {
  initVisitChart()
  initBusinessChart()
})
</script>

<style scoped>
.dashboard-container {
  width: 100%;
  height: 100%;
}

.data-card {
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.card-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.card-desc {
  font-size: 12px;
}

.chart-card {
  height: 300px;
  margin-top: 20px;
}

.chart-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.chart-container {
  width: 100%;
  height: 240px;
}
</style>