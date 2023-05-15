<script setup>
defineProps({ blok: Object })
</script>
<template>
  <img :src="blok.logo.filename" :alt="blok.logo.alt" class="logo" />
</template>
<style scoped lang="scss">
.logo {
  width: 100%;
}
</style>
