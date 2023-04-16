<script setup>
import InfiniteSlideBar from 'vue3-infinite-slide-bar'
import { ref } from 'vue'
// import { client } from '@/services/shopify'

let code = ref('AK24AQJECV3G')
function copy() {
  navigator.clipboard.writeText(code)
  this.code = 'Code copié ✔️'
  setTimeout(() => {
    this.code = 'AK24AQJECV3G'
  }, 1000)
}
</script>

<template>
  <infinite-slide-bar :barStyle="{ background: '#333333' }" :duration="'60s'" class="infinite-slide-bar">
    <div class="infinite-slide-bar__component">
      <button style="padding-left: 128px" @click="copy()">
        livraison gratuite dès 40€ d'achats avec le code {{ code }}</button
      ><button @click="copy()">Livraison gratuite dès 40€ d'achats avec le code {{ code }}</button
      ><button @click="copy()">Livraison gratuite dès 40€ d'achats avec le code {{ code }}</button
      ><button @click="copy()">Livraison gratuite dès 40€ d'achats avec le code {{ code }}</button>
    </div>
  </infinite-slide-bar>
</template>
<style lang="scss" scoped>
.infinite-slide-bar {
  &__component {
    display: flex;
    gap: 8px;

    & button {
      background: #333333;
      color: #fffdfa;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
  }
}
</style>
