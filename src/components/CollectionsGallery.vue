<script setup>
defineProps({ collections: Array })
</script>
<template>
  <section class="collections">
    <NuxtLink class="collections__collection" to="/" v-for="collection in collections" :key="collection.id">
      <img class="collections__collection__img" :src="collection.image.src" :alt="collection.image.handle" />
      <div class="collections__collection__txt">
        <h3 class="collections__collection__txt__title">{{ collection.title }}</h3>
        <p class="collections__collection__txt__description">{{ collection.description }}</p>
        <NuxtLink to="/" class="collections__collection__txt__button button-primary">Voir la collection</NuxtLink>
      </div>
    </NuxtLink>
  </section>
</template>
<style scoped lang="scss">
.collections {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  padding: 1rem;

  @media (min-width: $tablet-screen) {
    gap: 4rem;
    justify-content: center;
  }

  &__collection {
    display: flex;
    align-items: flex-end;
    height: 300px;
    width: clamp(240px, 100%, 600px);
    background-color: $primary-color;
    box-shadow: $shadow;
    border-radius: $radius;

    &__img {
      width: 30%;
      height: 100%;
      object-fit: cover;
      border-radius: $radius 0 0 $radius;
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
        font-size: 0.75rem;
        max-height: 180px;

        @media (min-width: $tablet-screen) {
          font-size: 1rem;
        }
      }

      &__button {
        padding: 1rem 2rem;
        @media (min-width: $tablet-screen) {
          width: fit-content;
        }
      }
    }
  }
}
</style>
