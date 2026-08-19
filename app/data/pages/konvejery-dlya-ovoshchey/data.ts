import { createApplicationPage, type ApplicationPageOptions } from '../_shared/create-application-page';
export const options = {
  slug: 'konvejery-dlya-ovoshchey',
  title: 'Конвейеры для овощей и фруктов',
  shortTitle: 'овощей и фруктов',
  description: 'Пищевые транспортеры для бережного перемещения овощей и фруктов между стадиями обработки и упаковки.',
  intro: [
    'Конвейеры обеспечивают быструю, равномерную и бережную транспортировку овощей и фруктов, повышают эффективность и снижают влияние человеческого фактора.',
    'Линии перемещают картофель, лук, свёклу, морковь и другие плоды к стадиям обработки и упаковки, сокращая трудозатраты и повреждения продукции.',
  ],
  hero: '/images/vegetable-conveyor-feature-50026995.webp',
  feature: '/images/vegetable-conveyor-feature-50026995.webp',
  featureTitle: 'Особенности конвейеров для овощей и фруктов',
  featureText: [
    'Конструкция включает ленту, цепь или ролики, подъёмный механизм, привод и устройства остановки. Исполнение выбирают по виду продукта и операции.',
  ],
  types: '/images/bag-conveyor-types-26553325.webp',
  tableSubject: 'овощей и фруктов',
  keywords: ['конвейер для овощей', 'транспортер для фруктов', 'пищевой конвейер'],
  imageType: 'image/png',
} satisfies ApplicationPageOptions;
export const pageData = createApplicationPage(options);
