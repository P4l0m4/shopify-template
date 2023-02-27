<script setup>
import { client } from '@/services/shopify'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import { ref } from 'vue'

// Routing
const route = useRoute()
const productSlug = route.params.slug

// Store
const productStore = useProductStore()
const cartStore = useCartStore()

const loading = ref(false)
const updatingCart = ref(false)

loading.value = true
const clientProduct = await client.product.fetchByHandle(productSlug)
productStore.setProduct(clientProduct)
cartStore.createCheckout()
loading.value = false

// Check if user already have a checkout
const checkoutId = cartStore.checkoutId

if (checkoutId) {
  const checkout = await client.checkout.fetch(checkoutId)
  cartStore.setCheckout(checkout)
} else {
  const checkout = await client.checkout.create()
  cartStore.setCheckout(checkout)
}

async function updateCart(variant) {
  this.updatingCart = true
  await cartStore.addProductToCart(variant)
  this.updatingCart = false
}
</script>

<template>
  <div class="container">
    <section class="product" v-if="!loading">
      <swiper-container :navigation="true" :pagination="true" class="swiper">
        <swiper-slide v-for="image in productStore.product.images" :key="image.id" class="swiper__slide">
          <img :src="image.src" class="swiper__slide__img"
        /></swiper-slide>
      </swiper-container>
      <div class="product__details">
        <div class="product__details__txt">
          <h1 class="product__details__txt__title">{{ productStore.product.title }}</h1>
          <p class="product__details__txt__description">{{ productStore.product.description }}</p>
        </div>
        <div class="product__details__variants">
          <div
            v-for="variant in productStore.product.variants"
            :key="variant.id"
            class="product__details__variants__variant"
            :class="{ 'product__details__variants__variant--selected': productStore.productVariant.id === variant.id }"
            @click="productStore.setProductVariant(variant)"
          >
            <img :src="variant.image.src" class="product__details__variants__variant__img" />
            <p class="product__details__variants__variant__title">{{ variant.title }}</p>
          </div>
        </div>
        <div class="product__details__price">
          <p>Prix unitaire TTC :</p>
          <span>{{ productStore.productVariant.price.amount }} €</span>
        </div>
        <div class="product__details__buttons">
          <button
            :disabled="updatingCart"
            @click.prevent="updateCart(productStore.productVariant)"
            class="button-primary"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </section>
    <ProductsPropositions />
  </div>
</template>
<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 64px;
}
.product {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 32px;
  background-color: $primary-color;
  padding: 16px;
  border-radius: 6px;

  @media (min-width: $desktop-screen) {
    flex-direction: row;
  }

  &__details {
    display: flex;
    gap: 16px;
    flex-direction: column;
    width: 100%;

    &__variants {
      display: flex;
      gap: 8px;

      &__variant {
        display: flex;
        gap: 4px;
        flex-direction: column;
        text-align: center;
        cursor: pointer;
        border: transparent solid 2px;

        &__img {
          width: clamp(60px, 100%, 200px);
          height: 80px;
          object-fit: cover;

          @media (min-width: $tablet-screen) {
            height: 140px;
          }
        }

        &--selected {
          border: $secondary-color 2px solid;
          border-radius: 6px;
        }
      }
    }

    &__price {
      display: flex;
      gap: 32px;
      justify-content: flex-end;
    }

    &__buttons {
      display: flex;
      flex-direction: column;
      gap: 16px;
      justify-content: flex-end;

      @media (min-width: $tablet-screen) {
        flex-direction: row;
      }
    }
  }
}
.swiper {
  margin: 0;
  display: flex;
  width: clamp(100px, 100%, 600px) !important;

  &__slide {
    width: 100% !important;

    &__img {
      width: 100%;
      height: 300px;
      object-fit: cover;

      @media (min-width: $tablet-screen) {
        height: 500px;
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
