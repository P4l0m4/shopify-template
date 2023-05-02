<script setup>
import { ref } from 'vue'
import { useProductStore } from '@/stores/product'

// Routing
const route = useRoute()
const collectionSlug = route.params.slug

// Store
const productStore = useProductStore()
productStore.getCollectionsAndProducts()
const collections = productStore.collections
const products = ref([])

collections.forEach(collection => {
  if (collection.handle === collectionSlug) {
    products.value.push(...collection.products)
    console.log(products.value)
  }
})
</script>
<template>
  <section class="collection">
    <div class="collection__products">
      <ProductCard v-for="product in products" :product="product" />
    </div>
  </section>
</template>
<style lang="scss" scoped>
.collection {
  display: flex;
  gap: 1rem;
  width: 100vw;
  overflow-x: scroll;
  padding: 2rem 1rem;
  flex-direction: column;
  align-items: center;

  &__products {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    @media (min-width: $tablet-screen) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: $laptop-screen) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media (min-width: $desktop-screen) {
      grid-template-columns: repeat(5, 1fr);
    }
    @media (min-width: $super-big-screen) {
      grid-template-columns: repeat(6, 1fr);
    }
  }
}
</style>
