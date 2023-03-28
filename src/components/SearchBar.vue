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
    border: 2px solid $text-color;
  }
}
</style>
