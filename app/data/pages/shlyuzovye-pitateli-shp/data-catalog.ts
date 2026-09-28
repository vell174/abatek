import type { IndustrialSection } from '../_shared/types';
import { shpModels } from '../_shared/shp-models';

const formatRange = (values: readonly string[], suffix: string) => `${values[0]}–${values.at(-1)} ${suffix}`;

export const catalog = [
  ...shpModels.map((model) => ({
    title: `Шлюзовой питатель ${model.name}`,
    text: [`Роторный питатель типоразмера ${model.size} для равномерной подачи сухих сыпучих материалов.`],
    items: [
      `Производительность — ${formatRange(model.performance, 'м³/ч')}`,
      `Скорость ротора — ${formatRange(model.speed, 'об/мин')}`,
      `Мощность — ${formatRange(model.power, 'кВт')}`,
      `Цена — от ${model.priceRows[0]?.[1] ?? 'по запросу'}`,
    ],
    image: `/images/${model.drawings[0]}`,
    imageAlt: `Габаритный чертёж шлюзового питателя ${model.name}`,
    imageFit: 'contain' as const,
    href: `/${model.slug}/`,
  })),
  {
    title: 'Шлюзовой питатель ШП нестандартных размеров',
    text: ['Индивидуальное исполнение по техническому заданию заказчика для нестандартной технологической линии.'],
    items: [
      'Габариты и фланцы — по ТЗ',
      'Производительность — расчётная',
      'Материалы и привод — по условиям эксплуатации',
      'Цена — по запросу',
    ],
    image: '/images/shlyuzovyy-pitatel-shp-s-motor-reduktorom-abatek-3d.jpg',
    imageAlt: 'Шлюзовой питатель ШП нестандартных размеров с мотор-редуктором',
    imageFit: 'contain',
    href: '/shp-nestandartnyh-razmerov/',
  },
] satisfies IndustrialSection[];
