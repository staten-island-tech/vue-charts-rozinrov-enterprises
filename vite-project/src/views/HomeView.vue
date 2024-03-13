<script setup>
import { ref } from 'vue'

const funds = '100000'
const stock = ref('')

async function fetchData() {
  const key = 'ed8fa9c810584467a3aee5573443fb41'

  console.log(stock.value)

  const apiStockList = 'https://api.twelvedata.com/stocks'
  const responseStockList = await fetch(apiStockList)
  const stockList = await responseStockList.json()
  //console.log(stockList.data)

  const apiRealTime = `https://api.twelvedata.com/price?symbol=${stock.value}&apikey=${key}`
  const responseRealTime = await fetch(apiRealTime)
  const realTime = await responseRealTime.json()
  console.log(realTime.price)

  //const apiTimeSeries = `https://api.twelvedata.com/time_series?symbol=AAPL&interval=1min&apikey=${key}`
  //const responseTimeSeries = await fetch(apiTimeSeries)
  //const timeSeries = await responseTimeSeries.json()
  //console.log(timeSeries)
}

fetchData()
</script>

<template>
  <main>
    <h1>Rozinrov</h1>
    <h2>${{ funds.toLocaleString('en-US') }}</h2>
    <form @submit.prevent="fetchData()">
      <input v-model="stock" type="text" id="stock" name="stock" placeholder="Company Name or Ticker"/>
      <input type="submit" />
    </form>
  </main>
</template>

<style scoped>
</style>
