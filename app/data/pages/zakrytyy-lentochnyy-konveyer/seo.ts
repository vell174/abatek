import type { PageSeo } from '../_shared/types';
import { createBeltVariantSeo } from '../_shared/create-belt-variant-page';
import { pageData } from './data';

const base = createBeltVariantSeo('zakrytyy-lentochnyy-konveyer');
const title = 'Закрытый ленточный конвейер в коробе на заказ | АБАТЭК';
const description =
  'Закрытый ленточный конвейер в коробе для пылящих грузов. Патрубки под аспирацию, сервисные люки, изготовление по ТЗ. Отличия от погодного укрытия и галереи.';

export const seo = {
  ...base,
  title,
  description,
  keywords: [
    'закрытый ленточный конвейер',
    'закрытый ленточный конвейер в коробе',
    'ленточный конвейер для пылящих грузов',
    'конвейер с аспирационными патрубками',
    'коробной ленточный транспортер',
  ],
  image: {
    src: pageData.heroImage,
    alt: pageData.heroImageAlt,
    type: 'image/webp',
    width: 1600,
    height: 900,
  },
  openGraph: { ...base.openGraph, title, description },
  twitter: { ...base.twitter, title, description },
  schema: {
    ...base.schema,
    name: 'Закрытый ленточный конвейер в коробе',
    properties: [
      { name: 'Конструкция', value: 'Короб, закрывающий трассу со всех сторон' },
      { name: 'Назначение', value: 'Ограничение выхода пыли при транспортировке материала' },
      { name: 'Аспирация', value: 'Патрубки для подключения системы пылеудаления по техническому заданию' },
    ],
  },
} satisfies PageSeo;
