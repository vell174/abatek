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
  { id: 'steel', label: 'Углеродистая сталь', density: 7850 },
  { id: 'stainless', label: 'Нержавеющая сталь', density: 7900 },
  { id: 'aluminium', label: 'Алюминий', density: 2700 },
  { id: 'copper', label: 'Медь', density: 8960 },
  { id: 'brass', label: 'Латунь', density: 8500 },
  { id: 'bronze', label: 'Бронза', density: 8800 },
  { id: 'titanium', label: 'Титан', density: 4500 },
  { id: 'custom', label: 'Своя плотность', density: 7850 },
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
  { id: 'sheet', label: 'Лист', fields: ['width', 'height', 'thickness'] },
  { id: 'strip', label: 'Полоса', fields: ['width', 'thickness', 'length'] },
  { id: 'round', label: 'Круг', fields: ['diameter', 'length'] },
  { id: 'square', label: 'Квадрат', fields: ['width', 'length'] },
  { id: 'hexagon', label: 'Шестигранник', fields: ['width', 'length'], note: 'Ширина измеряется между гранями.' },
  { id: 'rebar', label: 'Арматура', fields: ['diameter', 'length'], note: 'Вес рассчитан по номинальному диаметру.' },
  { id: 'round-pipe', label: 'Круглая труба', fields: ['diameter', 'wall', 'length'] },
  { id: 'profile-pipe', label: 'Профильная труба', fields: ['width', 'height', 'wall', 'length'] },
  { id: 'angle', label: 'Уголок', fields: ['width', 'height', 'thickness', 'length'] },
  { id: 'channel', label: 'Швеллер', fields: ['height', 'flangeWidth', 'webThickness', 'flangeThickness', 'length'] },
  { id: 'beam', label: 'Двутавр', fields: ['height', 'flangeWidth', 'webThickness', 'flangeThickness', 'length'] },
  { id: 'flange', label: 'Фланец', fields: ['diameter', 'innerDiameter', 'thickness'] },
  { id: 'elbow', label: 'Отвод', fields: ['diameter', 'wall', 'bendRadius', 'bendAngle'] },
];

export const metalCalculatorContent = {
  eyebrow: 'Инженерный инструмент',
  title: 'Калькулятор веса металла',
  description:
    'Рассчитайте теоретическую массу листа, сортового проката, труб и деталей по размерам и плотности материала.',
  home: 'Главная',
  material: 'Материал',
  shape: 'Вид изделия',
  dimensions: 'Размеры изделия',
  sheetLength: 'Длина листа',
  quantity: 'Количество, шт.',
  density: 'Плотность, кг/м³',
  calculate: 'Рассчитать вес',
  reset: 'Сбросить',
  results: 'Результат расчёта',
  totalWeight: 'Общий вес',
  pieceWeight: 'Вес одного изделия',
  meterWeight: 'Вес погонного метра',
  volume: 'Объём металла',
  empty: 'Выберите материал и размеры, затем нажмите «Рассчитать вес».',
  invalid: 'Проверьте размеры: все значения должны быть больше нуля, а толщина не должна превышать габариты изделия.',
  quantityError: 'Введите целое количество от 1.',
  densityNote: 'Плотности усреднены. Для точного расчёта укажите плотность своего материала.',
  methodTitle: 'Как рассчитывается вес',
  method:
    'Масса равна геометрическому объёму металла, умноженному на плотность. Для фасонного проката используется упрощённая геометрия с прямыми полками без радиусов и уклонов.',
  methodNote:
    'Результат является теоретическим. Реальная масса может отличаться из-за допусков производства, радиусов, рифления арматуры и особенностей сплава.',
};
