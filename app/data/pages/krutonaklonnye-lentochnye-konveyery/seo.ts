import type { PageSeo } from '../_shared/types';
import { createBeltVariantSeo } from '../_shared/create-belt-variant-page';

const baseSeo = createBeltVariantSeo('krutonaklonnye-lentochnye-konveyery');
const title = 'Крутонаклонные ленточные конвейеры на заказ | АБАТЭК';
const description =
  'Крутонаклонные ленточные конвейеры для подъёма сыпучих и кусковых грузов на ограниченной площади. Лента с перегородками и гофробортами, изготовление по ТЗ.';

export const seo: PageSeo = {
  ...baseSeo,
  title,
  description,
  keywords: [
    'крутонаклонный ленточный конвейер',
    'крутонаклонные ленточные конвейеры',
    'конвейер с гофробортами и перегородками',
    'крутонаклонный конвейер для сыпучих материалов',
    'ленточный конвейер для крутого подъёма',
    'крутонаклонный транспортер на заказ',
  ],
  image: {
    src: '/images/belt-classification/steep-incline-conveyor-hero.webp',
    alt: 'Крутонаклонный ленточный конвейер с перегородками и гофробортами в производственном цехе',
    type: 'image/webp',
    width: 1672,
    height: 941,
  },
  openGraph: { ...baseSeo.openGraph, title, description },
  twitter: { ...baseSeo.twitter, title, description },
};
