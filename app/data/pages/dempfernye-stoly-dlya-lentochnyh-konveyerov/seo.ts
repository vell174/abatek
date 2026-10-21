import type { PageSeo } from '../_shared/types';

const title = 'Демпферные столы для ленточных конвейеров — изготовление | АБАТЭК';
const description =
  'Демпферные столы для зоны загрузки ленточных конвейеров. Типоразмеры под ленту 650–1600 мм, подбор конструкции по чертежу и условиям пересыпа.';

export const seo = {
  title,
  description,
  keywords: [
    'демпферный стол для ленточного конвейера',
    'демпферные столы для конвейеров',
    'амортизационный стол конвейера',
    'демпферная станция ленточного конвейера',
    'стол загрузки конвейерной ленты',
  ],
  canonicalPath: '/dempfernye-stoly-dlya-lentochnyh-konveyerov/',
  robots: 'index, follow',
  image: {
    src: '/images/dempfernye-stoly/impact-bed.webp',
    alt: 'Визуализация демпферного стола для ленточного конвейера',
    type: 'image/webp',
  },
  openGraph: { title, description, type: 'website', locale: 'ru_RU', siteName: 'АБАТЭК' },
  twitter: { card: 'summary_large_image', title, description },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Комплектующие к конвейерам и транспортерам', path: '/komplektuyushie-k-konvejeram/' },
    { name: 'Демпферные столы для ленточных конвейеров', path: '/dempfernye-stoly-dlya-lentochnyh-konveyerov/' },
  ],
  schema: {
    pageType: 'WebPage',
    entityType: 'Product',
    name: 'Демпферные столы для ленточных конвейеров',
    category: 'Комплектующие для ленточных конвейеров',
    properties: [
      { name: 'Место установки', value: 'Зона загрузки ленточного конвейера' },
      { name: 'Ширина ленты для подбора', value: '650, 800, 1000, 1200, 1400, 1600 мм' },
      { name: 'Исполнение', value: 'По параметрам конвейера и чертежу заказчика' },
    ],
  },
} satisfies PageSeo;
