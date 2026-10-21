import type { ScrewFlightInput, ScrewFlightResult } from '~/utils/calculate-screw-flight';
import type { PageSeo } from '~/data/pages/_shared/types';

export const screwFlightRoute = '/kalkulyatory/razvertka-vitka-shneka/';

export const screwFlightDefaults: ScrewFlightInput = {
  outerDiameter: 300,
  innerDiameter: 114,
  pitch: 250,
  thickness: 3,
  density: 0.00782,
};

export const screwFlightFields: Array<{ key: keyof ScrewFlightInput; symbol: string; label: string; unit: string }> = [
  { key: 'outerDiameter', symbol: 'D', label: 'Наружный диаметр шнека', unit: 'мм' },
  { key: 'innerDiameter', symbol: 'd', label: 'Внутренний диаметр шнека', unit: 'мм' },
  { key: 'pitch', symbol: 't', label: 'Шаг шнека', unit: 'мм' },
  { key: 'thickness', symbol: 's', label: 'Толщина листа заготовки', unit: 'мм' },
  { key: 'density', symbol: 'ρ', label: 'Плотность материала', unit: 'г/мм³' },
];

export const screwFlightResults: Array<{
  key: keyof ScrewFlightResult;
  symbol: string;
  label: string;
  unit: string;
  digits?: number;
}> = [
  { key: 'outerHelixLength', symbol: 'L', label: 'Длина наружной винтовой линии', unit: 'мм' },
  { key: 'innerHelixLength', symbol: 'l', label: 'Длина внутренней винтовой линии', unit: 'мм' },
  { key: 'flightHeight', symbol: 'a', label: 'Высота витка', unit: 'мм' },
  { key: 'sectorAngleDeg', symbol: 'α', label: 'Угол кольцевой заготовки', unit: '°' },
  { key: 'cutoutAngleDeg', symbol: 'β', label: 'Угол выреза', unit: '°' },
  { key: 'blankOuterDiameter', symbol: 'D₀', label: 'Наружный диаметр развертки', unit: 'мм' },
  { key: 'blankInnerDiameter', symbol: 'd₀', label: 'Внутренний диаметр развертки', unit: 'мм' },
  { key: 'outerCutoutWidth', symbol: 'B', label: 'Размер выреза по наружному диаметру', unit: 'мм' },
  { key: 'innerCutoutWidth', symbol: 'b', label: 'Размер выреза по внутреннему диаметру', unit: 'мм' },
  { key: 'blankMassGrams', symbol: 'G', label: 'Масса одной заготовки', unit: 'г' },
];

export const screwFlightContent = {
  homeLabel: 'Главная',
  usefulLabel: 'Полезное',
  eyebrow: 'Инженерный калькулятор',
  title: 'Калькулятор развертки витка шнека',
  description:
    'Предварительный расчёт плоской кольцевой заготовки одного витка по наружному и внутреннему диаметрам, шагу и толщине листа. Подходит для оценки пера шнека винтового конвейера, сваи и бурового инструмента.',
  inputTitle: 'Размеры готового витка',
  outputTitle: 'Размеры плоской заготовки',
  finishedSketchTitle: 'Готовый виток шнека',
  finishedSketchAlt: 'Схема готового витка шнека с размерами D, d, t, s, a и длинами винтовых линий L и l',
  finishedSketchDescription:
    'D и d — наружный и внутренний диаметры; t — шаг; s — толщина листа; a — высота витка; L и l — длины наружной и внутренней винтовых линий.',
  sketchTitle: 'Развертка одного витка',
  sketchDescription:
    'D₀ и d₀ — диаметры заготовки; α — угол оставшегося сектора; β — угол выреза; B и b — ширина выреза по наружному и внутреннему диаметрам.',
  sketchAlt: 'Кольцевая развертка одного витка шнека с обозначениями D₀, d₀, α, β, B и b',
  sketchSymbols: {
    outer: 'D',
    inner: 'd',
    pitch: 't',
    thickness: 's',
    height: 'a',
    outerHelix: 'L',
    innerHelix: 'l',
    blankOuter: 'D₀',
    blankInner: 'd₀',
    sector: 'α',
    cutout: 'β',
    innerCut: 'b',
    outerCut: 'B',
  },
  calculate: 'Рассчитать развертку',
  reset: 'Вернуть пример',
  invalid: 'Проверьте размеры: все значения должны быть больше нуля, а наружный диаметр — больше внутреннего.',
  densityHint: 'В примере из Excel использовано 0,00782 г/мм³, что соответствует 7,82 г/см³.',
  methodTitle: 'Как выполняется расчёт',
  method: [
    'Длины наружной и внутренней винтовых линий: L = √((πD)² + t²), l = √((πd)² + t²). Высота витка a = (D − d) / 2.',
    'Угол кольцевого сектора α = (L − l) / a; угол выреза β = 2π − α. Наружный и внутренний диаметры развертки: D₀ = 2L / α и d₀ = 2l / α. В формулах углы измеряются в радианах.',
    'Ширина выреза по наружному и внутреннему диаметрам: B = D₀ × sin(β / 2), b = d₀ × sin(β / 2). Масса одного витка определяется по площади сектора, толщине и плотности материала.',
  ],
  limitation:
    'Расчёт повторяет приближённую геометрию приложенной таблицы Excel. Он не учитывает пластическую деформацию при гибке, припуски на резку и сварку, допуски и изменение размеров из-за толщины листа. Перед изготовлением проверьте развертку по рабочему чертежу и технологии производства.',
  relatedTitle: 'По теме',
  relatedLinks: [
    { label: 'Витки шнека на заказ', to: '/vitki-shneka/' },
    { label: 'Шнеки для конвейеров', to: '/shneki-konveera/' },
    { label: 'Все калькуляторы и справочники', to: '/poleznoe/' },
  ],
} as const;

export const screwFlightSeo: PageSeo = {
  title: 'Калькулятор развертки витка шнека и пера шнека онлайн | АБАТЭК',
  description:
    'Расчёт развертки витка шнека по диаметрам и шагу. Калькулятор показывает диаметр заготовки, угол выреза, размеры кромок и массу одного пера шнека.',
  keywords: [
    'калькулятор развертки витка шнека',
    'расчет витка шнека онлайн калькулятор',
    'развертка пера шнека',
    'калькулятор пера шнека',
    'расчет пера шнека онлайн',
    'расчет шнека развертка витка',
  ],
  canonicalPath: screwFlightRoute,
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    title: 'Калькулятор развертки витка шнека | АБАТЭК',
    description: 'Предварительный расчёт кольцевой заготовки одного витка шнека по диаметрам и шагу.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Калькулятор развертки витка шнека | АБАТЭК',
    description: 'Размеры кольцевой заготовки, угол выреза и масса одного витка.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Калькуляторы и справочники', path: '/poleznoe/' },
    { name: 'Развертка витка шнека', path: screwFlightRoute },
  ],
  schema: { pageType: 'WebPage', name: 'Калькулятор развертки витка шнека' },
};
