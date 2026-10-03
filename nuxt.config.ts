export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss'],
  supabase: { redirect: false }, // situs publik, tanpa login
  css: ['~/assets/css/main.css', 'katex/dist/katex.min.css'],
  app: { head: { title: 'Kalkulus Hub', htmlAttrs: { lang: 'id' } } },
  // SSG: `npm run generate`, atau biarkan SSR default di Vercel/Netlify
})
