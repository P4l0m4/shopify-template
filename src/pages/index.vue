<script setup>
import { useCartStore } from '@/stores/cart'

// Store
const cartStore = useCartStore()

cartStore.createCheckout()
</script>

<template>
  <main>
    <h1>Boutique Pokemon</h1>
    <section>
      <ProductsPropositions />
    </section>
  </main>
</template>
<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  gap: 64px;
  align-items: center;
}
</style>
