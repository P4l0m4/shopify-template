<script setup>
import { useCartStore } from '@/stores/cart'

// Store
const cartStore = useCartStore()

const loading = ref(false)

loading.value = true
cartStore.createCheckout()
loading.value = false

function subTotal(items) {
  const price = items.reduce((total, item) => total + item.price.amount * 1, 0)
  return Math.round(price * 100) / 100
}
</script>
<template>
  <div class="container">
    <h1>Votre panier</h1>
    <section class="cart" v-if="!loading">
      <div class="cart__products" v-if="cartStore.checkout && cartStore.checkout.lineItems.length > 0">
        <div class="cart__products__product" v-for="item in cartStore.checkout.lineItems" :key="item.id">
          <nuxt-link to="/" class="cart__products__product__card"
            ><img class="cart__products__product__card__img" :src="item.variant.image.src" alt=""
          /></nuxt-link>
          <div class="cart__products__product__description">
            <div class="cart__products__product__description__txt">
              <div class="cart__products__product__description__txt__title">
                <p>
                  {{ item.title }}
                </p>
                <span>{{ item.variant.price.amount * 1 }} €</span>
              </div>

              <p class="cart__products__product__description__txt__variant">{{ item.variant.title }}</p>
            </div>

            <div class="cart__products__product__description__quantity">
              <div class="cart__products__product__description__quantity__buttons">
                <button
                  class="cart__products__product__description__quantity__buttons__button"
                  @click="cartStore.removeOneProductFromCart(item)"
                >
                  -
                </button>
                <span>{{ item.quantity }}</span>
                <button
                  class="cart__products__product__description__quantity__buttons__button"
                  @click="cartStore.addProductToCart(item.variant)"
                >
                  +
                </button>
              </div>
            </div>
            <div class="cart__products__product__description__price">
              <p>Prix total :</p>
              <span>{{ item.quantity * item.variant.price.amount }} €</span>
            </div>

            <div class="cart__products__product__description__price">
              <button class="button-secondary" @click="cartStore.removeProductFromCart(item)">
                Supprimer le produit
              </button>
            </div>
          </div>
        </div>
        <ShipmentComponent />
        <div class="cart__products__total-price">
          <p>Prix total TTC :</p>
          <span>{{ cartStore.checkout.paymentDue.amount * 1 }} €</span>
        </div>
        <a :href="cartStore.checkout.webUrl" class="button-primary">Passer ma commande</a>
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
  width: clamp(100px, 100%, 1000px);
  align-items: center;

  &__products {
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: flex-end;
    justify-content: flex-end;

    &__product {
      width: 100%;
      display: flex;
      gap: 16px;
      border-radius: 6px;

      @media (min-width: $tablet-screen) {
        gap: 32px;
        background-color: $primary-color;
        padding: 16px;
      }

      &__card {
        display: flex;
        width: 100px;
        @media (min-width: $tablet-screen) {
          width: clamp(100px, 100%, 400px);
        }

        &__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
            font-size: 14px;
            display: flex;
            gap: 16px;
            justify-content: space-between;
            width: (100px, 100%, 300px);

            @media (min-width: $desktop-screen) {
              font-size: 20px;
            }

            & span {
              opacity: 0.4 !important;
              font-size: 14px;
              white-space: nowrap;
              @media (min-width: $desktop-screen) {
                font-size: 16px;
              }
            }
          }
          &__variant,
          &__details {
            font-size: 12px;
            max-width: 400px;
            @media (min-width: $desktop-screen) {
              font-size: 16px;
            }
          }
          &__details {
            display: none;
            @media (min-width: $tablet-screen) {
              display: block;
            }
          }
        }

        &__price {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          font-size: 14px;
          @media (min-width: $desktop-screen) {
            font-size: 16px;
          }
        }

        & span {
          opacity: 4;
        }

        &__quantity {
          display: flex;
          gap: 16px;
          font-size: 14px;
          flex-direction: column;
          @media (min-width: $tablet-screen) {
            font-size: 16px;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
          }

          & span {
            opacity: 4;
          }

          &__buttons {
            width: 100%;
            display: flex;
            gap: 16px;
            justify-content: flex-end;

            &__button {
              height: fit-content;
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
