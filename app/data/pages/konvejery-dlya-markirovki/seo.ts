import type { PageSeo } from '../_shared/types';
export const seo = {
  title: 'Конвейеры для маркировки от производителя | АБАТЭК',
  description:
    'Изготовление конвейеров для автоматического нанесения маркировки. Размеры, трасса, несущая поверхность и комплектация по техническому заданию.',
  keywords: ['конвейер для маркировки', 'транспортер для маркировки', 'маркировочный конвейер'],
  canonicalPath: '/konvejery-dlya-markirovki/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: { src: '/images/marking-conveyor-hero-50735867.webp', alt: 'Конвейер для маркировки', type: 'image/png' },
  openGraph: {
    title: 'Конвейеры для маркировки | АБАТЭК',
    description: 'Конвейерные системы для автоматизации нанесения маркировки.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Конвейеры для маркировки | АБАТЭК',
    description: 'Маркировочные конвейеры по техническому заданию.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Конвейеры', path: '/conveyors/' },
    { name: 'Конвейеры для маркировки', path: '/konvejery-dlya-markirovki/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'Product',
    name: 'Конвейеры для маркировки',
    category: 'Конвейерное оборудование',
  },
} satisfies PageSeo;
