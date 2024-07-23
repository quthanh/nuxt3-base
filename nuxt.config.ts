// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  target: 'server',
  sourcemap: {
    server: false,
    client: false,
  },
  experimental: {
    crossOriginPrefetch: true,
    sharedPrerenderData: true,
  },
  nitro: {
    compressPublicAssets: {
      brotli: true,
      gzip: true,
    },
    prerender: {
      crawlLinks: true,
    },
    minify: true,
    sourceMap: false,
  },
  build: {
    analyze: true,
    // Minify CSS
    cssMinimize: true,
    // Minify JS
    terser: {
      terserOptions: {
        compress: true,
      },
    },
  },
  routeRules: {
    // Generated at build time for SEO purpose
    '/': { prerender: false },
    '/products': { prerender: false },
    '/contact-us': { prerender: false },
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-swiper',
    'nuxt-delay-hydration',
  ],
  delayHydration: {
    mode: 'init',
    // enables nuxt-delay-hydration in dev mode for testing
    debug: process.env.NODE_ENV === 'development',
  },
  swiper: {
    // Swiper options
    //----------------------
    prefix: 'Swiper',
    preload: true,
    styleLang: 'css',
    modules: ['navigation', 'pagination', 'grid', 'effect-fade', 'thumbs', 'autoplay'], // all modules are imported by default
  },
  googleFonts: {
    preload: true,
    useStylesheet: true,
    display: 'swap',
    families: {
      Inter: [400, 500, 600, 700, 800, 900],
    },
  },
  app: {
    pageTransition: true,
    layoutTransition: true,
    head: {
      title: 'Nuxt Base',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        {
          property: 'description',
          content: 'Description',
        },
        {
          property: 'og:description',
          content: 'Description',
        },
        {
          property: 'og:title',
          content: 'Nuxt Base',
        },
        {
          property: 'og:image',
          content: process.env.NUXT_PUBLIC_BASE_URL + 'image.png',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1',
        },
      ],
    },
  },
  components: {
    dirs: ['./core/ui', './core/components'],
  },
  css: ['~/assets/main.scss'],
  plugins: ['~/plugins/globalConfig.ts'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  tailwindcss: {
    exposeConfig: false,
    viewer: false,
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE,
    },
  },
});
