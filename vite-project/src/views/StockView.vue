<template>
  <main class="background">
    <div class="fade-in margin">
  <nav>
          <a><RouterLink to="/home">Home</RouterLink></a>
          <a><RouterLink to="/history">History</RouterLink></a>
          <a><RouterLink to="/data2">Data Center #2</RouterLink></a>
          <a><RouterLink to="/">Sign In</RouterLink></a>
          <a><RouterLink to="/register">Register</RouterLink></a>
          <button id="logout" @click="handleSignOut" v-if="isLoggedIn">Logout</button>
        </nav>
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
    </div>
  </main>
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
      const id = this.$route.params.id.toUpperCase()
      console.log(id)
      const apiCompanyInfo = `https://api.twelvedata.com/stocks?symbol=${id.toUpperCase()}&country=United States`
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
    const currentDate = new Date()
    const total = this.quant * parseFloat(this.realTime.slice(1))
    let spendFunds = parseFloat(this.funds.trim().replace(/[^0-9.]/g, ''))

    if (this.buy) {
      const purchaseDate = currentDate.toLocaleString()
      if (total < spendFunds) {
        alert('Purchase successful!')
        this.$store.commit('setFunds', spendFunds - total)
        let found = false
        for (let i = 0; i < this.history.length; i++) {
          if (this.history[i].id === this.$route.params.id.toUpperCase()) {
            this.history[i].quantity += this.quant
            this.history[i].date = purchaseDate
            found = true
            break
          }
        }
        if (!found) {
          const action = { id: this.$route.params.id.toUpperCase(), quantity: this.quant, date: purchaseDate }
          this.history.push(action)
        }
        this.buy = !this.buy
        console.log(this.history)
      } else {
        alert('Limited spending power...')
      }
    }  else if (this.sell) {
      for (let i = 0; i < this.history.length; i++) {
        if (this.history[i].id === this.$route.params.id && this.history[i].quantity >= this.quant) {
          alert('Sale successful!')
          this.$store.commit('setFunds', spendFunds + total)
          this.history[i].quantity -= this.quant
          this.history[i].date = currentDate.toLocaleString()
          if (this.history[i].quantity === 0) {
          this.history.splice(i, 1)
        }
          console.log(this.history)
          this.sell = !this.sell
          break
        } else {
          if (i === this.history.length - 1) {
            alert('Error... inadequate number of shares currently owned')
        }}
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
@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

main {
  text-align: center;  
  font-family: 'Kanit';
  color:white;
}

.background {
  background: lightblue;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

h1, h2 {
  font-size: 56px;
  font-family: 'Kanit';
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.margin {
  margin-top: 15px;
}

.fade-in {
  animation: fade-in 1s ease-in-out forwards;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

a {
  font-size: 22px;
  color: white;
  text-decoration: none;
  transition: all 0.45s;
  margin-right: 30px;

}

a:hover {
  background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEi%0D%0AIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhs%0D%0AaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB3aWR0%0D%0AaD0iMzkwcHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDM5MCA1MCIgZW5hYmxlLWJhY2tn%0D%0Acm91bmQ9Im5ldyAwIDAgMzkwIDUwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHBhdGggZmlsbD0i%0D%0Abm9uZSIgc3Ryb2tlPSIjZDk0ZjVjIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLW1pdGVybGlt%0D%0AaXQ9IjEwIiBkPSJNMCw0Ny41ODVjMCwwLDk3LjUsMCwxMzAsMAoJYzEzLjc1LDAsMjguNzQtMzgu%0D%0ANzc4LDQ2LjE2OC0xOS40MTZDMTkyLjY2OSw0Ni41LDI0My42MDMsNDcuNTg1LDI2MCw0Ny41ODVj%0D%0AMzEuODIxLDAsMTMwLDAsMTMwLDAiLz4KPC9zdmc+Cg==");
  animation: line 3s;
  color: #d94f5c;
}

@keyframes line {
  0% {
    background-position-x: 490px;
  }
}
</style>
