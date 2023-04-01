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
  updatingCart.value = true
  await cartStore.addProductToCart(variant)
  updatingCart.value = false
}
</script>

<template>
  <div class="container">
    <section class="product" v-if="!loading">
      <SwiperComponent />
      <div class="product__details">
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

        <div class="product__details__add-to-cart">
          <div class="product__details__add-to-cart__txt">
            <h1 class="product__details__add-to-cart__txt__title">{{ productStore.product.title }}</h1>
            <p class="product__details__add-to-cart__txt__description">{{ productStore.product.description }}</p>
          </div>
          <div class="product__details__add-to-cart__price">
            <span class="product__details__add-to-cart__price__number"
              >{{ productStore.productVariant.price.amount }} €</span
            >
            <button
              :disabled="updatingCart"
              @click.prevent="updateCart(productStore.productVariant)"
              class="button-primary"
            >
              <img class="icon" src="@/assets/icons/add-to-cart.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </section>
    <p class="title">Nos best sellers</p>
    <ProductsPropositions />
  </div>
</template>
<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.product {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  &__details {
    display: flex;
    flex-direction: column;
    width: 100vw;

    &__variants {
      display: flex;
      gap: 0.5rem;
      overflow-x: scroll;
      width: 100vw;
      padding: 1rem;

      &__variant {
        display: flex;
        gap: 0.25rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: transparent solid 2px;
        width: clamp(60px, 100%, 140px);
        padding: 1rem;
        background-color: $primary-color;
        box-shadow: $shadow;
        border-radius: $radius;
        font-size: 0.75rem;

        &__img {
          width: 72px;
          height: 72px;
          object-fit: cover;
          border-radius: 100%;
        }

        &--selected {
          border: $variant-selected-color 2px solid;
          border-radius: $radius;
        }
      }
    }

    // &__price {
    //   display: flex;
    //   gap: 32px;
    //   justify-content: flex-end;
    //   border: red solid 2px;
    // }

    &__add-to-cart {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      box-shadow: $shadow;
      border-radius: $radius;
      background-color: $primary-color;

      &__txt {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        &__title {
          font-size: 1rem;
        }
        &__description {
          font-weight: 100;
          font-size: 0.75rem;
        }
      }

      &__price {
        font-size: 1.5rem;
        font-weight: 800;
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
