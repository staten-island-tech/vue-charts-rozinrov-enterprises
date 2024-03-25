<template>
  <div>
    <h1>Portfolio</h1>
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
      console.log(portfolio)

      
      history.value.forEach(item => {
        if (portfolio[item.id]) {
          portfolio[item.id] += item.quantity
        } else {
          portfolio[item.id] = item.quantity
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