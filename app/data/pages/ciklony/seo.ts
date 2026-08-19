import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'Циклоны для аспирации на заказ | АБАТЭК',
  description: 'Промышленные циклоны для очистки воздуха от мелкой, средней, абразивной, древесной и зерновой пыли.',
  keywords: [
    'циклоны для систем аспирации',
    'циклоны для систем аспирации на заказ',
    'промышленное оборудование',
    'производитель АБАТЭК',
  ],
  canonicalPath: '/ciklony/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: {
    src: '/images/26007568.webp',
    alt: 'Циклоны для систем аспирации',
  },
  openGraph: {
    title: 'Циклоны для аспирации на заказ | АБАТЭК',
    description: 'Промышленные циклоны для очистки воздуха от мелкой, средней, абразивной, древесной и зерновой пыли.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Циклоны для аспирации на заказ | АБАТЭК',
    description: 'Промышленные циклоны для очистки воздуха от мелкой, средней, абразивной, древесной и зерновой пыли.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Циклоны для систем аспирации', path: '/ciklony/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'ItemList',
    name: 'Циклоны для систем аспирации',
    category: 'Промышленное оборудование',
    items: [
      {
        name: 'Циклоны НИИОГАЗа для мелкой и средней пыли',
        image: '/images/source-26783870.webp',
      },
      {
        name: 'Циклоны для деревообработки',
        image: '/images/source-26783922.webp',
      },
      {
        name: 'Циклоны для зерновой и мукомольной промышленности',
        image: '/images/source-26783941.webp',
      },
      {
        name: 'ВЗП, СИОТ и ЛИОТ для сухой пыли',
        image: '/images/source-26783961.webp',
      },
      {
        name: 'Циклоны с обратным конусом',
        image: '/images/source-26783973.webp',
      },
    ],
  },
} satisfies PageSeo;
