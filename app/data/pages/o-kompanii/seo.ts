import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'О компании АБАТЭК — производство конвейерного оборудования',
  description:
    'АБАТЭК проектирует и производит конвейерное оборудование по техническому заданию, согласовывает документацию и организует поставку.',
  keywords: ['о компании абатэк', 'о компании абатэк на заказ', 'промышленное оборудование', 'производитель АБАТЭК'],
  canonicalPath: '/o-kompanii/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    title: 'О компании АБАТЭК — производство конвейерного оборудования',
    description:
      'АБАТЭК проектирует и производит конвейерное оборудование по техническому заданию, согласовывает документацию и организует поставку.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'О компании АБАТЭК — производство конвейерного оборудования',
    description:
      'АБАТЭК проектирует и производит конвейерное оборудование по техническому заданию, согласовывает документацию и организует поставку.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'О компании АБАТЭК', path: '/o-kompanii/' },
  ],
  schema: {
    pageType: 'AboutPage',
    entityType: 'Organization',
    name: 'О компании АБАТЭК',
  },
} satisfies PageSeo;
