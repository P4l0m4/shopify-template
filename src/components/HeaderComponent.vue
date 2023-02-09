<template>
  <header>
    <nav>
      <NuxtLink to="/">Boutique Pokemon</NuxtLink>
      <NuxtLink to="/cart">Panier</NuxtLink>
    </nav>
  </header>
</template>

<style scoped lang="scss">
header {
  width: 100%;

  & nav {
    justify-content: flex-end;
    width: 100%;
    display: flex;
    gap: 32px;

    .router-link-exact-active {
      color: yellow !important;
    }
  }
}
</style>
