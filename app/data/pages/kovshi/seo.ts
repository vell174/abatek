import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'Ковши для элеваторов и норий от производителя | АБАТЭК',
  description:
    'Ленточные и цепные ковши для элеваторов, норий и экскаваторов. Стандартные модели и изготовление по чертежам заказчика.',
  keywords: [
    'ковши для элеватора',
    'ковши нории',
    'ковши для зерна',
    'ковши для элеваторов купить',
    'ковши для цепных элеваторов',
    'производитель АБАТЭК',
  ],
  canonicalPath: '/kovshi/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: { src: '/images/kovshi-27176946.webp', alt: 'Ковши для элеваторов и норий' },
  openGraph: {
    title: 'Ковши для элеваторов и норий от производителя | АБАТЭК',
    description: 'Изготовление ковшей для норий и элеваторов по стандартным моделям и чертежам заказчика.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ковши для элеваторов и норий | АБАТЭК',
    description: 'Ленточные и цепные ковши для сыпучих материалов от производителя.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Комплектующие', path: '/komplektuyushie-k-konvejeram/' },
    { name: 'Ковши для элеваторов', path: '/kovshi/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'ItemList',
    name: 'Ковши для элеваторов и норий',
    category: 'Элеваторное оборудование',
    items: [
      { name: 'Глубокие ковши со скруглённым днищем', image: '/images/kovshi-27176946.webp' },
      { name: 'Мелкие ковши со скруглённым днищем', image: '/images/kovshi-27176950.webp' },
      { name: 'Ковши с остроугольным днищем', image: '/images/kovshi-27176949.webp' },
      { name: 'Ковши с бортовыми направляющими', image: '/images/kovshi-27176946.webp' },
    ],
  },
} satisfies PageSeo;
