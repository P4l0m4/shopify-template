<script setup>
import { ref, watch } from 'vue'
import 'swiper/element/css/zoom'

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

let zoom = ref(false)
</script>

<template>
  <swiper-container
    :pagination="{
      clickable: true,
    }"
    :keyboard="true"
    speed="600"
    class="swiper"
    ref="swiper"
  >
    <swiper-slide
      v-for="image in images"
      :key="image.id"
      class="swiper__slide"
      :class="{ 'swiper__slide--zoom': zoom }"
      @click="zoom = !zoom"
    >
      <div class="swiper__slide__div">
        <img :src="image.src" class="swiper__slide__div__img" :alt="image.alt" />
      </div>
    </swiper-slide>
  </swiper-container>
</template>
<style lang="scss" scoped>
.swiper {
  margin: 0;
  display: flex;
  justify-content: center;
  --swiper-pagination-color: #{$text-color};
  background-color: $base-color;
  width: clamp(100px, 100%, 800px);
  position: relative;

  &__slide {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 260px;
    transition: height 0.4s ease;
    &:hover {
      cursor: zoom-in;
    }

    @media (min-width: $tablet-screen) {
      height: 300px;
    }
    @media (min-width: $laptop-screen) {
      height: 360px;
    }

    &__div {
      width: 100%;
      height: calc(100% - 30px);
      display: flex;
      justify-content: center;

      &__img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: $radius;
      }
    }

    &--zoom {
      height: 100vh;
      max-height: calc(100vh - 120px);
      &:hover {
        cursor: zoom-out;
      }
    }
  }
}
</style>
