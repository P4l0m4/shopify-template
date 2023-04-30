<script setup>
const props = defineProps({ products: Array, query: String })
</script>

<template>
  <section class="results">
    <span v-if="products.length === 0 && query">Aucun produit trouvé pour "{{ query }}"</span>
    <section class="results__products">
      <ProductCard v-for="product in products" :product="product" />
    </section>
  </section>
</template>
<style scoped lang="scss">
.results {
  display: flex;
  gap: 1rem;
  width: 100vw;
  overflow-x: scroll;
  padding: 0 1rem;
  flex-direction: column;
  align-items: center;

  &__products {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    @media (min-width: $tablet-screen) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: $laptop-screen) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media (min-width: $desktop-screen) {
      grid-template-columns: repeat(5, 1fr);
    }
    @media (min-width: $super-big-screen) {
      grid-template-columns: repeat(6, 1fr);
    }
  }
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
