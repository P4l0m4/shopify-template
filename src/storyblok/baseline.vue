<script setup>
const props = defineProps({ blok: Object })
</script>
<template>
  <span class="baseline" :style="{ 'background-color': blok.color }">{{ blok.baseline }}</span>
</template>
<style scoped lang="scss">
.baseline {
  width: 100%;
  padding: 3.5rem 1rem;
  font-size: 1.25rem;
  text-align: center;
  font-weight: 400;
  color: $text-color;

  @media (min-width: $tablet-screen) {
    font-size: 1.5rem;
  }
}
</style>
