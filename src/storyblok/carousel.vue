<template>
  <swiper-container
    v-editable="blok"
    :grabCursor="true"
    :pagination="{
      clickable: true,
    }"
    :mousewheel="true"
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

<script setup>
defineProps({ blok: Object })
</script>
<style lang="scss" scoped>
.swiper {
  margin: 0;
  display: flex;
  justify-content: center;
  --swiper-pagination-color: #{$primary-color};
}
</style>
