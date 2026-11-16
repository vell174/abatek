import { createBeltVariantSeo } from '../_shared/create-belt-variant-page';

const baseSeo = createBeltVariantSeo('konveyery-s-rezinotkanevoy-lentoy');
const title = 'Конвейеры с резинотканевой лентой на заказ | АБАТЭК';
const description =
  'Конвейеры с резинотканевой лентой для щебня, угля, зерна и тяжёлых грузов. Виды лент: шахтная, теплостойкая, морозостойкая, маслостойкая. Подбор и изготовление по ТЗ.';

export const seo = {
  ...baseSeo,
  title,
  description,
  image: {
    src: '/images/belt-projects/konveyer-s-rezinotkanevoy-lentoy-hero.webp',
    alt: 'Желобчатый конвейер с резинотканевой лентой на роликоопорах',
    width: 1448,
    height: 1086,
    type: 'image/webp',
  },
  openGraph: { ...baseSeo.openGraph, title, description },
  twitter: { ...baseSeo.twitter, title, description },
};
