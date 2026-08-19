import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'Контакты АБАТЭК',
  description: 'Телефон и электронная почта АБАТЭК для обсуждения проекта и передачи технического задания.',
  keywords: ['контакты абатэк', 'контакты абатэк на заказ', 'промышленное оборудование', 'производитель АБАТЭК'],
  canonicalPath: '/kontakty/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    title: 'Контакты АБАТЭК',
    description: 'Телефон и электронная почта АБАТЭК для обсуждения проекта и передачи технического задания.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Контакты АБАТЭК',
    description: 'Телефон и электронная почта АБАТЭК для обсуждения проекта и передачи технического задания.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Контакты АБАТЭК', path: '/kontakty/' },
  ],
  schema: {
    pageType: 'ContactPage',
    entityType: 'Organization',
    name: 'Контакты АБАТЭК',
  },
} satisfies PageSeo;
