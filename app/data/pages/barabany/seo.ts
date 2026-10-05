import type { PageSeo } from '../_shared/types';
import { pageData } from './data';
import { catalog } from './data-catalog';

const title = pageData.seoTitle;
const description =
  'Купить конвейерные барабаны для ленточных конвейеров, элеваторов и норий у АБАТЭК. Приводные, натяжные, футерованные и планчатые. Изготовление по чертежам и доставка.';

export const seo = {
  title,
  description,
  keywords: [
    'барабан конвейера',
    'барабан транспортера',
    'барабан ленточного конвейера',
    'приводной барабан конвейера',
    'натяжной барабан конвейера',
    'обводной барабан конвейера',
    'отклоняющий барабан ленточного конвейера',
    'концевой барабан конвейера',
    'хвостовой барабан конвейера',
    'диаметр барабана ленточного конвейера',
    'устройство барабана конвейера',
    'производство барабанов для ленточных конвейеров',
    'изготовление барабанов для конвейера',
    'купить барабаны для конвейера',
    'барабан нории',
    'норийный барабан',
    'барабан элеватора',
    'футеровка барабана ленточного конвейера',
    'футерованные барабаны',
    'планчатые барабаны',
  ],
  canonicalPath: '/barabany/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: {
    src: pageData.heroImage,
    alt: 'Конвейерные барабаны: гладкий, футерованный и планчатый',
    type: 'image/webp',
  },
  openGraph: { title, description, type: 'website', locale: 'ru_RU', siteName: 'АБАТЭК' },
  twitter: { card: 'summary_large_image', title, description },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Комплектующие к конвейерам и транспортерам', path: '/komplektuyushie-k-konvejeram/' },
    { name: 'Барабаны конвейерные', path: '/barabany/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'ItemList',
    itemType: 'Product',
    name: 'Барабаны конвейерные',
    category: 'Комплектующие к конвейерам',
    items: catalog.map((product) => ({
      name: product.title,
      url: product.href,
      description: product.text?.join(' '),
      image: product.image,
    })),
  },
} satisfies PageSeo;
