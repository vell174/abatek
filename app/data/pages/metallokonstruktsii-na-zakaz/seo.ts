import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'Изготовление металлоконструкций на заказ | АБАТЭК',
  description:
    'Проектирование и изготовление металлоконструкций любых форм и размеров по чертежам и техническому заданию.',
  keywords: [
    'металлоконструкции по чертежам заказчика',
    'металлоконструкции по чертежам заказчика на заказ',
    'промышленное оборудование',
    'производитель АБАТЭК',
  ],
  canonicalPath: '/metallokonstruktsii-na-zakaz/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: {
    src: '/images/26025719.webp',
    alt: 'Металлоконструкции по чертежам заказчика',
  },
  openGraph: {
    title: 'Изготовление металлоконструкций на заказ | АБАТЭК',
    description:
      'Проектирование и изготовление металлоконструкций любых форм и размеров по чертежам и техническому заданию.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Изготовление металлоконструкций на заказ | АБАТЭК',
    description:
      'Проектирование и изготовление металлоконструкций любых форм и размеров по чертежам и техническому заданию.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Металлоконструкции по чертежам заказчика', path: '/metallokonstruktsii-na-zakaz/' },
  ],
  schema: {
    pageType: 'WebPage',
    entityType: 'Product',
    name: 'Металлоконструкции по чертежам заказчика',
    category: 'Промышленное оборудование',
  },
} satisfies PageSeo;
