import { createBeltVariantSeo } from '../_shared/create-belt-variant-page';
import { gallery } from './gallery';

const baseSeo = createBeltVariantSeo('shevronnye-lentochnye-konveyery');
const title = 'Шевронные ленточные конвейеры на заказ | АБАТЭК';
const description =
  'Наклонные конвейеры с шевронной лентой для штучных, сыпучих и кусковых грузов. Плоская, V-образная и желобчатая ветвь. Подбор и изготовление по ТЗ.';

export const seo = {
  ...baseSeo,
  title,
  description,
  image: {
    src: gallery[3].src,
    alt: gallery[3].alt,
    width: gallery[3].width,
    height: gallery[3].height,
    type: 'image/jpeg' as const,
  },
  openGraph: { ...baseSeo.openGraph, title, description },
  twitter: { ...baseSeo.twitter, title, description },
};
