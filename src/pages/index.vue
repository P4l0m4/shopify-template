<script setup>
import { useProductStore } from '@/stores/product'
const productStore = useProductStore()

// useHead({
//   script: [
//     {
//       '@context': 'https://schema.org/',
//       '@type': 'BreadcrumbList',
//       itemListElement: [
//         {
//           '@type': 'ListItem',
//           position: 1,
//           name: 'accueil',
//           item: '',
//         },
//         {
//           '@type': 'ListItem',
//           position: 2,
//           name: 'products',
//           item: '',
//         },
//       ],
//     },
//   ],
//   body: true,
// })
</script>

<template>
  <section class="index-section">
    <HeaderComponent />
    <div class="index-section__wrapper">
      <!-- <p class="index-section__wrapper__title">Nos collections exclusives</p> -->
      <CollectionsGallery :collections="productStore.collections" />
    </div>
    <div class="index-section__wrapper">
      <p class="index-section__wrapper__title">Nos best sellers</p>
      <ProductsPropositions />
    </div>
    <!-- <GeneralReviews /> -->
  </section>
</template>
<style scoped lang="scss">
.index-section {
  display: flex;
  flex-direction: column;
  gap: 4rem;

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
