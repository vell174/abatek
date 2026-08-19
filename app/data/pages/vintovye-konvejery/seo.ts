import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'Винтовые конвейеры (шнековые) на заказ | АБАТЭК',
  description:
    'Изготовление винтовых (шнековых) конвейеров и питателей на заказ: желобчатые и трубчатые модели, шнек 100–800 мм, до 100 т/ч.',
  keywords: [
    'винтовые конвейеры (шнековые) на заказ',
    'винтовые конвейеры (шнековые) на заказ на заказ',
    'конвейерное оборудование',
    'производитель АБАТЭК',
  ],
  canonicalPath: '/vintovye-konvejery/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: {
    src: '/images/26025489.webp',
    alt: 'Винтовые конвейеры (шнековые) на заказ',
  },
  openGraph: {
    title: 'Винтовые конвейеры (шнековые) на заказ | АБАТЭК',
    description:
      'Изготовление винтовых (шнековых) конвейеров и питателей на заказ: желобчатые и трубчатые модели, шнек 100–800 мм, до 100 т/ч.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Винтовые конвейеры (шнековые) на заказ | АБАТЭК',
    description:
      'Изготовление винтовых (шнековых) конвейеров и питателей на заказ: желобчатые и трубчатые модели, шнек 100–800 мм, до 100 т/ч.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Винтовые конвейеры (шнековые) на заказ', path: '/vintovye-konvejery/' },
  ],
  schema: {
    pageType: 'WebPage',
    entityType: 'Product',
    name: 'Винтовые конвейеры (шнековые) на заказ',
    category: 'Конвейерное оборудование',
  },
} satisfies PageSeo;
