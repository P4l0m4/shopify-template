<template>
  <div class="calendly">
    <a class="calendly__link button-secondary" href="https://calendly.com/tekilawebfactory/30min">
      Prendre RDV en ligne
    </a>
  </div>
</template>

<style lang="scss" scoped>
.calendly {
  width: clamp(300px, 100%, 660px);
  &__link {
    width: 100%;
  }
}
</style>

<!-- <script setup>
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
  overflow: hidden !important;
  border-radius: $radius;
}
</style> -->
<!-- <script lang="ts" setup>
const rootElement = ref()
const options = {
  url: 'https://calendly.com/tekilawebfactory/30min',
  text: 'Schedule time with me',
}
</script> -->
<!-- <template>
  <CalendlyPopupButton v-bind="options" :root-element="rootElement" /> -->
<!-- Can be any element -->
<!-- <div ref="rootElement" />
</template> -->
