<script setup>
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
// register Swiper custom elements
register()
</script>

<template>
  <div class="container">
    <HeaderComponent />
    <main><slot /></main>
  </div>
</template>
<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  padding: 32px 64px;
  gap: 128px;
  align-items: center;

  @media (min-width: $tablet-screen) {
    padding: 64px;
  }
}
</style>
