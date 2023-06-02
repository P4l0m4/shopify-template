<script setup>
const props = defineProps({ blok: Object })
</script>
<template>
  <section class="sections-sous-produit">
    <StoryblokComponent v-for="blok in blok.Section" :key="blok._uid" :blok="blok" />
  </section>
</template>
<style scoped lang="scss">
.sections-sous-produit {
  gap: 4rem;
  padding: 1rem;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: $tablet-screen) {
    gap: 8rem;
    padding: 4rem;
  }
  background-color: $primary-color;
}
</style>
