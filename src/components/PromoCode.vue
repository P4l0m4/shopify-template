<script setup>
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
</script>
<template>
  <div class="promo">
    <div class="promo__test">
      <div class="promo__test__wrapper">
        <input placeholder="Ajouter un code promo" id="code" class="promo__test__wrapper__input" v-model="codeToTry" />
        <button
          class="promo__test__wrapper__button button-secondary"
          type="submit"
          @click="cartStore.addPromoCode(codeToTry)"
          aria-label="tester code promo"
        >
          Tester
        </button>
      </div>
      <div class="promo__test__codes" v-if="cartStore.checkout.discountApplications?.length > 0">
        <span
          class="promo__test__codes__code"
          v-for="(discount, i) in cartStore.checkout.discountApplications"
          :key="i"
        >
          <img class="icon" src="@/assets/icons/tag.svg" alt="icone tag" />
          <span v-if="discount.__typename === 'DiscountCodeApplication'">
            {{ discount.code }}
          </span>
          <span v-else-if="discount.__typename === 'AutomaticDiscountApplication'">
            {{ discount.title }}
          </span>
        </span>
      </div>
    </div>
    <div class="promo__error" v-if="cartStore.checkout.userErrors?.length > 0">
      Le code <span class="promo__error__code">{{ codeToTry }}</span> est invalide.
    </div>
  </div>
</template>

<style lang="scss" scoped>
.promo {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;

  &__test {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    &__wrapper {
      display: flex;
      width: 100%;
      gap: 0.5rem;

      &__input {
        padding: 8px;
        background-color: $primary-color;
        box-shadow: $shadow;
        outline: none;
        border: $primary-color 2px solid;
        width: clamp(100px, 100%, 400px);
        color: $text-color;

        &:focus {
          border: 2px solid $primary-color;
          outline: $primary-color;
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px $primary-color inset !important;
          border: 2px solid $primary-color !important;
          outline: $primary-color !important;
        }
      }

      &__button {
        text-shadow: none;
        color: $text-color !important;
        background-color: red !important;
      }
    }

    &__codes {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;

      &__code {
        font-size: 0.75rem;
        display: flex;
        background-color: $selected-background-color;
        color: $selected-color-darker;
        border: 2px solid $selected-color;
        padding: 0.25rem 0.5rem;
        font-weight: 600;
        align-items: center;
        gap: 0.25rem;
        justify-content: center;
        border-radius: $radius;
        width: fit-content;

        .icon {
          height: 18px;
          cursor: none;
        }
      }
    }
  }
  &__error {
    color: #b80303;
    font-size: 0.75rem;

    &__code {
      text-transform: uppercase;
      color: #b80303;
    }
  }
}
</style>
