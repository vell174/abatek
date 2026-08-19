// https://nuxt.com/docs/api/configuration/nuxt-config
import { equipmentRouteSlugs } from './app/data/pages/equipment-routes';

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/icon'],
  icon: {
    clientBundle: {
      scan: false,
      icons: [
        'lucide:phone-call',
        'lucide:factory',
        'lucide:ruler',
        'lucide:badge-check',
        'lucide:truck',
        'lucide:move-right',
        'lucide:workflow',
        'lucide:link',
        'lucide:circle-dot-dashed',
        'lucide:cylinder',
        'lucide:arrow-up-from-line',
        'lucide:arrow-up-right',
        'lucide:messages-square',
        'lucide:file-text',
        'lucide:file-signature',
        'lucide:drafting-compass',
        'lucide:cog',
        'lucide:plus',
        'lucide:minus',
        'lucide:arrow-down-right',
        'lucide:arrow-left',
        'lucide:arrow-right',
        'lucide:blocks',
        'lucide:building-2',
        'lucide:check',
        'lucide:chevron-down',
        'lucide:chevron-right',
        'lucide:clock-3',
        'lucide:expand',
        'lucide:file-chart-column-increasing',
        'lucide:file-check-2',
        'lucide:mail',
        'lucide:map-pin',
        'lucide:message-circle',
        'lucide:move-up-right',
        'lucide:panel-top-close',
        'lucide:phone',
        'lucide:rotate-3d',
        'lucide:scissors',
        'lucide:send',
        'lucide:settings',
        'lucide:warehouse',
        'lucide:wind',
        'lucide:x',
      ],
    },
  },
  compatibilityDate: '2025-07-15',
  sourcemap: { server: false, client: false },
  features: {
    // Стили компонентов выносятся во внешние кешируемые CSS-файлы,
    // иначе каждый HTML раздувается на ~50 КБ inline-стилей.
    inlineStyles: false,
  },
  runtimeConfig: {
    // Переопределяются переменными NUXT_DATABASE_URL, NUXT_SMTP_HOST и т.д.
    basicAuthUser: '1111',
    basicAuthPassword: '1111',
    databaseUrl: '',
    smtpHost: '',
    smtpPort: '25',
    mailFrom: 'site@abatek.ru',
    mailTo: 'zakaz@abatek.ru',
  },
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  css: ['~/assets/styles/main.scss'],
  vite: {
    build: {
      // Стили компонентов собираются в один кешируемый файл: иначе главная тянет
      // ~12 мелких блокирующих CSS-запросов.
      cssCodeSplit: false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@use '~/assets/styles/tokens' as *;",
        },
      },
    },
  },
  nitro: {
    compressPublicAssets: { gzip: true, brotli: true },
    prerender: {
      crawlLinks: true,
      routes: equipmentRouteSlugs.map((slug) => `/${slug}/`),
    },
    routeRules: {
      '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/images/**': { headers: { 'cache-control': 'public, max-age=2592000' } },
      '/favicon.svg': { headers: { 'cache-control': 'public, max-age=604800' } },
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'ru' },
      link: [
        // Preload только кириллицы: латиница нужна лишь для второстепенных
        // подписей и не должна конкурировать с LCP-ресурсами.
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/montserrat-cyrillic-wght-normal.woff2',
          crossorigin: 'anonymous',
        },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
      meta: [{ name: 'theme-color', content: '#031d38' }],
    },
  },
});
