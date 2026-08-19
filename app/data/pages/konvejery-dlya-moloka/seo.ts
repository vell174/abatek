import type { PageSeo } from '../_shared/types';
export const seo = {
  title: 'Конвейеры для молока и молочной продукции | АБАТЭК',
  description: 'Изготовление пищевых конвейеров для транспортировки молочной продукции, сырья и упаковки.',
  keywords: ['конвейер для молока', 'конвейер для молочной продукции', 'пищевой транспортер'],
  canonicalPath: '/konvejery-dlya-moloka/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: { src: '/images/milk-conveyor-hero-50739429.webp', alt: 'Конвейер для молочной продукции', type: 'image/png' },
  openGraph: {
    title: 'Конвейеры для молока | АБАТЭК',
    description: 'Транспортировка сырья, упаковки и готовой молочной продукции.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Конвейеры для молока | АБАТЭК',
    description: 'Пищевые конвейеры для молочных производств.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Конвейеры', path: '/conveyors/' },
    { name: 'Конвейеры для молока', path: '/konvejery-dlya-moloka/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'Product',
    name: 'Конвейеры для молока',
    category: 'Конвейерное оборудование',
  },
} satisfies PageSeo;
