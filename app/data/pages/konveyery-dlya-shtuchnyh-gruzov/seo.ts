import type { PageSeo } from '../_shared/types';
import { seo as beltSeo } from '../lentochnye-konveyery-dlya-shtuchnyh-gruzov/seo';
import { pageData } from './data';

const title = 'Конвейеры для штучных грузов: виды и подбор | АБАТЭК';
const description =
  'Какие транспортеры подходят для коробок, паллет, мешков и деталей: сравнение ленточных, роликовых, цепных и пластинчатых конвейеров. Подбор линии под груз.';

export const seo = {
  ...beltSeo,
  title,
  description,
  keywords: [
    'конвейеры для штучных грузов',
    'транспортер для коробок и паллет',
    'рольганг для штучных грузов',
    'цепной конвейер для паллет',
    'подбор конвейера для штучного груза',
  ],
  canonicalPath: '/konveyery-dlya-shtuchnyh-gruzov/',
  image: { src: pageData.heroImage, alt: pageData.heroImageAlt, type: 'image/webp' },
  openGraph: { ...beltSeo.openGraph, title, description },
  twitter: { ...beltSeo.twitter, title, description },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Конвейеры для штучных грузов', path: '/konveyery-dlya-shtuchnyh-gruzov/' },
  ],
  schema: { pageType: 'CollectionPage', name: 'Конвейеры для штучных грузов', category: 'Конвейеры по типу груза' },
} satisfies PageSeo;
