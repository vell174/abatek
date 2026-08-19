import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'Политика конфиденциальности — АБАТЭК',
  description: 'Политика конфиденциальности и защиты персональных данных посетителей сайта АБАТЭК.',
  keywords: [
    'политика конфиденциальности',
    'политика конфиденциальности на заказ',
    'промышленное оборудование',
    'производитель АБАТЭК',
  ],
  canonicalPath: '/politika-konfidencialnosti/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    title: 'Политика конфиденциальности — АБАТЭК',
    description: 'Политика конфиденциальности и защиты персональных данных посетителей сайта АБАТЭК.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Политика конфиденциальности — АБАТЭК',
    description: 'Политика конфиденциальности и защиты персональных данных посетителей сайта АБАТЭК.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Политика конфиденциальности', path: '/politika-konfidencialnosti/' },
  ],
  schema: {
    pageType: 'WebPage',
    name: 'Политика конфиденциальности',
  },
} satisfies PageSeo;
