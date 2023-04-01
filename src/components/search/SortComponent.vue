<script setup>
import { ref } from 'vue'
import { client } from '@/services/shopify'

let toggleCollection = ref(false)

// client.collection.fetchWithProducts('gid://shopify/Collection/489838543115').then(collection => {
//   // Do something with the collection
//   console.log(collection)
// })
const collections = []

collections.push(client.collection.fetchAll())

console.log(collections)
</script>
<template>
  <section class="sort">
    <button
      v-for="collection in collections"
      :key="collection"
      @click="toggleCollection = !toggleCollection"
      :class="{ 'sort__button--selected': toggleCollection === true }"
      class="sort__button"
    >
      <img class="icon" src="@/assets/icons/lightning-bolt.svg" alt="" />{{ collection.title }}
    </button>
  </section>
</template>
<style lang="scss" scoped>
.sort {
  display: flex;
  gap: 0.5rem;
  border: red solid 2px;

  &__button {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    border-radius: $radius;
    background-color: $primary-color;
    box-shadow: $shadow;
    font-weight: 100;
    font-size: 0.75rem;
    border: transparent 2px solid;

    &--selected {
      border: $selected-color 2px solid;
    }
  }
}
</style>
