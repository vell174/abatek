import type { PageSeo } from '../_shared/types';
import { createBeltVariantSeo } from '../_shared/create-belt-variant-page';

const baseSeo = createBeltVariantSeo('lentochnye-konveyery-s-prodolnymi-pryamymi-bortami');
const title = 'Ленточные конвейеры с продольными бортами | АБАТЭК';
const description =
  'Ленточные конвейеры с прямыми продольными бортами для овощей, мешков, отходов и бутылок. Борта с одной или двух сторон, регулировка высоты и вылета.';

export const seo: PageSeo = {
  ...baseSeo,
  title,
  description,
  keywords: [
    'ленточный конвейер с продольными бортами',
    'ленточные конвейеры с продольными прямыми бортами',
    'конвейер с прямыми боковыми бортами',
    'конвейер с регулируемыми бортами',
    'конвейер с бортами для овощей',
    'конвейер с направляющими для бутылок',
    'передвижной ленточный конвейер с бортами',
  ],
  image: {
    src: '/images/belt-classification/straight-longitudinal-sideboards-hero.webp',
    alt: 'Передвижной ленточный конвейер с продольными прямыми бортами перевозит овощи на складе',
    type: 'image/webp',
    width: 1672,
    height: 941,
  },
  openGraph: { ...baseSeo.openGraph, title, description },
  twitter: { ...baseSeo.twitter, title, description },
};
