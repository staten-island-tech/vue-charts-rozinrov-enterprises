<template>
  <div>
    #turn into for loop
    <StockDisplay :stock="companyInfo" /> 
    <StockDisplay :price="realTime.price" />
  </div>
</template>

<script>
import StockDisplay from '@/components/StockDisplay.vue'

export default {
  data() {
    return {
      companyInfo: {},
      realTime: {}
    }
  },
  components: {
    StockDisplay // Ensure StockDisplay is registered here
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
      this.companyInfo = companyInfo.data[0].name
      console.log(this.companyInfo)

      const apiRealTime = `https://api.twelvedata.com/price?symbol=${id}&apikey=${key}`
      const responseRealTime = await fetch(apiRealTime)
      const realTime = await responseRealTime.json()
      this.realTime = realTime
      console.log(this.realTime)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
