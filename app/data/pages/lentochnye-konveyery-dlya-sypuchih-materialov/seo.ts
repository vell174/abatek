import type { PageSeo } from '../_shared/types';
import { createBeltVariantSeo } from '../_shared/create-belt-variant-page';
import { pageData } from './data';

const baseSeo = createBeltVariantSeo('lentochnye-konveyery-dlya-sypuchih-materialov');
const title = 'Ленточные конвейеры для сыпучих материалов на заказ | АБАТЭК';
const description =
  'Конвейеры для песка, отсева щебня, зерна, грунта, опилок и сахара. Желобчатая или плоская лента по условиям груза. Изготовление по ТЗ в АБАТЭК.';

export const seo = {
  ...baseSeo,
  title,
  description,
  keywords: [
    'ленточный конвейер для сыпучих материалов',
    'конвейер для песка и отсева щебня',
    'ленточный конвейер для зерна',
    'конвейер для грунта и опилок',
    'желобчатый конвейер для сыпучих грузов',
  ],
  image: {
    src: pageData.image,
    alt: pageData.imageAlt,
    type: 'image/webp',
    width: 1080,
    height: 720,
  },
  openGraph: { ...baseSeo.openGraph, title, description },
  twitter: { ...baseSeo.twitter, title, description },
  schema: {
    pageType: 'CollectionPage',
    name: 'Ленточные конвейеры для сыпучих материалов',
    category: 'Ленточные конвейеры',
  },
} satisfies PageSeo;
