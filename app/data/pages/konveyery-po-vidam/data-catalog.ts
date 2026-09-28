import type { IndustrialSection } from '../_shared/types';

export const catalog = [
  {
    title: 'Ленточный конвейер',
    text: [
      'Перемещает штучные и сыпучие грузы на непрерывной ленте. Подходит для горизонтальных и наклонных участков производственной линии.',
    ],
    image: '/images/conveyor-types/belt-conveyor-v3.webp',
    imageAlt: 'Модель ленточного конвейера с чёрной лентой и синим каркасом на белом фоне',
    imageFit: 'contain',
    href: '/lentochnye-konvejery/',
  },
  {
    title: 'Ленточный питатель',
    text: [
      'Обеспечивает регулируемую подачу материала из бункера. Помогает согласовать поток сырья с производительностью следующего оборудования.',
    ],
    image: '/images/conveyor-types/belt-feeder.webp',
    imageAlt: 'Модель короткого ленточного питателя с загрузочным бункером на белом фоне',
    imageFit: 'contain',
    href: '/lentochnye-pitateli/',
  },
  {
    title: 'Винтовой конвейер',
    text: [
      'Перемещает сыпучий материал вращающимся шнеком внутри трубы или желоба. Используется для транспортировки и регулируемой подачи.',
    ],
    image: '/images/conveyor-types/screw-conveyor.webp',
    imageAlt: 'Модель наклонного трубчатого винтового конвейера с загрузочной воронкой на белом фоне',
    imageFit: 'contain',
    href: '/vintovye-konvejery/',
  },
  {
    title: 'Роликовый конвейер (рольганг)',
    text: [
      'Перемещает коробки, ящики, паллеты и другие изделия с устойчивым основанием. Бывает приводным и неприводным.',
    ],
    image: '/images/conveyor-types/roller-conveyor.webp',
    imageAlt: 'Модель рольганга со стальными роликами и синим каркасом на белом фоне',
    imageFit: 'contain',
    href: '/rolgang/',
  },
  {
    title: 'Скребковый цепной конвейер',
    text: [
      'Перемещает сыпучие материалы скребками, закреплёнными на цепи. Закрытый короб помогает ограничить рассыпание груза и запыление.',
    ],
    image: '/images/conveyor-types/scraper-chain-conveyor.webp',
    imageAlt: 'Модель скребкового цепного конвейера в синем закрытом коробе на белом фоне',
    imageFit: 'contain',
    href: '/konveyery-skrebkovye/',
  },
  {
    title: 'Элеватор ковшовый',
    text: [
      'Поднимает сыпучий материал на заданную высоту ковшами на ленте или цепи. Применяется между участками с разным уровнем загрузки.',
    ],
    image: '/images/conveyor-types/bucket-elevator.webp',
    imageAlt: 'Модель вертикального ковшового элеватора с верхним приводом на белом фоне',
    imageFit: 'contain',
    href: '/elevatory/',
  },
] satisfies IndustrialSection[];
