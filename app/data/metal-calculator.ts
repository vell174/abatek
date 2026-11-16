export type MetalShape =
  | 'sheet'
  | 'strip'
  | 'round'
  | 'square'
  | 'hexagon'
  | 'rebar'
  | 'round-pipe'
  | 'profile-pipe'
  | 'angle'
  | 'channel'
  | 'bent-channel'
  | 'beam'
  | 'flange'
  | 'elbow';

export type MetalField =
  | 'diameter'
  | 'wall'
  | 'width'
  | 'height'
  | 'thickness'
  | 'flangeWidth'
  | 'flangeThickness'
  | 'webThickness'
  | 'innerDiameter'
  | 'bendRadius'
  | 'bendAngle'
  | 'length';

export const metalMaterials = [
  { id: 'steel', label: 'Сталь', density: 7850 },
  { id: 'stainless', label: 'Нержавейка', density: 7900 },
  { id: 'aluminium', label: 'Алюминий', density: 2700 },
  { id: 'copper', label: 'Медь', density: 8960 },
  { id: 'brass', label: 'Латунь', density: 8500 },
  { id: 'bronze', label: 'Бронза', density: 8800 },
  { id: 'titanium', label: 'Титан', density: 4500 },
  { id: 'custom', label: 'Своя плотность', density: 7850 },
] as const;

export const rebarDiameters = [6, 8, 10, 12, 14, 16, 18, 20, 22, 25, 28, 32, 36, 40] as const;

// Серия П по ГОСТ 8240-97: номинальные размеры и теоретическая масса стального профиля.
export const standardChannelSizes = [
  { id: '5P', label: '5П', height: 50, flangeWidth: 32, webThickness: 4.4, flangeThickness: 7, kgPerMeter: 4.84 },
  { id: '6.5P', label: '6,5П', height: 65, flangeWidth: 36, webThickness: 4.4, flangeThickness: 7.2, kgPerMeter: 5.9 },
  { id: '8P', label: '8П', height: 80, flangeWidth: 40, webThickness: 4.5, flangeThickness: 7.4, kgPerMeter: 7.05 },
  { id: '10P', label: '10П', height: 100, flangeWidth: 46, webThickness: 4.5, flangeThickness: 7.6, kgPerMeter: 8.59 },
  { id: '12P', label: '12П', height: 120, flangeWidth: 52, webThickness: 4.8, flangeThickness: 7.8, kgPerMeter: 10.4 },
  { id: '14P', label: '14П', height: 140, flangeWidth: 58, webThickness: 4.9, flangeThickness: 8.1, kgPerMeter: 12.3 },
  { id: '16P', label: '16П', height: 160, flangeWidth: 64, webThickness: 5, flangeThickness: 8.4, kgPerMeter: 14.2 },
  { id: '18P', label: '18П', height: 180, flangeWidth: 70, webThickness: 5.1, flangeThickness: 8.7, kgPerMeter: 16.3 },
  { id: '20P', label: '20П', height: 200, flangeWidth: 76, webThickness: 5.2, flangeThickness: 9, kgPerMeter: 18.4 },
] as const;

export const metalFields: Record<MetalField, { label: string; unit: string; default: number }> = {
  diameter: { label: 'Диаметр', unit: 'мм', default: 20 },
  wall: { label: 'Толщина стенки', unit: 'мм', default: 3 },
  width: { label: 'Ширина', unit: 'мм', default: 100 },
  height: { label: 'Высота', unit: 'мм', default: 100 },
  thickness: { label: 'Толщина', unit: 'мм', default: 5 },
  flangeWidth: { label: 'Ширина полки', unit: 'мм', default: 50 },
  flangeThickness: { label: 'Толщина полки', unit: 'мм', default: 5 },
  webThickness: { label: 'Толщина стенки', unit: 'мм', default: 5 },
  innerDiameter: { label: 'Внутренний диаметр', unit: 'мм', default: 50 },
  bendRadius: { label: 'Радиус по оси отвода', unit: 'мм', default: 100 },
  bendAngle: { label: 'Угол отвода', unit: '°', default: 90 },
  length: { label: 'Длина одного изделия', unit: 'м', default: 1 },
};

export const metalShapes: Array<{
  id: MetalShape;
  label: string;
  fields: MetalField[];
  note?: string;
}> = [
  { id: 'sheet', label: 'Лист / плита', fields: ['width', 'height', 'thickness'] },
  { id: 'strip', label: 'Полоса', fields: ['width', 'thickness', 'length'] },
  { id: 'round', label: 'Круг / пруток', fields: ['diameter', 'length'] },
  { id: 'square', label: 'Квадрат', fields: ['width', 'length'] },
  { id: 'hexagon', label: 'Шестигранник', fields: ['width', 'length'], note: 'Ширина измеряется между гранями.' },
  { id: 'rebar', label: 'Арматура', fields: ['diameter', 'length'], note: 'Вес рассчитан по номинальному диаметру.' },
  { id: 'round-pipe', label: 'Круглая труба', fields: ['diameter', 'wall', 'length'] },
  { id: 'profile-pipe', label: 'Профильная труба', fields: ['width', 'height', 'wall', 'length'] },
  { id: 'angle', label: 'Уголок', fields: ['width', 'height', 'thickness', 'length'] },
  {
    id: 'channel',
    label: 'Швеллер прокатный',
    fields: ['length'],
    note: 'Серия П по ГОСТ 8240-97. Вес метра взят из таблицы стандарта.',
  },
  {
    id: 'bent-channel',
    label: 'Швеллер гнутый',
    fields: ['height', 'flangeWidth', 'thickness', 'length'],
    note: 'Размеры задаются вручную. Масса рассчитана по упрощённому сечению без радиусов гиба.',
  },
  { id: 'beam', label: 'Двутавр', fields: ['height', 'flangeWidth', 'webThickness', 'flangeThickness', 'length'] },
  { id: 'flange', label: 'Фланец', fields: ['diameter', 'innerDiameter', 'thickness'] },
  { id: 'elbow', label: 'Отвод', fields: ['diameter', 'wall', 'bendRadius', 'bendAngle'] },
];

export const metalCalculatorContent = {
  eyebrow: 'Инженерный инструмент',
  title: 'Калькулятор металла',
  description:
    'Узнайте теоретический вес металлопроката по размерам или определите длину по известной массе. Выберите материал и вид профиля для расчёта.',
  home: 'Главная',
  parameters: 'Основные параметры',
  material: 'Материал',
  shape: 'Сортамент',
  mode: 'Режим расчёта',
  dimensions: 'Размеры профиля',
  weightMode: 'Расчёт веса',
  lengthMode: 'Расчёт длины',
  targetWeight: 'Известный вес партии, кг',
  sheetLength: 'Длина листа',
  quantity: 'Количество, шт.',
  density: 'Плотность, кг/м³',
  channelSize: 'Типоразмер швеллера',
  channelSpec: 'Номинальные размеры профиля',
  channelSource: 'ГОСТ 8240-97, серия П',
  diagramCaption: 'Схема поперечного сечения',
  calculate: 'Рассчитать вес',
  calculateLength: 'Рассчитать длину',
  reset: 'Сбросить',
  results: 'Результат расчёта',
  totalWeight: 'Общий вес',
  totalLength: 'Общая длина',
  pieceLength: 'Длина одного изделия',
  pieceWeight: 'Вес одного изделия',
  meterWeight: 'Вес погонного метра',
  volume: 'Объём металла',
  empty: 'Выберите материал и размеры, затем нажмите «Рассчитать вес».',
  emptyLength: 'Укажите размеры профиля и известный вес партии, затем нажмите «Рассчитать длину».',
  invalid: 'Проверьте размеры: все значения должны быть больше нуля, а толщина не должна превышать габариты изделия.',
  invalidLength: 'Проверьте размеры профиля и вес партии: все значения должны быть больше нуля.',
  quantityError: 'Введите целое количество от 1.',
  lengthUnavailable: 'Для фланца и отвода расчёт длины не предусмотрен: выберите режим расчёта веса.',
  lengthNote:
    'Режим расчёта длины доступен для листа и длинномерного проката. Для фланца и отвода рассчитывается только вес.',
  densityNote: 'Плотности усреднены. Для точного расчёта укажите плотность своего материала.',
  methodTitle: 'Как рассчитывается вес',
  method:
    'Для листа, труб и профилей массу получаем по геометрии сечения и плотности. У прокатного швеллера серии П используем табличную массу метра по ГОСТ 8240-97; для гнутого швеллера — расчёт сечения по введённым размерам.',
  methodNote:
    'Результат является теоретическим. У гнутого швеллера и других фасонных профилей радиусы изгиба и уклоны полок не учитываются. Реальная масса может отличаться из-за допусков и состава сплава.',
  inverseMethod:
    'При расчёте длины известный вес партии делится на расчётный вес одного погонного метра. Если изделий несколько, общая длина делится на их количество.',
};
