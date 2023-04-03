<script setup>
import { useCartStore } from '@/stores/cart'

// Store
const cartStore = useCartStore()

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
