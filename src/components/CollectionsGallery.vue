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
  gap: 2rem;
  align-items: center;
  padding: 1rem;
  flex-wrap: wrap;
  max-height: 800px;
  overflow: scroll;
  width: 100vw;
  max-width: 2000px;

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
    border-radius: calc($radius / 2);
    overflow: hidden;

    &__img {
      width: 40%;
      height: 100%;
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
