// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import { createRequire } from 'node:module'

const requireFromIpx = createRequire(import.meta.resolve('ipx'))

// Runs before first paint so the initial theme (and the matching logo) is
// correct without a flash. Keep the storage key in sync with useTheme().
const themeScript = `(function(){try{var p=localStorage.getItem('eos-theme');var d=p==='dark'||(p!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light'}catch(e){}document.documentElement.classList.add('js')})()`

export default defineNuxtConfig({
  nitro: {
    preset: process.env.NITRO_PRESET || 'bun',
    compatibilityDate: '2026-10-16',
    externals: {
      // IPX's bundled H3 imports srvx; include its runtime entry in server output.
      traceInclude: [requireFromIpx.resolve('srvx/node')],
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s · Entropic Operational Solutions',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#ffffff' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#0a0a0a' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/brand/logos/gyroscope-orbital-maroon-icon.svg', media: '(prefers-color-scheme: light)' },
        { rel: 'icon', type: 'image/svg+xml', href: '/brand/logos/gyroscope-orbital-white-icon.svg', media: '(prefers-color-scheme: dark)' },
        { rel: 'preconnect', href: 'https://rsms.me/' },
        { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
      ],
      script: [
        { innerHTML: themeScript, tagPosition: 'head', tagPriority: 'critical' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  vue: {
    compilerOptions: {
      // Keep template comments in rendered HTML so placeholder content stays
      // flagged for whoever replaces it.
      comments: true,
    },
  },
  fonts: {
    families: [
      { name: 'Instrument Serif', provider: 'google', weights: [400], styles: ['normal', 'italic'], global: true },
    ],
  },
  modules: [
    '@nuxt/content',
    '@nuxt/a11y',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
  ],
  content: {
    experimental: {
      sqliteConnector: process.env.NITRO_PRESET?.startsWith('netlify') ? 'native' : undefined,
    },
  },
  runtimeConfig: {
    public: {
      netlifyForms: false,
    },
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
})
