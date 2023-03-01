<script setup>
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
</script>
<template>
  <div class="promo">
    <label for="code">Code promo</label>
    <div class="promo__test">
      <input placeholder="Code promo" id="code" class="promo__test__input" v-model="codeToTry" />
      <button class="promo__test__button" type="submit" @click="cartStore.addPromoCode(codeToTry)">Tester</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.promo {
  display: flex;
  background-color: $primary-color;
  padding: 16px;
  flex-direction: column;
  gap: 32px;
  font-size: 20px;
  width: 100%;
  border-radius: 6px;

  &__test {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;

    &__input {
      padding: 8px;
      background-color: $primary-color;
      outline: none;
      border: white 2px solid;
      width: clamp(100px, 100%, 375px);
    }

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px;
      cursor: pointer;
      background-color: $secondary-color;
      color: black;
      font-weight: 600;
      border: $secondary-color solid 2px;
    }
  }
}
</style>
