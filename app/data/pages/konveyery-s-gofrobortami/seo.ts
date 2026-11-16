import { createBeltVariantSeo } from '../_shared/create-belt-variant-page';
import { pageData } from './data';

const baseSeo = createBeltVariantSeo('konveyery-s-gofrobortami');
const title = 'Конвейеры с гофробортами на заказ — изготовление | АБАТЭК';
const description =
  'Ленточные конвейеры с гофробортами для сыпучих грузов. Подбор ленты, перегородок и привода по ТЗ. Фото конвейеров, расчёт стоимости и изготовление.';

export const seo = {
  ...baseSeo,
  title,
  description,
  image: { src: pageData.heroImage, alt: pageData.heroImageAlt, width: 1672, height: 941, type: 'image/webp' as const },
  openGraph: { ...baseSeo.openGraph, title, description },
  twitter: { ...baseSeo.twitter, title, description },
};
