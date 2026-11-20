import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'Цепные конвейеры на заказ от производителя | АБАТЭК',
  description:
    'Проектирование и изготовление цепных конвейеров для паллет, штучных и сыпучих грузов. Подбор конструкции, привода и трассы по техническому заданию.',
  keywords: [
    'цепной конвейер',
    'цепной транспортер',
    'цепные конвейеры на заказ',
    'пластинчатый цепной конвейер',
    'подвесной цепной конвейер',
    'цепной конвейер для паллет',
    'цепной конвейер для бревен',
  ],
  canonicalPath: '/cepnye-konveyeri/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: { src: '/images/source-26553325.webp', alt: 'Цепной конвейер для производственной линии' },
  openGraph: {
    title: 'Цепные конвейеры на заказ | АБАТЭК',
    description: 'Подбираем цепной транспортер под груз, трассу и режим работы. Изготовление по техническому заданию.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Цепные конвейеры на заказ | АБАТЭК',
    description: 'Проектирование и изготовление цепных транспортеров по техническому заданию.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Конвейеры', path: '/conveyors/' },
    { name: 'Цепные конвейеры', path: '/cepnye-konveyeri/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'ItemList',
    name: 'Цепные конвейеры',
    category: 'Конвейерное оборудование',
    items: [
      { name: 'Скребковые цепные конвейеры', image: '/images/chain-conveyors/scraper.webp' },
      { name: 'Пластинчатые цепные конвейеры', image: '/images/chain-conveyors/plate.webp' },
      { name: 'Подвесные цепные конвейеры', image: '/images/chain-conveyors/overhead.webp' },
      { name: 'Цепные конвейеры для транспортировки паллет', image: '/images/chain-conveyors/pallet.webp' },
      { name: 'Цепные конвейеры для транспортировки брёвен', image: '/images/chain-conveyors/logs.webp' },
      { name: 'Цепные конвейеры для штучных грузов', image: '/images/chain-conveyors/piece-goods.webp' },
      { name: 'Цепной конвейер для погрузки дров в машину', image: '/images/chain-conveyors/firewood.webp' },
    ],
  },
} satisfies PageSeo;
