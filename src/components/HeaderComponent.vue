<template>
  <header class="header">
    <div class="header__txt">
      <h1 class="header__txt__title">HERO TITLE</h1>
      <h2 class="header__txt__subtitle">Hero subtitle lorem ipsum</h2>
    </div>
    <NuxtLink class="header__button" to="/shop"
      >Voir la collection <img class="header__button__icon icon" src="@/assets/icons/next.svg" alt=""
    /></NuxtLink>
  </header>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 2rem;
  padding: 1rem;
  background-image: url('@/assets/images/hero-image.png');
  &__txt {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 0.5rem;
    &__title {
      font-size: 2rem;
      color: $primary-color;
      font-weight: 800;
      width: 100%;
    }
    &__subtitle {
      font-size: 1.5rem;
      color: $primary-color;
      font-weight: 300;
      font-family: 'Rubik', sans-serif;
      width: 100%;
    }
  }

  &__button {
    display: flex;
    padding: 1rem 2rem;
    gap: 1rem;
    color: $primary-color;
    border: 2px solid $primary-color;
    border-radius: $radius;
    width: fit-content;

    &__icon {
      width: 22px;
      background-color: $primary-color;
      transform: rotate(180deg);
      padding: 0.25rem;
    }
  }
}
</style>
