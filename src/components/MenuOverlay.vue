<script setup>
defineProps({ isMenuOpen: Boolean })
const emit = defineEmits(['close'])
</script>
<template>
  <Transition name="fade">
    <div v-show="isMenuOpen" class="menu" @click="emit('close')">
      <div class="menu__grid">
        <NuxtLink class="menu__grid__link" to="/" exact
          ><img src="@/assets/icons/home.svg" alt="" /><span>Accueil</span></NuxtLink
        >
        <NuxtLink class="menu__grid__link" to="/boutique" exact
          ><img src="@/assets/icons/shop.svg" alt="" /><span>Boutique</span></NuxtLink
        ><NuxtLink class="menu__grid__link" to="/contact" exact
          ><img src="@/assets/icons/mail.svg" alt="" /><span>Contact</span></NuxtLink
        ><NuxtLink class="menu__grid__link" to="/favoris" exact
          ><img src="@/assets/icons/heart.svg" alt="" /><span>Favoris</span></NuxtLink
        >
      </div>
    </div></Transition
  >
</template>
<style scoped lang="scss">
.router-link-exact-active {
  background-color: $selected-color;
}
.menu {
  position: fixed;
  backdrop-filter: blur(16px);
  inset: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;

  &__grid {
    gap: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    align-items: center;

    &__link {
      align-items: center;
      justify-content: center;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding: 1rem;
      background-color: $primary-color;
      border-radius: $radius;
      width: 90px;
      height: 90px;
      animation: slide-from-top 0.6s;
    }
  }
}
</style>
