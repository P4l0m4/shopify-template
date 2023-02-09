<template>
  <div class="container">
    <HeaderComponent />
    <main><slot /></main>
  </div>
</template>
<script></script>
<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  padding: 64px;
  gap: 128px;
  align-items: center;
}
</style>
