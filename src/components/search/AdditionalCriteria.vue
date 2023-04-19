<script setup>
import { client } from '@/services/shopify'

const filtered = await client.product.fetchQuery({ first: 20, sortKey: 'PRICE', reverse: false })

console.log(filtered)
</script>
<template><div class="test-filters"></div></template>
<style lang="scss" scoped>
.test-filters {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}
</style>
