import type { PageSeo } from '../_shared/types';
import { pageData } from './data';

export const seo = {
  title: pageData.seoTitle,
  description: pageData.description,
  keywords: [
    'резервуар вертикальный стальной',
    'вертикальный цилиндрический резервуар',
    'резервуары для воды вертикальные',
    'резервуар чистой воды вертикальный',
    'резервуар РВС',
    'РВС резервуар вертикальный',
    'резервуары стальные РВС',
    'РВС 5',
    'РВС 10',
    'РВС 20',
    'РВС 50',
    'РВС 100',
    'цельносварной вертикальный резервуар',
    'изготовление РВС по чертежам',
  ],
  canonicalPath: '/rezervuary-vertikalnye-rvs/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image: {
    src: pageData.heroImage,
    alt: 'Стальной резервуар РВС для системы очистки воды при подготовке к отгрузке',
    type: 'image/webp',
  },
  openGraph: {
    title: pageData.seoTitle,
    description: pageData.description,
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: { card: 'summary_large_image', title: pageData.seoTitle, description: pageData.description },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Резервуары вертикальные РВС', path: '/rezervuary-vertikalnye-rvs/' },
  ],
  schema: {
    pageType: 'WebPage',
    entityType: 'Product',
    name: 'Резервуары вертикальные стальные РВС до 120 м³',
    category: 'Ёмкостное оборудование',
    properties: [
      { name: 'Объём', value: 'До 120 м³' },
      { name: 'Материал', value: 'Углеродистая или нержавеющая сталь' },
      { name: 'Конструкция', value: 'Цельносварная' },
      { name: 'Назначение', value: 'Для воды и технических жидкостей' },
    ],
  },
} satisfies PageSeo;
