<template>
    <div class="container">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>
  
  <script>
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
  import { Pie } from 'vue-chartjs'
  
  ChartJS.register(ArcElement, Tooltip, Legend)
  export default {
  name: 'PieChart',
  components: { Pie },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped>
.container {
    width: 2000px;
    height: 600px;
    margin: auto;
    justify-content: center;
    display: flex;
}
</style>