<script setup>
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import { ref, watch } from 'vue'

// Routing
const route = useRoute()
const productSlug = route.params.slug

// Store
const productStore = useProductStore()
const cartStore = useCartStore()

const loading = ref(false)
const updatingCart = ref(false)

loading.value = true
await productStore.getProduct(productSlug)
loading.value = false

//Description

const seeMore = ref(false)
const isTooBig = ref(false)
const description = ref()

//Show seeMore button if description is too long
function checkDescriptionHeight() {
  const itemHeight = description.value.offsetHeight
  isTooBig.value = itemHeight > 12 * 1.15 * 2 // font-size + line-height + nb lines
}

watch(
  () => description.value,
  () => {
    checkDescriptionHeight()
  }
)

// Swiper
const currentSlideIndex = ref(0)

function selectProductVariant(variant) {
  productStore.setProductVariant(variant)
  currentSlideIndex.value = productStore.product.images.findIndex(image => image.id === variant.image.id)
}

async function updateCart(variant) {
  updatingCart.value = true
  await cartStore.addProductToCart(variant)
  updatingCart.value = false
}

// console.log(JSON.parse(JSON.stringify(productStore.product)))
// console.log(productStore.product.images[0].src)
</script>

<template>
  <div class="container">
    <section class="product" v-if="!loading">
      <SwiperComponent :images="productStore.product.images" :currentSlideIndex="currentSlideIndex" />
      <div class="product__details">
        <div class="product__details__variants">
          <div
            v-for="variant in productStore.product.variants"
            :key="variant.id"
            class="product__details__variants__variant"
            :class="{ 'product__details__variants__variant--selected': productStore.productVariant.id === variant.id }"
            @click="selectProductVariant(variant)"
          >
            <img :src="variant.image.src" class="product__details__variants__variant__img" />
            <p class="product__details__variants__variant__title">{{ variant.title }}</p>
          </div>
        </div>

        <div class="product__details__add-to-cart">
          <div class="product__details__add-to-cart__txt">
            <h1 class="product__details__add-to-cart__txt__title">
              {{ productStore.product.title }} - {{ productStore.productVariant.title }}
            </h1>
            <p
              ref="description"
              class="product__details__add-to-cart__txt__description"
              :class="{ 'product__details__add-to-cart__txt__description--too-big': isTooBig && !seeMore }"
              v-html="productStore.product.descriptionHtml"
            ></p>
            <button class="product__details__add-to-cart__txt__button" v-if="isTooBig" @click="seeMore = !seeMore">
              <span v-if="!seeMore">Voir plus</span><span v-else>Voir moins</span>
            </button>
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
    <!-- <section class="reviews">
      <div
        class="yotpo yotpo-main-widget"
        data-product-id="{{productStore.product.id}}"
        data-price="{{productStore.product.variants[0].priceV2.amount}}"
        data-currency="{{productStore.product.variants[0].priceV2.currencyCode}}"
        data-name="{{productStore.product.title}}"
        data-url="https://nuxt3-shopify-template.netlify.app/product/{{productStore.product.handle}}"
        data-image-url="{{productStore.product.images[0].src}}"
      ></div>
      <div class="yotpo bottomLine" data-yotpo-product-id="{{productStore.product.id}}"></div>
    </section> -->
    <p class="title">Nos best sellers</p>
    <ProductsPropositions />
  </div>
</template>
<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
}
.product {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__details {
    display: flex;
    flex-direction: column;
    width: clamp(300px, 100%, 800px);

    &__variants {
      display: flex;
      gap: 0.5rem;
      overflow-x: scroll;
      width: clamp(300px, 100%, 800px);
      padding: 1rem;
      @media (min-width: $laptop-screen) {
        padding: 1rem 0;
      }

      &__variant {
        display: flex;
        gap: 0.25rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: transparent solid 2px;
        width: clamp(60px, 100%, 140px);
        padding: 0.75rem;
        background-color: $primary-color;
        box-shadow: $shadow;
        border-radius: $radius;
        font-size: 0.75rem;

        &__img {
          width: 72px;
          height: 72px;
          object-fit: contain;
        }

        &--selected {
          border: $selected-color 2px solid;
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
        gap: 0.25rem;
        width: 100%;

        &__title {
          font-size: 0.8rem;
        }
        &__description {
          font-weight: 100;
          font-size: 0.75rem;

          &--too-big {
            display: -webkit-box;
            max-height: 0.75rem * $line-height * 2;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: $line-height;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        }
        &__button {
          background-color: transparent;
          border: transparent solid 2px;
          cursor: pointer;
          width: 100%;
          display: flex;
          justify-content: flex-end;
          padding: 0.25rem 0;
          & span {
            text-decoration: underline;
            font-size: 0.75rem;
          }
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
.reviews {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
