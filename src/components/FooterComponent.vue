<script setup>
import { useInfoStore } from '@/stores/info'
import { ref } from 'vue'

// TESTING
const infoStore = useInfoStore()
await infoStore.getInfo()
let info = infoStore.info

//IN PROGRESS
let year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <!-- <CookiesSettings /> -->
    <div class="footer__site-links">
      <nuxt-link to="/" class="footer__document">Accueil</nuxt-link>
      <nuxt-link to="/boutique" class="footer__document">Boutique</nuxt-link>
      <nuxt-link to="/favoris" class="footer__document">Favoris</nuxt-link>
      <nuxt-link to="/contact" class="footer__document">Contact</nuxt-link>
    </div>

    <div class="footer__others">
      <span>©{{ info.name }} {{ year }}</span>
      <nuxt-link to="/" class="footer__others__document">Mentions légales</nuxt-link>
      <nuxt-link to="/" class="footer__others__document">CGV</nuxt-link>
    </div>

    <div class="footer__icons">
      <a href="#"><img src="@/assets/icons/facebook.svg" alt="icon" /></a
      ><a href="#"><img src="@/assets/icons/linkedin.svg" alt="icon" /></a
      ><a href="#"><img src="@/assets/icons/instagram.svg" alt="icon" /></a>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
.footer {
  display: flex;
  gap: 1.5rem;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  position: relative;
  padding: 1rem 1rem 4rem 1rem;
  font-size: 0.75rem;
  flex-wrap: wrap;
  background-color: $primary-color;

  &__site-links {
    display: flex;
    gap: 1rem;
    text-decoration: underline;
  }

  &__others {
    display: flex;
    gap: 1rem;
    align-items: center;

    &__document {
      text-decoration: underline;
    }
  }

  &__icons {
    display: flex;
    gap: 0.5rem;
  }
}
</style>
