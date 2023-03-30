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
    <img class="search__icon" src="@/assets/icons/search.svg" alt="" />
    <input class="search__input" type="search" id="site-search" name="q" placeholder="Rechercher" @input="search" />
  </div>
</template>
<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  width: clamp(300px, 100%, 600px);
  box-shadow: $shadow;
  border-radius: $radius;
  padding: 0.25rem 0.5rem;

  &__icon {
    width: 20px;
  }

  &__input {
    width: 100%;
    padding: 0.25rem;
    border: 1px solid transparent;
  }
}
</style>
