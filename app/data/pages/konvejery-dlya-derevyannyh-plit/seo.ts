import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'Конвейеры для дерева и древесных плит от производителя | АБАТЭК',
  description:
    'Изготовление конвейеров для ЛДСП, ДСП, МДФ, ХДФ, ДВП и ДВПО по индивидуальным размерам. Ленточные, модульные, роликовые и пластинчатые транспортеры.',
  keywords: [
    'конвейер для дерева',
    'транспортер для древесных плит',
    'конвейер для ДСП',
    'конвейер для МДФ',
    'конвейер для ЛДСП',
  ],
  canonicalPath: '/konvejery-dlya-derevyannyh-plit/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: {
    src: '/images/wood-panel-conveyor-hero-50738749.webp',
    alt: 'Конвейер для дерева и древесных плит',
    type: 'image/jpeg',
  },
  openGraph: {
    title: 'Конвейеры для дерева и древесных плит | АБАТЭК',
    description: 'Конвейерные системы для производства, транспортировки, погрузки и разгрузки древесных плит.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Конвейеры для дерева и древесных плит | АБАТЭК',
    description: 'Проектирование и изготовление транспортеров для деревообрабатывающих предприятий.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Конвейеры', path: '/conveyors/' },
    { name: 'Конвейеры для дерева', path: '/konvejery-dlya-derevyannyh-plit/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'Product',
    name: 'Конвейеры для дерева и древесных плит',
    category: 'Конвейерное оборудование',
  },
} satisfies PageSeo;
