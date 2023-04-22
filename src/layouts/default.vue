<script setup>
import { useCartStore } from '@/stores/cart'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
// register Swiper custom elements
register()

const cartStore = useCartStore()
await cartStore.initCheckout()

useHead({
  script: [
    {
      async: true,
      src: '//staticw2.yotpo.com/g0YglhE3q3wxCEFpK4R4tF5UE349zZrrw0C4psLQ/widget.js',
      body: true,
    },
  ],
})
</script>

<template>
  <div class="container">
    <NavigationComponent />
    <main><SlideBar /><slot /></main>
    <FooterComponent />
  </div>
</template>
<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  padding: 3.5rem 0 0 0;
  gap: 2rem;
  align-items: center;

  & main {
    width: 100%;
  }
}
</style>
