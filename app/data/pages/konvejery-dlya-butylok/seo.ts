import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'Конвейеры для бутылок и банок от производителя | АБАТЭК',
  description:
    'Изготовление конвейеров для бутылок, банок, стеклотары, флаконов и ПЭТ-тары. Ленточные, пластинчатые, модульные и роликовые системы по техническому заданию.',
  keywords: [
    'конвейер для бутылок',
    'транспортер для бутылок',
    'конвейер для банок',
    'конвейер для ПЭТ бутылок',
    'конвейер для стеклотары',
  ],
  canonicalPath: '/konvejery-dlya-butylok/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: {
    src: '/images/bottle-conveyor-26553150.webp',
    alt: 'Конвейеры для бутылок и банок',
    type: 'image/jpeg',
  },
  openGraph: {
    title: 'Конвейеры для бутылок и банок | АБАТЭК',
    description: 'Конвейерные линии для стеклянных и пластиковых бутылок, банок, флаконов и напитков.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Конвейеры для бутылок и банок | АБАТЭК',
    description: 'Проектирование и изготовление транспортеров для тары по техническому заданию.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Конвейеры', path: '/conveyors/' },
    { name: 'Конвейеры для бутылок и банок', path: '/konvejery-dlya-butylok/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'Product',
    name: 'Конвейеры для бутылок и банок',
    category: 'Конвейерное оборудование',
  },
} satisfies PageSeo;
