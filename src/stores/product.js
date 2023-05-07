import { defineStore } from 'pinia'
import { client } from '@/services/shopify'

export const useProductStore = defineStore('product', {
  state: () => {
    return {
      product: null,
      productVariant: null,
      productsSearched: [],
      search: '',
      filters: null,
      sort: null,
      collections: [],
    }
  },
  actions: {
    async getProduct(productSlug) {
      const product = await client.product.fetchByHandle(productSlug)
      this.product = JSON.parse(JSON.stringify(product))
      this.setProductVariant(this.product.variants[0])
    },
    setProductVariant(variant) {
      this.productVariant = variant
    },
    setSearch(search) {
      this.search = search
      this.searchProducts()
    },
    setFilters(filters) {
      this.filters = filters
      this.searchProducts()
    },
    setSort(options) {
      this.sort = options
      this.searchProducts()
    },
    async searchProducts() {
      let query = ''
      let sortKey = 'ID'
      let reverse = false

      if (this.filters?.price) {
        query += !isNaN(this.filters.price.min) ? `variants.price:>=${this.filters.price.min} ` : ''
        query += !isNaN(this.filters.price.max) ? `variants.price:<=${this.filters.price.max} ` : ''
      }
      if (this.search) {
        query += ` title:*${this.search}*`
      }
      if (this.sort) {
        sortKey = this.sort.split('-')[0]
        reverse = this.sort.split('-')[1] === 'DESC'
      }
      const products = await client.product.fetchQuery({
        query,
        sortKey,
        reverse,
      })
      this.productsSearched = JSON.parse(JSON.stringify(products))
    },
    async getCollectionsAndProducts() {
      const collectionsAndProducts = await client.collection.fetchAllWithProducts()
      this.collections = JSON.parse(JSON.stringify(collectionsAndProducts))
      this.productsSearched = this.collections.reduce((products, collection) => {
        products.push(...collection.products)
        return products
      }, [])
    },
  },
})
