import { defineStore } from 'pinia'
import { client } from '@/services/shopify'

export const useProductStore = defineStore('product', {
  state: () => {
    return {
      product: null,
      productVariant: null,
      productsSearched: [],
      searchQuery: '',
    }
  },
  actions: {
    setProduct(product) {
      this.product = JSON.parse(JSON.stringify(product))
      this.setProductVariant(this.product.variants[0])
    },
    setProductVariant(variant) {
      this.productVariant = variant
    },
    async searchProducts(query) {
      this.searchQuery = query
      if (!query) {
        this.productsSearched = []
        return
      }
      const products = await client.product.fetchQuery({ first: 20, query })
      this.productsSearched = JSON.parse(JSON.stringify(products))
    },
  },
})
