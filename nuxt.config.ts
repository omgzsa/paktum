import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },

  runtimeConfig: {
    paktumApiUrl: process.env.NUXT_PAKTUM_API_URL,
    public: {
      //
    },
  },

  colorMode: {
    preference: "light",
    fallback: "system",
  },

  devtools: {
    enabled: true,
  },

  modules: [
    "@nuxt/ui",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "@vee-validate/nuxt",
    "@pinia/nuxt",
    "@formkit/auto-animate",
  ],

  googleFonts: {
    families: {
      Poppins: [100, 200, 300, 400, 500, 600, 700],
    },
    // download: true,
  },

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "~/tailwind.config.js",
  },

  compatibilityDate: "2024-07-19",
});
