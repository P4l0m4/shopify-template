import { defineStore } from 'pinia'
import { client } from '@/services/shopify'

export const useProductStore = defineStore('product', {
  state: () => {
    return {
      product: null,
      productVariant: null,
      productsSearched: [],
      searchQuery: '',
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
    async searchProducts(query) {
      this.searchQuery = query
      const products = await client.product.fetchQuery({ first: 20, query })
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
    async applyFilter(filters) {
      let query = ''
      if (filters.price) {
        query += `variants.price:>=${filters.price.min} variants.price:<=${filters.price.max}`
      }
      const products = await client.product.fetchQuery({
        query,
      })
      this.productsSearched = JSON.parse(JSON.stringify(products))
    },
  },
})
