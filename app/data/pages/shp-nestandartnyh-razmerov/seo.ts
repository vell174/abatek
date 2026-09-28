import type { PageSeo } from '../_shared/types';

const title = 'Шлюзовой питатель ШП нестандартных размеров на заказ | АБАТЭК';
const description =
  'Изготовление шлюзовых питателей ШП нестандартных размеров по ТЗ: расчёт производительности, индивидуальные фланцы, ротор, привод и материалы. Производство АБАТЭК.';

export const seo = {
  title,
  description,
  keywords: [
    'шлюзовой питатель нестандартных размеров',
    'шлюзовой питатель по техническому заданию',
    'нестандартный шлюзовой питатель на заказ',
    'изготовление шлюзового питателя по чертежу',
    'шлюзовой роторный питатель по ТЗ',
  ],
  canonicalPath: '/shp-nestandartnyh-razmerov/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: {
    src: '/images/shlyuzovyy-pitatel-shp-s-motor-reduktorom-abatek-3d.jpg',
    alt: 'Шлюзовой питатель ШП нестандартных размеров производства АБАТЭК',
    width: 1448,
    height: 1086,
    type: 'image/jpeg',
  },
  openGraph: { title, description, type: 'website', locale: 'ru_RU', siteName: 'АБАТЭК' },
  twitter: { card: 'summary_large_image', title, description },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Шлюзовые питатели ШП', path: '/shlyuzovye-pitateli-shp/' },
    { name: 'ШП нестандартных размеров', path: '/shp-nestandartnyh-razmerov/' },
  ],
  schema: {
    pageType: 'WebPage',
    entityType: 'Product',
    name: 'Шлюзовой роторный питатель ШП нестандартных размеров',
    category: 'Шлюзовые питатели',
    properties: [
      { name: 'Исполнение', value: 'По техническому заданию заказчика' },
      { name: 'Габариты', value: 'Индивидуальные' },
      { name: 'Производительность', value: 'По расчёту' },
      { name: 'Материал корпуса и ротора', value: 'По условиям эксплуатации' },
      { name: 'Стоимость', value: 'По запросу' },
    ],
  },
} satisfies PageSeo;
