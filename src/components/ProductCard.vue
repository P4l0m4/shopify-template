<script setup>
const props = defineProps(['product'])
</script>

<template>
  <nuxt-link :to="`/product/${product.handle}`" :key="product.id" class="product-card">
    <img class="product-card__img" :src="product.images[0].src" />

    <div class="product-card__txt">
      <h2 class="product-card__txt__title">
        {{ product.title }} <span>{{ product.variants[0].price.amount }} €</span>
      </h2>
      <h3 class="product-card__txt__description">{{ product.description }}</h3>
    </div>

    <button class="button-primary">Voir plus</button>
  </nuxt-link>
</template>
<style scoped lang="scss">
.product-card {
  display: flex;
  gap: 16px;
  background-color: $primary-color;
  padding: 1rem;
  box-shadow: $shadow;
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
