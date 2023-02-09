<script setup>
import { client } from '@/services/shopify'

const route = useRoute()

const productSlug = route.params.slug

const product = await client.product.fetchByHandle(productSlug)
</script>

<template>
  <div>
    <h1>{{ product.title }}</h1>
    <img :src="product.images[0].src" />
    <SwiperComponent />
  </div>
</template>
