<script setup>
import { useLikedStore } from '@/stores/liked'

const likedStore = useLikedStore()
</script>

<template>
  <section class="liked">
    <ProductCard v-for="product in likedStore.productsLiked" :product="product" />
  </section>
</template>
<style lang="scss" scoped>
.liked {
  display: grid;
  gap: 1rem;
  overflow-x: scroll;
  padding: 1rem;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
}
</style>

<!-- 
  grouper mes produits likés
  pouvoir retirer un produit de mes produits likés
-->
