<script setup>
import { ref, watch, onMounted } from 'vue'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import { PRODUCT_PATH } from '@/config/url'

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

onMounted(() => {
  if (typeof yotpo != 'undefined' && yotpo && yotpo.initialized && !document.querySelector('.yotpo-display-wrapper')) {
    new Yotpo.API(yotpo).refreshWidgets()
  }
})

// META TAGS
const metaTitle = ref(productStore.product.title)
const metaDescription = ref(productStore.product.description)

useHead({
  title: metaTitle,
  meta: [
    {
      name: 'description',
      content: metaDescription,
    },
  ],
})

function scroll() {
  const anchor = document.querySelector('#anchor')
  anchor.scrollIntoView({ behavior: 'smooth' })
}
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

            <div class="product__details__add-to-cart__txt__wrapper">
              <button
                class="yotpo-offset-button"
                @click="scroll"
                id="anchor"
                title="écrire un avis"
                aria-label="écrire un avis"
              >
                <div
                  class="yotpo bottomLine"
                  data-appkey="g0YglhE3q3wxCEFpK4R4tF5UE349zZrrw0C4psLQ"
                  data-domain="https://nuxt3-shopify-template.netlify.app/"
                  :data-product-id="productStore.product.id.split('/').pop()"
                  :data-name="productStore.product.title"
                  :data-url="`https://nuxt3-shopify-template.netlify.app/${PRODUCT_PATH}${productStore.product.handle}`"
                  :data-image-url="productStore.product.images[0].src"
                  :data-description="productStore.product.description"
                  :data-bread-crumbs="productStore.product.productType"
                ></div>
              </button>
              <button
                class="product__details__add-to-cart__txt__wrapper__button"
                v-if="isTooBig"
                @click="seeMore = !seeMore"
              >
                <span v-if="!seeMore">Voir plus</span><span v-else>Voir moins</span>
              </button>
            </div>
          </div>
          <div class="product__details__add-to-cart__price">
            <div class="product__details__add-to-cart__price__numbers">
              <span class="product__details__add-to-cart__price__numbers__number"
                >{{ parseFloat(productStore.productVariant.price.amount).toFixed(2) }} €</span
              ><span
                v-if="productStore.productVariant.compareAtPrice.amount > productStore.productVariant.price.amount"
                class="product__details__add-to-cart__price__numbers__promotion"
                >{{ parseFloat(productStore.productVariant.compareAtPrice.amount).toFixed(2) }} €</span
              >
            </div>

            <button
              :disabled="updatingCart || !productStore.productVariant.available"
              @click.prevent="updateCart(productStore.productVariant)"
              class="button-primary"
              :class="{
                'product__details__add-to-cart__price__button--updating': updatingCart,
              }"
            >
              <img v-if="!updatingCart" class="icon" src="@/assets/icons/add-to-cart.svg" alt="icon" /><span
                v-if="updatingCart"
                >Ajouté au panier</span
              >
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="reviews">
      <div
        class="yotpo yotpo-main-widget"
        :data-product-id="productStore.product.id.split('/').pop()"
        :data-price="productStore.product.variants[0].priceV2.amount"
        :data-currency="productStore.product.variants[0].priceV2.currencyCode"
        :data-name="productStore.product.title"
        :data-url="`https://nuxt3-shopify-template.netlify.app/${PRODUCT_PATH}${productStore.product.handle}`"
        :data-image-url="productStore.product.images[0].src"
      ></div>
      <!-- <div id="yotpo-testimonials-custom-tab"></div> -->
    </section>
    <p class="container__title">Nos best sellers</p>
    <ProductsPropositions />
  </div>
</template>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 1rem 0;

  &__title {
    font-weight: 200 !important;
    font-size: 1.5rem;
    padding: 0 1rem;
  }
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
      padding: 0 1rem 1rem 1rem;

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
          width: 50px;
          height: 50px;
          object-fit: contain;
        }

        &--selected {
          border: $selected-color 2px solid;
          border-radius: $radius;
          background-color: $selected-background-color;
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
            color: $text-color;
          }
        }
        &__wrapper {
          display: flex;
          align-items: center;
          margin-top: 0.5rem;

          &__button {
            background-color: transparent;
            border: transparent solid 2px;
            cursor: pointer;
            width: 100%;
            display: flex;
            justify-content: flex-end;
            padding: 0.25rem 0;
            margin-left: 1rem;
            & span {
              text-decoration: underline;
              font-size: 0.75rem;
              color: $text-color !important;
            }
          }

          & :deep(.yotpo-bottomline) {
            align-items: center;
            gap: 0.25rem;

            .yotpo-stars {
              min-width: 90px;
            }

            .write-review-btn-hidden {
              min-width: 100px;
              color: $text-color !important;
              text-decoration: underline !important;
            }
          }

          .yotpo.bottomLine.yotpo-small {
            width: clamp(160px, 100%, 400px);
          }
        }
      }

      &__price {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;

        &__numbers {
          display: flex;
          font-size: 1.5rem;
          font-weight: 800;
          gap: 1rem;
          align-items: flex-end;

          &__promotion {
            display: flex;
            color: $selected-background-color-darker;
            text-decoration: line-through;
            font-weight: 400;
            font-size: 1rem;
          }
        }

        &__button {
          &--updating {
            background-color: $promo-code-color;
            gap: 0.25rem;
            align-items: center;
            display: flex;

            & span {
              font-size: 1rem;
              text-shadow: black 0px 0px 4px;
            }
          }
        }
      }
    }
  }
}
.reviews {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  // background-color: $primary-color;

  & :deep(.yotpo-label-container) {
    display: none !important;
  }

  & :deep(.y-label.yotpo-header-title) {
    visibility: hidden !important;
  }

  & :deep(.yotpo-default-button.write-review-button.write-first-review-button) {
    display: none !important;
  }
  &
    :deep(
      .yotpo-default-button.yotpo-default-button.yotpo-icon-btn.write-question-review-button.write-button.write-review-button
    ) {
    border-radius: $radius;
    text-transform: capitalize;
    display: flex;
    padding: 0.75rem 1.75rem !important;
    border: $text-color solid 2px;
    align-items: center;
    margin: auto;
    justify-content: center;
    white-space: nowrap;
    transition: transform 0.4s ease-in-out;

    &:hover {
      transform: scale(1.04);
    }
  }

  & :deep(.bottom-line-items-container-desktop) {
    display: none;
  }
  & :deep(.yotpo-icon.yotpo-icon-write-no-frame.write-question-review-button-icon.yotpo-hidden-mobile) {
    display: none;
  }

  & :deep(.write-question-review-button-text.font-color-gray-darker) {
    color: $text-color;
  }

  & :deep(.free-text-search-input) {
    border-radius: $radius;
    width: 100%;
  }

  & :deep(.form-element) {
    & input:not([type='button']),
    textarea {
      border-radius: $radius;
      border: 2px solid $text-color;
      // border-radius: $small-radius;
      height: 44px;
      width: 100%;
      caret-color: $text-color;
      padding: 12px;
      color: $text-color;
      // font-weight: $slim-weight;
      // background-color: $primary-color;
      // -webkit-box-shadow: 0 0 0 30px $base-color inset !important;
      box-shadow: 0 0 0 30px $base-color inset !important;

      &::placeholder {
        color: $text-color;
        // font-weight: $slim-weight;
        opacity: 0.4;
      }
    }
    & input[type='button'] {
      background: $text-color;
      width: 100%;
      border-radius: 25px;

      &:hover {
        background-color: $text-color !important;
      }
    }

    & label {
      font-size: 1rem;
      color: $text-color;
    }

    & input[type='button'] {
      font-size: 1rem;
      text-transform: none;
    }
  }

  & :deep(.y-label) {
    font-size: 1rem;
    color: $text-color;
  }

  & :deep(.yotpo-header-title) {
    font-size: 1.5rem !important;
    color: $text-color;
    display: block;
    text-transform: capitalize !important;
    padding-bottom: 2rem;

    &:first-letter {
      text-transform: capitalize !important;
    }
  }

  & :deep(.write-question-review-buttons-container) {
    // float: none;
    // display: none;
  }

  & :deep(.yotpo-regular-box) {
    border: none;
  }

  & :deep(.write-form) {
    max-width: 450px;
    margin: auto;
  }
  & :deep(.form-element) {
    width: 100%;
  }
  & :deep(.yotpo .write-review .connect-wrapper) {
    padding: 0;
  }

  & :deep(.socialize-wrapper .visible) {
    display: none;
  }
  & :deep(.yotpo-regular-box) {
    display: flex;
    height: fit-content;
    margin: 0;
    flex-direction: column;
  }

  & :deep(.yotpo-bottomline .bottom-line-items-container-desktop .yotpo-hidden) {
    display: none;
  }

  & :deep(.bottom-line-only-container) {
    display: none;
  }

  & :deep(.yotpo-filter-stars .rating-stars-container .mL0) {
    display: none !important;
  }

  & :deep(.reviews-qa-labels-container .mL0) {
    display: none !important;
  }

  & :deep(.write-first-review-button) {
    background-color: $text-color;
    font-size: 1rem;
    text-transform: none;
    width: 100%;
    max-width: 450px;
    &:first-letter {
      text-transform: capitalize;
    }
  }

  & :deep(.yotpo-default-button .primary-color-btn .yotpo-submit) {
    font-size: 1rem;
    text-transform: none;
  }

  & :deep(.yotpo-first-review-stars) {
    display: none;
  }

  & :deep(.bottom-line-items-wrapper) {
    // display: none;
    display: flex;
    justify-content: center;
  }

  & :deep(.bottom-line-items-container-mobile .yotpo-star-distribution-wrapper .yotpo-distribution-rows) {
    place-items: center;
  }

  & :deep(.write-question-review-buttons-container) {
    float: none !important;
    padding-right: 0 !important;

    // @media (max-width: 5000px) {
    //   float: none !important;
    //   padding-right: 0 !important;
    // }
  }

  & :deep(.yotpo .write-review .socialize-wrapper .socialize) {
    display: none;
  }

  & :deep(.yotpo .write-review .socialize-wrapper .yotpo-or) {
    display: none;
  }

  & :deep(.yotpo-regular-box.yotpo-bottomline.bottom-line-items-container-desktop) {
    height: initial !important;
    min-height: 160px;
  }

  & :deep(.bottom-line-items-wrapper) {
    display: none !important;
  }

  & :deep(.yotpo-regular-box.yotpo-bottomline.bottom-line-items-container-desktop) {
    display: none !important;
  }
}
</style>
