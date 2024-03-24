<template>
<form @submit.prevent="submitForm">
    <input v-model="stock" type="text" id="stock" name="stock" placeholder="Company Name or Ticker"/>
    <input type="submit" />
</form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const stock = ref('')
const router = useRouter()

const submitForm = () => {
    router.push({ name: 'stock-view', params: { id: stock.value } })
}
</script>

<style scoped>
form {
    text-align: center;
}
</style>
