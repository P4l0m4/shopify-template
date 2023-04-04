<script setup>
import { useLikedStore } from '@/stores/liked'

const likedStore = useLikedStore()

const props = defineProps({ product: Object })
</script>

<template>
  <nuxt-link :to="`/product/${product.handle}`" :key="product.id" class="product-card">
    <img class="product-card__img" :src="product.images[0].src" />

    <div class="product-card__txt">
      <h3 class="product-card__txt__title">
        {{ product.title }}
      </h3>
      <div class="product-card__txt__price">
        <span class="product-card__txt__price__amount"> {{ product.variants[0].price.amount }} €</span>
        <button class="product-card__txt__price__button" @click.prevent="likedStore.addProductToLiked(product)">
          <img
            v-if="likedStore.isProductLiked(product)"
            class="product-card__txt__price__button__icon"
            src="@/assets/icons/heart-light-solid.svg"
            alt=""
          />
          <img v-else class="product-card__txt__price__button__icon" src="@/assets/icons/heart-light.svg" alt="" />
        </button>
      </div>
    </div>
  </nuxt-link>
</template>
<style scoped lang="scss">
.product-card {
  display: flex;
  background-color: $primary-color;
  border-radius: $radius;
  box-shadow: $shadow;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  padding: 1rem;
  min-width: 146px;
  animation: slide-from-left 0.6s;

  &__img {
    object-fit: contain;
    width: 100%;
    height: 180px;
    border-radius: $radius;
  }

  &__txt {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &__title {
      height: 1.75rem;
      overflow: hidden;
      font-size: 0.75rem;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      font-weight: 300;
    }
    &__price {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &__amount {
        font-size: 1rem;
        font-weight: 800;
      }
      &__button {
        display: flex;
        border: 2px solid transparent;
        justify-content: flex-end;
        animation: slide-from-left 0.6s;

        &__icon {
          width: 24px;
          background-color: $text-color;
          border-radius: $radius;
          padding: 0.2rem;
        }
      }
    }
  }
}
</style>
