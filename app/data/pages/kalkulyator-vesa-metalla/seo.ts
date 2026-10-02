import type { PageSeo } from '../_shared/types';

const title = 'Калькулятор веса металла онлайн — АБАТЭК';
const description =
  'Расчёт теоретического веса листа, трубы, уголка, швеллера, двутавра и другого металлопроката по размерам и плотности.';

export const seo = {
  title,
  description,
  keywords: ['калькулятор веса металла', 'расчёт веса металлопроката', 'вес трубы', 'вес листа металла'],
  canonicalPath: '/kalkulyator-vesa-metalla/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: { title, description, type: 'website', locale: 'ru_RU', siteName: 'АБАТЭК' },
  twitter: { card: 'summary_large_image', title, description },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Калькулятор веса металла', path: '/kalkulyator-vesa-metalla/' },
  ],
  schema: { pageType: 'WebPage', name: title },
} satisfies PageSeo;
