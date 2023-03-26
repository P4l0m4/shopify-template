<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <header>
    <div class="logo">
      <nuxt-link to="/"><img src="@/assets/images/logo.svg" alt="logo pokemon" class="logo__img" /></nuxt-link>
    </div>
    <nav>
      <NuxtLink to="/">Boutique</NuxtLink>
      <NuxtLink to="/cart" class="link">
        Panier
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
  </header>
</template>

<style scoped lang="scss">
header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background-color: $primary-color;
  padding: 16px;
  border-radius: $radius;
  @media (min-width: $tablet-screen) {
    flex-direction: row;
    justify-content: flex-end;
  }

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

  & nav {
    justify-content: center;
    display: flex;
    gap: 32px;
    @media (min-width: $tablet-screen) {
      justify-content: flex-end;
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
          color: black;
          font-weight: 600;
          position: absolute;
          right: -4px;
          top: -4px;
        }
      }
    }

    .router-link-exact-active {
      color: $secondary-color !important;
    }
  }
}
</style>
