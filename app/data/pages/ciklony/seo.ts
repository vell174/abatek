import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'Циклоны для систем аспирации — изготовление на заказ | АБАТЭК',
  description:
    'Изготавливаем промышленные циклоны для аспирации под расход воздуха и свойства пыли. Серии ЦН, решения для деревообработки и зернопереработки. Подбор по ТЗ.',
  keywords: [
    'циклоны для систем аспирации',
    'циклоны для систем аспирации на заказ',
    'промышленные циклоны для очистки воздуха',
    'циклон для древесной пыли',
    'циклон для зерновой пыли',
  ],
  canonicalPath: '/ciklony/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: {
    src: '/images/catalog/aspiration-cyclone.webp',
    alt: 'Промышленный циклон для системы аспирации',
  },
  openGraph: {
    title: 'Циклоны для систем аспирации — изготовление на заказ | АБАТЭК',
    description:
      'Промышленные циклоны под параметры аспирации: подбор по расходу воздуха, свойствам пыли и схеме выгрузки.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Циклоны для систем аспирации — изготовление на заказ | АБАТЭК',
    description:
      'Промышленные циклоны под параметры аспирации: подбор по расходу воздуха, свойствам пыли и схеме выгрузки.',
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
        image: '/images/catalog/cyclone-26783870.webp',
      },
      {
        name: 'Циклоны для деревообработки',
        image: '/images/catalog/cyclone-26783922.webp',
      },
      {
        name: 'Циклоны для зерновой и мукомольной промышленности',
        image: '/images/catalog/cyclone-26783941.webp',
      },
      {
        name: 'ВЗП, СИОТ и ЛИОТ для сухой пыли',
        image: '/images/catalog/cyclone-26783961.webp',
      },
      {
        name: 'Циклоны с обратным конусом',
        image: '/images/catalog/cyclone-26783973.webp',
      },
    ],
  },
} satisfies PageSeo;
