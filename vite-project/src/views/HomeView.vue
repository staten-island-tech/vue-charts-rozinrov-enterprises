<template>
  <main>
    <h1>Rozinrov Enterprises</h1>
    <h2>${{ funds.toLocaleString('en-US') }}</h2>
    <SearchForm :router="router" />
  </main>
</template>

<script setup>
import SearchForm from '@/components/SearchForm.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const funds = computed(() => store.state.funds)
const router = useRouter()

</script>

<style scoped>
main {
  text-align: center;
}
</style>
