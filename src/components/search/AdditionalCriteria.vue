<script setup>
import { ref } from 'vue'

// const priceSortingSelected = ref('')
const emit = defineEmits(['closeOverlay', 'filter', 'collectionSelected'])

const minimumPrice = ref()
const maximumPrice = ref()

function setPrice() {
  const min = parseInt(minimumPrice.value)
  const max = parseInt(maximumPrice.value)
  const price = {
    min: min > max ? max : min,
    max: min > max ? min : max,
  }
  emit('filter', { price })
}

defineProps({ collections: Array })

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
  <Transition name="fade">
    <div class="overlay" @click="emit('closeOverlay')">
      <div class="overlay__drawer" @click.stop>
        <div class="overlay__drawer__group">
          <label>Prix</label>
          <div class="overlay__drawer__group__range">
            <input
              type="number"
              placeholder="min"
              v-model="minimumPrice"
              autofocus
              aria-label="prix minimum"
              @blur="setPrice"
            />

            <input
              type="number"
              placeholder="max"
              v-model="maximumPrice"
              autofocus
              aria-label="prix maximum"
              @blur="setPrice"
            />
          </div>
        </div>
        <div class="overlay__drawer__group">
          <div class="sort">
            <button
              v-for="collection in collections"
              :key="collection.id"
              :class="{ 'sort__button--selected': isCollectionSelected(collection) }"
              class="sort__button"
              @click="selectCollection(collection)"
            >
              {{ collection.title }}
            </button>
          </div>
        </div>
        <!-- <div class="overlay__drawer__group">
          Prix
          <div class="overlay__drawer__group__price">
            <button
              class="overlay__drawer__group__price__button"
              :class="{ 'overlay__drawer__group__price__button--selected': priceSortingSelected === 'high' }"
              @click.stop="priceSortingSelected = 'high'"
            >
              <img class="icon" src="@/assets/icons/high.svg" alt="" />
            </button>
            <button
              class="overlay__drawer__group__price__button"
              :class="{ 'overlay__drawer__group__price__button--selected': priceSortingSelected === 'low' }"
              @click.stop="priceSortingSelected = 'low'"
            >
              <img class="icon" src="@/assets/icons/low.svg" alt="" />
            </button>
          </div>
        </div> -->
      </div>
    </div></Transition
  >
</template>
<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  background: rgba(0, 0, 0, 0.1);
  z-index: 2;
  backdrop-filter: blur(16px);
  justify-content: flex-end;
  cursor: pointer;

  &__drawer {
    width: clamp(240px, 24%, 400px);
    height: 100%;
    background-color: $base-color;
    display: flex;
    padding: 4rem 1rem;
    flex-direction: column;
    gap: 2rem;
    animation: slide-from-right 0.2s;

    &__group {
      display: flex;
      font-size: 0.75rem;
      gap: 0.5rem;
      flex-direction: column;

      &__range {
        display: flex;
        gap: 0.5rem;

        & input {
          padding: 0.5rem;
          width: 100%;
          border: 1px solid transparent;
          box-shadow: $shadow;
          background-color: $primary-color;
        }
      }

      .sort {
        display: flex;
        gap: 0.5rem;
        width: clamp(300px, 100%, 800px);
        flex-wrap: wrap;

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
          cursor: pointer;

          &--selected {
            border: $selected-color 2px solid;
          }
        }
      }

      &__price {
        display: flex;
        width: 100%;
        justify-content: center;
        gap: 0.5rem;

        &__button {
          padding: 0.5rem;
          background-color: $primary-color;
          border-radius: calc($radius/2);
          box-shadow: $shadow;
          align-items: center;
          display: flex;
          cursor: pointer;

          &--selected {
            border: 2px solid $selected-color;
          }
        }
      }
    }
  }
}
</style>
