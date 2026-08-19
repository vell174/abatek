import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'Цепные конвейеры-транспортеры от производителя | АБАТЭК',
  description:
    'Изготовление цепных, ленточно-цепных, скребковых, пластинчатых и подвесных конвейеров по техническому заданию.',
  keywords: [
    'цепные конвейеры',
    'цепной транспортер',
    'ленточно-цепной конвейер',
    'скребковый цепной конвейер',
    'пластинчатый конвейер',
    'производитель АБАТЭК',
  ],
  canonicalPath: '/cepnye-konveyeri/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: { src: '/images/source-26553325.webp', alt: 'Цепные конвейеры-транспортеры' },
  openGraph: {
    title: 'Цепные конвейеры-транспортеры от производителя | АБАТЭК',
    description: 'Цепные конвейеры для тяжёлых нагрузок и крупногабаритных грузов по индивидуальному проекту.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Цепные конвейеры-транспортеры | АБАТЭК',
    description: 'Проектирование и изготовление цепных конвейеров под задачу производства.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Конвейеры', path: '/conveyors/' },
    { name: 'Цепные конвейеры', path: '/cepnye-konveyeri/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'ItemList',
    name: 'Цепные конвейеры-транспортеры',
    category: 'Конвейерное оборудование',
    items: [
      { name: 'Ленточно-цепные конвейеры', image: '/images/source-26553325.webp' },
      { name: 'Скребковые цепные конвейеры', image: '/images/source-26553532.webp' },
      { name: 'Пластинчатые цепные конвейеры', image: '/images/source-26553538.webp' },
      { name: 'Подвесные цепные конвейеры', image: '/images/source-26553545.webp' },
      { name: 'Цепные конвейеры для паллет', image: '/images/source-26553552.webp' },
    ],
  },
} satisfies PageSeo;
