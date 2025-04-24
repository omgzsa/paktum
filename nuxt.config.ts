export default defineNuxtConfig({
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        layoutTransition: { name: 'layout', mode: 'out-in' },
        head: {
            htmlAttrs: {
                lang: 'hu',
            },
            script: [],
            titleTemplate: '%s %separator %siteName',
            templateParams: {
                separator: ' | ',
                siteName: 'PAKTUM',
            },
        },
    },

    runtimeConfig: {
        paktumApiUrl: import.meta.env.NUXT_PAKTUM_API_URL,
        public: {
            //
        },
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
        '@formkit/auto-animate',
        'motion-v/nuxt',
        '@nuxtjs/seo',
    ],

    site: {
        name: 'PAKTUM',
        indexable: false,
    },

    robots: {
        enabled: true,
        robotsTxt: true,
        disallow: ['/berleti/lepes/**', '/blog', '/blog/**', '/gyik'],
    },

    sitemap: {
        //
    },

    seo: {
        meta: {
            description:
                'Készítsd el a teljesen személyre szabható, jogszabályoknak megfelelő bérleti szerződést percek alatt online, magas ügyvédi költségek és akár felesleges papírozás nélkül.',
            author: 'PAKTUM',
            applicationName: 'PAKTUM',
        },
    },

    googleFonts: {
        families: {
            Poppins: [100, 200, 300, 400, 500, 600, 700],
        },
        // download: true,
    },

    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
        configPath: '~/tailwind.config.js',
    },

    compatibilityDate: '2024-07-19',
})
