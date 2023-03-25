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
      <h1>Boutique Pokemon</h1>
      <AnimationsAnimalComponent />
    </div>
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
  gap: 64px;
  align-items: center;

  & .title {
    display: flex;
    flex-direction: column;
    gap: 64px;
    align-items: center;
    justify-content: center;

    @media (min-width: $tablet-screen) {
      flex-direction: row;
      gap: 32px;
    }
  }
}
</style>
