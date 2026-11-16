import type { PageSeo } from '../_shared/types';
import { createBeltVariantSeo } from '../_shared/create-belt-variant-page';

const baseSeo = createBeltVariantSeo('lentochnye-konveyery-dlya-sortirovki');
const title = 'Сортировочные ленточные конвейеры на заказ | АБАТЭК';
const description =
  'Ленточные конвейеры для сортировки товаров, контроля качества и переработки отходов. Плоская лента, борта, регулировка скорости и безопасные рабочие посты.';

export const seo: PageSeo = {
  ...baseSeo,
  title,
  description,
  keywords: [
    'сортировочный ленточный конвейер',
    'ленточный конвейер для сортировки',
    'конвейер для сортировки посылок',
    'конвейер для контроля качества продукции',
    'конвейер для сортировки отходов',
    'сортировочная линия с рольгангами',
    'сортировочный транспортер на заказ',
  ],
  image: {
    src: '/images/belt-classification/sorting-conveyor-logistics-hero.webp',
    alt: 'Операторы сортируют коробки рядом с ленточным конвейером в логистическом центре',
    type: 'image/webp',
    width: 1672,
    height: 941,
  },
  openGraph: { ...baseSeo.openGraph, title, description },
  twitter: { ...baseSeo.twitter, title, description },
};
