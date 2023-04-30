<script setup>
import { client } from '@/services/shopify'

let products = await client.product.fetchAll()
products = JSON.parse(JSON.stringify(products))
</script>
<template>
  <section class="section">
    <ProductCard v-for="product in products" :product="product" />
  </section>
</template>

<style scoped lang="scss">
.section {
  display: flex;
  gap: 1rem;
  width: 100vw;
  max-width: 2000px;
  overflow-x: scroll;
  padding: 0 1rem;
  animation: slide-from-right 0.4s ease;
}

.product-card {
  display: flex;
  gap: 1rem;
  background-color: $primary-color;
  padding: 1rem;
  align-items: center;
  flex-direction: column;
  width: clamp(100px, 100%, 343px);

  @media (min-width: $tablet-screen) {
    width: clamp(100px, 100%, 300px);
  }

  &__img {
    object-fit: cover;
    width: 100%;
  }

  &__txt {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__title {
      font-size: 1rem;
      display: flex;
      justify-content: space-between;

      & span {
        opacity: 0.4;
      }
    }

    &__description {
      padding-bottom: 16px;
      font-weight: 100;
      font-size: 16px;
      height: 40px;
      overflow: hidden;
    }
  }
}
</style>
