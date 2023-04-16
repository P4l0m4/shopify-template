import { defineStore } from 'pinia'
import { client } from '@/services/shopify'

export const useInfoStore = defineStore('info', {
  state: () => {
    return {
      info: client.shop.fetchInfo(),
    }
  },
  actions: {},
})
