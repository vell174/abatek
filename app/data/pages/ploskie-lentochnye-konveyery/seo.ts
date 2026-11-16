import { createBeltVariantSeo } from '../_shared/create-belt-variant-page';
import type { PageSeo } from '../_shared/types';
import { flatBeltHero } from './data';

export const seo = {
  ...createBeltVariantSeo('ploskie-lentochnye-konveyery'),
  image: flatBeltHero,
} satisfies PageSeo;
