// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: false,
  srcDir: 'src/',
  modules: [
    // ...
    '@pinia/nuxt',
  ],
  css: ['@/styles/global.scss'],
})
