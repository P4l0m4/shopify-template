<script setup>
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
</script>
<template>
  <div class="promo">
    <div class="promo__test">
      <div class="promo__test__wrapper">
        <input placeholder="Code promo" id="code" class="promo__test__wrapper__input" v-model="codeToTry" />
        <button class="promo__test__wrapper__button" type="submit" @click="cartStore.addPromoCode(codeToTry)">
          Tester
        </button>
      </div>
      <div class="promo__test__codes" v-if="cartStore.checkout.discountApplications?.length > 0">
        <span
          class="promo__test__codes__code"
          v-for="(discount, i) in cartStore.checkout.discountApplications"
          :key="i"
        >
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
      gap: 0.5rem;
      padding: 0.5rem;
      width: 100%;
      background-color: $primary-color;
      box-shadow: $shadow;
      border-radius: $radius;
      justify-content: space-between;

      &__input {
        padding: 8px;
        // background-color: $primary-color;
        outline: none;
        border: transparent 2px solid;
        width: clamp(100px, 100%, 375px);
        color: $text-color;
      }

      &__button {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px;
        background-color: $text-color;
        color: $primary-color;
        font-weight: 600;
        border: $text-color solid 2px;
        font-weight: 500;
        transition: transform 0.4s ease;
        &:hover {
          transform: scale(1.04);
        }
      }
    }

    &__codes {
      display: flex;
      gap: 0.5rem;
      flex-direction: column;

      &__code {
        font-size: 16px;
        display: flex;
        padding: 8px 16px;
        border: $promo-code-color solid 2px;
        color: $promo-code-color;
        font-weight: 500;
        justify-content: center;
        border-radius: $radius;
      }
    }
  }
  &__error {
    color: red;
    font-size: 16px;

    &__code {
      text-transform: uppercase;
      color: red;
    }
  }
}
</style>
