import type { PageSeo } from '../_shared/types';
import { createBeltVariantSeo } from '../_shared/create-belt-variant-page';
import { gallery } from './gallery';

const base = createBeltVariantSeo('proizvodstvennye-lentochnye-konveyery');
const title = 'Ленточные конвейеры для производственных линий на заказ | АБАТЭК';
const description =
  'Ленточные конвейеры между станками и постами: подбор по грузу, такту линии и схеме участка. Фото выполненных проектов, изготовление по ТЗ.';

export const seo = {
  ...base,
  title,
  description,
  keywords: [
    'производственные ленточные конвейеры',
    'ленточный конвейер для производственной линии',
    'конвейер между станками',
    'ленточный транспортер для цеха',
    'конвейер для технологической линии',
  ],
  image: {
    src: gallery[1].src,
    alt: gallery[1].alt,
    type: 'image/webp',
    width: gallery[1].width,
    height: gallery[1].height,
  },
  openGraph: { ...base.openGraph, title, description },
  twitter: { ...base.twitter, title, description },
  schema: {
    pageType: 'WebPage',
    name: 'Ленточные конвейеры для производственных линий',
    category: 'Ленточные конвейеры',
  },
} satisfies PageSeo;
