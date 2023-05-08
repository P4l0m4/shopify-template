<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  images: Array,
  currentSlideIndex: Number,
})
const swiper = ref()

watch(
  () => props.currentSlideIndex,
  newIndex => {
    swiper.value.swiper.slideTo(newIndex)
  }
)
</script>

<template>
  <div>
    <swiper-container
      :grabCursor="true"
      :cssMode="true"
      :pagination="{
        clickable: true,
      }"
      :mousewheel="true"
      class="swiper"
      keyboard="true"
      ref="swiper"
    >
      <swiper-slide v-for="image in images" :key="image.id" class="swiper__slide">
        <img :src="image.src" class="swiper__slide__img"
      /></swiper-slide>
    </swiper-container>
  </div>
</template>
<style lang="scss" scoped>
.swiper {
  margin: 0;
  display: flex;
  justify-content: center;
  --swiper-pagination-color: #{$text-color};

  &__slide {
    width: 100% !important;
    height: 230px;
    @media (min-width: $laptop-screen) {
      height: 330px;
    }

    &__img {
      padding: 0 1rem;
      width: 100%;
      height: 200px;
      object-fit: contain;
      border-radius: $radius;

      @media (min-width: $laptop-screen) {
        height: 300px;
      }
    }
  }
}
</style>
