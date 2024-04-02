<template>
  <div class="container">
    <Line v-if="chartData && chartData.labels && chartData.datasets" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

export default {
  name: 'LineChart',
  components: { Line },
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

.container { color:white}
</style>