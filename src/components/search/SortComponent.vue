<script setup>
import { ref } from 'vue'

defineProps({ collections: Array })
const emit = defineEmits(['collectionSelected'])

let selectedCollections = ref([])

const isCollectionSelected = collection => {
  return selectedCollections.value.findIndex(c => c === collection.handle) !== -1
}

function selectCollection(collection) {
  if (isCollectionSelected(collection)) {
    selectedCollections.value = selectedCollections.value.filter(c => c !== collection.handle)
  } else {
    selectedCollections.value.push(collection.handle)
  }
  emit('collectionSelected', selectedCollections.value)
}
</script>
<template>
  <section class="sort">
    <button
      v-for="collection in collections"
      :key="collection.id"
      :class="{ 'sort__button--selected': isCollectionSelected(collection) }"
      class="sort__button"
      @click="selectCollection(collection)"
    >
      {{ collection.title }}
    </button>
  </section>
</template>

<style lang="scss" scoped>
.sort {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  overflow: scroll;
  padding: 0 1rem;

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
    color: $text-color;

    &--selected {
      border: $selected-color 2px solid;
    }
  }
}
</style>
