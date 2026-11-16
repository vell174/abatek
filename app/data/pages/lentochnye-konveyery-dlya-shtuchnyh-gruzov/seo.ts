import type { PageSeo } from '../_shared/types';
import { createBeltVariantSeo } from '../_shared/create-belt-variant-page';
import { pageData } from './data';

const baseSeo = createBeltVariantSeo('lentochnye-konveyery-dlya-shtuchnyh-gruzov');
const title = 'Ленточные конвейеры для штучных грузов на заказ | АБАТЭК';
const description =
  'Конвейеры для мешков, коробок, пакетов, шин и деталей. Плоская рабочая ветвь для производства, склада, сортировки, маркировки и упаковки. Изготовление по ТЗ.';

export const seo = {
  ...baseSeo,
  title,
  description,
  keywords: [
    'ленточный конвейер для штучных грузов',
    'конвейер для коробок и мешков',
    'ленточный конвейер для шин',
    'конвейер для деталей и заготовок',
    'конвейер для маркировки и упаковки',
  ],
  image: {
    src: pageData.heroImage,
    alt: pageData.heroImageAlt,
    type: 'image/webp',
    width: 1918,
    height: 820,
  },
  openGraph: { ...baseSeo.openGraph, title, description },
  twitter: { ...baseSeo.twitter, title, description },
  schema: {
    pageType: 'CollectionPage',
    name: 'Ленточные конвейеры для штучных грузов',
    category: 'Ленточные конвейеры',
  },
} satisfies PageSeo;
