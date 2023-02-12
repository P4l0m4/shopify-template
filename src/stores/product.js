import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => {
    return {
      product: null,
      productVariant: null,
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
  },
})
