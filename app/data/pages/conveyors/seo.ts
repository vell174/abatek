import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'Каталог конвейеров и транспортеров от производителя | АБАТЭК',
  description: 'Ленточные, роликовые, цепные, скребковые, модульные и пластинчатые конвейеры по техническому заданию.',
  keywords: [
    'конвейеры',
    'транспортеры',
    'ленточные конвейеры',
    'роликовые конвейеры',
    'конвейерное оборудование',
    'производитель АБАТЭК',
  ],
  canonicalPath: '/conveyors/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: { src: '/images/conveyors-33726556.webp', alt: 'Каталог конвейеров и транспортеров' },
  openGraph: {
    title: 'Каталог конвейеров и транспортеров | АБАТЭК',
    description: 'Проектирование и производство конвейеров под задачу производства.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Каталог конвейеров и транспортеров | АБАТЭК',
    description: 'Конвейерное оборудование от производителя по техническому заданию.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Каталог конвейеров', path: '/conveyors/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'ItemList',
    name: 'Каталог конвейеров и транспортеров',
    category: 'Конвейерное оборудование',
  },
} satisfies PageSeo;
