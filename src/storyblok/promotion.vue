<script setup>
import InfiniteSlideBar from 'vue3-infinite-slide-bar'
import { ref, onMounted } from 'vue'

const props = defineProps({ blok: Object })
let code = ref('')
let message = ref(props.blok.message)

function copy() {
  navigator.clipboard.writeText(code.value)
  message.value = 'Code copié'
  setTimeout(() => {
    message.value = props.blok.message
  }, 1000)
}

onMounted(() => {
  if (props.blok.promo_code !== '' || props.blok.promo_code !== undefined || props.blok.promo_code !== null) {
    code.value = props.blok.promo_code
  }
})
</script>

<template>
  <infinite-slide-bar :barStyle="{ background: blok.color }" :duration="'128s'" class="infinite-slide-bar">
    <div class="infinite-slide-bar__component">
      <button style="padding-left: 168px !important" @click="copy()">{{ message }} {{ code }}</button
      ><button @click="copy()">{{ message }} {{ code }}</button><button @click="copy()">{{ message }} {{ code }}</button
      ><button @click="copy()">{{ message }} {{ code }}</button>
    </div>
  </infinite-slide-bar>
</template>
<style lang="scss" scoped>
.infinite-slide-bar {
  &__component {
    display: flex;
    gap: 14rem;

    & button {
      background: #333333;
      color: #fffdfa;
      padding: 0.5rem 0 !important;
      font-size: 14px;
      font-family: 'Rubik', sans-serif;
      font-weight: 200;
      cursor: pointer;
    }
  }
}
</style>
