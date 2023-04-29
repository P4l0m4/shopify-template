<script setup>
import { debounce } from '@/utils/debounce'

const search = debounce(async e => {
  const query = e.target.value

  emit('search', query)
}, 500)

const emit = defineEmits(['search', 'toggleOverlay', 'sort'])
</script>

<template>
  <section>
    <div class="search">
      <div class="search__field">
        <img class="search__field__icon" src="@/assets/icons/search.svg" alt="" />
        <input
          class="search__field__input"
          type="search"
          id="site-search"
          name="q"
          placeholder="Rechercher"
          @input="search"
          autofocus
        />
      </div>
      <button class="search__filters" @click="emit('toggleOverlay')">
        <img src="@/assets/icons/filters.svg" alt="" />
      </button>
    </div>
    <div class="sort">
      <select class="sort__select" aria-label="choisir une option de tri" @change="emit('sort', $event.target.value)">
        <option class="sort__select__option" value="">Options de tri</option>
        <option class="sort__select__option" value="PRICE-ASC">Prix croissant</option>
        <option class="sort__select__option" value="PRICE-DESC">Prix décroissant</option>
        <!-- <option class="sort__select__option" :value="{ key: 'TITLE', reverse: false }">Ordre alphabétique A-Z</option>
        <option class="sort__select__option" :value="{ key: 'TITLE', reverse: true }">Ordre alphabétique Z-A</option> -->
        <option class="sort__select__option" value="BEST_SELLING-ASC">Popularité</option>
        <option class="sort__select__option" value="CREATED_AT-DESC">Nouveauté</option>
      </select>
    </div>
  </section>
</template>
<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding: 0 1rem;

  .search {
    display: flex;
    width: clamp(200px, 100%, 800px);
    border-radius: $radius;
    gap: 0.5rem;

    &__field {
      display: flex;
      align-items: center;
      width: clamp(200px, 100%, 800px);
      box-shadow: $shadow;
      border-radius: $radius;
      padding: 0.25rem 0.5rem;
      background-color: $primary-color;

      &__icon {
        width: 20px;
      }

      &__input {
        width: 100%;
        padding: 0.25rem;
        border: 1px solid transparent;
      }
    }

    &__filters {
      padding: 0.5rem;
      background-color: $primary-color;
      border-radius: $radius;
      box-shadow: $shadow;
      align-items: center;
      display: flex;
      cursor: pointer;
    }
  }

  .sort {
    &__select {
      border-radius: $radius;
      display: flex;
      padding: 0.5rem;

      &__option {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
