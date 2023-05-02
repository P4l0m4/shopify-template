<script setup>
import { useInfoStore } from '@/stores/info'
import { client } from '@/services/shopify'
import { ref } from 'vue'

// TESTING
const infoStore = useInfoStore()
infoStore.getInfo()
console.log(infoStore.info)

//IN PROGRESS
let year = new Date().getFullYear()

const info = await client.shop.fetchInfo()
</script>

<template>
  <footer>
    <!-- <CookiesSettings /> -->
    <span>©{{ info.name }} {{ year }}</span>
    <nuxt-link to="/" class="mentions">Mentions légales</nuxt-link>
    <div class="icons">
      <a href="#"><img src="@/assets/icons/facebook.svg" alt="icon" /></a
      ><a href="#"><img src="@/assets/icons/linkedin.svg" alt="icon" /></a
      ><a href="#"><img src="@/assets/icons/instagram.svg" alt="icon" /></a>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
footer {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  position: relative;
  padding: 1rem 1rem 4rem 1rem;
  font-size: 0.75rem;
  flex-wrap: wrap;
  background-color: $primary-color;

  & .mentions {
    text-decoration: underline;
  }

  & .icons {
    display: flex;
    gap: 0.5rem;
  }
}
</style>
