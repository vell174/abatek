import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'Политика использования cookie — АБАТЭК',
  description: 'Информация об использовании файлов cookie на сайте АБАТЭК.',
  keywords: [
    'политика использования cookie',
    'политика использования cookie на заказ',
    'промышленное оборудование',
    'производитель АБАТЭК',
  ],
  canonicalPath: '/politika-fajlov-kuki/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    title: 'Политика использования cookie — АБАТЭК',
    description: 'Информация об использовании файлов cookie на сайте АБАТЭК.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Политика использования cookie — АБАТЭК',
    description: 'Информация об использовании файлов cookie на сайте АБАТЭК.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Политика использования cookie', path: '/politika-fajlov-kuki/' },
  ],
  schema: {
    pageType: 'WebPage',
    name: 'Политика использования cookie',
  },
} satisfies PageSeo;
