<script setup>
import { onMounted, ref } from 'vue'
defineProps({ blok: Object })
</script>

<template>
  <swiper-container
    id="swiper"
    v-editable="blok"
    :pagination="{
      clickable: true,
    }"
    loop="true"
    speed="800"
    :autoplay="{
      delay: 6000,
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
  animation: fade 0.2s ease;
}
</style>
