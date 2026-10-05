import type { PageSeo } from '../_shared/types';
import { createBeltVariantSeo } from '../_shared/create-belt-variant-page';

const base = createBeltVariantSeo('mini-lentochnyy-konveyer');
const title = 'Мини ленточный конвейер до 1,5 м на заказ | АБАТЭК';
const description =
  'Мини ленточный конвейер длиной до 1,5 м для производства и лабораторных испытаний. Изготовление под груз, скорость и схему измерений. Расчёт в АБАТЭК.';

export const seo = {
  ...base,
  title,
  description,
  keywords: [
    'мини ленточный конвейер',
    'мини транспортер до 1,5 м',
    'короткий ленточный конвейер',
    'компактный ленточный транспортер',
    'мини конвейер для лабораторных испытаний',
    'лабораторный ленточный конвейер',
  ],
  openGraph: { ...base.openGraph, title, description },
  twitter: { ...base.twitter, title, description },
  schema: {
    ...base.schema,
    name: 'Мини ленточный конвейер длиной до 1,5 м',
    properties: [
      { name: 'Длина', value: 'До 1,5 м включительно' },
      { name: 'Применение', value: 'Производственные линии и лабораторные испытательные стенды' },
    ],
  },
} satisfies PageSeo;
