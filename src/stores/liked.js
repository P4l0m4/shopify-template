import { defineStore } from 'pinia'

export const useLikedStore = defineStore('liked', {
  state: () => ({
    productsLiked: JSON.parse(localStorage.getItem('productsLiked')) ?? [],
  }),
  actions: {
    async addProductToLiked(product) {
      if (this.isProductLiked(product)) {
        this.productsLiked = this.productsLiked.filter(p => p.id !== product.id)
      } else {
        this.productsLiked.push(product)
      }
      saveItemToLocalStorage('productsLiked', this.productsLiked)
    },
  },
  getters: {
    isProductLiked: state => {
      return product => state.productsLiked.findIndex(p => p.id === product.id) !== -1
    },
  },
})

function saveItemToLocalStorage(key, content) {
  localStorage.setItem(key, JSON.stringify(content))
}
