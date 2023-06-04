<script setup>
import { useCartStore } from '@/stores/cart'
import { useProductStore } from '@/stores/product'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
// register Swiper custom elements
register()

const cartStore = useCartStore()
cartStore.initCheckout()

const productStore = useProductStore()
productStore.getCollectionsAndProducts()

useJsonld(() => ({
  '@context': 'https://schema.org/',
  '@type': 'WebSite',
  name: 'SampleShop',
  url: 'https://nuxt3-shopify-template.netlify.app/',
}))
</script>

<template>
  <div class="container">
    <HeaderComponent />
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

  & main {
    width: 100%;
    min-height: 100vh;
  }
}
</style>
