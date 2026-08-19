import type { PageSeo } from '../_shared/types';
export const seo = {
  title: 'Конвейеры и транспортеры для мешков | АБАТЭК',
  description: 'Изготовление ленточных транспортеров для мешков и пакетов любого типа и размера.',
  keywords: ['конвейер для мешков', 'транспортер для мешков', 'ленточный транспортер мешков'],
  canonicalPath: '/konvejery-dlya-meshkov/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: { src: '/images/bag-conveyor-hero-26553150.webp', alt: 'Конвейер для мешков', type: 'image/jpeg' },
  openGraph: {
    title: 'Конвейеры для мешков | АБАТЭК',
    description: 'Транспортеры для мешков по индивидуальным параметрам.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Конвейеры для мешков | АБАТЭК',
    description: 'Ленточные транспортеры для мешков.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Конвейеры', path: '/conveyors/' },
    { name: 'Конвейеры для мешков', path: '/konvejery-dlya-meshkov/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'Product',
    name: 'Конвейеры для мешков',
    category: 'Конвейерное оборудование',
  },
} satisfies PageSeo;
