import { defineStore } from 'pinia'
import { client } from '@/services/shopify'

export const useInfoStore = defineStore('info', {
  state: () => {
    return {
      info: null,
      policies: null,
    }
  },
  actions: {
    async getInfo() {
      const info = await client.shop.fetchInfo()
      this.info = JSON.parse(JSON.stringify(info))
      const policies = await client.shop.fetchPolicies()
      this.policies = JSON.parse(JSON.stringify(policies))
    },
  },
})
