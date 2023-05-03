<script setup>
import { COLLECTION_PATH } from '@/config/url'

defineProps({ collections: Array })
</script>
<template>
  <section class="collections">
    <NuxtLink
      class="collections__collection"
      :to="`/${COLLECTION_PATH}${collection.handle}`"
      v-for="collection in collections"
      :key="collection.id"
    >
      <img class="collections__collection__img" :src="collection.image.src" :alt="collection.image.handle" />
      <div class="collections__collection__txt">
        <h2 class="collections__collection__txt__title">{{ collection.title }}</h2>
        <p class="collections__collection__txt__description">{{ collection.description }}</p>
        <NuxtLink
          :to="`/${COLLECTION_PATH}${collection.handle}`"
          class="collections__collection__txt__button button-primary"
          >Voir la collection</NuxtLink
        >
      </div>
    </NuxtLink>
  </section>
</template>
<style scoped lang="scss">
.collections {
  gap: 2rem;
  grid-gap: 2rem;
  padding: 0 1rem;
  width: 100vw;
  max-width: 2000px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: $tablet-screen) {
    place-items: center;
  }
  @media (min-width: $laptop-screen) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: $super-big-screen) {
    grid-template-columns: repeat(4, 1fr);
  }

  &__collection {
    display: flex;
    align-items: flex-end;
    height: clamp(240px, 100%, 600px);
    width: clamp(343px, 100%, 600px);
    background-color: $primary-color;
    border-radius: calc($radius / 2);
    overflow: hidden;

    &__img {
      width: 40%;
      height: clamp(240px, 100%, 600px);
      object-fit: cover;
    }
    &__txt {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      height: 100%;
      justify-content: flex-end;
      align-items: flex-end;

      &__title {
        font-size: 1rem;
        width: 100%;

        @media (min-width: $tablet-screen) {
          font-size: 1.5rem;
        }
      }

      &__description {
        overflow-y: hidden;
        width: 100%;
        max-height: 300px;
        height: 100%;
      }

      &__button {
        padding: 1rem;
        width: 100%;
        @media (min-width: $tablet-screen) {
          width: fit-content;
          padding: 1rem 2rem;
        }
      }
    }
  }
}
</style>
