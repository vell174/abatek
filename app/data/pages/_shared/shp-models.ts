import type { IndustrialPage, IndustrialSection, PageSeo } from './types';

interface ShpModelDefinition {
  slug: string;
  name: string;
  size: string;
  performance: string[];
  speed: string[];
  torque: string[];
  power: string[];
  serviceFactor: string[];
  priceRows: string[][];
  drawings: string[];
}

const createModel = <T extends ShpModelDefinition>(model: T) => model;

export const shpModels = [
  createModel({
    slug: 'shp-150',
    name: 'ШП-150',
    size: '150',
    performance: ['2,5', '3,5', '4', '5'],
    speed: ['18', '23', '30', '36'],
    torque: ['181', '155', '165', '150'],
    power: ['0,55', '0,55', '0,75', '0,75'],
    serviceFactor: ['0,9', '1,1', '1', '1'],
    priceRows: [
      ['MRV063-50-0,55/1000', '110 400 ₽'],
      ['MRV063-40-0,55/1000', '110 400 ₽'],
      ['MRV063-30-0,75/1000', '113 600 ₽'],
      ['MRV063-25-0,75/1000', '113 600 ₽'],
    ],
    drawings: ['shp-150-chertezh-1.png', 'shp-150-chertezh-2.png', 'shp-150-chertezh-3.png'],
  }),
  createModel({
    slug: 'shp-200',
    name: 'ШП-200',
    size: '200',
    performance: ['4,5', '5,5', '7', '9,5'],
    speed: ['15', '18', '23', '30'],
    torque: ['210', '250', '215', '270'],
    power: ['0,55', '0,75', '0,75', '1,1'],
    serviceFactor: ['0,9', '1,1', '1,6', '1,4'],
    priceRows: [
      ['MRV075-100-0,55/1500', '123 200 ₽'],
      ['MRV090-80-0,75/1500', '129 600 ₽'],
      ['MRV090-60-0,75/1500', '129 600 ₽'],
      ['MRV090-50-1,1/1500', '132 800 ₽'],
    ],
    drawings: [
      'shp-200-chertezh-1.png',
      'shp-200-chertezh-2.png',
      'shp-200-chertezh-3.png',
      'shp-200-chertezh-flantsa.png',
    ],
  }),
  createModel({
    slug: 'shp-260',
    name: 'ШП-260',
    size: '260',
    performance: ['11', '13', '16', '21,5'],
    speed: ['15', '18', '23', '30'],
    torque: ['310', '400', '325', '360'],
    power: ['0,75', '1,1', '1,1', '1,5'],
    serviceFactor: ['1,3', '1,1', '1,3', '1,3'],
    priceRows: [
      ['MRV090-60-0,75/1000', '137 600 ₽'],
      ['MRV090-50-1,1/1000', '137 600 ₽'],
      ['MRV090-40-1,1/1000', '137 600 ₽'],
      ['MRV090-30-1,5/1000', '145 600 ₽'],
    ],
    drawings: [
      'shp-260-chertezh-1.png',
      'shp-260-chertezh-2.png',
      'shp-260-chertezh-3.png',
      'shp-260-chertezh-flantsa.png',
    ],
  }),
  createModel({
    slug: 'shp-300',
    name: 'ШП-300',
    size: '300',
    performance: ['17', '21', '26', '34,5'],
    speed: ['15', '18', '23', '30'],
    torque: ['310', '400', '325', '360'],
    power: ['0,75', '1,1', '1,1', '1,5'],
    serviceFactor: ['1,3', '1,1', '1,3', '1,3'],
    priceRows: [
      ['MRV090-60-0,75/1000', '145 600 ₽'],
      ['MRV090-50-1,1/1000', '145 600 ₽'],
      ['MRV090-40-1,1/1000', '145 600 ₽'],
      ['MRV090-30-1,5/1000', '152 000 ₽'],
    ],
    drawings: [
      'shp-300-chertezh-1.png',
      'shp-300-chertezh-2.png',
      'shp-300-chertezh-3.png',
      'shp-300-chertezh-flantsa.png',
    ],
  }),
  createModel({
    slug: 'shp-350',
    name: 'ШП-350',
    size: '350',
    performance: ['20', '24', '30', '40'],
    speed: ['15', '18', '23', '30'],
    torque: ['300', '400', '450', '560'],
    power: ['0,75', '1,1', '1,5', '2,2'],
    serviceFactor: ['1,9', '1,1', '1,4', '1,2'],
    priceRows: [
      ['MRV090-100-0,75/1500', '148 800 ₽'],
      ['MRV090-50-1,1/1000', '152 000 ₽'],
      ['MRV110-60-1,5/1500', '151 500 ₽'],
      ['MRV110-50-2,2/1500', '157 500 ₽'],
    ],
    drawings: [
      'shp-350-chertezh-1.png',
      'shp-350-chertezh-2.png',
      'shp-350-chertezh-3.png',
      'shp-350-chertezh-flantsa.png',
    ],
  }),
  createModel({
    slug: 'shp-400',
    name: 'ШП-400',
    size: '400',
    performance: ['24', '32', '38', '48', '64'],
    speed: ['11', '15', '18', '23', '30'],
    torque: ['600', '650', '565', '675', '560'],
    power: ['1,1', '1,5', '1,5', '2,2', '3,0'],
    serviceFactor: ['0,9', '1', '1,3', '1,1', '1,2'],
    priceRows: [
      ['MRV110-80-1,1/1000', '202 500 ₽'],
      ['MRV110-60-1,5/1000', '204 000 ₽'],
      ['MRV110-50-1,5/1000', '204 000 ₽'],
      ['MRV110-40-2,2/1000', '208 500 ₽'],
      ['MRV110-50-2,2/1500', '208 500 ₽'],
    ],
    drawings: [
      'shp-400-chertezh-1.png',
      'shp-400-chertezh-2.png',
      'shp-400-chertezh-3.png',
      'shp-400-chertezh-flantsa.png',
    ],
  }),
  createModel({
    slug: 'shp-450',
    name: 'ШП-450',
    size: '450',
    performance: ['27', '36', '43', '54', '72'],
    speed: ['11', '15', '18', '23', '30'],
    torque: ['600', '650', '565', '675', '560'],
    power: ['1,1', '1,5', '1,5', '2,2', '3,0'],
    serviceFactor: ['0,9', '1', '1,3', '1,1', '1,2'],
    priceRows: [
      ['MRV110-80-1,1/1000', '237 000 ₽'],
      ['MRV110-60-1,5/1000', '241 500 ₽'],
      ['MRV110-50-1,5/1000', '241 500 ₽'],
      ['MRV110-40-2,2/1000', '244 500 ₽'],
      ['MRV110-50-2,2/1500', '244 500 ₽'],
    ],
    drawings: [
      'shp-450-chertezh-1.png',
      'shp-450-chertezh-2.png',
      'shp-450-chertezh-3.png',
      'shp-450-chertezh-flantsa.png',
    ],
  }),
  createModel({
    slug: 'shp-500',
    name: 'ШП-500',
    size: '500',
    performance: ['49', '65', '78', '97', '130'],
    speed: ['11', '15', '18', '22', '30'],
    torque: ['600', '650', '830', '675', '705'],
    power: ['1,1', '1,5', '2,2', '2,2', '3,0'],
    serviceFactor: ['0,9', '1', '0,9', '1,1', '1,6'],
    priceRows: [
      ['MRV110-80-1,1/1000', '262 500 ₽'],
      ['MRV110-60-1,5/1000', '267 000 ₽'],
      ['MRV110-50-2,2/1000', '271 500 ₽'],
      ['MRV110-40-2,2/1000', '271 500 ₽'],
      ['MRV130-30-3,0/1000', '283 500 ₽'],
    ],
    drawings: [
      'shp-500-chertezh-1.png',
      'shp-500-chertezh-2.png',
      'shp-500-chertezh-3.png',
      'shp-500-chertezh-flantsa.png',
    ],
  }),
] as const satisfies readonly ShpModelDefinition[];

export type ShpModelName = (typeof shpModels)[number]['name'];

export const getShpModel = (name: ShpModelName) => {
  const model = shpModels.find((item) => item.name === name);
  if (!model) throw new Error(`Shp model was not found: ${name}`);
  return model;
};

const formatRange = (values: readonly string[], suffix: string) => {
  const first = values[0];
  const last = values.at(-1);
  return first === last ? `${first} ${suffix}` : `${first}–${last} ${suffix}`;
};

const createTechnicalRows = (model: ShpModelDefinition) =>
  model.performance.map((performance, index) => [
    performance,
    model.speed[index] ?? '',
    model.torque[index] ?? '',
    model.power[index] ?? '',
    model.serviceFactor[index] ?? '',
  ]);

export const createShpModelPage = (name: ShpModelName): IndustrialPage => {
  const model = getShpModel(name);
  const minPrice = model.priceRows[0]?.[1] ?? 'по запросу';
  const drawings: IndustrialSection[] = model.drawings.map((drawing, index) => ({
    title:
      index === model.drawings.length - 1 && drawing.includes('flantsa')
        ? 'Присоединительный фланец'
        : `Чертёж ${index + 1}`,
    text: [`Габаритная проекция шлюзового питателя ${model.name} с присоединительными размерами.`],
    image: `/images/${drawing}`,
    imageAlt: `Чертёж шлюзового питателя ${model.name}, проекция ${index + 1}`,
    imageFit: 'contain',
  }));

  return {
    title: `Шлюзовой питатель ${model.name} — характеристики и цена`,
    seoTitle: `Шлюзовой питатель ${model.name}: характеристики, чертежи и цена | АБАТЭК`,
    description: `Шлюзовой роторный питатель ${model.name} производительностью ${formatRange(model.performance, 'м³/ч')}. Варианты привода, характеристики, чертежи и ориентировочные цены.`,
    heroAccents: [`Производительность ${formatRange(model.performance, 'м³/ч')}`, `Цена от ${minPrice}`],
    heroImage: '/images/shlyuzovye-pitateli-shp-250-abatek.jpg',
    heroTitleVariant: 'wide-light',
    image: '/images/shlyuzovyy-pitatel-shp-s-motor-reduktorom-abatek-3d.jpg',
    imageAlt: `Шлюзовой роторный питатель ${model.name}`,
    imageFit: 'contain',
    introTitle: `Шлюзовой питатель ${model.name}`,
    parentBreadcrumb: { label: 'Шлюзовые питатели ШП', to: '/shlyuzovye-pitateli-shp/' },
    intro: [
      `Модель ${model.name} предназначена для равномерной объёмной подачи сухих сыпучих материалов из бункеров, накопителей и технологических ёмкостей.`,
      `В зависимости от выбранного мотор-редуктора производительность составляет ${formatRange(model.performance, 'м³/ч')}, скорость ротора — ${formatRange(model.speed, 'об/мин')}, мощность привода — ${formatRange(model.power, 'кВт')}.`,
      'Параметры приведены по предоставленному каталогу. Итоговую комплектацию и стоимость необходимо подтвердить после проверки материала и условий эксплуатации.',
    ],
    facts: [
      [formatRange(model.performance, 'м³/ч'), 'производительность'],
      [formatRange(model.speed, 'об/мин'), 'скорость ротора'],
      [formatRange(model.power, 'кВт'), 'мощность привода'],
      [`от ${minPrice}`, 'ориентировочная цена'],
    ],
    tables: [
      {
        eyebrow: 'Выбор исполнения',
        title: `Характеристики шлюзового питателя ${model.name}`,
        headers: [
          'Производительность, м³/ч',
          'Обороты, об/мин',
          'Крутящий момент, Н·м',
          'Мощность, кВт',
          'Сервис-фактор',
        ],
        rows: createTechnicalRows(model),
      },
      {
        eyebrow: 'Ориентировочная стоимость',
        title: `Цены на исполнения ${model.name}`,
        headers: ['Мотор-редуктор', 'Цена'],
        rows: model.priceRows.map((row) => [...row]),
      },
    ],
    sections: drawings,
    theme: 'blue',
    galleryTitle: `Чертежи шлюзового питателя ${model.name}`,
    projectsTitle: `Шлюзовые питатели ${model.name} производства АБАТЭК`,
    workflow: {
      eyebrow: 'Производственный цикл АБАТЭК',
      title: `Изготовление шлюзового питателя ${model.name}`,
      note: 'Перед изготовлением уточняем свойства материала, производительность, режим работы и присоединительные размеры.',
      items: [
        'Получаем исходные данные о сыпучем материале и требуемой подаче.',
        'Выбираем скорость ротора, мотор-редуктор и мощность привода.',
        'Согласовываем исполнение корпуса, ротора и присоединительных фланцев.',
        'Готовим чертёж и технико-коммерческое предложение.',
        'Изготавливаем оборудование и выполняем контрольную сборку.',
        'Организуем доставку готового питателя заказчику.',
      ],
    },
    faq: [
      {
        question: `Как выбрать исполнение ${model.name}?`,
        answer: `Исполнение ${model.name} выбирают по требуемой производительности, свойствам материала и режиму работы. После этого определяют обороты ротора, мощность и передаточное число мотор-редуктора.`,
      },
      {
        question: `Какая цена шлюзового питателя ${model.name}?`,
        answer: `В предоставленном каталоге цена начинается от ${minPrice}. Актуальная стоимость АБАТЭК рассчитывается после согласования привода, материалов, фланцев и дополнительной комплектации.`,
      },
      {
        question: 'Можно ли изменить присоединительные размеры?',
        answer:
          'Да. Размеры и конструкцию фланцев можно адаптировать к бункеру, накопителю или другому оборудованию заказчика.',
      },
    ],
  };
};

export const createShpModelSeo = (name: ShpModelName): PageSeo => {
  const model = getShpModel(name);
  const title = `Шлюзовой питатель ${model.name}: характеристики, чертежи и цена | АБАТЭК`;
  const description = `Шлюзовой питатель ${model.name}: производительность ${formatRange(model.performance, 'м³/ч')}, варианты мотор-редуктора, чертежи и цены. Изготовление АБАТЭК.`;
  const image = `/images/${model.drawings[0]}`;

  return {
    title,
    description,
    keywords: [
      `шлюзовой питатель ${model.name}`,
      `${model.name} цена`,
      `${model.name} характеристики`,
      `${model.name} чертеж`,
      `купить ${model.name}`,
    ],
    canonicalPath: `/${model.slug}/`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    image: {
      src: image,
      alt: `Габаритный чертёж шлюзового питателя ${model.name}`,
      type: 'image/png',
    },
    openGraph: { title, description, type: 'website', locale: 'ru_RU', siteName: 'АБАТЭК' },
    twitter: { card: 'summary_large_image', title, description },
    breadcrumbs: [
      { name: 'Главная', path: '/' },
      { name: 'Шлюзовые питатели ШП', path: '/shlyuzovye-pitateli-shp/' },
      { name: model.name, path: `/${model.slug}/` },
    ],
    schema: {
      pageType: 'WebPage',
      entityType: 'Product',
      name: `Шлюзовой роторный питатель ${model.name}`,
      category: 'Шлюзовые питатели',
      properties: [
        { name: 'Типоразмер', value: model.name },
        { name: 'Производительность', value: formatRange(model.performance, 'м³/ч') },
        { name: 'Скорость вращения ротора', value: formatRange(model.speed, 'об/мин') },
        { name: 'Мощность привода', value: formatRange(model.power, 'кВт') },
        { name: 'Ориентировочная цена', value: `от ${model.priceRows[0]?.[1] ?? 'по запросу'}` },
      ],
    },
  };
};
