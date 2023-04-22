<script setup>
import { useProductStore } from '@/stores/product'
import { ref } from 'vue'

// Store
const productStore = useProductStore()

productStore.getCollectionsAndProducts()

let selectedCollections = ref([])

// const filteredProducts = computed(() => {
//   if (selectedCollections.value.length > 0) {
//     return productStore.collections.reduce((products, collection) => {
//       if (selectedCollections.value.includes(collection.handle)) {
//         products.push(...collection.products)
//       }
//       return products
//     }, [])
//   }
//   return productStore.productsSearched
// })

const filteredProducts = computed(() => {
  if (selectedCollections.value.length > 0) {
    const collectionsProducts = productStore.collections.reduce((products, collection) => {
      if (selectedCollections.value.includes(collection.handle)) {
        products.push(...collection.products)
      }
      return products
    }, [])

    return productStore.productsSearched.filter(product => {
      return collectionsProducts.find(cProduct => cProduct.id === product.id)
    })
  }
  return productStore.productsSearched
})

async function searchProducts(query) {
  await productStore.searchProducts(query)
}

function filterProducts(collections) {
  selectedCollections.value = collections
}

const displayOverlay = ref(false)

function toggleOverlay() {
  displayOverlay.value = !displayOverlay.value
}

function applyFilter(filter) {
  productStore.applyFilter(filter)
}
</script>
<template>
  <section class="shop">
    <SearchBar @search="searchProducts" @toggleOverlay="toggleOverlay" />

    <SearchAdditionalCriteria
      v-show="displayOverlay"
      @closeOverlay="toggleOverlay"
      @filter="applyFilter"
      :collections="productStore.collections"
      @collectionSelected="filterProducts"
    />
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
