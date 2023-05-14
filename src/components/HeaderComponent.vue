<script setup>
const story = await useAsyncStoryblok('carousel', { version: 'draft' })
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
  </header>
</template>
