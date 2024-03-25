<template>
  <div>
    <h1>Data Visualization Center #2</h1>
    <PieChart :chartData="portfolioData" />
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

      
      history.value.forEach(item => {
        if (portfolio[item.id]) {
          console.log(portfolio[item.id])
          portfolio[item.id] += item.quantity
          console.log(portfolio[item.id])
        } else {
          console.log(portfolio[item.id])
          portfolio[item.id] = item.quantity
          console.log(portfolio[item.id])
        }
      })

    
      const labels = Object.keys(portfolio)
      const datasets = [{
        data: Object.values(portfolio),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }]

      return { labels, datasets }
    }) 
    onMounted(() => {
      store.dispatch('loadHistory') 
    })

    return { portfolioData }
  }
}
</script>
<style>

</style>
