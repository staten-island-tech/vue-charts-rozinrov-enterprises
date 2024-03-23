<template>
  <div>
    <StockDisplay :name="companyName" :ticker="companyTicker" :exchange="companyExchange" /> 
    <StockDisplay :price="realTime" />
  </div>
</template>

<script>
import StockDisplay from '@/components/StockDisplay.vue'

export default {
  data() {
    return {
      companyName: {},
      companyTicker: {},
      companyExchange: {},
      realTime: {}
    }
  },
  components: {
    StockDisplay
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const key = 'ed8fa9c810584467a3aee5573443fb41'

      const id = this.$route.params.id

      const apiCompanyInfo = `https://api.twelvedata.com/stocks?symbol=${id}&country=United States`
      const responseCompanyInfo = await fetch(apiCompanyInfo)
      const companyInfo = await responseCompanyInfo.json()
      this.companyName = companyInfo.data[0].name
      this.companyTicker = '- ' + companyInfo.data[0].symbol
      this.companyExchange = '- ' + companyInfo.data[0].exchange

      const apiRealTime = `https://api.twelvedata.com/price?symbol=${id}&apikey=${key}`
      const responseRealTime = await fetch(apiRealTime)
      const realTime = await responseRealTime.json()
      this.realTime = '$' + parseFloat(realTime.price).toFixed(2)
      console.log(this.realTime)

    }
  }
}
</script>

<style scoped>

</style>
