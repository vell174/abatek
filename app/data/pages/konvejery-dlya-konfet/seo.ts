import type { PageSeo } from '../_shared/types';
export const seo = {
  title: 'Конвейеры для конфет и кондитерских изделий | АБАТЭК',
  description:
    'Изготовление конвейеров для конфет и кондитерских изделий: прямые, наклонные, сетчатые и модульные транспортеры.',
  keywords: ['конвейер для конфет', 'транспортер для конфет', 'конвейер для кондитерских изделий'],
  canonicalPath: '/konvejery-dlya-konfet/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: { src: '/images/candy-conveyor-hero-50739619.webp', alt: 'Конвейер для конфет', type: 'image/jpeg' },
  openGraph: {
    title: 'Конвейеры для конфет | АБАТЭК',
    description: 'Конвейерные системы для производства кондитерских изделий.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Конвейеры для конфет | АБАТЭК',
    description: 'Транспортеры для кондитерских линий по техническому заданию.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Конвейеры', path: '/conveyors/' },
    { name: 'Конвейеры для конфет', path: '/konvejery-dlya-konfet/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'Product',
    name: 'Конвейеры для конфет и кондитерских изделий',
    category: 'Конвейерное оборудование',
  },
} satisfies PageSeo;
