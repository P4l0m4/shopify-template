<script setup>
import { ref } from 'vue'
import { client } from '@/services/shopify'

let selectedCollections = ref([])

const collections = await client.collection.fetchAll()

console.log(collections)

function selectCollections(collection) {
  selectedCollections.value.push(collection)
  console.log(selectedCollections.value)
}
</script>
<template>
  <section class="sort">
    <button
      v-for="collection in collections"
      :key="collection"
      @click="selectCollections(collection)"
      :class="{ 'sort__button--selected': selectedCollections.collection }"
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
  width: 100%;
  overflow: scroll;

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
