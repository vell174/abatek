import type { PageSeo } from '../_shared/types';
import { seo as beltSeo } from '../lentochnye-konveyery-dlya-sypuchih-materialov/seo';
import { pageData } from './data';

const title = 'Конвейеры для сыпучих материалов: ленточные, винтовые, скребковые | АБАТЭК';
const description =
  'Подбор конвейера для зерна, песка, щебня, цемента и порошков. Сравнение ленточных, винтовых и скребковых решений, примеры применения и изготовление по ТЗ.';

export const seo = {
  ...beltSeo,
  title,
  description,
  keywords: [
    'конвейеры для сыпучих материалов',
    'транспортер для сыпучих грузов',
    'ленточный или винтовой конвейер',
    'конвейер для цемента',
    'конвейер для песка и щебня',
  ],
  canonicalPath: '/konveyery-dlya-sypuchih-materialov/',
  image: { src: pageData.image, alt: pageData.imageAlt, type: 'image/webp' },
  openGraph: { ...beltSeo.openGraph, title, description },
  twitter: { ...beltSeo.twitter, title, description },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Конвейеры для сыпучих материалов', path: '/konveyery-dlya-sypuchih-materialov/' },
  ],
  schema: { pageType: 'CollectionPage', name: 'Конвейеры для сыпучих материалов', category: 'Конвейеры по типу груза' },
} satisfies PageSeo;
