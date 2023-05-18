<script setup>
import { useProductStore } from '@/stores/product'
import { ref } from 'vue'

// META TAGS
const metaTitle = ref('Boutique')
const metaDescription = ref('Hero subtitle lorem ipsum dolor sit amet, consequitur sit elit.')

useHead({
  title: metaTitle,
  meta: [
    {
      name: 'description',
      content: metaDescription,
    },
  ],
})

// Store
const productStore = useProductStore()

let selectedCollections = ref([])

const filteredProducts = computed(() => {
  if (selectedCollections.value.length > 0) {
    const collectionsProducts = productStore.collections.reduce((products, collection) => {
      if (selectedCollections.value.includes(collection.handle)) {
        products.push(...collection.products)
      }
      return products
    }, [])

    return productStore.productsSearched.filter(product => {
      return collectionsProducts.find(cProduct => cProduct.id === product.id)
    })
  }
  return productStore.productsSearched
})

async function applySearch(query, option) {
  if (query != null) {
    await productStore.setSearch(query)
  }
}

function filterProducts(collections) {
  selectedCollections.value = collections
}

const displayOverlay = ref(false)

function toggleOverlay() {
  displayOverlay.value = !displayOverlay.value
}

function applyFilter(filters) {
  productStore.setFilters(filters)
}

function applySort(options) {
  productStore.setSort(options)
}

// JSON-LD
const route = useRoute()
const pageSlug = route.params.slug

useJsonld(() => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',

  itemListElement: [
    {
      '@type': 'ListItem',
      position: 2,
      name: 'boutique',
      item: pageSlug,
    },
  ],
}))
</script>
<template>
  <section class="shop">
    <SearchBar @search="applySearch" @toggleOverlay="toggleOverlay" @sort="applySort" />

    <SearchAdditionalCriteria
      v-show="displayOverlay"
      @closeOverlay="toggleOverlay"
      @filter="applyFilter"
      :collections="productStore.collections"
      @collectionSelected="filterProducts"
    />
    <SearchResults :products="filteredProducts" :query="productStore.searchQuery" />
  </section>
</template>
<style lang="scss" scoped>
.shop {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem 0;
  align-items: center;
}
</style>
