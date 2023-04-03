<script setup>
import { ref } from 'vue'
let code = ref('6193AX310NH5')
function copy() {
  navigator.clipboard.writeText('6193AX310NH5')
  this.code = 'Code copié ✔️'
  setTimeout(() => {
    this.code = '6193AX310NH5'
  }, 1000)
}
</script>
<template>
  <footer>
    <span>©nomdushop 2023</span>
    <nuxt-link to="/">Mentions légales</nuxt-link>
    <!-- <div class="pokeball">
      <AnimationsPokeballAnimation class="pokeball2" />
      <div class="pokeball__toaster" @click="copy()">{{ code }}</div>
    </div> -->
  </footer>
</template>
<style lang="scss" scoped>
footer {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  width: 100%;
  position: relative;
  padding: 0 1rem;
  font-size: 0.75rem;

  & .pokeball {
    display: flex;
    width: 200px;
    position: absolute;
    bottom: -90px;
    left: 0;
    right: 0;
    margin: auto;
    animation: fall 3s ease-in;

    @media (min-width: $tablet-screen) {
      bottom: -60px;
    }

    &:hover > .pokeball__toaster {
      opacity: 1;
    }

    &__toaster {
      transition: opacity 0.4s ease;
      opacity: 0;
      justify-content: center;
      align-items: center;
      position: absolute;
      margin: auto;
      top: -80px;
      bottom: 0;
      right: 0;
      left: 0;
      padding: 8px 32px;
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: 6px;
      display: flex;
      height: fit-content;
      width: fit-content;
      gap: 8px;
      cursor: pointer;
    }

    @keyframes fall {
      0% {
        transform: translateY(-3000px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
  & .pokeball2 {
    cursor: pointer;
    animation: shake 1.25s cubic-bezier(0.36, 0.07, 0.19, 0.97) 1s infinite;

    @keyframes shake {
      0% {
        transform: translate(0, 0) rotate(0);
      }
      20% {
        transform: translate(-10px, 0) rotate(-20deg);
      }
      30% {
        transform: translate(10px, 0) rotate(20deg);
      }
      50% {
        transform: translate(-10px, 0) rotate(-10deg);
      }
      60% {
        transform: translate(10px, 0) rotate(10deg);
      }
      100% {
        transform: translate(0, 0) rotate(0);
      }
    }
  }
}
</style>
