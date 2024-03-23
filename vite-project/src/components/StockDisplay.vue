<template>
    <div class="container">
        <h1> {{ stock }} </h1>
        <h2> ${{ price }} </h2>
    </div>
</template>

<script setup>
const props = defineProps({
    stock: Object,
    price: Object
})
</script>

<style lang="scss" scoped>

</style>