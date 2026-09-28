export interface CatalogLink {
  label: string;
  to?: string;
}

export interface CatalogGroup {
  title: string;
  image: string;
  overviewLabel?: string;
  to?: string;
  items: CatalogLink[];
}

export const catalogGroups: CatalogGroup[] = [
  {
    title: 'Конвейеры и транспортеры по видам',
    image: '/images/catalog/conveyor-types.webp',
    to: '/konveyery-po-vidam/',
    overviewLabel: 'Все виды конвейеров →',
    items: [
      { label: 'Ленточный конвейер', to: '/lentochnye-konvejery' },
      { label: 'Ленточный питатель', to: '/lentochnye-pitateli/' },
      { label: 'Винтовой конвейер', to: '/vintovye-konvejery' },
      { label: 'Роликовый конвейер (рольганг)', to: '/rolgang' },
      { label: 'Скребковый цепной конвейер', to: '/konveyery-skrebkovye' },
      { label: 'Элеватор ковшовый', to: '/elevatory' },
    ],
  },
  {
    title: 'Конвейеры и транспортеры по назначению и типу груза',
    image: '/images/catalog/conveyor-applications.webp',
    items: [
      { label: 'Конвейер пищевой', to: '/pishchevye-lentochnye-konveyery/' },
      { label: 'Для производственных линий', to: '/proizvodstvennye-lentochnye-konveyery/' },
      { label: 'Для склада и сортировки', to: '/konvejery-dlya-sklada' },
      { label: 'Для сортировки', to: '/konvejery-dlya-sortirovki/' },
      { label: 'Для погрузки', to: '/pogruzochnye-lentochnye-konveyery/' },
      { label: 'Для строительного груза', to: '/stroitelnye-konvejery' },
      { label: 'Для штучных грузов', to: '/konveyer-dlya-upakovki' },
      { label: 'Для погрузки колотых дров', to: '/transporterdlyadrov' },
      { label: 'Для овощей', to: '/konvejery-dlya-ovoshchey' },
      { label: 'Для мусора', to: '/konvejery-dlya-othodov' },
      { label: 'Для сыпучих материалов', to: '/lentochnye-konveyery-dlya-sypuchih-materialov/' },
      { label: 'Для кусковых грузов', to: '/lentochnye-konveyery-dlya-kuskovyh-gruzov/' },
      { label: 'Для металлической стружки' },
    ],
  },
  {
    title: 'Комплектующие к конвейерам и транспортерам',
    image: '/images/catalog/conveyor-components.webp',
    items: [
      { label: 'Барабаны конвейерные', to: '/barabany' },
      { label: 'Ролики конвейерные', to: '/rolikikonveyernye' },
      { label: 'Роликоопоры', to: '/rolikoopory' },
      { label: 'Ковши элеваторные', to: '/kovshi' },
      { label: 'Шнеки', to: '/shneki-konveera' },
    ],
  },
  {
    title: 'Ёмкостное оборудование',
    image: '/images/catalog/storage-equipment.webp',
    items: [
      { label: 'Резервуары горизонтальные РГС', to: '/rezervuary' },
      { label: 'Резервуары вертикальные РВС' },
      { label: 'Силосы стальные для сыпучих', to: '/silosy' },
      { label: 'Бункеры приёмные' },
      { label: 'Бункеры накопительные' },
    ],
  },
  {
    title: 'Циклоны систем аспирации',
    image: '/images/catalog/aspiration-cyclone.webp',
    to: '/ciklony',
    items: [],
  },
  {
    title: 'Шлюзовые затворы и питатели',
    image: '/images/catalog/rotary-valves.webp',
    items: [
      { label: 'Шлюзовые затворы ШУ', to: '/shlyuzovyezatvory' },
      { label: 'Шлюзовые питатели ШП', to: '/shlyuzovye-pitateli-shp' },
    ],
  },
  {
    title: 'Металлоизделия по чертежам заказчика',
    image: '/images/catalog/custom-metal-products.webp',
    to: '/metalloizdeliya-po-chertezham/',
    items: [],
  },
  {
    title: 'Электроножи для резки конвейерных лент',
    image: '/images/catalog/electric-belt-knives-v2.webp',
    to: '/elektronoji-dlya-rezki-konveyernih-lent-tehnicheskih-plastin',
    items: [],
  },
];
