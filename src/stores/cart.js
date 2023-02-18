import { defineStore } from 'pinia'
import { groupBy } from '@/utils/groupBy.js'

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      cart: [],
    }
  },
  actions: {
    addProductToCart(product, variant) {
      const fullProduct = variant ? { ...variant, productName: product.title } : product
      this.cart.push(fullProduct)
      this.cart.sort((a, b) => a.title.localeCompare(b.title))
    },
    removeProductFromCart(title) {
      this.cart = this.cart.filter(product => product.title !== title)
    },
    removeOneProductFromCart(title) {
      const productIndex = this.cart.findIndex(product => product.title === title)
      if (productIndex !== -1) {
        this.cart.splice(productIndex, 1)
      }
    },
  },
  getters: {
    cartTotal() {
      const price = this.cart.reduce((total, variant) => total + variant.price.amount * 1, 0)
      return Math.round(price * 100) / 100
    },
    cartGroupBy() {
      return groupBy(this.cart, 'title')
    },
  },
})
