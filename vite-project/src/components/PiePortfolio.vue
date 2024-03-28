<template>
    <div class="container">
    <Pie :data="chartData" :options="chartOptions" />
    <ul>
      <li v-for="(data, index) in chartData.datasets[0].data" :key="index">
        {{ data }} 
      </li>
    </ul>
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
      default: () => ({tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const dataset = data.datasets[tooltipItem.datasetIndex];
              const total = dataset.data.reduce((acc, value) => acc + value, 0)
              const value = dataset.data[tooltipItem.index]
              const percentage = ((value / total) * 100).toFixed(2)
              return `${value} Shares (${percentage}%)`
            }
          }}
    }),
    
  }
}}

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