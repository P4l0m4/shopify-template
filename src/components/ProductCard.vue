<script setup>
import { useLikedStore } from '@/stores/liked'
import { PRODUCT_PATH } from '@/config/url'
import { ref } from 'vue'

const likedStore = useLikedStore()

const props = defineProps({ product: Object })

const promotion = ref()

Object.values(props.product).forEach(element => {
  let i = 0
  if (
    props.product.variants[i].compareAtPrice.amount > props.product.variants[i].price.amount &&
    props.product.variants[i].compareAtPrice.amount != null
  ) {
    promotion.value =
      100 -
      parseFloat(props.product.variants[i].price.amount / props.product.variants[i].compareAtPrice.amount).toFixed(2) *
        100
  }
  i++
})
</script>

<template>
  <nuxt-link :to="`/${PRODUCT_PATH}${product.handle}`" :key="product.id" class="product-card">
    <span v-if="promotion" class="product-card__promotion">- {{ promotion }}%</span>
    <img class="product-card__img" :src="product.images[0].src" :alt="product.handle" />

    <div class="product-card__txt">
      <h3 class="product-card__txt__title">
        {{ product.title }}
      </h3>
      <div class="product-card__txt__price">
        <span class="product-card__txt__price__amount">
          {{ parseFloat(product.variants[0].price.amount).toFixed(2) }} €</span
        >
        <button class="product-card__txt__price__button" @click.prevent="likedStore.addProductToLiked(product)">
          <img
            v-if="likedStore.isProductLiked(product)"
            class="product-card__txt__price__button__icon"
            :class="{ 'product-card__txt__price__button__icon--selected': likedStore.isProductLiked(product) }"
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
  animation: fading 0.4s ease;
  position: relative;

  &__promotion {
    display: flex;
    justify-content: center;
    padding: 0.25rem 0.5rem;
    border-radius: $radius;
    background-color: $selected-background-color;
    color: $selected-color-darker;
    border: 2px solid $selected-color-darker;
    position: absolute;
    right: 1rem;
    top: 1rem;
  }

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
    width: 100%;

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
        cursor: pointer;

        &__icon {
          width: 24px;
          background-color: $text-color;
          border-radius: $radius;
          padding: 0.2rem;

          &--selected {
            background-color: $selected-background-color-darker;
          }
        }
      }
    }
  }
}
</style>
