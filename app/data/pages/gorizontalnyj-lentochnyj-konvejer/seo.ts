import type { PageSeo } from '../_shared/types';
import { createBeltVariantSeo } from '../_shared/create-belt-variant-page';

const baseSeo = createBeltVariantSeo('gorizontalnyj-lentochnyj-konvejer');
const title = 'Горизонтальные ленточные конвейеры на заказ | АБАТЭК';
const description =
  'Горизонтальные ленточные конвейеры для коробок, деталей и сыпучих грузов. Стационарные и передвижные, с плоской или желобчатой лентой. Изготовление по ТЗ.';

export const seo: PageSeo = {
  ...baseSeo,
  title,
  description,
  keywords: [
    'горизонтальный ленточный конвейер',
    'горизонтальные ленточные конвейеры',
    'стационарный горизонтальный конвейер',
    'передвижной горизонтальный конвейер',
    'горизонтальный конвейер для сыпучих грузов',
    'горизонтальный конвейер для коробок',
    'горизонтальный ленточный транспортер на заказ',
  ],
  image: {
    src: '/images/belt-classification/horizontal-conveyor-warehouse-hero.webp',
    alt: 'Горизонтальный ленточный конвейер перемещает коробки в складском помещении',
    type: 'image/webp',
    width: 1672,
    height: 941,
  },
  openGraph: { ...baseSeo.openGraph, title, description },
  twitter: { ...baseSeo.twitter, title, description },
};
