import { defineStore } from 'pinia'
import { client } from '@/services/shopify'

export const useInfoStore = defineStore('info', {
  state: () => {
    return {
      info: [],
    }
  },
  actions: {
    getInfo() {
      this.info.push(client.shop.fetchInfo())

      return this.info
    },
  },
})
