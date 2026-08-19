import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'Г-образные ленточные конвейеры от производителя | АБАТЭК',
  description: 'Г-образные и ломаные ленточные конвейеры по техническому заданию: изготовление, доставка и монтаж.',
  keywords: [
    'г-образный конвейер',
    'г-образный ленточный конвейер',
    'ломаный транспортер',
    'наклонный конвейер',
    'производитель АБАТЭК',
  ],
  canonicalPath: '/g-obraznye-lentochnye-konvejery/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: { src: '/images/g-conveyor-24059550.webp', alt: 'Г-образный ленточный конвейер' },
  openGraph: {
    title: 'Г-образные ленточные конвейеры | АБАТЭК',
    description: 'Изготовление Г-образных конвейеров по техническому заданию.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Г-образные ленточные конвейеры | АБАТЭК',
    description: 'Надёжные конвейеры для сложных трасс и плавного подъёма грузов.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Ленточные конвейеры', path: '/lentochnye-konvejery/' },
    { name: 'Г-образные конвейеры', path: '/g-obraznye-lentochnye-konvejery/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'Product',
    name: 'Г-образные ленточные конвейеры',
    category: 'Конвейерное оборудование',
  },
} satisfies PageSeo;
