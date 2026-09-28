import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'Дисковый резак ДР20 — купить электронож для конвейерных лент | АБАТЭК',
  description:
    'Проводные и аккумуляторные электроножи АБАТЭК для продольной и поперечной резки конвейерных лент, резины и полиуретана толщиной до 25 мм.',
  keywords: [
    'электронож для резки конвейерных лент купить',
    'электронож для резки конвейерных лент купить на заказ',
    'конвейерное оборудование',
    'производитель АБАТЭК',
  ],
  canonicalPath: '/elektronoji-dlya-rezki-konveyernih-lent-tehnicheskih-plastin/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: {
    src: '/images/rezka-konveyernoy-lenty-elektronozhom-dr20-abatek.webp',
    alt: 'Резка конвейерной ленты дисковым электроножом ДР20 АБАТЭК',
    width: 1536,
    height: 1024,
    type: 'image/webp',
  },
  openGraph: {
    title: 'Купить электронож для резки конвейерных лент и резины | АБАТЭК',
    description:
      'Проводные и аккумуляторные электроножи АБАТЭК для продольной и поперечной резки конвейерных лент, резины и полиуретана толщиной до 25 мм.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Купить электронож для резки конвейерных лент и резины | АБАТЭК',
    description:
      'Проводные и аккумуляторные электроножи АБАТЭК для продольной и поперечной резки конвейерных лент, резины и полиуретана толщиной до 25 мм.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    {
      name: 'Электронож для резки конвейерных лент, резины и технических пластин',
      path: '/elektronoji-dlya-rezki-konveyernih-lent-tehnicheskih-plastin/',
    },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'ItemList',
    name: 'Электронож для резки конвейерных лент, резины и технических пластин',
    category: 'Конвейерное оборудование',
    items: [
      {
        name: 'Дисковый резак ДР20 АБАТЭК с проводным перфоратором Makita',
        image: '/images/diskovyy-rezak-dr20-abatek-provodnoy-makita.webp',
      },
      {
        name: 'Дисковый резак ДР20А АБАТЭК с аккумуляторным перфоратором Metabo',
        image: '/images/diskovyy-rezak-dr20a-abatek-akkumulyatornyy-metabo.webp',
      },
    ],
  },
} satisfies PageSeo;
