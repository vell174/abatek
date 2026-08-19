import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'Гравитационные конвейеры от производителя | АБАТЭК',
  description:
    'Неприводные роликовые гравитационные конвейеры по техническому заданию. Подбор роликов, размеров и комплектации для производства и склада.',
  keywords: ['гравитационный конвейер', 'роликовый неприводной конвейер', 'рольганг купить', 'изготовление конвейеров'],
  canonicalPath: '/gravitatcionnyj-konvejery/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: { src: '/images/gravity-conveyor-33735861.webp', alt: 'Гравитационный роликовый конвейер' },
  openGraph: {
    title: 'Гравитационные конвейеры | АБАТЭК',
    description: 'Изготовление гравитационных роликовых конвейеров по техническому заданию.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Гравитационные конвейеры | АБАТЭК',
    description: 'Надёжные неприводные конвейеры для производственных и складских линий.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Конвейеры', path: '/conveyors/' },
    { name: 'Гравитационные конвейеры', path: '/gravitatcionnyj-konvejery/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'Product',
    name: 'Гравитационные конвейеры',
    category: 'Конвейерное оборудование',
  },
} satisfies PageSeo;
