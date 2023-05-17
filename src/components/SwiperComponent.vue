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

// let zoom = ref(false)
</script>

<template>
  <div>
    <swiper-container
      :grabCursor="true"
      :pagination="{
        clickable: true,
      }"
      :keyboard="true"
      class="swiper"
      ref="swiper"
    >
      <swiper-slide v-for="image in images" :key="image.id" class="swiper__slide">
        <div class="swiper__slide__div swiper-zoom-container" data-swiper-zoom="5">
          <img :src="image.src" class="swiper__slide__div__img" :alt="image.alt" />
        </div>
      </swiper-slide>
    </swiper-container>
  </div>
</template>
<style lang="scss" scoped>
.swiper {
  margin: 0;
  display: flex;
  justify-content: center;
  --swiper-pagination-color: #{$text-color};
  background-color: $base-color;

  &__slide {
    display: flex;
    justify-content: center;
    width: 100% !important;
    height: 260px;
    transition: height 0.4s ease;

    @media (min-width: $tablet-screen) {
      height: 300px;
    }
    @media (min-width: $laptop-screen) {
      height: 360px;
    }

    &__div {
      max-width: 900px;
      width: 100%;
      height: 230px;
      display: flex;
      justify-content: center;

      @media (min-width: $tablet-screen) {
        height: 270px;
      }
      @media (min-width: $laptop-screen) {
        height: 330px;
      }

      &__img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: $radius;
      }
    }
  }
}
</style>
