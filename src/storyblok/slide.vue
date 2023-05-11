<template>
  <swiper-slide class="swiper" :style="'background-color:' + blok.background_color">
    <NuxtLink
      :href="blok.button.url"
      v-editable="blok"
      class="swiper__slide"
      :style="'background-image: url(' + blok?.image.filename + ')'"
    >
      <div
        class="swiper__slide__wrapper"
        :style="'background: linear-gradient(270deg, rgba(255,253,250,0) 0%, ' + blok.background_color + ' 40%);'"
      >
        <div class="swiper__slide__wrapper__txt">
          <h3 class="swiper__slide__wrapper__txt__title">{{ blok.title }}</h3>
          <p class="swiper__slide__wrapper__txt__sub-title">{{ blok.subtitle }}</p>
        </div>
        <NuxtLink class="swiper__slide__wrapper__button" :href="blok.button.url"
          >{{ blok.button_name }}
          <img class="swiper__slide__wrapper__button__icon icon" src="@/assets/icons/next.svg" alt="icon"
        /></NuxtLink></div
    ></NuxtLink>
  </swiper-slide>
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
    height: 560px;
  }

  &__slide {
    display: flex;
    width: 100%;
    background-repeat: no-repeat;
    background-position: left;
    background-size: 100vw 340px;
    height: 340px;

    @media (min-width: $tablet-screen) {
      background-position: right;
      background-size: 400px 340px;
    }
    @media (min-width: $laptop-screen) {
      height: 560px;
      background-size: 720px 560px;
    }
    @media (min-width: $super-big-screen) {
      background-size: 1020px 560px;
    }

    &__wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1.5rem;
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
        max-width: 800px;

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
          line-height: 1.4;

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
        padding: 0.75rem 1.75rem;
        gap: 1rem;
        color: $primary-color;
        border: 2px solid $primary-color;
        border-radius: $radius;
        animation: slide-from-left 0.6s;
        line-height: 1.5rem;
        justify-content: center;
        transition: transform 0.4s ease;
        width: fit-content;
        margin-left: auto;

        &:hover {
          transform: scale(1.04);
        }

        @media (min-width: $tablet-screen) {
          padding: 0.75rem 2rem;
          margin-left: initial;
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
