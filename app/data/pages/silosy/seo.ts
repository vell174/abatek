import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'Силосы для сыпучих материалов на заказ | АБАТЭК',
  description:
    'Производство цельносварных и сборно-разборных силосов для цемента, песка, зерна и других сыпучих материалов.',
  keywords: [
    'силосы для сыпучих материалов на заказ',
    'силосы для сыпучих материалов на заказ на заказ',
    'промышленное оборудование',
    'производитель АБАТЭК',
  ],
  canonicalPath: '/silosy/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: {
    src: '/images/26025737.webp',
    alt: 'Силосы для сыпучих материалов на заказ',
  },
  openGraph: {
    title: 'Силосы для сыпучих материалов на заказ | АБАТЭК',
    description:
      'Производство цельносварных и сборно-разборных силосов для цемента, песка, зерна и других сыпучих материалов.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Силосы для сыпучих материалов на заказ | АБАТЭК',
    description:
      'Производство цельносварных и сборно-разборных силосов для цемента, песка, зерна и других сыпучих материалов.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Силосы для сыпучих материалов на заказ', path: '/silosy/' },
  ],
  schema: {
    pageType: 'WebPage',
    entityType: 'Product',
    name: 'Силосы для сыпучих материалов на заказ',
    category: 'Промышленное оборудование',
  },
} satisfies PageSeo;
