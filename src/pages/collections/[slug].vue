<script setup>
import { ref } from 'vue'
import { useProductStore } from '@/stores/product'

// Routing
const route = useRoute()
const collectionSlug = route.params.slug

// Store
const productStore = useProductStore()
const products = ref([])
// META TAGS
const metaTitle = ref('')
const metaDescription = ref('')

onMounted(() => {
  const collection = productStore.collections.find(collection => collection.handle === collectionSlug)
  products.value.push(...collection.products)
  metaTitle.value = collection.title
  metaDescription.value = collection.description
})

useHead({
  title: metaTitle,
  meta: [
    {
      name: 'description',
      content: metaDescription,
    },
  ],
})
</script>
<template>
  <section class="collection">
    <h1 class="collection__title">{{ metaTitle }}</h1>
    <div class="collection__products">
      <ProductCard v-for="product in products" :product="product" />
    </div>
  </section>
</template>
<style lang="scss" scoped>
.collection {
  display: flex;
  gap: 1rem;
  width: 100vw;
  overflow-x: scroll;
  padding: 2rem 1rem;
  flex-direction: column;
  align-items: center;

  &__title {
    font-weight: 200 !important;
    font-size: 1.5rem;
    padding: 0 1rem;
    width: 100%;
    display: flex;
    justify-content: center;
  }

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
</style>
