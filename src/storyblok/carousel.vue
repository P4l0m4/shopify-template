<script setup>
defineProps({ blok: Object })
</script>

<template>
  <swiper-container
    v-editable="blok"
    :grabCursor="true"
    :pagination="{
      clickable: true,
    }"
    loop="true"
    speed="600"
    :autoplay="{
      delay: 2500,
      pauseOnMouseEnter: true,
    }"
    class="swiper"
    keyboard="true"
    ref="swiper"
    ><StoryblokComponent v-for="blok in blok.slides" :key="blok._uid" :blok="blok" />
  </swiper-container>
</template>

<style lang="scss" scoped>
.swiper {
  margin: auto;
  display: flex;
  justify-content: center;
  --swiper-pagination-color: #{$primary-color};
  width: clamp(100px, 100vw, 2000px) !important;
}
</style>
