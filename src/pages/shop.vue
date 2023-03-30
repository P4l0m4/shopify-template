<script setup>
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/product'

// Store
const cartStore = useCartStore()
const productStore = useProductStore()

cartStore.createCheckout()
</script>
<template>
  <div>
    <SearchBar />
    <SearchResults
      v-if="productStore.searchQuery"
      :products="productStore.productsSearched"
      :query="productStore.searchQuery"
    />
  </div>
</template>
