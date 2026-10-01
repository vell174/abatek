export const conveyorCalculatorContent = {
  eyebrow: 'Инженерный инструмент',
  title: 'Расчёт мощности привода ленточного конвейера',
  introduction:
    'Укажите параметры конвейера и условия работы. Калькулятор определит тяговое усилие, расчётную мощность и ближайший номинал привода.',
  geometryTitle: 'Геометрия конвейера',
  loadTitle: 'Груз и лента',
  driveTitle: 'Привод и условия работы',
  resultTitle: 'Результат расчёта',
  resultKicker: '04 / Результат',
  homeBreadcrumb: 'Главная',
  pageBreadcrumb: 'Калькулятор мощности привода',
  emptyResult: 'Заполните параметры и нажмите «Рассчитать».',
  calculate: 'Рассчитать',
  reset: 'Сбросить',
  moreResults: 'Подробные результаты',
  methodTitle: 'Как выполняется расчёт',
  method:
    'Использован приближённый тяговый расчёт по методике, указанной в Пособии к СНиП 2.05.07-85 «Ленточные конвейеры». Коэффициенты сопротивления и линейные нагрузки выбираются по таблицам методики.',
  methodNote:
    'Результат подходит для предварительного подбора. Перед изготовлением привода проверьте условия пуска, свойства груза, фактическое сопротивление и требования к запасу мощности.',
  referenceLabel: 'Методика и исходный калькулятор',
  referenceUrl: 'https://www.engineerhelper.ru/html/conveyor/conveyor_calculation.html',
  geometryOptions: [
    {
      value: 'horizontal',
      label: 'Горизонтальный',
      description: 'Один прямой участок',
      image: '/images/conveyor-calculator/horizontal.svg',
      imageAlt: 'Схема горизонтальной трассы конвейера с длиной L₁',
    },
    {
      value: 'inclined',
      label: 'Наклонный',
      description: 'Один участок с подъёмом',
      image: '/images/conveyor-calculator/inclined.svg',
      imageAlt: 'Схема наклонной трассы конвейера с длиной L₂ и углом наклона',
    },
    {
      value: 'combined',
      label: 'Ломаный',
      description: 'Горизонтальный участок и подъём',
      image: '/images/conveyor-calculator/combined.svg',
      imageAlt: 'Схема ломаной трассы конвейера с участками L₁ и L₂',
    },
  ],
  fields: {
    horizontalLength: 'Длина горизонтальной части L₁, м',
    inclinedLength: 'Длина наклонной части L₂, м',
    inclineAngle: 'Угол наклона, °',
    throughput: 'Массовая производительность Qп, т/ч',
    unevenness: 'Коэффициент неравномерности загрузки kн',
    utilization: 'Коэффициент использования по времени kв',
    availability: 'Коэффициент готовности kг',
    density: 'Насыпная плотность груза, т/м³',
    beltWidth: 'Ширина ленты B, мм',
    beltSpeed: 'Скорость ленты v, м/с',
    drumSurface: 'Поверхность приводного барабана',
    wrapAngle: 'Угол обхвата барабана, °',
    operatingConditions: 'Условия эксплуатации',
    winter: 'Работа зимой или при температуре ниже 0 °C',
    lossFactor: 'Коэффициент неучтённых потерь K',
    efficiency: 'Общий КПД привода',
  },
  helpLinks: {
    width: 'Подобрать ширину ленты конвейера',
    speedTable: 'Таблица оптимальных скоростей конвейерной ленты',
    speedCalculator: 'Рассчитать фактическую скорость конвейера',
    operating: 'Определить условия работы конвейера',
  },
  results: {
    requiredPower: 'Расчётная мощность',
    selectedPower: 'Подходящий номинал привода',
    force: 'Окружное усилие на барабане',
    tightTension: 'Натяжение набегающей ветви',
    slackTension: 'Натяжение сбегающей ветви',
    rollerDiameter: 'Рекомендуемый диаметр ролика не менее',
    upperRollerSpacing: 'Шаг верхних роликоопор не более',
    lowerRollerSpacing: 'Шаг нижних роликоопор не более',
    designThroughput: 'Расчётная производительность',
    load: 'Линейная нагрузка от груза',
    beltLoad: 'Линейная нагрузка от ленты',
    upperRollerLoad: 'Нагрузка от верхних роликоопор',
    lowerRollerLoad: 'Нагрузка от нижних роликоопор',
    dragCoefficient: 'Коэффициент Kд',
    inclineCoefficient: 'Коэффициент Kд′',
    resistanceCoefficient: 'Коэффициент W',
    tractionFactor: 'Коэффициент сцепления e^(μα)',
    totalLength: 'Общая длина конвейера',
    liftHeight: 'Высота подъёма',
  },
  errors: {
    positive: 'Укажите число больше нуля.',
    angle: 'Укажите угол больше 0° и не более 25°.',
    fraction: 'Укажите число больше 0 и не более 1.',
    efficiency: 'КПД должен быть больше 0 и меньше 1.',
    unavailablePower: 'Расчётная мощность превышает максимальный номинал в списке (315 кВт).',
  },
  units: { power: 'кВт', force: 'даН', lineLoad: 'даН/м', length: 'м', diameter: 'мм', throughput: 'т/ч' },
} as const;

export const beltWidths = [400, 500, 650, 800, 1000, 1200, 1400, 1600, 2000] as const;
export const beltSpeeds = [0.25, 0.315, 0.4, 0.5, 0.63, 0.8, 1, 1.25, 1.6, 2, 2.5, 3.15] as const;
export const drumSurfaces = [
  'Стальной или чугунный без футеровки',
  'Футерованный резиной',
  'Футерованный прорезиненной лентой',
] as const;
export const wrapAngles = [180, 210, 270] as const;
export const operatingConditions = ['Лёгкие', 'Средние', 'Тяжёлые', 'Очень тяжёлые'] as const;
export const winterOptions = [
  { value: 0, label: 'Нет' },
  { value: 1, label: 'Да' },
] as const;

export type ConveyorGeometry = 'horizontal' | 'inclined' | 'combined';

export type ConveyorCalculatorInput = {
  geometry: ConveyorGeometry;
  horizontalLength: number;
  inclinedLength: number;
  inclineAngle: number;
  throughput: number;
  unevenness: number;
  utilization: number;
  availability: number;
  density: number;
  beltWidth: number;
  beltSpeed: number;
  drumSurface: number;
  wrapAngle: number;
  operatingConditions: number;
  winter: number;
  lossFactor: number;
  efficiency: number;
};

export const defaultConveyorInput: ConveyorCalculatorInput = {
  geometry: 'horizontal',
  horizontalLength: 20,
  inclinedLength: 20,
  inclineAngle: 10,
  throughput: 50,
  unevenness: 1.2,
  utilization: 0.7,
  availability: 0.96,
  density: 1.2,
  beltWidth: 650,
  beltSpeed: 1,
  drumSurface: 1,
  wrapAngle: 180,
  operatingConditions: 3,
  winter: 1,
  lossFactor: 1.2,
  efficiency: 0.8,
};
