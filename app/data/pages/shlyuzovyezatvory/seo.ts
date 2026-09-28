import type { PageSeo } from '../_shared/types';

const title = 'Шлюзовые затворы ШУ — купить у производителя | АБАТЭК';
const description =
  'Шлюзовые роторные затворы ШУ-6, ШУ-15, ШУ-22 и ШУ-30 производительностью до 50 м³/ч. Подбор, изготовление и доставка по России.';
const image = '/images/shlyuzovye-zatvory-shu-proizvodstvo-abatek.webp';

export const seo = {
  title,
  description,
  keywords: [
    'шлюзовой затвор',
    'шлюзовой роторный затвор',
    'шлюзовой затвор ШУ',
    'ШУ-6',
    'ШУ-15',
    'ШУ-22',
    'ШУ-30',
    'купить шлюзовой затвор',
    'шлюзовой затвор для циклона',
    'роторный питатель для бункера',
  ],
  canonicalPath: '/shlyuzovyezatvory/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: {
    src: image,
    alt: 'Шлюзовые роторные затворы ШУ производства АБАТЭК',
    width: 1805,
    height: 871,
    type: 'image/webp',
  },
  openGraph: { title, description, type: 'website', locale: 'ru_RU', siteName: 'АБАТЭК' },
  twitter: { card: 'summary_large_image', title, description },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Шлюзовые затворы ШУ', path: '/shlyuzovyezatvory/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'ProductGroup',
    name: 'Шлюзовые роторные затворы типа ШУ',
    category: 'Шлюзовые роторные затворы',
    productGroupId: 'SHU',
    variesBy: ['https://schema.org/size'],
    items: [
      {
        name: 'Шлюзовой роторный затвор ШУ-6',
        sku: 'ШУ-6',
        description: 'Компактный шлюзовой затвор с ёмкостью ротора 6 л и производительностью до 10 м³/ч.',
        image,
        properties: [
          { name: 'Ёмкость ротора', value: '6 л' },
          { name: 'Производительность', value: 'до 10 м³/ч' },
          { name: 'Мощность привода', value: '0,75 кВт' },
        ],
      },
      {
        name: 'Шлюзовой роторный затвор ШУ-15',
        sku: 'ШУ-15',
        description: 'Шлюзовой затвор с ёмкостью ротора 15 л и производительностью до 25 м³/ч.',
        image,
        properties: [
          { name: 'Ёмкость ротора', value: '15 л' },
          { name: 'Производительность', value: 'до 25 м³/ч' },
          { name: 'Мощность привода', value: '1,1 кВт' },
        ],
      },
      {
        name: 'Шлюзовой роторный затвор ШУ-22',
        sku: 'ШУ-22',
        description: 'Шлюзовой затвор с ёмкостью ротора 22 л и производительностью до 36 м³/ч.',
        image,
        properties: [
          { name: 'Ёмкость ротора', value: '22 л' },
          { name: 'Производительность', value: 'до 36 м³/ч' },
          { name: 'Мощность привода', value: '1,5 кВт' },
        ],
      },
      {
        name: 'Шлюзовой роторный затвор ШУ-30',
        sku: 'ШУ-30',
        description: 'Шлюзовой затвор с ёмкостью ротора 30 л и производительностью до 50 м³/ч.',
        image,
        properties: [
          { name: 'Ёмкость ротора', value: '30 л' },
          { name: 'Производительность', value: 'до 50 м³/ч' },
          { name: 'Мощность привода', value: '2,2 кВт' },
        ],
      },
    ],
  },
} satisfies PageSeo;
