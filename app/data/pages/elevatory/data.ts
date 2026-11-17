import type { IndustrialPage } from '../_shared/types';
import { beltElevatorGroups, beltElevatorTables } from './belt-models';
import { chainElevatorGroups, chainElevatorTables } from './chain-models';

const plateChainCaption = 'Пластинчатая цепь';
const roundChainCaption = 'Круглозвенная цепь';

export const pageData = {
  theme: 'blue',
  title: 'Элеваторы ковшовые',
  seoTitle: 'Элеваторы ковшовые ленточные и цепные | АБАТЭК',
  description:
    'Ленточные и цепные ковшовые элеваторы для вертикального перемещения порошковых, сыпучих и кусковых материалов.',
  heroImage: '/images/elevatory/kovshovyy-elevator-chertezh.webp',
  heroImageAlt: 'Чертёж ковшового элеватора: общий вид нории и приводная головка с мотором-редуктором',
  heroBackgroundVariant: 'elevator-drawing',
  image: '/images/elevatory/sborka-kovshovogo-elevatora.webp',
  imageAlt: 'Сборочный чертёж ковшового элеватора: общий вид, разрезы и узлы конструкции',
  imageWidthPx: 2000,
  imageHeightPx: 2828,
  imageFit: 'contain',
  imageHeight: 'tall',
  imageCaption: 'Пример сборочного чертежа ковшового элеватора',
  introTitle: 'Ковшовые элеваторы для вертикальной подачи',
  intro: [
    'Ковшовый элеватор поднимает материал в ковшах, закреплённых на замкнутой ленте или цепи. Такая схема помогает встроить вертикальный транспорт в технологическую линию при ограниченной площади.',
    'АБАТЭК подбирает исполнение по свойствам груза, высоте подъёма, требуемой подаче и условиям эксплуатации. Для зерна и других сыпучих продуктов также используют название «нория».',
  ],
  facts: [],
  contentOrder: 'editorial-first',
  hideCatalog: true,
  editorialAccordion: true,
  projectsTitle: 'Выполненные проекты: ковшовые элеваторы',
  usefulLinksTitle: 'Полезные ссылки',
  usefulLinks: [
    {
      label: 'Ковши элеваторные',
      to: '/kovshi/',
      description: 'Сварные ковши для ленточных и цепных элеваторов: типы, размеры и варианты изготовления.',
    },
    {
      label: 'Барабан ковшового элеватора',
      to: '/baraban-kovshovogo-elevatora/',
      description: 'Приводные и натяжные барабаны ковшовых элеваторов, изготовление по техническому заданию.',
    },
  ],
  galleryTitle: 'Типы ковшовых элеваторов',
  classificationTitle: 'Типы ковшовых элеваторов',
  beltElevatorDetails: [
    {
      image: {
        src: '/images/elevatory/belt-types/lg-buckets-black.png',
        alt: 'Схема глубоких ковшей элеватора ЛГ на ленте',
        width: 1345,
        height: 1170,
      },
      sketch: {
        src: '/images/elevatory/belt-types/bucket-sketch-source-3.png',
        alt: 'Эскизы глубокого ковша с обозначениями B, L, H и R',
        viewBox: '82 265 385 195',
        width: 1028,
        height: 527,
      },
    },
    {
      image: {
        src: '/images/elevatory/belt-types/lm-buckets-black.png',
        alt: 'Схема мелких ковшей элеватора ЛМ на ленте',
        width: 1338,
        height: 1175,
      },
      sketch: {
        src: '/images/elevatory/belt-types/bucket-sketch-source-6.png',
        alt: 'Эскизы мелкого ковша с обозначениями B, L, H и R',
        viewBox: '85 280 385 190',
        width: 1034,
        height: 539,
      },
    },
    {
      image: {
        src: '/images/elevatory/belt-types/lo-buckets-black.png',
        alt: 'Схема остроугольных ковшей элеватора ЛО на ленте',
        width: 1341,
        height: 1173,
      },
      sketch: {
        src: '/images/elevatory/belt-types/bucket-sketch-source-9.png',
        alt: 'Эскизы остроугольного ковша с обозначениями B, L и H',
        viewBox: '96 228 380 190',
        width: 1034,
        height: 426,
      },
    },
  ],
  chainElevatorDetails: [
    {
      imageCaption: plateChainCaption,
      secondImageCaption: roundChainCaption,
      image: {
        src: '/images/elevatory/chain-types/image2.png',
        alt: 'Ковши элеватора ЦГ на пластинчатой цепи',
        width: 1800,
        height: 1046,
      },
      secondImage: {
        src: '/images/elevatory/chain-types/image3.png',
        alt: 'Ковши элеватора ЦГ на круглозвенной цепи',
        width: 1800,
        height: 1305,
      },
      sketch: {
        src: '/images/elevatory/chain-types/image4.png',
        alt: 'Эскиз глубокого ковша ЦГ с размерами B, L, H и R',
        viewBox: '72 215 400 265',
        width: 1028,
        height: 527,
      },
    },
    {
      imageCaption: plateChainCaption,
      secondImageCaption: roundChainCaption,
      image: {
        src: '/images/elevatory/chain-types/image6.png',
        alt: 'Мелкие ковши элеватора ЦМ на пластинчатой цепи',
        width: 1800,
        height: 1489,
      },
      secondImage: {
        src: '/images/elevatory/chain-types/image7.png',
        alt: 'Мелкие ковши элеватора ЦМ на круглозвенной цепи',
        width: 1800,
        height: 1629,
      },
      sketch: {
        src: '/images/elevatory/chain-types/image8.png',
        alt: 'Эскиз мелкого ковша ЦМ с размерами B, L, H и R',
        viewBox: '72 215 400 265',
        width: 1034,
        height: 539,
      },
    },
    {
      imageCaption: plateChainCaption,
      secondImageCaption: roundChainCaption,
      image: {
        src: '/images/elevatory/chain-types/image10.png',
        alt: 'Остроугольные ковши элеватора ЦО на пластинчатой цепи',
        width: 1800,
        height: 1298,
      },
      secondImage: {
        src: '/images/elevatory/chain-types/image11.png',
        alt: 'Остроугольные ковши элеватора ЦО на круглозвенной цепи',
        width: 1800,
        height: 1070,
      },
      sketch: {
        src: '/images/elevatory/chain-types/image12.png',
        alt: 'Эскиз остроугольного ковша ЦО с размерами B, L и H',
        viewBox: '72 215 400 250',
        width: 1034,
        height: 426,
      },
    },
    {
      sketch: {
        src: '/images/elevatory/chain-types/image14.png',
        alt: 'Эскиз сомкнутого ковша ЦС с обозначениями B, L, H и R',
        viewBox: '85 230 355 215',
        width: 937,
        height: 455,
      },
    },
  ],
  chainElevatorTables,
  classificationGroups: [...beltElevatorGroups, chainElevatorGroups],
  tables: beltElevatorTables,
  sections: [
    {
      title: 'Основные части ковшового элеватора',
      text: [
        'В башмаке находятся загрузочный патрубок и натяжной узел. Ковши, закреплённые на ленте или цепи, движутся внутри корпуса нории. В головке привод с мотором-редуктором вращает барабан или звёздочки; материал выходит через разгрузочный патрубок. Инспекционные люки обеспечивают доступ для обслуживания.',
      ],
      illustrations: [
        {
          src: '/images/elevatory/konstruktsiya-kovshovogo-elevatora-restored.webp',
          alt: 'Схема основных частей ковшового элеватора с подписями привода, барабанов, корпуса, ковшей и загрузочного лотка',
          caption: 'Основные узлы ковшового элеватора',
          compact: true,
          width: 1021,
          height: 1540,
        },
      ],
    },
    {
      title: 'Способы наполнения ковшей',
      text: [
        'При зачерпывании ковши проходят через материал в башмаке элеватора. При прямой засыпке продукт поступает в ковш через загрузочный патрубок. Способ наполнения выбирают с учётом сыпучести, крупности и склонности груза к разрушению.',
      ],
      illustrations: [
        {
          src: '/images/elevatory/napolnenie-kovshey-restored.webp',
          alt: 'Две схемы наполнения ковшей: зачерпывание материала в башмаке и прямая засыпка через боковой патрубок',
          caption: 'Зачерпывание и прямая засыпка',
          compact: true,
          width: 1655,
          height: 950,
        },
      ],
    },
    {
      title: 'Способы разгрузки ковшей',
      text: [
        'Центробежная разгрузка использует скорость движения ковшей при огибании верхнего барабана. При самотечной разгрузке материал выходит под действием силы тяжести. Направленную и свободную схемы выбирают по свойствам груза, а геометрию головки согласуют со способом выгрузки.',
      ],
      illustrations: [
        {
          src: '/images/elevatory/razgruzka-kovshey-restored.webp',
          alt: 'Исходные схемы вариантов разгрузки ковшового элеватора с обозначениями а, б, в и г',
          caption: 'Варианты выгрузки материала из ковшей',
          compact: true,
          width: 1661,
          height: 947,
        },
      ],
    },
    {
      title: 'Ковшовые элеваторы ленточные',
      text: [
        'В ленточном элеваторе ковши закреплены на резиновой ленте. Такое исполнение применяют для непрерывной вертикальной подачи сыпучих продуктов. Производительность зависит от вместимости ковшей, шага их установки, скорости ленты и степени наполнения.',
        'При подборе учитывают температуру, абразивность и влажность материала, чтобы выбрать ленту и ковши для конкретной линии.',
      ],
    },
    {
      title: 'Ковшовые элеваторы цепные',
      text: [
        'В цепном элеваторе ковши закреплены на цепях. Прочный тяговый орган подходит для тяжёлых, крупнокусковых и абразивных грузов, а также для повышенной температуры при соответствующем исполнении узлов.',
        'Цепное исполнение подбирают по нагрузке, температуре, влажности и характеру продукта. Его используют, в частности, для подачи угля, руды и минеральных материалов; конкретную комплектацию определяют расчётом.',
      ],
    },
    {
      title: 'Применение и подбор',
      text: [
        'Ковшовые элеваторы используют в зернопереработке, производстве строительных материалов, химической и горнодобывающей промышленности. Они соединяют приёмный бункер, дозатор, сушилку и оборудование на следующем уровне.',
        'Для расчёта нужны насыпная плотность и размер кусков материала, влажность, температура, требуемая производительность, высота подъёма и режим работы. По этим данным выбирают тяговый орган, форму ковша, способ загрузки и выгрузки.',
      ],
    },
  ],
} satisfies IndustrialPage;
