<script setup>
import { useLikedStore } from '@/stores/liked'

const likedStore = useLikedStore()
</script>

<template>
  <section class="liked">
    <div class="liked__products" v-if="likedStore.productsLiked.length > 0">
      <ProductCard v-for="product in likedStore.productsLiked" :product="product" />
    </div>
    <div class="liked__empty" v-else>
      <span class="cart__empty__txt">Votre panier est vide</span>
      <nuxt-link class="button-primary" to="/shop">Commencer mon shopping</nuxt-link>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.liked {
  display: flex;
  flex-direction: column;
  padding: 2rem;

  &__products {
    display: grid;
    gap: 1rem;
    overflow-x: scroll;
    grid-template-columns: repeat(2, 1fr);
    place-items: center;
  }

  &__empty {
    padding: 1rem;
    background-color: $primary-color;
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-direction: column;
    border-radius: $radius;
  }
}
</style>
