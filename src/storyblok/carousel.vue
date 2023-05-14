<template>
  <swiper-container
    v-editable="blok"
    :grabCursor="true"
    :cssMode="true"
    :pagination="{
      clickable: true,
    }"
    :mousewheel="true"
    :loop="true"
    speed="500"
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
