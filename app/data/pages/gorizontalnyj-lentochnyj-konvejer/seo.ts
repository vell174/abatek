import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'Горизонтальные ленточные конвейеры от производителя | АБАТЭК',
  description:
    'Прямые горизонтальные ленточные конвейеры для цехов, складов и логистических линий по техническому заданию.',
  keywords: [
    'горизонтальный ленточный конвейер',
    'горизонтальный транспортер',
    'ленточный конвейер купить',
    'производитель АБАТЭК',
  ],
  canonicalPath: '/gorizontalnyj-lentochnyj-konvejer/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: { src: '/images/horizontal-conveyor-33734355.webp', alt: 'Горизонтальный ленточный конвейер' },
  openGraph: {
    title: 'Горизонтальные ленточные конвейеры | АБАТЭК',
    description: 'Изготовление горизонтальных конвейеров по техническому заданию.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Горизонтальные ленточные конвейеры | АБАТЭК',
    description: 'Надёжные горизонтальные транспортеры для производства и складов.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Ленточные конвейеры', path: '/lentochnye-konvejery/' },
    { name: 'Горизонтальные конвейеры', path: '/gorizontalnyj-lentochnyj-konvejer/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'Product',
    name: 'Горизонтальные ленточные конвейеры',
    category: 'Конвейерное оборудование',
  },
} satisfies PageSeo;
