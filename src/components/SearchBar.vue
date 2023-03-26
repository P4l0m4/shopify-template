<script setup>
import { debounce } from '../utils/debounce'
import { useProductStore } from '@/stores/product'

// Store
const productStore = useProductStore()

const search = debounce(async e => {
  const query = e.target.value

  await productStore.searchProducts(query)
}, 500)
</script>

<template>
  <div class="search">
    <input class="search__input" type="search" id="site-search" name="q" placeholder="🔍Rechercher" @input="search" />
  </div>
</template>
<style lang="scss" scoped>
.search {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: clamp(300px, 100%, 600px);

  &__input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    background-color: transparent;
    border: 2px solid $text-color;
    caret-color: $secondary-color;
    color: $text-color;

    &:focus {
      border: 2px solid $secondary-color;
      outline: $secondary-color;
    }
  }
  /* Change the white to any color */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px $base-color inset !important;
  }

  /*Change text in autofill textbox*/
  input:-webkit-autofill {
    -webkit-text-fill-color: $text-color !important;
  }
}
</style>
