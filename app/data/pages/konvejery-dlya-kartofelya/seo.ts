import type { PageSeo } from '../_shared/types';
export const seo = {
  title: 'Конвейеры для картофеля от производителя | АБАТЭК',
  description:
    'Изготовление ленточных конвейеров для перемещения, сортировки и обработки картофеля по индивидуальным требованиям.',
  keywords: ['конвейер для картофеля', 'транспортер для картофеля', 'картофельный транспортер'],
  canonicalPath: '/konvejery-dlya-kartofelya/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: { src: '/images/potato-conveyor-hero-50034433.webp', alt: 'Конвейер для картофеля', type: 'image/jpeg' },
  openGraph: {
    title: 'Конвейеры для картофеля | АБАТЭК',
    description: 'Оборудование для перемещения, сортировки и обработки картофеля.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Конвейеры для картофеля | АБАТЭК',
    description: 'Картофельные транспортеры по техническому заданию.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Конвейеры', path: '/conveyors/' },
    { name: 'Конвейеры для картофеля', path: '/konvejery-dlya-kartofelya/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'Product',
    name: 'Конвейеры для картофеля',
    category: 'Конвейерное оборудование',
  },
} satisfies PageSeo;
