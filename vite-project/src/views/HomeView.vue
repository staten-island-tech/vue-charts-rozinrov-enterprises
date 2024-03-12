<script setup>
async function fetchData() {
  const key = 'ed8fa9c810584467a3aee5573443fb41'
  const api = `https://api.twelvedata.com/time_series?symbol=AAPL&interval=1min&apikey=${key}`
  const response = await fetch(api)
  const data = await response.json()
  console.log(data)
}

fetchData()
</script>

<template>
  <main>
    <h1>Rozinrov</h1>
  </main>
</template>

<style scoped>

</style>
