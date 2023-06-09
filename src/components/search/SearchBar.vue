<script setup>
import { debounce } from '@/utils/debounce'
import { ref } from 'vue'

const search = debounce(async e => {
  const query = e.target.value

  emit('search', query)
}, 500)

const emit = defineEmits(['search', 'toggleOverlay', 'sort'])

const optionSelected = ref('')
</script>

<template>
  <div class="container">
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
      <button class="search__filters" @click="emit('toggleOverlay')" aria-label="filtres">
        <img src="@/assets/icons/filters.svg" alt="icone filtrer" />
      </button>
    </div>

    <div class="sort">
      <button
        class="sort__option"
        :class="{ 'sort__option--selected': optionSelected === 'PRICEASC' }"
        @click=";(optionSelected = 'PRICEASC'), emit('sort', 'PRICE-ASC')"
        aria-label="prix croissant"
      >
        Prix croissant
      </button>
      <button
        class="sort__option"
        :class="{ 'sort__option--selected': optionSelected === 'PRICEDESC' }"
        @click=";(optionSelected = 'PRICEDESC'), emit('sort', 'PRICE-DESC')"
        aria-label="prix décroissant"
      >
        Prix décroissant
      </button>
      <button
        class="sort__option"
        :class="{ 'sort__option--selected': optionSelected === 'BESTSELLINGASC' }"
        @click=";(optionSelected = 'BESTSELLINGASC'), emit('sort', 'BEST_SELLING-ASC')"
        aria-label="popularité"
      >
        Popularité
      </button>
      <button
        class="sort__option"
        :class="{ 'sort__option--selected': optionSelected === 'CREATEDATDESC' }"
        @click=";(optionSelected = 'CREATEDATDESC'), emit('sort', 'CREATED_AT-DESC')"
        aria-label="nouveautés"
      >
        Nouveautés
      </button>
      <button
        class="sort__option"
        :class="{ 'sort__option--selected': optionSelected === 'TITLEASC' }"
        @click=";(optionSelected = 'TITLEASC'), emit('sort', 'TITLE-ASC')"
        aria-label="ordre alphabétique"
      >
        De A à Z
      </button>
      <button
        class="sort__option"
        :class="{ 'sort__option--selected': optionSelected === 'TITLEDESC' }"
        @click=";(optionSelected = 'TITLEDESC'), emit('sort', 'TITLE-DESC')"
        aria-label="ordre alphabétique inversé"
      >
        De Z à A
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 0 1rem;
  align-items: center;

  .search {
    display: flex;
    width: 100%;
    border-radius: $radius;
    gap: 0.5rem;
    max-width: 674px;

    @media (min-width: $laptop-screen) {
      max-width: 904px;
    }

    @media (min-width: $desktop-screen) {
      max-width: 1134px;
    }

    @media (min-width: $super-big-screen) {
      max-width: 1364px;
    }

    &__field {
      display: flex;
      align-items: center;
      width: 100%;
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
    width: 100%;
    display: flex;
    gap: 0.5rem;
    overflow: scroll;

    @media (min-width: $tablet-screen) {
      justify-content: center;
    }

    &__option {
      cursor: pointer;
      display: flex;
      align-items: center;
      outline: 0px;
      border-radius: $radius;
      padding: 0.5rem 1rem;
      box-shadow: $shadow;
      background-color: $primary-color;
      font-weight: 300;
      font-size: 0.75rem;
      text-align: center;
      color: $text-color;
      border: 2px solid transparent;
      height: fit-content;
      white-space: nowrap;
      transition: background-color 0.2s ease, border-color 0.2s ease;

      &--selected {
        border: $selected-color 2px solid;
        background-color: $selected-background-color;
      }
    }
  }
}
</style>
