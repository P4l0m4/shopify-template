// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: false,
  srcDir: 'src/',
  css: ['@/styles/global.scss'],
  modules: ['@pinia/nuxt', 'nuxt-calendly', 'nuxt-simple-sitemap'],

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
    siteUrl: 'nuxt3-shopify-template.netlify.app',
  },
  // app: {
  //   head: {
  //     script: [
  //       {
  //         children:
  //           '(function e(){var e=document.createElement("script");e.type="text/javascript",e.async=true,e.src="//staticw2.yotpo.com/H7DoxCRpWkKPSHcGkh13g0IIDfU32EHOplMuHvPb/widget.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)})();',
  //       },
  //     ],
  //   },
  // },
})
