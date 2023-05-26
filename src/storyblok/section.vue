<script setup>
const props = defineProps({ blok: Object })
</script>
<template>
  <div class="section">
    <img :src="blok.image.filename" :alt="blok.image.alt" />
    <div class="section__txt">
      <h2 class="section__txt__title">{{ blok.title }}</h2>
      <p class="section__txt__subtitle">{{ blok.subtitle }}</p>
    </div>
  </div>
</template>
<style scoped lang="scss">
.section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  display: flex;
  max-width: 800px;
  overflow: hidden;
  color: $primary-color;
  justify-content: space-between;
  flex-direction: column;

  @media (min-width: $laptop-screen) {
    padding: 0;
    flex-direction: row;
    border-radius: 0;
    gap: 2rem;
    &:nth-child(2n) {
      flex-direction: row-reverse;
    }
  }

  & img {
    width: 100%;
    max-width: 340px;
    height: 340px;
    object-fit: cover;
    border-radius: calc($radius / 2);
  }

  &__txt {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    color: $text-color;
    max-width: 340px;

    @media (min-width: $laptop-screen) {
      max-width: 440px;
    }

    &__title {
      font-size: 1.25rem;
      width: 100%;
      font-weight: 600;

      @media (min-width: $laptop-screen) {
        font-size: 1.5rem;
      }
    }

    &__subtitle {
      overflow-y: hidden;
      max-height: 400px;
    }
  }
}
</style>
