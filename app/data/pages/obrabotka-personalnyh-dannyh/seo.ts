import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'Согласие на обработку персональных данных — АБАТЭК',
  description: 'Условия обработки персональных данных, переданных через формы сайта АБАТЭК.',
  keywords: [
    'согласие на обработку персональных данных',
    'согласие на обработку персональных данных на заказ',
    'промышленное оборудование',
    'производитель АБАТЭК',
  ],
  canonicalPath: '/obrabotka-personalnyh-dannyh/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    title: 'Согласие на обработку персональных данных — АБАТЭК',
    description: 'Условия обработки персональных данных, переданных через формы сайта АБАТЭК.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Согласие на обработку персональных данных — АБАТЭК',
    description: 'Условия обработки персональных данных, переданных через формы сайта АБАТЭК.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Согласие на обработку персональных данных', path: '/obrabotka-personalnyh-dannyh/' },
  ],
  schema: {
    pageType: 'WebPage',
    name: 'Согласие на обработку персональных данных',
  },
} satisfies PageSeo;
