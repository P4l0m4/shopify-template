<script setup>
import { client } from '@/services/shopify'

const products = await client.product.fetchAll()
</script>

<template>
  <main>
    <h1>Boutique Pokemon</h1>
    <section>
      <nuxt-link :to="`/product/${product.handle}`" v-for="product in products" :key="product.id" class="product-card">
        <img class="product-card__img" :src="product.images[0].src" />

        <div class="product-card__txt">
          <h2 class="product-card__txt__title">{{ product.title }}</h2>
          <h3 class="product-card__txt__description">{{ product.description }}</h3>
        </div>

        <button class="button-secondary">Voir plus</button>
        <button @click.prevent class="button-primary">Ajouter au panier</button>
      </nuxt-link>
    </section>
  </main>
</template>
<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  gap: 64px;

  section {
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    .product-card {
      display: flex;
      gap: 16px;
      background-color: rgb(28, 26, 26);
      padding: 16px;
      align-items: center;
      flex-direction: column;
      width: clamp(100px, 100%, 360px);

      &__img {
        object-fit: cover;
        width: 100%;
      }

      &__txt {
        display: flex;
        flex-direction: column;
        gap: 16px;
        &__description {
          padding-bottom: 16px;
          font-weight: 100;
          font-size: 16px;
          height: 40px;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
