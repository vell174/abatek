import { createApplicationPage, type ApplicationPageOptions } from '../_shared/create-application-page';
export const options = {
  slug: 'konveyer-dlya-upakovki',
  title: 'Конвейеры для коробок и упаковки',
  shortTitle: 'коробок и упаковки',
  description: 'Конвейеры для коробок, ящиков, тары, лотков и другой упаковки любых размеров и веса.',
  intro: [
    'Конвейер для упаковки включает ленту, цепь или ролики, привод, подъёмный механизм и устройства остановки.',
    'Изготавливаем прямые, поворотные и наклонные системы; по заданию устанавливаем датчики подсчёта упаковок.',
  ],
  hero: '/images/package-conveyor-50026787.webp',
  feature: '/images/package-conveyor-26553552.webp',
  featureTitle: 'Особенности конвейеров для коробок и упаковки',
  featureText: [
    'Конструкция рассчитывается по размерам, массе упаковки, функции линии и условиям эксплуатации.',
    'Используем качественные материалы и комплектующие, предоставляем гарантию до 12 месяцев.',
  ],
  types: '/images/package-conveyor-26553325.webp',
  tableSubject: 'упаковок',
  keywords: ['конвейер для упаковки', 'конвейер для коробок', 'транспортер тары'],
} satisfies ApplicationPageOptions;
export const pageData = createApplicationPage(options);
