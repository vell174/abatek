import type { PageSeo } from '../_shared/types';
export const seo = {
  title: 'Конвейеры для медикаментов и лекарств | АБАТЭК',
  description: 'Изготовление конвейеров для таблеток, лекарств и фармацевтической продукции по техническому заданию.',
  keywords: ['конвейер для медикаментов', 'конвейер для лекарств', 'фармацевтический конвейер'],
  canonicalPath: '/konvejery-dlya-medikamentov/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: { src: '/images/medicine-conveyor-hero-50734491.webp', alt: 'Конвейер для медикаментов', type: 'image/jpeg' },
  openGraph: {
    title: 'Конвейеры для медикаментов | АБАТЭК',
    description: 'Транспортировка и сортировка фармацевтической продукции.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Конвейеры для медикаментов | АБАТЭК',
    description: 'Фармацевтические конвейеры на заказ.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Конвейеры', path: '/conveyors/' },
    { name: 'Конвейеры для медикаментов', path: '/konvejery-dlya-medikamentov/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'Product',
    name: 'Конвейеры для медикаментов и лекарств',
    category: 'Конвейерное оборудование',
  },
} satisfies PageSeo;
