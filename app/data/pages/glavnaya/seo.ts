import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'Ленточные конвейеры и оборудование — АБАТЭК',
  description: 'Проектирование и изготовление конвейерного оборудования по согласованному техническому заданию.',
  keywords: [
    'ленточные конвейеры и оборудование',
    'ленточные конвейеры и оборудование на заказ',
    'промышленное оборудование',
    'производитель АБАТЭК',
  ],
  canonicalPath: '/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    title: 'Ленточные конвейеры и оборудование — АБАТЭК',
    description: 'Проектирование и изготовление конвейерного оборудования по согласованному техническому заданию.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ленточные конвейеры и оборудование — АБАТЭК',
    description: 'Проектирование и изготовление конвейерного оборудования по согласованному техническому заданию.',
  },
  breadcrumbs: [{ name: 'Главная', path: '/' }],
  schema: {
    pageType: 'WebPage',
    entityType: 'WebSite',
    name: 'Ленточные конвейеры и оборудование',
  },
} satisfies PageSeo;
