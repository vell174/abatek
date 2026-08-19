import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'Выполненные проекты — АБАТЭК',
  description: 'Проекты конвейерного оборудования АБАТЭК.',
  keywords: [
    'выполненные проекты',
    'выполненные проекты на заказ',
    'промышленное оборудование',
    'производитель АБАТЭК',
  ],
  canonicalPath: '/primery-rabot/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    title: 'Выполненные проекты — АБАТЭК',
    description: 'Проекты конвейерного оборудования АБАТЭК.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Выполненные проекты — АБАТЭК',
    description: 'Проекты конвейерного оборудования АБАТЭК.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Выполненные проекты', path: '/primery-rabot/' },
  ],
  schema: {
    pageType: 'WebPage',
    name: 'Выполненные проекты',
  },
} satisfies PageSeo;
