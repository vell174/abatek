import type { PageSeo } from '../_shared/types';
import { beltClassificationGroups } from '../_shared/create-belt-variant-page';

const title = 'Купить ленточный конвейер от производителя — цена, виды | АБАТЭК';
const description =
  'Производство ленточных конвейеров на заказ в АБАТЭК. Виды и типы конструкций для сыпучих и штучных грузов, подбор оборудования и расчёт цены по техническому заданию.';

export const seo = {
  title,
  description,
  keywords: [
    'ленточные конвейеры от производителя',
    'ленточные конвейеры от производителя на заказ',
    'конвейерное оборудование',
    'производитель АБАТЭК',
    'ленточный конвейер купить',
    'типы ленточных конвейеров',
    'ленточный конвейер цена',
    'производство ленточных конвейеров',
    'виды ленточных конвейеров',
    'производители ленточных конвейеров',
    'завод ленточных конвейеров',
  ],
  canonicalPath: '/lentochnye-konvejery/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: {
    src: '/images/lentochnye-konveyery-ot-proizvoditelya.webp',
    alt: 'Ленточные конвейеры от производителя',
  },
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Ленточные конвейеры от производителя', path: '/lentochnye-konvejery/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'ItemList',
    itemType: 'WebPage',
    name: 'Ленточные конвейеры от производителя',
    category: 'Конвейерное оборудование',
    items: beltClassificationGroups.flatMap((group) =>
      group.items.map((item) => ({
        name: item.title,
        url: item.href,
        description: item.text?.[0],
        image: item.image,
      })),
    ),
  },
} satisfies PageSeo;
