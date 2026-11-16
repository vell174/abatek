import type { PageSeo } from '../_shared/types';
import { createBeltVariantSeo } from '../_shared/create-belt-variant-page';

const baseSeo = createBeltVariantSeo('pishchevye-lentochnye-konveyery');
const title = 'Пищевые ленточные конвейеры на заказ | АБАТЭК';
const description =
  'Пищевые ленточные конвейеры из нержавеющей стали для продуктов и влажных цехов. Пищевые и модульные ленты, прямые, наклонные и передвижные исполнения.';

export const seo: PageSeo = {
  ...baseSeo,
  title,
  description,
  keywords: [
    'пищевые ленточные конвейеры',
    'конвейер для пищевого производства',
    'пищевой конвейер из нержавеющей стали',
    'конвейер с пищевой лентой',
    'пищевой конвейер с модульной лентой',
    'наклонный пищевой конвейер',
    'передвижной пищевой конвейер',
  ],
  image: {
    src: '/images/belt-classification/food-conveyor-tomatoes-hero.webp',
    alt: 'Пищевой конвейер с модульной лентой перемещает томаты на производственной линии',
    type: 'image/webp',
    width: 1672,
    height: 941,
  },
  openGraph: { ...baseSeo.openGraph, title, description },
  twitter: { ...baseSeo.twitter, title, description },
};
