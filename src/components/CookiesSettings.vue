<script setup>
import { ref } from 'vue'
const areCookiesEnabled = ref(true)
const closeNotice = ref(false)

function exit() {
  closeNotice.value = true
}

function clearCookies() {
  document.cookie = ''
  console.log('cookies:' + document.cookie)
  areCookiesEnabled.value = false
  exit()
}

const props = defineProps({ cookie: Object })
console.log(props.blok)
</script>
<template>
  <div class="cookies">
    <div class="cookies__notice" v-if="!closeNotice">
      <div class="cookies__notice__content">
        <div class="cookies__notice__content__txt">
          <span class="cookies__notice__content__txt__title"
            >Auriez-vous la gentillesse de nous laisser utiliser des cookies ?</span
          >
          <p>
            Nous utilisons des cookies pour mesurer l'efficacité des campagnes marketing, détecter les bugs éventuels,
            personnaliser le contenu du site et mieux connaître notre audience.
          </p>
          <span class="cookies__notice__content__txt__policy"
            >Pour en savoir plus, consultez notre
            <NuxtLink :to="cookie.cookies_policy.filename" class="cookies__notice__content__txt__policy__link"
              >politique des cookies</NuxtLink
            >.</span
          >
        </div>
        <div class="cookies__notice__content__buttons">
          <button class="button-primary" @click="clearCookies" aria-label="désactiver les cookies">Désactiver</button>
          <button class="button-primary" @click="exit" aria-label="activer les cookies">Activer</button>
        </div>
      </div>
    </div>
    <span v-if="areCookiesEnabled">Les cookies sont activés</span>
    <span v-if="!areCookiesEnabled">Les cookies sont désactivés</span>
    <button
      class="cookies__button button-primary"
      v-if="areCookiesEnabled"
      @click="areCookiesEnabled = false"
      aria-label="désactiver les cookies"
    >
      Désactiver
    </button>
    <button
      class="cookies__button button-primary"
      v-else
      @click="areCookiesEnabled = true"
      aria-label="activer les cookies"
    >
      Activer
    </button>
  </div>
</template>
<style lang="scss" scoped>
.cookies {
  display: flex;
  gap: 1rem;
  align-items: center;
  position: relative;

  &__notice {
    padding: 1rem;
    width: 100vw;
    height: 100vh;
    position: fixed;
    inset: 0;
    display: flex;
    margin: auto;
    z-index: 2;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(16px);
    background-color: rgb(0, 0, 0, 0.1);
    animation: fading 0.8s ease;

    &__content {
      display: flex;
      padding: 2rem;
      flex-direction: column;
      gap: 1rem;
      background-color: $primary-color;
      align-items: center;
      border-radius: $radius;
      justify-content: center;
      width: clamp(200px, 100%, 500px);

      &__txt {
        font-size: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        &__title {
          font-size: 1.25rem;
          font-weight: 600;
        }

        &__policy {
          font-size: 0.75rem;
          &__link {
            text-decoration: underline;
          }
        }
      }

      &__buttons {
        display: flex;
        gap: 1rem;
        width: 100%;

        & button {
          width: 100%;
        }
      }
    }
  }

  &__button {
    font-size: 0.75rem;
    border: 1px solid $text-color;
    padding: 0.25rem 0.5rem;
  }
}
</style>
