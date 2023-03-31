<script setup>
import { client } from '@/services/shopify'

const products = await client.product.fetchAll()
</script>
<template>
  <section class="section">
    <ProductCard v-for="product in products" :product="product" />
  </section>
</template>

<style scoped lang="scss">
.section {
  display: grid;
  gap: 1rem;
  width: 100vw;
  overflow-x: scroll;
  padding: 0 1rem;
  grid-template-columns: repeat(2, 1fr);
}

.product-card {
  display: flex;
  gap: 16px;
  background-color: $primary-color;
  padding: 16px;
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
    gap: 16px;

    &__title {
      font-size: 16px;
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
