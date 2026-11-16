import type { PageSeo } from '../_shared/types';
import { createBeltVariantSeo } from '../_shared/create-belt-variant-page';
import { pageData } from './data';

const baseSeo = createBeltVariantSeo('lentochnye-konveyery-dlya-kuskovyh-gruzov');
const title = 'Ленточные конвейеры для кусковых грузов на заказ | АБАТЭК';
const description =
  'Конвейеры для крупного щебня, руды, камня, угля, кирпичного боя и известняка. Подбор ленты, желобчатых опор и защиты зоны загрузки. Изготовление по ТЗ в АБАТЭК.';

export const seo = {
  ...baseSeo,
  title,
  description,
  keywords: [
    'ленточный конвейер для кусковых грузов',
    'конвейер для крупного щебня',
    'ленточный конвейер для руды и камня',
    'конвейер для кускового угля',
    'конвейер для кирпичного боя и известняка',
  ],
  image: {
    src: pageData.image,
    alt: pageData.imageAlt,
    type: 'image/webp',
    width: 1080,
    height: 720,
  },
  openGraph: { ...baseSeo.openGraph, title, description },
  twitter: { ...baseSeo.twitter, title, description },
  schema: {
    pageType: 'CollectionPage',
    name: 'Ленточные конвейеры для кусковых грузов',
    category: 'Ленточные конвейеры',
  },
} satisfies PageSeo;
