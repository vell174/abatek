import { createScrewSeo } from '../_shared/create-screw-page';
import type { PageSeo } from '../_shared/types';
import { pageData, pageOptions } from './data';

const baseSeo = createScrewSeo(pageOptions, pageData);

export const seo: PageSeo = {
  ...baseSeo,
  schema: {
    ...baseSeo.schema,
    properties: [
      { name: 'Диаметр винта', value: '160, 200, 250, 320, 400 или 500 мм' },
      { name: 'Производительность', value: '2–120 м³/ч в зависимости от диаметра и сырья' },
      { name: 'Угол наклона', value: 'до 45° по расчёту' },
      { name: 'Температура груза', value: 'до 200 °C' },
      { name: 'Длина транспортирования', value: '30 м' },
    ],
  },
};
