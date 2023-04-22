<script setup>
import InfiniteSlideBar from 'vue3-infinite-slide-bar'
// import { ref } from 'vue'
// import { client } from '@/services/shopify'

// let code = ref('AK24AQJECV3G')
// function copy() {
//   navigator.clipboard.writeText(code)
//   this.code = 'Code copié ✔️'
//   setTimeout(() => {
//     this.code = 'AK24AQJECV3G'
//   }, 1000)
// }
</script>

<template>
  <infinite-slide-bar :barStyle="{ background: '#333333' }" :duration="'120s'" class="infinite-slide-bar">
    <div class="infinite-slide-bar__component">
      <button style="padding-left: 128px" @click="copy()">Livraison gratuite dès 40€ d'achats</button
      ><button @click="copy()">Livraison gratuite dès 40€ d'achats</button
      ><button @click="copy()">Livraison gratuite dès 40€ d'achats</button
      ><button @click="copy()">Livraison gratuite dès 40€ d'achats</button>
    </div>
  </infinite-slide-bar>
</template>
<style lang="scss" scoped>
.infinite-slide-bar {
  &__component {
    display: flex;
    gap: 10.5rem;

    & button {
      background: #333333;
      color: #fffdfa;
      border: none;
      padding: 0.5rem 0 !important;
      border-radius: 4px;
      font-size: 14px;
    }
  }
}
</style>
