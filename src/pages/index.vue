<script setup>
import { useProductStore } from '@/stores/product'
const productStore = useProductStore()

const route = useRoute()
const pageSlug = route.params.slug

useJsonld(
  () => (
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',

      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'accueil',
          item: pageSlug,
        },
      ],
    },
    {
      '@context': 'https://schema.org/',
      '@type': 'WebSite',
      name: 'SampleShop',
      url: pageSlug,
    }
  )
)
// useJsonld(() => ({
//   '@context': 'https://schema.org/',
//   '@type': 'WebSite',
//   name: 'SampleShop',
//   url: 'https://nuxt3-shopify-template.netlify.app/',
// }))
</script>

<template>
  <section class="index-section">
    <HomeCarousel />
    <div class="index-section__wrapper">
      <!-- <p class="index-section__wrapper__title">Nos collections exclusives</p> -->
      <CollectionsGallery :collections="productStore.collections" />
    </div>
    <div class="index-section__wrapper">
      <p class="index-section__wrapper__title">Nos best sellers</p>
      <ProductsPropositions />
    </div>
  </section>
</template>
<style scoped lang="scss">
.index-section {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  align-items: center;

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &__title {
      font-weight: 200 !important;
      font-size: 1.5rem;
      padding: 0 1rem;
    }
  }
}
</style>
