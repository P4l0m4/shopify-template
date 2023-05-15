<script setup>
defineProps({ blok: Object })
</script>
<template>
  <nuxt-link :to="blok.CGV.filename" class="document">Mentions légales</nuxt-link>
  <nuxt-link :to="blok.legal_mentions.filename" class="document">CGV</nuxt-link>
  <nuxt-link :to="blok.cookies_policy.filename" class="document">Politique des cookies</nuxt-link>
</template>
<style scoped lang="scss">
.document {
  text-decoration: underline;
}
</style>
