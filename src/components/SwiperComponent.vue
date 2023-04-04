<script setup>
import { client } from '@/services/shopify'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'

// Routing
const route = useRoute()
const productSlug = route.params.slug

// Store
const productStore = useProductStore()
const cartStore = useCartStore()

const loading = ref(false)
// const updatingCart = ref(false)

loading.value = true
const clientProduct = await client.product.fetchByHandle(productSlug)
productStore.setProduct(clientProduct)
cartStore.createCheckout()
loading.value = false
</script>

<template>
  <swiper-container :navigation="true" :pagination="true" class="swiper">
    <swiper-slide v-for="image in productStore.product.images" :key="image.id" class="swiper__slide">
      <img :src="image.src" class="swiper__slide__img"
    /></swiper-slide>
  </swiper-container>
</template>
<style lang="scss" scoped>
.swiper {
  margin: 0;
  display: flex;
  width: clamp(100px, 100%, 600px) !important;

  &__slide {
    width: 100% !important;

    &__img {
      padding: 0 1rem;
      width: 100%;
      height: 230px;
      object-fit: contain;
      border-radius: $radius;

      @media (min-width: $laptop-screen) {
        height: 320px;
      }
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: white !important;
    background-color: white !important;
  }

  .swiper-pagination-bullet-active {
    color: white !important;
    background-color: white !important;
  }
}
</style>
