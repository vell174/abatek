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
        'lucide:download',
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
        'lucide:table-properties',
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
    databaseUrl: '',
    smtpHost: '',
    smtpPort: '25',
    mailFrom: 'site@abatek.ru',
    mailTo: 'zakaz@abatek.ru',
    siteDomain: 'abatek.ru',
    mailDomain: 'abatek74.ru',
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
      routes: ['/sitemap.xml', ...equipmentRouteSlugs.map((slug) => `/${slug}/`)],
    },
    routeRules: {
      '/primery-rabot': {
        redirect: { to: '/fotogallereya/', statusCode: 301 },
      },
      '/primery-rabot/': {
        redirect: { to: '/fotogallereya/', statusCode: 301 },
      },
      '/elevatory': {
        redirect: { to: '/elevatory-kovshovye/', statusCode: 301 },
      },
      '/elevatory/': {
        redirect: { to: '/elevatory-kovshovye/', statusCode: 301 },
      },
      '/konvejery-dlya-sortirovki': {
        redirect: { to: '/lentochnye-konveyery-dlya-sortirovki/', statusCode: 301 },
      },
      '/konvejery-dlya-sortirovki/': {
        redirect: { to: '/lentochnye-konveyery-dlya-sortirovki/', statusCode: 301 },
      },
      '/konvejery-dlya-sklada': {
        redirect: { to: '/lentochnye-konveyery-dlya-sklada/', statusCode: 301 },
      },
      '/konvejery-dlya-sklada/': {
        redirect: { to: '/lentochnye-konveyery-dlya-sklada/', statusCode: 301 },
      },
      '/konveyer-dlya-upakovki': {
        redirect: { to: '/lentochnye-konveyery-dlya-shtuchnyh-gruzov/', statusCode: 301 },
      },
      '/konveyer-dlya-upakovki/': {
        redirect: { to: '/lentochnye-konveyery-dlya-shtuchnyh-gruzov/', statusCode: 301 },
      },
      '/konveyery-s-reguliruemym-uglom': {
        redirect: { to: '/naklonnyj-lentochnyj-konvejer/', statusCode: 301 },
      },
      '/konveyery-s-reguliruemym-uglom/': {
        redirect: { to: '/naklonnyj-lentochnyj-konvejer/', statusCode: 301 },
      },
      '/metallokonstruktsii-na-zakaz': {
        redirect: { to: '/metalloizdeliya-po-chertezham/', statusCode: 301 },
      },
      '/metallokonstruktsii-na-zakaz/': {
        redirect: { to: '/metalloizdeliya-po-chertezham/', statusCode: 301 },
      },
      '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/images/**': { headers: { 'cache-control': 'public, max-age=2592000' } },
      '/favicon.svg': { headers: { 'cache-control': 'public, max-age=604800' } },
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      script: [
        {
          innerHTML: `(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j=0; j<document.scripts.length; j++) {if (document.scripts[j].src===r) {return;}}
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=114438551','ym');
ym(114438551,'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:'dataLayer',referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});`,
        },
        { src: 'https://www.googletagmanager.com/gtm.js?id=GTM-KDTWLGZ7', async: true },
        {
          innerHTML:
            "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date());",
        },
      ],
      noscript: [
        {
          innerHTML:
            '<div><img src="https://mc.yandex.ru/watch/114438551" style="position:absolute; left:-9999px;" alt="" /></div>',
          tagPosition: 'bodyOpen',
        },
      ],
      // Запрет наследуется всем содержимым, включая меню и формы в порталах.
      htmlAttrs: { lang: 'ru', translate: 'no', class: 'notranslate' },
      bodyAttrs: { translate: 'no', class: 'notranslate' },
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
      meta: [
        { name: 'theme-color', content: '#031d38' },
        { name: 'google', content: 'notranslate' },
        { name: 'googlebot', content: 'notranslate' },
      ],
    },
  },
});
