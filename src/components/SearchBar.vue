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
  </div>
</template>
<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  width: clamp(200px, 100%, 600px);
  border-radius: $radius;
  padding: 0 1rem;

  &__field {
    display: flex;
    align-items: center;
    width: clamp(200px, 100%, 600px);
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
}
</style>
