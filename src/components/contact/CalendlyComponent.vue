<script setup>
const options = {
  url: 'https://calendly.com/tekilawebfactory/30min',
}
</script>
<template>
  <CalendlyInlineWidget v-bind="options" class="calendly-inline-widget" />
</template>
<style lang="scss" scoped>
.calendly-inline-widget {
  height: 100vh !important;
  width: 100% !important;
}
</style>
