<script setup>
const story = await useAsyncStoryblok('promotion', { version: 'draft' })
</script>

<template>
  <header class="container__header">
    <StoryblokComponent v-if="story !== undefined" :blok="story.content" />
    <NavigationComponent />
  </header>
</template>
<style scoped lang="scss">
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 2;
}
</style>
