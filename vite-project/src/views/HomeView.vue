<script setup>
const funds = '100000'

async function fetchData() {
  const key = 'ed8fa9c810584467a3aee5573443fb41'

  const apiStockList = 'https://api.twelvedata.com/stocks'
  const responseStockList = await fetch(apiStockList)
  const stockList = await responseStockList.json()
  console.log(stockList.data)

  const apiTimeSeries = `https://api.twelvedata.com/time_series?symbol=AAPL&interval=1min&apikey=${key}`
  const responseTimeSeries = await fetch(apiTimeSeries)
  const timeSeries = await responseTimeSeries.json()
  //console.log(timeSeries)
}

fetchData()
</script>

<template>
  <main>
    <h1>Rozinrov</h1>
    <h2>${{ funds.toLocaleString('en-US') }}</h2>
    <input type="text" id="stock" name="stock" placeholder="Company Name or Ticker"/>
  </main>
</template>

<style scoped>
</style>
