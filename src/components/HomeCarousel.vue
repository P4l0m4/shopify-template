<script setup>
const story = await useAsyncStoryblok('carousel', { version: 'draft' })
// META TAGS
const metaTitle = ref('Sample Shop, cosmétique naturelle et équitable')
const metaDescription = ref(
  "Découvrez l'avenir de la cosmétique naturelle et équitable avec nos produits ultra nourissants formulés sans allergènes et sans perturbateurs endocriniens."
)

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
  <header>
    <StoryblokComponent v-if="story" :blok="story.content" />
  </header>
</template>
