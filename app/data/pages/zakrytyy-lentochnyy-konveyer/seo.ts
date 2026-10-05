import type { PageSeo } from '../_shared/types';
import { createBeltVariantSeo } from '../_shared/create-belt-variant-page';

const base = createBeltVariantSeo('zakrytyy-lentochnyy-konveyer');
const title = 'Закрытый ленточный конвейер с укрытием на заказ | АБАТЭК';
const description =
  'Закрытый ленточный конвейер для пылящих грузов или работы под открытым небом. Кожух, сервисные крышки, патрубки под аспирацию по ТЗ. Расчёт в АБАТЭК.';

export const seo = {
  ...base,
  title,
  description,
  keywords: [
    'закрытый ленточный конвейер',
    'ленточный конвейер с укрытием',
    'закрытый транспортер для пылящих материалов',
    'конвейер с патрубком аспирации',
    'ленточный конвейер с защитой от осадков',
  ],
  openGraph: { ...base.openGraph, title, description },
  twitter: { ...base.twitter, title, description },
  schema: {
    ...base.schema,
    name: 'Закрытый ленточный конвейер с укрытием',
    properties: [
      { name: 'Задачи укрытия', value: 'Ограничение выхода пыли или защита груза от осадков' },
      { name: 'Дополнительная комплектация', value: 'Патрубки для подключения аспирации по техническому заданию' },
    ],
  },
} satisfies PageSeo;
