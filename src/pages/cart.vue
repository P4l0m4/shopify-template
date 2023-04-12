<script setup>
import { useCartStore } from '@/stores/cart'

// Store
const cartStore = useCartStore()

// function subTotal(items) {
//   const price = items.reduce((total, item) => total + item.price.amount * 1, 0)
//   return Math.round(price * 100) / 100
// }
const loading = ref({})

async function addProductToCart(product) {
  loading.value = {
    id: product.id,
    action: 'add',
  }
  await cartStore.addProductToCart(product)
  loading.value = {}
}

async function removeOneProductFromCart(item) {
  loading.value = {
    id: item.id,
    action: 'remove',
  }
  await cartStore.removeOneProductFromCart(item)
  loading.value = {}
}

const isMarkerOpen = ref(false)
</script>
<template>
  <div class="container">
    <section class="cart">
      <div class="cart__products" v-if="cartStore.checkout && cartStore.checkout.lineItems.length > 0">
        <div class="cart__products__product" v-for="item in cartStore.checkout.lineItems" :key="item.id">
          <nuxt-link to="/" class="cart__products__product__card"
            ><img class="cart__products__product__card__img" :src="item.variant.image.src" alt=""
          /></nuxt-link>
          <div class="cart__products__product__description">
            <div class="cart__products__product__description__txt">
              <p class="cart__products__product__description__txt__title">
                {{ item.title }}
              </p>
              <p class="cart__products__product__description__txt__variant">{{ item.variant.title }}</p>
            </div>

            <div class="cart__products__product__description__quantity">
              <span class="cart__products__product__description__txt__price"
                >{{ item.variant.price.amount * 1 }} €</span
              >
              <!-- <button
                class="cart__products__product__description__quantity__trash"
                @click="cartStore.removeProductFromCart(item)"
              >
                <img class="icon" src="@/assets/icons/trash.svg" alt="" />
              </button> -->
              <div class="cart__products__product__description__quantity__buttons">
                <button
                  class="cart__products__product__description__quantity__buttons__button cart__products__product__description__quantity__buttons__button--outline"
                  :disabled="loading.action === 'remove' && loading.id === item.id"
                  @click="removeOneProductFromCart(item)"
                >
                  <img class="icon" src="@/assets/icons/minus.svg" alt="" />
                </button>
                <span>{{ item.quantity }}</span>
                <button
                  class="cart__products__product__description__quantity__buttons__button cart__products__product__description__quantity__buttons__button--solid"
                  :disabled="loading.action === 'add' && loading.id === item.variant.id"
                  @click="addProductToCart(item.variant)"
                >
                  <img class="icon" src="@/assets/icons/plus.svg" alt="" />
                </button>
              </div>
            </div>
            <!-- <div class="cart__products__product__description__price">
              <p>Prix total :</p>
              <span>{{ item.quantity * item.variant.price.amount }} €</span>
            </div> -->
          </div>
        </div>
        <PromoCode />

        <div class="cart__products__price">
          <div class="cart__products__price__amounts">
            <p>Total TTC:</p>
            <span>{{ cartStore.checkout.paymentDue.amount * 1 }} €</span>
          </div>
          <div class="cart__products__price__amounts">
            <details>
              <summary @click="isMarkerOpen = !isMarkerOpen">
                <div class="wrapper">
                  Livraison<img
                    class="icon"
                    :class="{ 'icon--open': isMarkerOpen }"
                    src="@/assets/icons/next.svg"
                    alt=""
                  />
                </div>
                <span>0 €</span>
              </summary>
              <ShipmentComponent />
            </details>
          </div>
          <div class="cart__products__price__amounts">
            <p>Total :</p>
            <span>{{ cartStore.checkout.paymentDue.amount * 1 }} €</span>
          </div>
        </div>
        <a :href="cartStore.checkout.webUrl" class="cart__products__button button-primary">Passer ma commande</a>
      </div>
      <div class="cart__empty" v-else>
        <span class="cart__empty__txt">Votre panier est vide</span>
        <nuxt-link class="button-primary" to="/shop">Commencer mon shopping</nuxt-link>
      </div>
    </section>

    <h3 class="title">Nos best-sellers</h3>
    <ProductsPropositions />
    <FooterComponent />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}
.cart {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  width: clamp(100px, 100%, 800px);
  align-items: center;
  padding: 2rem 1rem;
  align-items: center;

  &__products {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: flex-end;
    justify-content: flex-end;

    &__product {
      width: 100%;
      display: flex;
      gap: 1rem;
      border-radius: $radius;

      &__card {
        display: flex;
        width: 100px;

        &__img {
          width: 70px;
          height: 70px;
          object-fit: contain;
        }
      }

      &__description {
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: space-between;

        &__txt {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;

          &__title {
            font-weight: 600;
          }

          &__variant {
            font-size: 0.75rem;
          }

          &__details {
            font-size: 12px;
            max-width: 400px;
          }
          &__price {
            font-size: 1.5rem;
            font-weight: 800;
          }
          &__details {
            display: none;
          }
        }

        &__price {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
          font-weight: 600;
        }

        &__quantity {
          display: flex;
          gap: 2rem;
          width: 100%;
          align-items: flex-end;
          justify-content: space-between;

          &__buttons {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            align-items: center;
            cursor: pointer;

            &__button {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 30px;
              height: 30px;
              border-radius: $radius;
              padding: 0.2rem;

              &:disabled {
                opacity: 0.5;
              }

              &--solid {
                background-color: $text-color;
              }

              &--outline {
                border: 2px solid $text-color;
              }
            }
          }
        }
      }
    }

    &__price {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;

      &__amounts {
        display: flex;
        justify-content: space-between;
        width: 100%;
        font-weight: 600;
        font-size: 0.75rem;
        &:nth-last-of-type(1) {
          font-size: 1rem;
        }

        & details {
          display: flex;
          width: 100%;
          gap: 1rem;

          & summary {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            .wrapper {
              display: flex;
              align-items: center;

              .icon {
                transform: rotate(270deg);
                display: flex;
                width: 16px;

                &--open {
                  transform: rotate(90deg);
                }
              }
            }
          }
        }
      }
    }

    &__button {
      width: 100%;
    }
  }

  &__empty {
    padding: 1rem;
    background-color: $primary-color;
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-direction: column;
    border-radius: $radius;
  }
}
</style>
