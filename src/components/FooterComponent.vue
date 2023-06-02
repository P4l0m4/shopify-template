<script setup>
import { useInfoStore } from '@/stores/info'
import { ref } from 'vue'

// TESTING
const infoStore = useInfoStore()
await infoStore.getInfo()
let info = infoStore.info

//IN PROGRESS
let year = new Date().getFullYear()

const story = await useAsyncStoryblok('documents', { version: 'draft' })

const showCookieModal = ref(false)
setTimeout(() => {
  showCookieModal.value = true
}, 10000)
</script>

<template>
  <footer class="footer">
    <!-- <CookiesSettings :cookie="story.content" v-if="showCookieModal" /> -->
    <div class="footer__site-links">
      <nuxt-link to="/" class="footer__document">Accueil</nuxt-link>
      <nuxt-link to="/boutique" class="footer__document">Boutique</nuxt-link>
      <nuxt-link to="/favoris" class="footer__document">Favoris</nuxt-link>
      <nuxt-link to="/contact" class="footer__document">Contact</nuxt-link>
    </div>

    <div class="footer__others">
      <span>©{{ info.name }} {{ year }}</span>
      <StoryblokComponent v-if="story" :blok="story.content" />
    </div>

    <div class="footer__icons">
      <a class="footer__icons__link" href="#" aria-label="lien vers la page facebook"
        ><img class="footer__icons__link__icon" src="@/assets/icons/facebook.svg" alt="icon" /></a
      ><a class="footer__icons__link" href="#" aria-label="lien vers la page linkedin"
        ><img class="footer__icons__link__icon" src="@/assets/icons/linkedin.svg" alt="icon" /></a
      ><a class="footer__icons__link" href="#" aria-label="lien vers la page instagram"
        ><img class="footer__icons__link__icon" src="@/assets/icons/instagram.svg" alt="icon"
      /></a>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
.footer {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
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
    justify-content: center;
    flex-wrap: wrap;
  }

  &__icons {
    display: flex;
    gap: 0.5rem;

    &__link {
      &__icon {
        width: 26px;
        height: 26px;
      }
    }
  }
}
</style>
