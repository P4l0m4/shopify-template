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
  <swiper-container
    :grabCursor="true"
    :cssMode="true"
    :pagination="{
      clickable: true,
    }"
    :mousewheel="true"
    class="mySwiper swiper"
    keyboard="true"
  >
    <swiper-slide v-for="image in productStore.product.images" :key="image.id" class="swiper__slide">
      <img :src="image.src" class="swiper__slide__img"
    /></swiper-slide>
  </swiper-container>
</template>
<style lang="scss">
.swiper {
  margin: 0;
  display: flex;
  width: clamp(100px, 100%, 600px) !important;
  --swiper-pagination-color: #{$text-color};

  &__slide {
    width: 100% !important;
    height: 230px;
    @media (min-width: $laptop-screen) {
      height: 330px;
    }

    &__img {
      padding: 0 1rem;
      width: 100%;
      height: 200px;
      object-fit: contain;
      border-radius: $radius;

      @media (min-width: $laptop-screen) {
        height: 300px;
      }
    }
  }
}
</style>
