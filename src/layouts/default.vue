<script setup>
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/product'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
// register Swiper custom elements
register()

const cartStore = useCartStore()
await cartStore.initCheckout()

const productStore = useProductStore()
await productStore.getCollectionsAndProducts()

const story = await useAsyncStoryblok('promotion', { version: 'draft' })

useHead({
  script: [
    {
      async: true,
      src: '//staticw2.yotpo.com/g0YglhE3q3wxCEFpK4R4tF5UE349zZrrw0C4psLQ/widget.js',
      body: true,
    },
  ],
})

useJsonld(() => ({
  '@context': 'https://schema.org/',
  '@type': 'WebSite',
  name: 'SampleShop',
  url: 'https://nuxt3-shopify-template.netlify.app/',
}))
</script>

<template>
  <div class="container">
    <header class="container__header">
      <StoryblokComponent v-if="story" :blok="story.content" />
      <NavigationComponent />
    </header>
    <main><slot /></main>
    <FooterComponent />
  </div>
  <!-- Google Tag Manager (noscript) -->
  <noscript
    ><iframe
      src="https://www.googletagmanager.com/ns.html?id=GTM-MQVVM37"
      height="0"
      width="0"
      style="display: none; visibility: hidden"
    ></iframe
  ></noscript>
  <!-- End Google Tag Manager (noscript) -->
</template>
<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  padding: 5.2rem 0 0 0;
  gap: 2rem;
  align-items: center;
  margin: auto;

  @media (min-width: $laptop-screen) {
    padding: 6.4rem 0 0 0;
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    position: fixed;
    top: 0;
    z-index: 2;
  }

  & main {
    width: 100%;
    min-height: 100vh;
  }
}
</style>
