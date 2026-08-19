export interface CatalogLink {
  label: string;
  to: string;
}

export interface CatalogGroup {
  title: string;
  items: CatalogLink[];
}

export const catalogGroups: CatalogGroup[] = [
  {
    title: 'Конвейеры и их виды',
    items: [
      { label: 'Все конвейеры', to: '/conveyors' },
      { label: 'Цепные конвейеры', to: '/cepnye-konveyeri' },
      { label: 'G-образные ленточные конвейеры', to: '/g-obraznye-lentochnye-konvejery' },
      { label: 'Горизонтальные ленточные конвейеры', to: '/gorizontalnyj-lentochnyj-konvejer' },
      { label: 'Гравитационные конвейеры', to: '/gravitatcionnyj-konvejery' },
      { label: 'Желобчатые ленточные конвейеры', to: '/konveyer-lentochnyy-zhelobchatyy' },
      { label: 'Модульные конвейеры', to: '/modulnye-konvejery' },
      { label: 'Наклонные ленточные конвейеры', to: '/naklonnyj-lentochnyj-konvejer' },
      { label: 'Неприводные роликовые конвейеры', to: '/neprivodnye-rolikovye-konveyery' },
      { label: 'Пластинчатые конвейеры', to: '/plastinchatye-konvejery' },
      { label: 'Поворотные ленточные конвейеры', to: '/povorotnye-lentochnye-konvejery' },
      { label: 'Приводные роликовые конвейеры', to: '/privodnye-rolikovye-konveyery' },
      { label: 'Раздвижной рольганг', to: '/razdvizhnoj-rolgang' },
      { label: 'Строительные конвейеры', to: '/stroitelnye-konvejery' },
      { label: 'Z-образные ленточные конвейеры', to: '/z-obraznyj-lentochnyj-konvejer' },
    ],
  },
  {
    title: 'Конвейеры по назначению',
    items: [
      { label: 'Для багажа', to: '/konvejery-dlya-bagazha' },
      { label: 'Для бутылок и банок', to: '/konvejery-dlya-butylok' },
      { label: 'Для деревянных плит', to: '/konvejery-dlya-derevyannyh-plit' },
      { label: 'Для картофеля', to: '/konvejery-dlya-kartofelya' },
      { label: 'Для конфет', to: '/konvejery-dlya-konfet' },
      { label: 'Для маркировки', to: '/konvejery-dlya-markirovki' },
      { label: 'Для медикаментов', to: '/konvejery-dlya-medikamentov' },
      { label: 'Для мешков', to: '/konvejery-dlya-meshkov' },
      { label: 'Для молока', to: '/konvejery-dlya-moloka' },
      { label: 'Для обуви', to: '/konvejery-dlya-obuvi' },
      { label: 'Для отходов', to: '/konvejery-dlya-othodov' },
      { label: 'Для овощей и фруктов', to: '/konvejery-dlya-ovoshchey' },
      { label: 'Для пельменей', to: '/konvejery-dlya-pelmeney' },
      { label: 'Для песка', to: '/konvejery-dlya-peska' },
      { label: 'Для посуды', to: '/konvejery-dlya-posudy' },
      { label: 'Для рыбы и морепродуктов', to: '/konvejery-dlya-ryby-i-moreproduktov' },
      { label: 'Для склада', to: '/konvejery-dlya-sklada' },
      { label: 'Для сортировки', to: '/konvejery-dlya-sortirovki' },
      { label: 'Для стирального порошка', to: '/konvejery-dlya-stiralnogo-poroshka' },
      { label: 'Для угля', to: '/konvejery-dlya-uglya' },
      { label: 'Для яиц', to: '/konvejery-dlya-yaic' },
      { label: 'Для зерна', to: '/konvejery-dlya-zerna' },
      { label: 'Для коробок и упаковки', to: '/konveyer-dlya-upakovki' },
    ],
  },
  {
    title: 'Резервуары РГС',
    items: [
      { label: 'РГС-3 м³', to: '/rgs-3' },
      { label: 'РГС-5 м³', to: '/rgs-5' },
      { label: 'РГС-10 м³', to: '/rgs-10' },
      { label: 'РГС-15 м³', to: '/rgs-15' },
      { label: 'РГС-20 м³', to: '/rgs-20' },
      { label: 'РГС-25 м³', to: '/rgs-25' },
      { label: 'РГС-30 м³', to: '/rgs-30' },
      { label: 'РГС-40 м³', to: '/rgs-40' },
      { label: 'РГС-50 м³', to: '/rgs-50' },
      { label: 'РГС-60 м³', to: '/rgs-60' },
      { label: 'РГС-75 м³', to: '/rgs-75' },
      { label: 'РГС-100 м³', to: '/rgs-100' },
      { label: 'РГС-120 м³', to: '/rgs-120' },
      { label: 'РГС-150 м³', to: '/rgs-150' },
    ],
  },
  {
    title: 'Комплектующие',
    items: [
      { label: 'Барабаны конвейерные', to: '/barabany' },
      { label: 'Ковши элеваторные', to: '/kovshi' },
      { label: 'Ролики конвейерные', to: '/rolikikonveyernye' },
      { label: 'Роликоопоры', to: '/rolikoopory' },
      { label: 'Шариковые столы', to: '/sharikovye-stoly' },
    ],
  },
  {
    title: 'Другие разделы каталога',
    items: [
      {
        label: 'Электроножи',
        to: '/elektronoji-dlya-rezki-konveyernih-lent-tehnicheskih-plastin',
      },
      { label: 'Ленточные конвейеры', to: '/lentochnye-konvejery' },
      { label: 'Роликовые конвейеры (рольганги)', to: '/rolgang' },
      { label: 'Скребковые конвейеры', to: '/konveyery-skrebkovye' },
      { label: 'Винтовые конвейеры', to: '/vintovye-konvejery' },
      { label: 'Шнеки', to: '/shneki-konveera' },
      { label: 'Транспортёр для погрузки дров', to: '/transporterdlyadrov' },
      { label: 'Элеваторы', to: '/elevatory' },
      { label: 'Резервуары РГС', to: '/rezervuary' },
      { label: 'Силосы', to: '/silosy' },
      { label: 'Металлоконструкции', to: '/metallokonstruktsii-na-zakaz' },
      { label: 'Циклоны', to: '/ciklony' },
      { label: 'Шлюзовые затворы', to: '/shlyuzovyezatvory' },
      { label: 'Комплектующие к конвейерам', to: '/komplektuyushie-k-konvejeram' },
    ],
  },
];
