<script setup>
const story = await useAsyncStoryblok('home', { version: 'draft' })
// META TAGS
const metaTitle = ref('Hero title')
const metaDescription = ref('Hero subtitle lorem ipsum dolor sit amet, consequitur sit elit.')

useHead({
  title: metaTitle,
  meta: [
    {
      name: 'description',
      content: metaDescription,
    },
  ],
})
</script>

<template>
  <header class="header">
    <StoryblokComponent v-if="story" :blok="story.content" />
    <!-- <div class="header__wrapper">
      <div class="header__wrapper__txt">
        <h1 class="header__wrapper__txt__title">{{ metaTitle }}</h1>
        <p class="header__wrapper__txt__subtitle">{{ metaDescription }}</p>
      </div>
      <NuxtLink class="header__wrapper__button" to="/boutique"
        >Boutique<img class="header__wrapper__button__icon icon" src="@/assets/icons/next.svg" alt=""
      /></NuxtLink>
    </div> -->
  </header>
</template>

<!-- <style scoped lang="scss">
.header {
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-image: linear-gradient(to top, rgba(0, 121, 42, 0.3), rgba(0, 34, 5, 0.3)),
    url('@/assets/images/mosaic-banner.png');

  @media (min-width: $tablet-screen) {
    height: 500px;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: flex-end;
    justify-content: center;
    width: clamp(300px, 100%, 600px);

    &__txt {
      display: flex;
      width: 100%;
      flex-direction: column;
      gap: 0.5rem;

      &__title {
        font-size: 2rem;
        color: $primary-color;
        font-weight: 800;
        width: 100%;

        @media (min-width: $tablet-screen) {
          font-size: 3rem;
        }
      }
      &__subtitle {
        font-size: 1.5rem;
        color: $primary-color;
        font-weight: 300;
        font-family: 'Rubik', sans-serif;
        width: 100%;
        @media (min-width: $tablet-screen) {
          font-size: 2rem;
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
</style> -->
