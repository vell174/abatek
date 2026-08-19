import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'Транспортер для дров на заказ от производителя | АБАТЭК',
  description:
    'Производство мобильных транспортеров для перемещения и погрузки колотых дров. Индивидуальная длина, скорость и угол наклона.',
  keywords: [
    'транспортеры для погрузки колотых дров',
    'транспортеры для погрузки колотых дров на заказ',
    'конвейерное оборудование',
    'производитель АБАТЭК',
  ],
  canonicalPath: '/transporterdlyadrov/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: {
    src: '/images/26009373.webp',
    alt: 'Транспортеры для погрузки колотых дров',
  },
  openGraph: {
    title: 'Транспортер для дров на заказ от производителя | АБАТЭК',
    description:
      'Производство мобильных транспортеров для перемещения и погрузки колотых дров. Индивидуальная длина, скорость и угол наклона.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Транспортер для дров на заказ от производителя | АБАТЭК',
    description:
      'Производство мобильных транспортеров для перемещения и погрузки колотых дров. Индивидуальная длина, скорость и угол наклона.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Транспортеры для погрузки колотых дров', path: '/transporterdlyadrov/' },
  ],
  schema: {
    pageType: 'WebPage',
    entityType: 'Product',
    name: 'Транспортеры для погрузки колотых дров',
    category: 'Конвейерное оборудование',
  },
} satisfies PageSeo;
