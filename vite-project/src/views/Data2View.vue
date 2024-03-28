<template>
  <div>
    <h1>Data Visualization Center #2</h1>
    <PieChart :chartData="portfolioData" :chartOptions="chartOptions" />
  </div>
</template>

<script>
import PieChart from '@/components/PiePortfolio.vue'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'


export default {
  name: 'PortfolioView',
  components: { PieChart },
  setup() {
    const store = useStore()

    
    const history = computed(() => store.state.history)

    
    const portfolioData = computed(() => {
      const portfolio = {}
      let totalShares = 0 
      
      history.value.forEach(item => {
        totalShares += item.quantity
      })

      history.value.forEach(item => {
        if (portfolio[item.id]) {
          portfolio[item.id].shares += item.quantity
        } else {
          portfolio[item.id] = { shares: item.quantity }
        }
        portfolio[item.id].percentage = (portfolio[item.id].shares / totalShares) * 100
      })

    
      const labels = Object.keys(portfolio)
      const datasets = [{
        data: Object.values(portfolio).map(item => item.shares),
        percentages: Object.values(portfolio).map(item => item.percentage),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }]
      return {labels, datasets}
    }) 

    return { portfolioData }
  }
}
</script>
<style>

</style>
