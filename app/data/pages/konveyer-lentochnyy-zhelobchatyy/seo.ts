import { createBeltVariantSeo } from '../_shared/create-belt-variant-page';

const baseSeo = createBeltVariantSeo('konveyer-lentochnyy-zhelobchatyy');
const description =
  'Желобчатые ленточные конвейеры с двух- и трёхроликовыми опорами. Подбор по грузу, производительности и трассе, изготовление по ТЗ в АБАТЭК.';

export const seo = {
  ...baseSeo,
  description,
  image: {
    src: '/images/belt-classification/zhelobchataya-vetv-lentochnogo-konveyera.webp',
    alt: 'Желобчатая ветвь ленточного конвейера с наклонными роликоопорами в цехе',
    type: 'image/webp',
    width: 2170,
    height: 725,
  },
  openGraph: { ...baseSeo.openGraph, description },
  twitter: { ...baseSeo.twitter, description },
};
