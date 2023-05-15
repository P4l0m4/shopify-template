<script setup>
import { useCartStore } from '@/stores/cart'
import { ref } from 'vue'

const cartStore = useCartStore()

const isMenuOpen = ref(false)

const story = await useAsyncStoryblok('logo', { version: 'draft' })
</script>

<template>
  <nav>
    <MenuOverlay :isMenuOpen="isMenuOpen" @close="isMenuOpen = false" />

    <button @click="isMenuOpen = true" class="link menu">
      <img class="icon" src="@/assets/icons/menu.svg" alt="menu icon" />
    </button>

    <nuxt-link to="/" class="logo"><StoryblokComponent v-if="story" :blok="story.content" /></nuxt-link>

    <div class="wrapper">
      <NuxtLink exact to="/boutique" class="link"
        ><img class="icon" src="@/assets/icons/search.svg" alt="search icon" /><span class="desktop-only"
          >Boutique</span
        ></NuxtLink
      >
      <NuxtLink to="/favoris" class="link desktop-only"
        ><img class="icon" src="@/assets/icons/heart.svg" alt="search icon" />Favoris</NuxtLink
      ><NuxtLink to="/contact" class="link desktop-only"
        ><img class="icon" src="@/assets/icons/mail.svg" alt="search icon" />Contact</NuxtLink
      >

      <NuxtLink to="/panier" class="link">
        <div class="link__cart">
          <img class="link__cart__img" src="@/assets/icons/bag.svg" alt="" /><span
            class="link__cart__number"
            v-if="cartStore.checkout && cartStore.checkout.lineItems.length > 0"
          >
            {{ cartStore.itemQuantity }}
          </span>
        </div>
        <span class="desktop-only">Panier</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.router-link-exact-active {
  background-color: $selected-color;
}

nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  background-color: $primary-color;
  padding: 0.5rem;
  box-shadow: $shadow;
  position: relative;

  @media (min-width: $laptop-screen) {
    padding: 1rem 2rem;
  }

  .desktop-only {
    display: none !important;

    @media (min-width: $laptop-screen) {
      display: flex !important;
    }
  }

  .wrapper {
    display: flex;
    gap: 1rem;
  }

  .menu {
    display: flex;

    @media (min-width: $laptop-screen) {
      display: none !important;
    }
  }

  & .logo {
    display: flex;
    width: 80px;
    border-radius: 0;
    position: absolute;
    inset: 0;
    margin: auto;
    background-color: $primary-color !important;

    @media (min-width: $tablet-screen) {
      width: 160px;
    }

    @media (min-width: $laptop-screen) {
      margin: initial;
      inset: initial;
      position: initial;
    }
  }

  .link {
    display: flex;
    gap: 0.25rem;
    padding: 0.5rem;
    align-items: center;
    border-radius: $radius;
    transition: background-color 0.4s ease;

    &__cart {
      display: flex;
      position: relative;
      width: fit-content;

      &__img {
        width: 20px;
      }

      &__number {
        height: 16px;
        background-color: $text-color;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 4px;
        color: $primary-color;
        font-weight: 300;
        position: absolute;
        right: -6px;
        top: -6px;
        font-size: 0.75rem;
      }
    }

    .router-link-exact-active {
      color: $text-color !important;
    }
  }
}
</style>
