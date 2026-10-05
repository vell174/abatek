import { createProductSeo } from '../_shared/create-product-page';
import { options } from './data';

const baseSeo = createProductSeo(options);
const title = 'Строительные конвейеры и транспортеры на заказ | АБАТЭК';
const description =
  'Ленточные строительные конвейеры для песка, грунта, мусора, мешков с цементом и кирпича. Подбор трассы и комплектации по задаче. Изготовление в АБАТЭК.';

export const seo = {
  ...baseSeo,
  title,
  description,
  image: {
    src: options.image,
    alt: 'Ленточный конвейер с бортами на строительной площадке',
    type: 'image/webp' as const,
  },
  openGraph: { ...baseSeo.openGraph, title, description },
  twitter: { ...baseSeo.twitter, title, description },
};
