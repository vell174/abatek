import type { PageSeo } from '../_shared/types';
import { createBeltVariantSeo } from '../_shared/create-belt-variant-page';

const baseSeo = createBeltVariantSeo('pogruzochnye-lentochnye-konveyery');
const title = 'Погрузочные ленточные конвейеры на заказ | АБАТЭК';
const description =
  'Передвижные погрузочные ленточные конвейеры для грунта, строительного мусора, дров и товаров. Погрузка и разгрузка фур, наклон и регулировка угла. Изготовление по ТЗ.';

export const seo: PageSeo = {
  ...baseSeo,
  title,
  description,
  keywords: [
    'погрузочный ленточный конвейер',
    'передвижной погрузочный конвейер',
    'конвейер для погрузки самосвала',
    'конвейер для погрузки дров',
    'ленточный конвейер для загрузки фуры',
    'конвейер для разгрузки фуры',
    'погрузочный конвейер с регулировкой угла',
  ],
  image: {
    src: '/images/belt-classification/loading-conveyor-warehouse-hero.webp',
    alt: 'Передвижной ленточный конвейер между складом и кузовом фуры',
    type: 'image/webp',
    width: 1672,
    height: 941,
  },
  openGraph: { ...baseSeo.openGraph, title, description },
  twitter: { ...baseSeo.twitter, title, description },
};
