<script setup>
// import { useInfoStore } from '@/stores/info'
import { client } from '@/services/shopify'
import { ref } from 'vue'
// Store
// const infoStore = useInfoStore()
// console.log(infoStore.name)

let year = new Date().getFullYear()

const info = await client.shop.fetchInfo()

const image = await client
// console.log(image)
</script>

<template>
  <footer>
    <CookiesSettings />
    <span>©{{ info.name }} {{ year }}</span>
    <nuxt-link to="/" class="mentions">Mentions légales</nuxt-link>
  </footer>
</template>
<style lang="scss" scoped>
footer {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  width: 100%;
  position: relative;
  padding: 1rem 1rem 4rem 1rem;
  font-size: 0.75rem;
  flex-wrap: wrap;
  background-color: $primary-color;

  & .mentions {
    text-decoration: underline;
  }
}
</style>
