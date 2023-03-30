<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <nav>
    <button><img class="icon" src="@/assets/icons/menu.svg" alt="search icon" /></button>
    <nuxt-link to="/" class="logo"><img src="@/assets/images/logo.svg" alt="logo" class="logo__img" /></nuxt-link>
    <NuxtLink to="/search"><img class="icon" src="@/assets/icons/search.svg" alt="search icon" /></NuxtLink>
    <NuxtLink to="/cart">
      <div class="link__cart">
        <img class="link__cart__img" src="@/assets/icons/shopping-outline.svg" alt="" /><span
          class="link__cart__number"
          v-if="cartStore.checkout && cartStore.checkout.lineItems.length > 0"
        >
          {{ cartStore.itemQuantity }}
        </span>
      </div>
    </NuxtLink>
  </nav>
</template>

<style scoped lang="scss">
nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  background-color: $primary-color;
  padding: 1rem;
  box-shadow: $shadow;
  position: fixed;
  top: 0;

  & .logo {
    display: flex;
    width: 80px;

    @media (min-width: $tablet-screen) {
      width: 100%;
    }

    &__img {
      width: 100%;

      @media (min-width: $tablet-screen) {
        width: 160px;
      }
    }
  }

  .link {
    display: flex;
    gap: 4px;
    align-items: flex-start;

    &__cart {
      display: flex;
      position: relative;
      width: fit-content;

      &__img {
        width: 20px;
      }

      &__number {
        height: 14px;
        width: 14px;
        background-color: $secondary-color;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        color: $primary-color;
        font-weight: 600;
        position: absolute;
        right: -4px;
        top: -4px;
      }
    }

    .router-link-exact-active {
      color: $secondary-color !important;
    }
  }
}
</style>
