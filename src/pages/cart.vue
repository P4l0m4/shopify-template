<script setup>
import { useCartStore } from '@/stores/cart'

// Store
const cartStore = useCartStore()

function subTotal(items) {
  const price = items.reduce((total, item) => total + item.price.amount * 1, 0)
  return Math.round(price * 100) / 100
}
</script>
<template>
  <div class="container">
    <h1>Votre panier</h1>
    <section class="cart">
      <div class="cart__products" v-if="cartStore.cart.length > 0">
        <div class="cart__products__product" v-for="items in cartStore.cartGroupBy" :key="items[0].id">
          <nuxt-link to="/"><img class="cart__products__product__img" :src="items[0].image.src" alt="" /></nuxt-link>
          <div class="cart__products__product__description">
            <p class="cart__products__product__description__title">{{ items[0].productName }}</p>
            <p class="cart__products__product__description__variant">{{ items[0].title }}</p>

            <div class="cart__products__product__description__price">
              <p>Prix à l'unité :</p>
              <span>{{ items[0].price.amount * 1 }} €</span>
            </div>
            <div class="cart__products__product__description__price">
              <p>Prix total :</p>
              <span>{{ subTotal(items) }} €</span>
            </div>
            <div class="cart__products__product__description__price">
              <p>Quantité :</p>
              <button class="button-quantity" @click="cartStore.removeOneProductFromCart(items[0].title)">-</button>
              <span>{{ items.length }}</span>
              <button class="button-quantity" @click="cartStore.addProductToCart(items[0])">+</button>
            </div>
            <div class="cart__products__product__description__price">
              <button class="button-secondary" @click="cartStore.removeProductFromCart(items[0].title)">
                Supprimer le produit
              </button>
            </div>
          </div>
        </div>
        <div class="cart__products__total-price">
          <p>Prix total TTC :</p>
          <span>{{ cartStore.cartTotal }} €</span>
        </div>
        <button class="button-primary">Passer ma commande</button>
      </div>
      <div class="cart__empty" v-else>
        <span class="cart__empty__txt">Votre panier est vide</span>
        <nuxt-link class="button-primary" to="/">Commencer mon shopping</nuxt-link>
      </div>
    </section>
    <ProductsPropositions />
  </div>
</template>

<style lang="scss" scoped>
.button-quantity {
  display: flex;
  justify-content: center;
  padding: 4px;
  background-color: transparent;
  border: none;
  font-weight: 600;
  font-size: 20px;
  cursor: pointer;
}
.container {
  display: flex;
  flex-direction: column;
  gap: 64px;
}
.cart {
  display: flex;
  flex-direction: column;
  gap: 32px;
  justify-content: center;
  align-items: center;

  &__products {
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: flex-end;
    justify-content: flex-end;

    &__product {
      display: flex;
      width: 100%;
      justify-content: space-between;
      gap: 32px;
      padding: 16px;
      background-color: $primary-color;
      border-radius: 6px;

      &__img {
        width: clamp(100px, 100%, 200px);
      }

      &__description {
        display: flex;
        gap: 8px;
        flex-direction: column;

        &__title {
          font-size: 20px;
        }
        &__price {
          display: flex;
          justify-content: flex-end;
          gap: 16px;

          & span {
            opacity: 4;
          }
        }
      }
    }

    &__total-price {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
    }
  }

  &__empty {
    width: fit-content;
    padding: 16px;
    background-color: $primary-color;
    display: flex;
    align-items: center;
    gap: 16px;
    flex-direction: column;
    border-radius: 6px;
  }
}
</style>
