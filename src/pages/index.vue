<script setup>
import { useCartStore } from '@/stores/cart'

// Store
const cartStore = useCartStore()

cartStore.createCheckout()
</script>

<template>
  <section class="index-section">
    <div class="title">
      <h1>Boutique Pokemon</h1>
      <AnimationsAnimalComponent />
    </div>
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
    gap: 32px;
    align-items: center;
    justify-content: center;

    @media (min-width: $tablet-screen) {
      flex-direction: row;
    }
  }
}
</style>
