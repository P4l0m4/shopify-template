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
    <HeaderComponent />
    <p class="title">Nos best sellers</p>
    <ProductsPropositions />
  </section>
</template>
<style scoped lang="scss">
.index-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
