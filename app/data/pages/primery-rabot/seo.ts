import type { PageSeo } from '../_shared/types';

export const seo = {
  title: 'Фотогалерея выполненных работ — АБАТЭК',
  description:
    'Фото изготовленных конвейеров, ковшовых элеваторов, барабанов, резервуаров и другого промышленного оборудования АБАТЭК. Реальные выполненные проекты.',
  keywords: [
    'фотогалерея АБАТЭК',
    'фото выполненных работ',
    'фото конвейеров',
    'фото промышленного оборудования',
    'выполненные проекты АБАТЭК',
  ],
  canonicalPath: '/fotogallereya/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    title: 'Фотогалерея выполненных работ — АБАТЭК',
    description: 'Фотографии изготовленного конвейерного и промышленного оборудования АБАТЭК.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Фотогалерея выполненных работ — АБАТЭК',
    description: 'Фотографии изготовленного конвейерного и промышленного оборудования АБАТЭК.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Фотогалерея', path: '/fotogallereya/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    name: 'Фотогалерея выполненных работ АБАТЭК',
  },
} satisfies PageSeo;
