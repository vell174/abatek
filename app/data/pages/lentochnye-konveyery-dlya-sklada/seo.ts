import type { PageSeo } from '../_shared/types';
import { createBeltVariantSeo } from '../_shared/create-belt-variant-page';
import { pageData } from './data';

const base = createBeltVariantSeo('lentochnye-konveyery-dlya-sklada');
const title = 'Складские ленточные конвейеры на заказ | АБАТЭК';
const description =
  'Ленточные конвейеры для склада: коробки, посылки, мешки и другие штучные грузы. Прямые, поворотные, наклонные и передвижные секции; подбор ленты по ТЗ.';

export const seo = {
  ...base,
  title,
  description,
  keywords: [
    'складские ленточные конвейеры',
    'ленточный конвейер для склада',
    'складской ленточный транспортер',
    'конвейер для коробок и посылок',
    'поворотный конвейер для склада',
    'передвижной складской конвейер',
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
    pageType: 'WebPage',
    name: 'Складские ленточные конвейеры',
    category: 'Ленточные конвейеры',
  },
} satisfies PageSeo;
