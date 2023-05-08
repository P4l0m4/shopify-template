// https://nuxt.com/docs/api/configuration/nuxt-config

import { getProductPages } from './src/utils/sitemap.js'

export default defineNuxtConfig({
  ssr: false,
  srcDir: 'src/',
  css: ['@/styles/global.scss'],
  modules: [
    '@pinia/nuxt',
    'nuxt-calendly',
    'nuxt-simple-sitemap',
    ['@storyblok/nuxt', { accessToken: 'HywsRInkperCxQGCRiQGhAtt' }],
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/_variables.scss";',
        },
      },
    },
  },
  sitemap: {
    sitemaps: true,
    siteUrl: 'https://nuxt3-shopify-template.netlify.app',
    urls: async () => {
      return await getProductPages()
    },
  },
})
