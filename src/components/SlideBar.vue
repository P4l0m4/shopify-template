<script setup>
import InfiniteSlideBar from 'vue3-infinite-slide-bar'
import { ref } from 'vue'
const story = await useAsyncStoryblok('home', { version: 'draft' })

let code = ref('R2Y6ZYGPRZ8G')
let message = ref("Livraison gratuite dès 40€ d'achats avec le code")
function copy() {
  navigator.clipboard.writeText(code.value)
  message.value = 'Code copié ✔️'
  setTimeout(() => {
    message.value = "Livraison gratuite dès 40€ d'achats avec le code"
  }, 1000)
}
console.log(story)
</script>

<template>
  <infinite-slide-bar :barStyle="{ background: '#333333' }" :duration="'128s'" class="infinite-slide-bar">
    <div class="infinite-slide-bar__component">
      <button style="padding-left: 168px !important" @click="copy()">{{ message }} {{ code }}</button
      ><button @click="copy()">{{ message }} {{ code }}</button><button @click="copy()">{{ message }} {{ code }}</button
      ><button @click="copy()">{{ message }} {{ code }}</button>
      <!-- <StoryblokComponent v-if="story" :blok="story.content" /> -->
    </div>
  </infinite-slide-bar>
</template>
<style lang="scss" scoped>
.infinite-slide-bar {
  &__component {
    display: flex;
    gap: 14rem;

    & button {
      background: #333333;
      color: #fffdfa;
      padding: 0.5rem 0 !important;
      font-size: 14px;
      font-family: 'Rubik', sans-serif;
      font-weight: 200;
      cursor: pointer;
    }
  }
}
</style>
