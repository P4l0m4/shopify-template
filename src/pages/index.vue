<script setup>
import { useProductStore } from '@/stores/product'
const productStore = useProductStore()

const breadcrumbs = [
  {
    name: 'Accueil',
    url: window.location.origin,
  },
]
//STORYBLOK
const story = await useAsyncStoryblok('baseline', { version: 'draft' })
</script>

<template>
  <section class="index-section">
    <JsonldBreadcrumb :links="breadcrumbs" />
    <HomeCarousel />
    <StoryblokComponent v-if="story" :blok="story.content" />
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
