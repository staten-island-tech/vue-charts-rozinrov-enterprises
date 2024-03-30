<template>
  <div>
    <SearchForm />
    <StockDisplay :name="companyName" :ticker="companyTicker" :exchange="companyExchange" /> 
    <StockDisplay :price="realTime" :funds="funds" />
    <button @click="toggleBuy">Buy</button>
    <div v-if="buy">
      <form @submit.prevent="onSubmit">
        <input v-model="quant" type="number" min="1" id="quant" name="quant" placeholder="Quantity Purchased"/>
        <input type="submit" />
      </form>
    </div>
    <button @click="toggleSell">Sell</button>
    <div v-if="sell">
      <form @submit.prevent="onSubmit">
        <input v-model="quant" type="number" min="1" id="quant" name="quant" placeholder="Quantity Sold"/>
        <input type="submit" />
      </form>
    </div>
    <button @click="dateInterval(2024, 3, 22, '1min')">1D</button>
    <button @click="dateInterval(2024, 3, 18, '1h')">5D</button>
    <button @click="dateInterval(2023, 12, 22, '1day')">3M</button>
    <button @click="dateInterval(2023, 9, 22, '1day')">6M</button>
    <button @click="dateInterval(2024, 1, 1, '1day')">YTD</button>
    <button @click="dateInterval(2023, 3, 22, '1day')">1Y</button>
    <button @click="dateInterval(2019, 3, 22, '1week')">5Y</button>
    <button @click="dateInterval(1980, 1, 1, '1month')">Max</button>
    <HistoricalChart :chartData="chartHistory" />
  </div>
</template>

<script>
import StockDisplay from '@/components/StockDisplay.vue'
import SearchForm from '@/components/SearchForm.vue'
import HistoricalChart from '@/components/HistoricalChart.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  data() {
    return {
      companyName: {},
      companyTicker: {},
      companyExchange: {},
      realTime: {},
      funds: {},
      buy: false,
      sell: false,
      quant: 0,
      history: [],
      chartHistory: {}
    }
  },
  components: {
    StockDisplay,
    SearchForm,
    HistoricalChart
  },
  mounted() {
    this.fetchData()
    this.$watch('$route.params.id', this.fetchData, this.dateInterval)
    const historyData = localStorage.getItem('history')
    if (historyData) {
      this.history = JSON.parse(historyData)
    }
  },
  methods: {
    async fetchData() {
      const store = this.$store
      this.funds = computed(() => '- $' + store.state.funds.toLocaleString('en-US'))
      const key = 'ed8fa9c810584467a3aee5573443fb41'
      const id = this.$route.params.id
      const apiCompanyInfo = `https://api.twelvedata.com/stocks?symbol=${id}&country=United States`
      const responseCompanyInfo = await fetch(apiCompanyInfo)
      const companyInfo = await responseCompanyInfo.json()
      this.companyName = companyInfo.data[0].name
      this.companyTicker = '- ' + companyInfo.data[0].symbol
      this.companyExchange = '- ' + companyInfo.data[0].exchange

      const apiRealTime = `https://api.twelvedata.com/price?symbol=${id}&apikey=${key}`
      const responseRealTime = await fetch(apiRealTime)
      const realTime = await responseRealTime.json()
      this.realTime = '$' + parseFloat(realTime.price).toFixed(2)
    },
    async dateInterval(year, month, day, time) {
      const startYear = year
      const startMonth = month
      const startDay = day
      const timeInterval = time
      const key = 'ed8fa9c810584467a3aee5573443fb41'
      const id = this.$route.params.id.toUpperCase()

      const apiHistorical = `https://api.twelvedata.com/time_series?&interval=${timeInterval}&symbol=${id}&previous_close=true&format=JSON&start_date=${startYear}-${startMonth}-${startDay} 00:00:00&apikey=${key}`
      const responseHistorical = await fetch(apiHistorical)
      const historical = await responseHistorical.json()
      console.log(historical.values)
      let chartData = {
        labels: [],
        datasets: [
          {
            label: 'Historical Share Prices',
            data: [],
            fill: false,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
          }
        ]
      }

      historical.values.forEach(item => {
        chartData.labels.push(item.datetime)
        chartData.datasets[0].data.push(parseFloat(item.close))
      })

      chartData.labels.reverse()
      chartData.datasets[0].data.reverse()
      this.chartHistory = chartData
      console.log(this.chartHistory)
    },
    toggleBuy() {
      this.buy = !this.buy
    },
    toggleSell() {
      this.sell = !this.sell
    },
    onSubmit() {
    const total = this.quant * parseFloat(this.realTime.slice(1))
    let spendFunds = parseFloat(this.funds.trim().replace(/[^0-9.]/g, ''))

    if (this.buy) {
      if (total < spendFunds) {
        alert('Purchase successful!')
        this.$store.commit('setFunds', spendFunds - total)
        let found = false
        for (let i = 0; i < this.history.length; i++) {
          if (this.history[i].id === this.$route.params.id) {
            this.history[i].quantity += this.quant
            found = true
            break
          }
        }
        if (!found) {
          const action = { id: this.$route.params.id, quantity: this.quant }
          this.history.push(action)
        }
        this.buy = !this.buy
        console.log(this.history)
      } else {
        alert('Limited spending power...')
      }
    } else {
      for (let i = 0; i < this.history.length; i++) {
        if (this.history[i].id === this.$route.params.id && this.history[i].quantity >= this.quant) {
          alert('Sale successful!')
          this.$store.commit('setFunds', spendFunds + total)
          this.history[i].quantity -= this.quant
          console.log(this.history)
          this.sell = !this.sell
          break
        } else {i 
          alert('Error... inadequate number of shares currently owned')
        }
        }
      } 
      localStorage.setItem('history', JSON.stringify(this.history))
      const store = this.$store
      this.$store.commit('setHistory', this.history)
      console.log(store.state)
    }
  }
}
</script>

<style scoped>
div {
  text-align: center;
}
</style>
