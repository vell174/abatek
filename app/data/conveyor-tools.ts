import type { PageSeo } from '~/data/pages/_shared/types';
import type { OperatingInput, SpeedInput, WidthInput } from '~/utils/conveyor-tools';

export const conveyorToolRoutes = {
  width: '/kalkulyatory/shirina-lenty/',
  operating: '/kalkulyatory/usloviya-ekspluatatsii/',
  speed: '/kalkulyatory/skorost-konveyera/',
  power: '/kalkulyator-moshchnosti-privoda-lentochnogo-konveyera/',
} as const;

const sharedSeo = {
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: { type: 'website', locale: 'ru_RU', siteName: 'АБАТЭК' },
  twitter: { card: 'summary_large_image' },
} as const;

function toolSeo(title: string, description: string, canonicalPath: string, keywords: string[]): PageSeo {
  return {
    ...sharedSeo,
    title: `${title} — АБАТЭК`,
    description,
    keywords,
    canonicalPath,
    openGraph: { ...sharedSeo.openGraph, title, description },
    twitter: { ...sharedSeo.twitter, title, description },
    breadcrumbs: [
      { name: 'Главная', path: '/' },
      { name: title, path: canonicalPath },
    ],
    schema: { pageType: 'WebPage', name: title },
  };
}

export const toolPages = {
  'shirina-lenty': {
    kind: 'width',
    title: 'Расчёт ширины конвейерной ленты',
    eyebrow: 'Калькулятор конвейера',
    description:
      'Подберите ширину ленты по расчётной производительности, плотности груза и максимальному размеру куска.',
    method:
      'Расчёт выполнен по коэффициентам из Пособия к СНиП 2.05.07-85. Итог округляется вверх до ближайшей стандартной ширины ленты.',
    source: 'https://www.engineerhelper.ru/html/conveyor/conveyor_width_calculation.html',
    seo: toolSeo(
      'Расчёт ширины конвейерной ленты',
      'Онлайн-расчёт ширины ленты по производительности, плотности и крупности груза.',
      conveyorToolRoutes.width,
      ['расчёт ширины конвейерной ленты', 'подбор ширины ленты', 'калькулятор конвейера'],
    ),
  },
  'usloviya-ekspluatatsii': {
    kind: 'operating',
    title: 'Оценка условий эксплуатации конвейерной ленты',
    eyebrow: 'Калькулятор конвейера',
    description: 'Оцените условия работы ленты по крупности, абразивности, плотности груза и условиям эксплуатации.',
    method:
      'Каждому фактору присваиваются баллы. Сумма определяет категорию условий эксплуатации: лёгкие, средние, тяжёлые или очень тяжёлые.',
    source: 'https://www.engineerhelper.ru/html/conveyor/conveyor_operating_conditions.html',
    seo: toolSeo(
      'Оценка условий эксплуатации конвейерной ленты',
      'Определение категории условий эксплуатации конвейерной ленты по балльной методике.',
      conveyorToolRoutes.operating,
      ['условия эксплуатации конвейерной ленты', 'оценка условий работы конвейера'],
    ),
  },
  'skorost-konveyera': {
    kind: 'speed',
    title: 'Фактическая скорость конвейера',
    eyebrow: 'Калькулятор конвейера',
    description:
      'Рассчитайте линейную скорость ленты по оборотам приводного барабана и его диаметру с учётом футеровки.',
    method:
      'Угловая скорость ω = 2πn/60, линейная скорость v = ωD/2000, где n — обороты в минуту, D — диаметр в миллиметрах.',
    source: 'https://www.engineerhelper.ru/html/conveyor/conveyorSpeed.html',
    seo: toolSeo(
      'Фактическая скорость конвейера',
      'Калькулятор линейной скорости конвейера по оборотам и диаметру приводного барабана.',
      conveyorToolRoutes.speed,
      ['фактическая скорость конвейера', 'скорость конвейерной ленты', 'калькулятор скорости конвейера'],
    ),
  },
} as const;

export const toolNavigation = [
  { label: 'Мощность привода', to: conveyorToolRoutes.power },
  { label: 'Ширина ленты', to: conveyorToolRoutes.width },
  { label: 'Условия эксплуатации', to: conveyorToolRoutes.operating },
  { label: 'Скорость конвейера', to: conveyorToolRoutes.speed },
] as const;

export const widthDefaults: WidthInput = {
  throughput: 50,
  pieceSize: 80,
  density: 1.2,
  speed: 1,
  inclineRange: 0,
  sideRollAngle: 0,
  reposeRange: 0,
  cargoType: 0,
  unevenness: 1.2,
  utilization: 0.95,
  availability: 0.96,
};

export const widthFields = {
  throughput: 'Производительность Q, т/ч',
  pieceSize: 'Максимальный размер куска, мм',
  density: 'Насыпная плотность груза, т/м³',
  speed: 'Расчётная скорость ленты, м/с',
  inclineRange: 'Угол наклона конвейера',
  sideRollAngle: 'Угол наклона боковых роликов',
  reposeRange: 'Угол естественного откоса груза',
  cargoType: 'Тип транспортируемого груза',
  unevenness: 'Коэффициент неравномерности загрузки kн',
  utilization: 'Коэффициент использования по времени kв',
  availability: 'Коэффициент готовности kг',
} as const;

export const widthOptions = {
  inclineRange: ['0–10°', '11–15°', '16–18°', '19–22°'],
  sideRollAngle: ['20°', '30°'],
  reposeRange: ['30–35°', '35–40°', '40–45°', '45° и более'],
  cargoType: ['Рядовой груз', 'Сортированный груз'],
} as const;

export const widthResultLabels = {
  standardWidth: 'Подходящая стандартная ширина',
  throughputWidth: 'Ширина по производительности',
  pieceWidth: 'Ширина по размеру куска',
  designThroughput: 'Расчётная производительность',
  carryingFactor: 'Коэффициент C',
  noStandard: 'Требуемая ширина больше 3000 мм. Проверьте исходные данные или рассмотрите другое решение.',
} as const;

export const operatingDefaults: OperatingInput = {
  pieceSize: 0,
  abrasiveness: 0,
  densityFactor: 0,
  dropFactor: 0.2,
  loadingFactor: 0,
  temperature: 0,
  moisture: 0,
  service: 0,
};

export const operatingFields = {
  pieceSize: 'Максимальный размер куска груза',
  abrasiveness: 'Абразивность груза',
  densityFactor: 'Насыпная плотность груза, т/м³',
  dropFactor: 'Высота падения груза на ленту, мм',
  loadingFactor: 'Скорость и направление груза при загрузке',
  temperature: 'Минимальная температура воздуха',
  moisture: 'Осадки или груз высокой влажности',
  service: 'Условия технического обслуживания',
} as const;

export const operatingOptions = {
  pieceSize: [
    { value: 0, label: 'До 80 мм' },
    { value: 8, label: '81–150 мм' },
    { value: 18, label: '151–350 мм' },
    { value: 25, label: 'Более 350 мм' },
  ],
  abrasiveness: [
    { value: 0, label: 'Неабразивный' },
    { value: 5, label: 'Малоабразивный' },
    { value: 15, label: 'Абразивный' },
    { value: 25, label: 'Высокоабразивный' },
  ],
  densityFactor: [
    { value: 0, label: 'До 1' },
    { value: 0.2, label: 'Более 1 до 1,7' },
    { value: 0.4, label: 'Более 1,7 до 2,3' },
    { value: 0.5, label: 'Более 2,3 до 2,7' },
    { value: 0.7, label: 'Более 2,7' },
  ],
  dropFactor: [
    { value: 0.2, label: 'До 300 мм' },
    { value: 0.5, label: 'Более 300 до 800 мм' },
    { value: 0.7, label: 'Более 800 до 1500 мм' },
    { value: 1, label: 'Более 1500 до 2000 мм' },
  ],
  loadingFactor: [
    { value: 0, label: 'Близкие' },
    { value: 0.4, label: 'Значительно различаются' },
  ],
  temperature: [
    { value: 0, label: 'Выше 0 °C' },
    { value: 10, label: 'Ниже 0 °C' },
  ],
  moisture: [
    { value: 0, label: 'Нет' },
    { value: 10, label: 'Есть' },
  ],
  service: [
    { value: 0, label: 'Хорошие' },
    { value: 10, label: 'Затруднённые' },
  ],
} as const;

export const operatingCategories = [
  'Лёгкие',
  'Средние',
  'Тяжёлые',
  'Очень тяжёлые',
  'Применение ленты не допускается',
] as const;
export const operatingResultLabels = { totalPoints: 'Сумма баллов', category: 'Условия эксплуатации' } as const;

export const speedDefaults: SpeedInput = { rpm: 60, drumDiameter: 320 };
export const speedFields = {
  rpm: 'Число оборотов выходного вала, об/мин',
  drumDiameter: 'Диаметр барабана с футеровкой, мм',
} as const;
export const speedResultLabels = {
  linearSpeed: 'Фактическая скорость ленты',
  angularVelocity: 'Угловая скорость барабана',
} as const;

export const recommendedSpeeds = {
  title: 'Таблица рекомендуемых скоростей конвейерной ленты',
  eyebrow: 'Справочные данные',
  columns: ['Груз', '300–500 мм', '650 мм', '800 мм', '1000 мм', '1200 мм', '1400 мм', '1600 мм', '2000 мм'],
  rows: [
    ['Пылевидные и порошковые', '1', '1', '1', '1', '1', '1', '1', '1'],
    ['Хрупкие кусковые', '1,25', '1,6', '1,6', '1,6', '2', '2', '2,5', '2,5'],
    ['Мелкокусковые до 80 мм', '1,6', '2', '2,5', '3,15', '4', '4', '5', '6,3'],
    ['Кусковые до 160 мм', '1,6', '1,6', '2', '2,5', '2,5', '3,15', '4', '5'],
    ['Кусковые 161–350 мм', '—', '—', '1,6', '1,6', '2', '2,5', '3,15', '4'],
    ['Крупнокусковые более 350 мм', '—', '—', '—', '—', '2', '2', '2,5', '3,15'],
    ['Зерновые', '1,6', '2,5', '3,15', '4', '4', '4', '5', '6,3'],
    ['Овощи и корнеплоды', '0,8', '0,8', '1', '1', '1', '1', '1', '1'],
  ],
  note: 'Значения указаны в м/с для горизонтальной транспортировки или подъёма без промежуточной разгрузки. Выбор зависит от свойств груза и конструкции конвейера.',
  source: 'https://www.engineerhelper.ru/html/conveyor/conveyor_parameters.html',
} as const;

export const toolInterface = {
  notFound: 'Калькулятор не найден',
  home: 'Главная',
  related: 'Другие расчёты',
  inputs: 'Исходные данные',
  results: 'Результаты расчёта',
  empty: 'Укажите параметры и нажмите «Рассчитать».',
  calculate: 'Рассчитать',
  reset: 'Сбросить',
  method: 'Методика',
  source: 'Исходный калькулятор',
  positiveError: 'Укажите число больше нуля.',
  fractionError: 'Коэффициент должен быть больше 0 и не более 1.',
  units: { width: 'мм', throughput: 'т/ч', speed: 'м/с', angular: 'рад/с' },
} as const;
