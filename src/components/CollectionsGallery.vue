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
      <div class="collections__collection__txt">
        <h2 class="collections__collection__txt__title">{{ collection.title }}</h2>
        <p class="collections__collection__txt__description">{{ collection.description }}</p>
        <NuxtLink
          :to="`/${COLLECTION_PATH}${collection.handle}`"
          class="collections__collection__txt__button button-primary"
          >Voir la collection</NuxtLink
        >
      </div>
      <img class="collections__collection__img" :src="collection.image.src" :alt="collection.image.altText" />
    </NuxtLink>
  </section>
</template>
<style scoped lang="scss">
.collections {
  gap: 4rem;
  padding: 0 1rem;
  max-width: 2000px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: $tablet-screen) {
    gap: 8rem;
  }

  &__collection {
    display: flex;
    gap: 2rem;
    max-width: 800px;
    overflow: hidden;
    color: $primary-color;
    justify-content: space-between;
    flex-direction: column-reverse;
    background-color: $primary-color;
    border-radius: calc($radius/2);
    padding: 1rem;

    @media (min-width: $laptop-screen) {
      padding: 0;
      background-color: transparent;
      flex-direction: row;
      border-radius: 0;
      &:nth-child(2n) {
        flex-direction: row-reverse;
      }
    }

    &__img {
      width: 100%;
      max-width: 340px;
      height: 340px;
      object-fit: cover;
      border-radius: calc($radius / 2);

      @media (min-width: $tablet-screen) {
        border-radius: calc($radius / 4);
        box-shadow: $shadow;
      }
    }
    &__txt {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: flex-end;
      justify-content: center;
      color: $text-color;
      max-width: 340px;

      @media (min-width: $laptop-screen) {
        padding: 1rem;
        max-width: 440px;
      }

      &__title {
        font-size: 1.25rem;
        width: 100%;
        font-weight: 600;

        @media (min-width: $tablet-screen) {
          font-size: 1.5rem;
        }
      }

      &__description {
        overflow-y: hidden;
        max-height: 400px;
      }

      &__button {
        margin-top: 1rem;
        animation: slide-from-left 0.6s;
        line-height: 1.5rem;
        transition: transform 0.4s ease;

        &:hover {
          transform: scale(1.04);
        }

        @media (min-width: $tablet-screen) {
          padding: 0.75rem 2rem;
          margin-left: initial;
        }
      }
    }
  }
}
</style>
