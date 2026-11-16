import { createBeltVariantSeo } from '../_shared/create-belt-variant-page';

const baseSeo = createBeltVariantSeo('konveyery-s-pvh-lentoy');
const title = 'Конвейеры с ПВХ-лентой на заказ | АБАТЭК';
const description =
  'Конвейеры с ПВХ-лентой для коробок, упаковки и штучных грузов. Гладкие и антискользящие ленты, перегородки и гофроборта. Изготовление по ТЗ.';

export const seo = {
  ...baseSeo,
  title,
  description,
  keywords: [
    ...baseSeo.keywords,
    'ПВХ-лента для конвейера',
    'конвейер с пищевой ПВХ-лентой',
    'конвейер с антискользящей ПВХ-лентой',
    'ПВХ-лента с перегородками и гофробортами',
  ],
  image: {
    src: '/images/conveyor-types/konveyer-s-pvh-lentoy-hero-v2.webp',
    alt: 'Конвейер с ПВХ-лентой для транспортировки коробок и штучных грузов',
    width: 1672,
    height: 941,
    type: 'image/webp',
  },
  openGraph: { ...baseSeo.openGraph, title, description },
  twitter: { ...baseSeo.twitter, title, description },
};
