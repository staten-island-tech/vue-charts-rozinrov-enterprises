<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const funds = '100000'
const stock = ref('')
const router = useRouter()

function submitForm() {
  router.push({ name: 'stock-view', params: { id: stock.value } })
}
</script>

<template>
  <main>
    <h1>Rozinrov Enterprises</h1>
    <h2>${{ funds.toLocaleString('en-US') }}</h2>
    <form @submit.prevent="submitForm">
      <input v-model="stock" type="text" id="stock" name="stock" placeholder="Company Name or Ticker"/>
      <input type="submit" />
    </form>
  </main>
</template>

<style scoped>
main {
  text-align: center;
}
</style>