import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'Барабаны ленточного конвейера — приводные и неприводные | АБАТЭК',
  description:
    'Приводные, неприводные, натяжные, отклоняющие и футерованные барабаны для ленточных конвейеров. Изготовление по ГОСТ и чертежам заказчика.',
  keywords: [
    'барабаны ленточного конвейера',
    'приводные барабаны',
    'неприводные барабаны',
    'натяжные барабаны',
    'футерованные барабаны',
    'производитель АБАТЭК',
  ],
  canonicalPath: '/barabany/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: { src: '/images/source-26786961.webp', alt: 'Барабаны ленточного конвейера' },
  openGraph: {
    title: 'Барабаны ленточного конвейера — приводные и неприводные | АБАТЭК',
    description: 'Изготовление барабанов ленточного конвейера по стандартным размерам и чертежам заказчика.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Барабаны ленточного конвейера | АБАТЭК',
    description: 'Приводные, неприводные и футерованные барабаны от производителя.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Комплектующие', path: '/komplektuyushie-k-konvejeram/' },
    { name: 'Барабаны ленточного конвейера', path: '/barabany/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'ItemList',
    name: 'Барабаны ленточного конвейера',
    category: 'Комплектующие для конвейеров',
    items: [
      {
        name: 'Приводные барабаны',
        description: 'Барабаны для передачи тягового усилия и движения ленты.',
        image: '/images/source-26786961.webp',
      },
      {
        name: 'Неприводные барабаны',
        description: 'Натяжные и отклоняющие барабаны для ленточных конвейеров.',
        image: '/images/source-26787011.webp',
      },
      {
        name: 'Норийные барабаны',
        description: 'Барабаны для ленточных норий и ковшовых элеваторов.',
        image: '/images/source-26787063.webp',
      },
    ],
  },
} satisfies PageSeo;
