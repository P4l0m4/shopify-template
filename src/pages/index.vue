<script setup>
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/product'

// Store
const cartStore = useCartStore()
const productStore = useProductStore()

cartStore.createCheckout()
</script>

<template>
  <section class="index-section">
    <div class="title">
      <AnimationsAnimalComponent />
      <h1>Boutique Pokemon</h1>
    </div>
    <SearchBar />
    <SearchResults
      v-if="productStore.searchQuery"
      :products="productStore.productsSearched"
      :query="productStore.searchQuery"
    />

    <div>
      <ProductsPropositions />
    </div>
  </section>
</template>
<style scoped lang="scss">
.index-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}
</style>
