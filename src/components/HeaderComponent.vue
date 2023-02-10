<template>
  <header>
    <div class="logo">
      <nuxt-link to="/"><img src="@/assets/images/logo.svg" alt="logo pokemon" class="logo__img" /></nuxt-link>
    </div>
    <nav>
      <NuxtLink to="/">Boutique Pokemon</NuxtLink>
      <NuxtLink to="/cart">Panier</NuxtLink>
    </nav>
  </header>
</template>

<style scoped lang="scss">
header {
  width: 100%;
  display: flex;

  .logo {
    display: flex;
    width: 100%;
    &__img {
      width: 160px;
    }
  }

  & nav {
    justify-content: flex-end;
    width: 100%;
    display: flex;
    gap: 32px;

    .router-link-exact-active {
      color: $secondary-color !important;
    }
  }
}
</style>
