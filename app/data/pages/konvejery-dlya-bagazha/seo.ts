import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'Конвейеры для багажа от производителя | АБАТЭК',
  description: 'Проектирование и изготовление багажных конвейеров для аэропортов и терминалов по техническому заданию.',
  keywords: ['конвейер для багажа', 'багажный транспортер', 'багажная карусель', 'конвейер для аэропорта'],
  canonicalPath: '/konvejery-dlya-bagazha/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: { src: '/images/baggage-conveyor-50712259.webp', alt: 'Конвейер для багажа' },
  openGraph: {
    title: 'Конвейеры для багажа | АБАТЭК',
    description: 'Багажные конвейеры и транспортеры по техническому заданию.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Конвейеры для багажа | АБАТЭК',
    description: 'Надёжные системы транспортировки багажа для терминалов и логистики.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Конвейеры', path: '/conveyors/' },
    { name: 'Конвейеры для багажа', path: '/konvejery-dlya-bagazha/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'Product',
    name: 'Конвейеры для багажа',
    category: 'Конвейерное оборудование',
  },
} satisfies PageSeo;
