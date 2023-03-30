<script setup>
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
// register Swiper custom elements
register()
</script>

<template>
  <div class="container">
    <NavigationComponent />
    <!-- <SlideBar /> -->
    <main><slot /></main>
    <FooterComponent />
  </div>
</template>
<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  padding: 3.5rem 0;
  gap: 2rem;
  align-items: center;
}
</style>
