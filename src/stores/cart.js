import { defineStore } from 'pinia'
import { groupBy } from '@/utils/groupBy.js'

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      cart: JSON.parse(localStorage.getItem('cart')) ?? [],
    }
  },
  actions: {
    addProductToCart(product, variant) {
      const fullProduct = variant
        ? { ...variant, productName: product.title, productDescription: product.description }
        : product
      this.cart.push(fullProduct)
      this.cart.sort((a, b) => a.title.localeCompare(b.title))
      saveCartToLocalStorage(this.cart)
    },
    removeProductFromCart(title) {
      this.cart = this.cart.filter(product => product.title !== title)
      saveCartToLocalStorage(this.cart)
    },
    removeOneProductFromCart(title) {
      const productIndex = this.cart.findIndex(product => product.title === title)
      if (productIndex !== -1) {
        this.cart.splice(productIndex, 1)
      }
      saveCartToLocalStorage(this.cart)
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
function saveCartToLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart))
}
