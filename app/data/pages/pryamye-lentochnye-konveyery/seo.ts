import { createBeltVariantSeo } from '../_shared/create-belt-variant-page';
import { pageData } from './data';

const baseSeo = createBeltVariantSeo('pryamye-lentochnye-konveyery');
const title = 'Прямые ленточные конвейеры на заказ | АБАТЭК';
const description =
  'Прямые ленточные конвейеры для горизонтальной и наклонной подачи грузов. Подбор ленты, ширины, привода и бортов по ТЗ. Изготовление и поставка по России.';

export const seo = {
  ...baseSeo,
  title,
  description,
  image: { src: pageData.heroImage, alt: pageData.heroImageAlt, width: 2033, height: 851, type: 'image/webp' as const },
  openGraph: { ...baseSeo.openGraph, title, description },
  twitter: { ...baseSeo.twitter, title, description },
};
