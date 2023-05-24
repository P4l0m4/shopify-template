<script setup>
import InfiniteSlideBar from 'vue3-infinite-slide-bar'
import { ref, onMounted } from 'vue'

const props = defineProps({ blok: Object })
let code = ref('')
let message = ref(props.blok.message)

function copy() {
  navigator.clipboard.writeText(code.value)
  message.value = 'Code copié dans le presse-papier'
  code.value = ''
  setTimeout(() => {
    message.value = props.blok.message
    code.value = props.blok.promo_code
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
      <button
        :style="{ 'background-color': blok.color }"
        style="padding-left: 168px !important"
        @click="copy()"
        aria-label="copier le code promo"
      >
        {{ message }} <span v-if="code">{{ code }}</span></button
      ><button :style="{ 'background-color': blok.color }" @click="copy()" aria-label="copier le code promo">
        {{ message }} <span v-if="code">{{ code }}</span></button
      ><button :style="{ 'background-color': blok.color }" @click="copy()" aria-label="copier le code promo">
        {{ message }} <span v-if="code">{{ code }}</span></button
      ><button :style="{ 'background-color': blok.color }" @click="copy()" aria-label="copier le code promo">
        {{ message }} <span v-if="code">{{ code }}</span>
      </button>
    </div>
  </infinite-slide-bar>
</template>
<style lang="scss" scoped>
.infinite-slide-bar {
  &__component {
    display: flex;
    gap: 14rem;
    height: 36px;
    align-items: center;

    & button {
      height: 36px;
      color: #fffdfa;
      padding: 0 !important;
      font-size: 14px;
      font-family: 'Rubik', sans-serif;
      font-weight: 300;
      cursor: pointer;
      align-items: center;

      & span {
        font-size: 0.75rem;
        font-weight: 300;
      }
    }
  }
}
</style>
