import { createBeltVariantSeo } from '../_shared/create-belt-variant-page';
import { pageData } from './data';

const baseSeo = createBeltVariantSeo('konveyery-s-poperechnymi-peregorodkami');
const title = 'Конвейеры с поперечными перегородками на заказ | АБАТЭК';
const description =
  'Ленточные конвейеры с перегородками для сыпучих и штучных грузов. Наклонная подача, ПВХ и резинотканевая лента, гофроборта. Изготовление по ТЗ.';
const image = {
  src: pageData.heroImage,
  alt: pageData.heroImageAlt,
  width: 1200,
  height: 800,
  type: 'image/webp' as const,
};

export const seo = {
  ...baseSeo,
  title,
  description,
  image,
  openGraph: { ...baseSeo.openGraph, title, description },
  twitter: { ...baseSeo.twitter, title, description },
};
