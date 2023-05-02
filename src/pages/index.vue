<script setup>
// import { client } from '@/services/shopify'

// const info = await client.shop.fetchInfo()
// console.log(JSON.parse(JSON.stringify(info)))
import { useProductStore } from '@/stores/product'
const productStore = useProductStore()
productStore.getCollectionsAndProducts()
</script>

<template>
  <section class="index-section">
    <HeaderComponent />
    <p class="title">Nos collections exclusives</p>
    <CollectionsGallery :collections="productStore.collections" />
    <p class="title">Nos best sellers</p>
    <ProductsPropositions />
    <!-- <GeneralReviews /> -->
  </section>
</template>
<style scoped lang="scss">
.index-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.title {
  font-weight: 200 !important;
}
</style>
