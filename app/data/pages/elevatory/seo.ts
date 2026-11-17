import type { PageSeo } from '../_shared/types';

const title = 'Элеваторы ковшовые ленточные и цепные на заказ | АБАТЭК';
const description =
  'Ленточные ковшовые элеваторы ЛГ, ЛМ и ЛО для сухих, влажных и кусковых грузов. Характеристики моделей, размеры глубоких, мелких и остроугольных ковшей.';

export const seo = {
  title,
  description,
  keywords: [
    'элеваторы ковшовые',
    'ковшовый элеватор ленточный',
    'ковшовый элеватор цепной',
    'нория ковшовая',
    'ленточный элеватор ЛГ',
    'ленточный элеватор ЛМ',
    'ленточный элеватор ЛО',
    'вертикальный транспортёр сыпучих материалов',
  ],
  canonicalPath: '/elevatory-kovshovye/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: {
    src: '/images/elevatory/kovshovyy-elevator-chertezh.webp',
    alt: 'Чертёж ковшового элеватора с приводной головкой и мотором-редуктором',
    width: 1285,
    height: 763,
  },
  openGraph: { title, description, type: 'website', locale: 'ru_RU', siteName: 'АБАТЭК' },
  twitter: { card: 'summary_large_image', title, description },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Элеваторы ковшовые', path: '/elevatory-kovshovye/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'ItemList',
    name: 'Элеваторы ковшовые',
    category: 'Оборудование для вертикальной транспортировки сыпучих материалов',
    items: [
      {
        name: 'Ленточные ковшовые элеваторы ЛГ, ЛМ и ЛО',
        description: 'Исполнения с глубокими, мелкими и остроугольными ковшами для разных видов сыпучих грузов.',
      },
      {
        name: 'Цепные ковшовые элеваторы',
        description: 'Ковши на цепном тяговом органе для тяжёлых, крупнокусковых и абразивных грузов.',
      },
    ],
  },
} satisfies PageSeo;
