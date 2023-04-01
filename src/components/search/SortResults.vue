<script setup>
import { client } from '@/services/shopify'
client.collection.fetchWithProducts(collectionId).then(collection => {
  // Do something with the collection
  console.log(collection)
})
</script>

<template><div></div></template>
