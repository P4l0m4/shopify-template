<template>
  <swiper-slide class="swiper">
    <div v-editable="blok" class="swiper__slide">
      <img :src="blok?.image.filename" class="swiper__slide__img" :alt="blok?.image.alt" />
      <div class="swiper__slide__wrapper" :style="'background-color:' + blok.background_color">
        <div class="swiper__slide__wrapper__txt">
          <h3 class="swiper__slide__wrapper__txt__title">{{ blok.title }}</h3>
          <p class="swiper__slide__wrapper__txt__sub-title">{{ blok.subtitle }}</p>
        </div>
        <NuxtLink class="swiper__slide__wrapper__button" :href="blok.button.url"
          >{{ blok.button_name }}
          <img class="swiper__slide__wrapper__button__icon icon" src="@/assets/icons/next.svg" alt="icon"
        /></NuxtLink>
      </div></div
  ></swiper-slide>
</template>

<script setup>
const props = defineProps({ blok: Object })
</script>
<style lang="scss" scoped>
.swiper {
  width: 100% !important;
  height: 340px;
  box-shadow: $shadow;

  @media (min-width: $laptop-screen) {
    height: 500px;
  }

  &__slide {
    display: flex;
    width: 100%;

    &__img {
      width: calc(50% / 1.6);
      height: 100%;
      object-fit: cover;

      @media (min-width: $laptop-screen) {
        width: calc(50% / 0.8);
      }

      //   @media (min-width: $desktop-screen) {
      //     width: 50%;
      //   }
    }

    &__wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      gap: 1rem;
      padding: 1rem;
      width: 100%;
      height: 100%;

      @media (min-width: $laptop-screen) {
        padding: 2rem;
        gap: 2rem;
      }

      @media (min-width: $desktop-screen) {
        padding: 4rem;
      }

      &__txt {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        justify-content: center;
        color: $primary-color;

        &__title {
          font-size: 1.5rem;
          font-weight: 800;

          @media (min-width: $tablet-screen) {
            font-size: 2rem;
          }

          @media (min-width: $laptop-screen) {
            font-size: 2.5rem;
          }
        }

        &__sub-title {
          font-weight: 300;

          @media (min-width: $tablet-screen) {
            font-size: 1.25rem;
          }

          @media (min-width: $desktop-screen) {
            font-size: 1.5rem;
          }
        }
      }
      &__button {
        display: flex;
        padding: 0.75rem 2rem;
        gap: 1rem;
        color: $primary-color;
        border: 2px solid $primary-color;
        border-radius: $radius;
        animation: slide-from-left 0.6s;
        line-height: 1.5rem;
        transition: transform 0.4s ease;

        &:hover {
          transform: scale(1.04);
        }

        &__icon {
          width: 22px;
          background-color: $primary-color;
          transform: rotate(180deg);
          padding: 0.25rem;
          border-radius: $radius;
        }
      }
    }
  }
}
</style>
