<script setup>
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/product'

// Store
const cartStore = useCartStore()
const productStore = useProductStore()

cartStore.createCheckout()
productStore.getCollectionsAndProducts()

let selectedCollections = ref([])

const filteredProducts = computed(() => {
  if (selectedCollections.value.length > 0) {
    return productStore.collections.reduce((products, collection) => {
      if (selectedCollections.value.includes(collection.handle)) {
        products.push(...collection.products)
      }
      return products
    }, [])
  }
  return productStore.productsSearched
})

async function searchProducts(query) {
  await productStore.searchProducts(query)
}

function filterProducts(collections) {
  selectedCollections.value = collections
}
</script>
<template>
  <section class="shop">
    <SearchBar @search="searchProducts" />
    <SearchSortComponent :collections="productStore.collections" @collectionSelected="filterProducts" />
    <SearchResults :products="filteredProducts" :query="productStore.searchQuery" />
  </section>
</template>
<style lang="scss" scoped>
.shop {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
  align-items: center;
}
</style>
