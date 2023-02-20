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
          <nuxt-link to="/" class="cart__products__product__card"
            ><img class="cart__products__product__card__img" :src="items[0].image.src" alt=""
          /></nuxt-link>
          <div class="cart__products__product__description">
            <div class="cart__products__product__description__txt">
              <p class="cart__products__product__description__txt__title">
                {{ items[0].productName }} <span>{{ items[0].price.amount * 1 }} €</span>
              </p>
              <p class="cart__products__product__description__txt__variant">{{ items[0].title }}</p>
            </div>

            <div class="cart__products__product__description__quantity">
              <p>Quantité :</p>
              <button
                class="cart__products__product__description__quantity__button"
                @click="cartStore.removeOneProductFromCart(items[0].title)"
              >
                -
              </button>
              <span>{{ items.length }}</span>
              <button
                class="cart__products__product__description__quantity__button"
                @click="cartStore.addProductToCart(items[0])"
              >
                +
              </button>
            </div>
            <div class="cart__products__product__description__price">
              <p>Prix total :</p>
              <span>{{ subTotal(items) }} €</span>
            </div>

            <div class="cart__products__product__description__price">
              <button class="button-secondary" @click="cartStore.removeProductFromCart(items[0].title)">
                Supprimer le produit
              </button>
            </div>
          </div>
        </div>
        <div class="cart__products__shipment"><p>Livraison</p></div>
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
.container {
  display: flex;
  flex-direction: column;
  gap: 64px;
  align-items: center;
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
      gap: 16px;
      padding: 16px;
      background-color: $primary-color;
      border-radius: 6px;

      @media (min-width: $desktop-screen) {
        gap: 32px;
      }

      &__card {
        display: flex;
        width: 60px;
        @media (min-width: $desktop-screen) {
          width: clamp(100px, 100%, 320px);
        }

        &__img {
          width: 60px;
          height: 60px;
          object-fit: cover;

          @media (min-width: $desktop-screen) {
            flex-direction: row;
            height: 100%;
            width: 100%;
          }
        }
      }

      &__description {
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: space-between;
        gap: 8px;

        &__txt {
          display: flex;
          flex-direction: column;
          gap: 8px;
          @media (min-width: $desktop-screen) {
            font-size: 20px;
          }

          &__title {
            font-size: 16px;
            display: flex;
            gap: 16px;
            justify-content: space-between;
            width: (100px, 100%, 300px);

            @media (min-width: $desktop-screen) {
              font-size: 20px;
            }

            & span {
              opacity: 0.4;
            }
          }
          &__variant {
            font-size: 12px;
            @media (min-width: $desktop-screen) {
              font-size: 16px;
            }
          }
        }

        &__price {
          display: flex;
          justify-content: flex-end;
          gap: 8px;

          & span {
            opacity: 4;
          }
        }
        &__quantity {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 16px;

          & span {
            opacity: 4;
          }

          &__button {
            display: flex;
            justify-content: center;
            padding: 0 8px;
            background-color: rgba(255, 255, 255, 0.2);
            border: none;
            font-weight: 600;
            font-size: 20px;
            cursor: pointer;
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
