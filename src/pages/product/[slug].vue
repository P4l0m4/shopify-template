<script setup>
import { client } from '@/services/shopify'

const route = useRoute()

const productSlug = route.params.slug

const product = await client.product.fetchByHandle(productSlug)

const products = await client.product.fetchAll()
</script>

<template>
  <div class="container">
    <section class="product">
      <swiper-container :navigation="true" :pagination="true" class="swiper">
        <swiper-slide v-for="(image, index) in product.images" :key="index" class="swiper__slide">
          <img :src="product.images[index].src" class="swiper__slide__img"
        /></swiper-slide>
      </swiper-container>
      <div class="product__details">
        <div class="product__details__txt">
          <h1 class="product__details__txt__title">{{ product.title }}</h1>
          <p class="product__details__txt__description">{{ product.description }}</p>
        </div>
        <div class="product__details__variants">
          <div v-for="(variant, index) in product.variants" :key="index" class="product__details__variants__variant">
            <img :src="product.variants[index].image.src" class="product__details__variants__variant__img" />
            <p class="product__details__variants__variant__title">{{ product.variants[index].title }}</p>
          </div>
        </div>
        <div class="product__details__price">
          <p>Prix unitaire TTC :</p>
          <span>{{ product.variants[0].price.amount }} €</span>
        </div>
        <div class="product__details__buttons">
          <button class="button-secondary">Voir plus</button>
          <button @click.prevent class="button-primary">Ajouter au panier</button>
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
    gap: 32px;
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

        &__img {
          width: clamp(60px, 100%, 200px);
          height: 80px;
          object-fit: cover;

          @media (min-width: $tablet-screen) {
            height: 140px;
          }
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
