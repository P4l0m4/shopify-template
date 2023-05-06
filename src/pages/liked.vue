<script setup>
import { useLikedStore } from '@/stores/liked'

const likedStore = useLikedStore()

// META TAGS
const metaTitle = ref('Mes favoris')
const metaDescription = ref('Hero subtitle lorem ipsum dolor sit amet, consequitur sit elit.')

useHead({
  title: metaTitle,
  meta: [
    {
      name: 'description',
      content: metaDescription,
    },
  ],
})
</script>

<template>
  <section class="liked">
    <!-- <h1 class="liked__title">Vos favoris</h1> -->
    <div class="liked__products" v-if="likedStore.productsLiked.length > 0">
      <ProductCard v-for="product in likedStore.productsLiked" :product="product" />
    </div>
    <div class="liked__empty" v-else>
      <span class="cart__empty__txt">Vous n'avez pas de favoris</span>
      <nuxt-link class="button-primary" to="/shop">Commencer mon shopping</nuxt-link>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.liked {
  display: flex;
  gap: 1rem;
  width: 100vw;
  overflow-x: scroll;
  padding: 2rem 1rem;
  flex-direction: column;
  align-items: center;

  // &__title {
  //   font-weight: 200 !important;
  //   font-size: 1.5rem;
  //   padding: 0 1rem;
  //   width: 100%;
  //   display: flex;
  //   justify-content: center;
  // }

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
