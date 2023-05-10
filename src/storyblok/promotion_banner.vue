<template>
  <button>{{ block }}</button>
</template>
<script setup>
const props = defineProps({ blok: Object })
</script>
<style lang="scss" scoped>
button {
  background: #333333;
  color: #fffdfa;
  padding: 0.5rem 0 !important;
  font-size: 14px;
  font-family: 'Rubik', sans-serif;
  font-weight: 200;
  cursor: pointer;
}
</style>
```
