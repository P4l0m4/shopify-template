<script setup>
// import { client } from '@/services/shopify'

// const info = await client.shop.fetchInfo()
// console.log(info)
</script>

<template>
  <section class="index-section">
    <HeaderComponent />
    <p class="title">Nos best sellers</p>
    <ProductsPropositions />
    <!-- <GeneralReviews /> -->
  </section>
</template>
<style scoped lang="scss">
.index-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.tm-title {
  font-weight: 200 !important;
}
</style>
