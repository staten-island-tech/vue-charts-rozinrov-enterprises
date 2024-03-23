<template>
    <div class="container">
        <h1> {{ name }} {{ ticker }} {{ exchange }}</h1>
        <h1> {{ price }} </h1>
    </div>
</template>

<script setup>
const props = defineProps({
    name: Object,
    ticker: Object,
    exchange: Object,
    price: Object
})
</script>

<style scoped>
.container {
    text-align: center;
}
</style>