import { defineStore } from 'pinia'
import { client } from '@/services/shopify'
import { groupBy } from '@/utils/groupBy.js'

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      checkoutId: JSON.parse(localStorage.getItem('checkoutId')) ?? null,
      checkout: null,
    }
  },
  actions: {
    async addProductToCart(variant) {
      const checkout = await client.checkout.addLineItems(this.checkoutId, { variantId: variant.id, quantity: 1 })
      this.checkout = JSON.parse(JSON.stringify(checkout))
    },
    async removeProductFromCart(variant) {
      const checkout = await client.checkout.removeLineItems(this.checkoutId, variant.id)
      this.checkout = JSON.parse(JSON.stringify(checkout))
    },
    async removeOneProductFromCart(variant) {
      const checkout = await client.checkout.updateLineItems(this.checkoutId, {
        id: variant.id,
        quantity: variant.quantity - 1,
      })
      this.checkout = JSON.parse(JSON.stringify(checkout))
    },
    setCheckout(checkout) {
      saveItemToLocalStorage('checkoutId', checkout.id)
      this.checkoutId = checkout.id
      this.checkout = JSON.parse(JSON.stringify(checkout))
    },
    async createCheckout() {
      const checkoutId = this.checkoutId

      if (checkoutId) {
        const checkout = await client.checkout.fetch(checkoutId)
        this.setCheckout(checkout)
      } else {
        const checkout = await client.checkout.create()
        this.setCheckout(checkout)
      }
    },
  },
  getters: {
    itemQuantity() {
      return this.checkout.lineItems.reduce((total, item) => total + item.quantity, 0)
    },
  },
})
function saveItemToLocalStorage(key, content) {
  localStorage.setItem(key, JSON.stringify(content))
}
