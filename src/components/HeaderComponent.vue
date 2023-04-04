<template>
  <header class="header">
    <div class="header__wrapper">
      <div class="header__wrapper__txt">
        <h1 class="header__wrapper__txt__title">HERO TITLE</h1>
        <h2 class="header__wrapper__txt__subtitle">Hero subtitle lorem ipsum</h2>
      </div>
      <NuxtLink class="header__wrapper__button" to="/shop"
        >Voir la collection <img class="header__wrapper__button__icon icon" src="@/assets/icons/next.svg" alt=""
      /></NuxtLink>
    </div>
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
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-image: linear-gradient(to top, rgba(0, 121, 42, 0.3), rgba(0, 34, 5, 0.3)),
    url('@/assets/images/mosaic-banner.png');

  @media (min-width: $tablet-screen) {
    height: 300px;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: flex-end;
    justify-content: center;
    width: clamp(300px, 100%, 540px);

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

        @media (min-width: $tablet-screen) {
          font-size: 3rem;
        }
      }
      &__subtitle {
        font-size: 1.5rem;
        color: $primary-color;
        font-weight: 300;
        font-family: 'Rubik', sans-serif;
        width: 100%;
        @media (min-width: $tablet-screen) {
          font-size: 2rem;
        }
      }
    }

    &__button {
      display: flex;
      padding: 1rem 2rem;
      gap: 1rem;
      color: $primary-color;
      border: 2px solid $primary-color;
      border-radius: $radius;
      animation: slide-from-left 0.6s;

      &__icon {
        width: 22px;
        background-color: $primary-color;
        transform: rotate(180deg);
        padding: 0.25rem;
        border-radius: $radius;
      }
    }
  }
}
</style>
