// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: false,
  srcDir: 'src/',
  css: ['@/styles/global.scss'],
  modules: ['@pinia/nuxt'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/_variables.scss";',
        },
      },
    },
  },
})
