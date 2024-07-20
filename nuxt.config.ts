import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  runtimeConfig: {
    // gtagKey: process.env.NUXT_GTAG_KEY,
    public: {
      //
    }
  },

  colorMode: {
    preference: 'light',
    fallback: 'system',
  },

  devtools: {
    enabled: true,
  },

  modules: [
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@vee-validate/nuxt',
    '@pinia/nuxt',
  ],

  googleFonts: {
    families: {
      Poppins: [100, 200, 300, 500, 700],
    },
    // download: true,
  },

  compatibilityDate: '2024-07-19',
})