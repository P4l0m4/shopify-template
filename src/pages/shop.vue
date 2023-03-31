<script setup>
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/product'

// Store
const cartStore = useCartStore()
const productStore = useProductStore()

cartStore.createCheckout()
</script>
<template>
  <section class="shop">
    <SearchBar />
    <SearchResults
      v-if="productStore.searchQuery"
      :products="productStore.productsSearched"
      :query="productStore.searchQuery"
    />

    <AllProducts />
  </section>
</template>
<style lang="scss" scoped>
.shop {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
}
</style>
