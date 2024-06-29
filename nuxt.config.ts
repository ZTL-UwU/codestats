// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxt/icon',
    'shadcn-nuxt',
    '@nuxtjs/tailwindcss',
  ],
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        baseUrl: '.',
      },
    },
  },
});
