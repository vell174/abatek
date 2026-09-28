import type { PageSeo } from '../_shared/types';

const title = 'Шлюзовые роторные питатели ШП от производителя | АБАТЭК';
const description =
  'Шлюзовые питатели ШП-150–ШП-500 и нестандартные исполнения по ТЗ: характеристики, чертежи и ориентировочные цены.';
const image = '/images/shlyuzovye-pitateli-shp-250-abatek.jpg';

export const seo = {
  title,
  description,
  keywords: [
    'шлюзовой питатель',
    'шлюзовой роторный питатель',
    'шлюзовой питатель ШП',
    'ШП-150',
    'ШП-200',
    'ШП-260',
    'ШП-300',
    'ШП-350',
    'ШП-400',
    'ШП-450',
    'ШП-500',
    'шлюзовой питатель нестандартных размеров',
    'шлюзовой питатель по ТЗ',
    'купить шлюзовой питатель',
    'шлюзовой питатель для бункера',
    'роторный питатель для бункера',
  ],
  canonicalPath: '/shlyuzovye-pitateli-shp/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: {
    src: image,
    alt: 'Шлюзовые роторные питатели ШП-250 с мотор-редукторами производства АБАТЭК',
    width: 1600,
    height: 1201,
    type: 'image/jpeg',
  },
  openGraph: { title, description, type: 'website', locale: 'ru_RU', siteName: 'АБАТЭК' },
  twitter: { card: 'summary_large_image', title, description },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Шлюзовые питатели ШП', path: '/shlyuzovye-pitateli-shp/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'ProductGroup',
    name: 'Шлюзовые роторные питатели типа ШП',
    category: 'Промышленное оборудование',
    productGroupId: 'SHP',
    variesBy: ['https://schema.org/size'],
    items: [
      { name: 'Шлюзовой роторный питатель ШП-150', url: '/shp-150/', sku: 'ШП-150', image },
      { name: 'Шлюзовой роторный питатель ШП-200', url: '/shp-200/', sku: 'ШП-200', image },
      { name: 'Шлюзовой роторный питатель ШП-260', url: '/shp-260/', sku: 'ШП-260', image },
      { name: 'Шлюзовой роторный питатель ШП-300', url: '/shp-300/', sku: 'ШП-300', image },
      { name: 'Шлюзовой роторный питатель ШП-350', url: '/shp-350/', sku: 'ШП-350', image },
      { name: 'Шлюзовой роторный питатель ШП-400', url: '/shp-400/', sku: 'ШП-400', image },
      { name: 'Шлюзовой роторный питатель ШП-450', url: '/shp-450/', sku: 'ШП-450', image },
      { name: 'Шлюзовой роторный питатель ШП-500', url: '/shp-500/', sku: 'ШП-500', image },
      {
        name: 'Шлюзовой питатель ШП нестандартных размеров',
        url: '/shp-nestandartnyh-razmerov/',
        sku: 'ШП-Н',
        image: '/images/shlyuzovyy-pitatel-shp-s-motor-reduktorom-abatek-3d.jpg',
      },
    ],
  },
} satisfies PageSeo;
