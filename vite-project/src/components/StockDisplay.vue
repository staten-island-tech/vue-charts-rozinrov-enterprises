<template>
    <div class="container">
        <h1> {{ name }} {{ ticker }} {{ exchange }}</h1>
        <h1> {{ price }} {{ funds }}</h1>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    name: String,
    ticker: String,
    exchange: String,
    price: Number,
    funds: Number
})
</script>

<style scoped>
.container {
    text-align: center;
}
</style>