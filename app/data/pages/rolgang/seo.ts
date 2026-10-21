import type { PageSeo } from '../_shared/types';
import { catalog } from './data-catalog';

const title = 'Рольганги и роликовые конвейеры на заказ | АБАТЭК';
const description =
  'Производство приводных и неприводных рольгангов для станков, металла, листов, коробок и паллет. Прямые, поворотные и гравитационные линии. Расчёт цены по ТЗ.';

export const seo = {
  title,
  description,
  keywords: [
    'рольганг купить',
    'рольганг приводной',
    'рольганг неприводной',
    'рольганг гравитационный',
    'поворотный рольганг',
    'роликовый конвейер',
    'рольганг для станка',
    'рольганг для трубы',
    'рольганг цена',
  ],
  canonicalPath: '/rolgang/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: {
    src: '/images/rolgang/non-powered-hero-concrete.webp',
    alt: 'Неприводной рольганг с синими роликами на чистом бетонном полу',
    width: 1672,
    height: 941,
    type: 'image/webp',
  },
  openGraph: { title, description, type: 'website', locale: 'ru_RU', siteName: 'АБАТЭК' },
  twitter: { card: 'summary_large_image', title, description },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Роликовый конвейер (рольганг)', path: '/rolgang/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'ItemList',
    name: 'Виды роликовых конвейеров и рольгангов',
    category: 'Роликовые конвейеры',
    items: catalog.map((item) => ({
      name: item.title,
      description: item.text?.join(' '),
      image: item.image,
      ...(item.href ? { url: item.href } : {}),
    })),
  },
} satisfies PageSeo;
