import type { IndustrialPage, IndustrialSection, PageSeo } from './types';
import { createIndustrialFaq } from './faq';
import { createProductPage, createProductSeo } from './create-product-page';
import { beltVariantDefinitions, type BeltVariantSlug } from './belt-variant-definitions';

const parentBreadcrumb = { label: 'Ленточные конвейеры', to: '/lentochnye-konvejery/' };

const groupDefinitions = [
  {
    id: 'mobility',
    title: 'По возможности перемещения',
    description: 'Стационарная установка или смена рабочих позиций. Передвижные и мобильные объединены в один вид.',
  },
  {
    id: 'direction',
    title: 'По направлению транспортировки',
    description: 'Движение на одной высоте, подъём или крутонаклонная трасса.',
  },
  {
    id: 'route',
    title: 'По конфигурации трассы',
    description: 'Форма трассы в плане и по высоте. Прямой конвейер не обязательно горизонтальный.',
  },
  {
    id: 'surface',
    title: 'По форме несущей поверхности',
    description: 'Плоская опора для изделий или желоб для потока сыпучего материала.',
  },
  {
    id: 'profile',
    title: 'По конструкции поверхности ленты',
    description: 'Гладкое полотно, шеврон, перегородки и боковые гофроборта.',
  },
  {
    id: 'material',
    title: 'По типу ленточного полотна',
    description: 'Материал и строение ленты выбираются по нагрузке, продукту и условиям очистки.',
  },
  {
    id: 'adjustment',
    title: 'По регулировке угла наклона',
    description: 'Фиксированное положение или изменение высоты выгрузки.',
  },
  {
    id: 'length',
    title: 'По возможности изменения длины',
    description: 'Постоянная рабочая длина или телескопическое выдвижение.',
  },
  {
    id: 'cargo',
    title: 'По типу груза',
    description: 'Прикладная классификация: отдельные изделия, насыпной поток и кусковые материалы.',
  },
  {
    id: 'purpose',
    title: 'По назначению',
    description: 'Применение оборудования. Эти варианты также доступны в разделе по назначению и типу груза.',
  },
] as const;

const toCard = (definition: (typeof beltVariantDefinitions)[number]): IndustrialSection => ({
  title: definition.title,
  text: [definition.description],
  image: definition.image,
  imageAlt: `Пример конструкции: ${definition.title.toLowerCase()}`,
  imageFit: 'contain',
  href: `/${definition.slug}/`,
});

export const beltClassificationGroups = groupDefinitions.map((group) => ({
  ...group,
  items: beltVariantDefinitions.filter((definition) => definition.group === group.id).map(toCard),
}));

export const beltVariantRouteGroups = beltVariantDefinitions.map(({ slug }) => ({ root: slug, slugs: [slug] }));

function getDefinition(slug: BeltVariantSlug) {
  const definition = beltVariantDefinitions.find((item) => item.slug === slug);
  if (!definition) throw new Error(`Unknown belt conveyor variant: ${slug}`);
  return definition;
}

function createOptions(slug: BeltVariantSlug) {
  const definition = getDefinition(slug);
  return {
    slug,
    title: definition.title,
    description: definition.description,
    image: definition.image,
    intro: [
      definition.description,
      definition.construction,
      'АБАТЭК прорабатывает ленточные конвейеры и транспортеры на заказ по техническому заданию. Длину, ширину, привод и комплектацию согласовываем с учётом груза и условий эксплуатации. Готовое оборудование отправляем в регионы России.',
    ],
    facts: [] as Array<[string, string]>,
    sections: [
      { title: 'Где применяется этот вариант', text: [definition.applications] },
      { title: 'Особенности и ограничения', text: [definition.limitations] },
      {
        title: 'Подбор конструкции и комплектации',
        text: [
          'Для расчёта нужны свойства груза, производительность и схема участка. Помимо общих параметров, для этого исполнения важно согласовать следующие сведения.',
        ],
        items: [...definition.selection],
      },
      {
        title: 'Изготовление по техническому заданию',
        text: [
          'До изготовления согласуем общий вид, точки загрузки и выгрузки, материалы, привод, опоры и средства управления. Проверяем совместимость с действующей линией и доступ к обслуживанию. Выбранные защитные устройства и дополнительные узлы фиксируются в комплектации.',
        ],
      },
      {
        title: 'Стоимость и заказ оборудования',
        text: [
          'Чтобы купить конвейер этого исполнения, отправьте описание процесса и схему размещения. Цена зависит от размеров трассы, ленты, нагрузки, привода, материалов рамы и дополнительных узлов; стоимость и сроки указываются в коммерческом предложении после уточнения задания.',
          'При отсутствии готового ТЗ начните с описания груза и двух точек — откуда его нужно принять и куда подать. Условия поставки, транспортные габариты и разгрузку на площадке согласовываем отдельно.',
        ],
      },
    ],
    table: {
      title: 'Параметры для расчёта конвейера',
      headers: ['Параметр', 'Что нужно указать'],
      rows: [
        ['Груз', 'Материал или изделие, размеры, масса и особые свойства'],
        ['Производительность', 'Тонны, кубометры или штуки в час; равномерность подачи'],
        ['Трасса', 'Длина, высоты загрузки и выгрузки, ограничения помещения'],
        ['Условия работы', 'Продолжительность смены, температура, влажность, очистка'],
        ...definition.selection.map((item) => [item, 'Указать в техническом задании или обсудить при подборе']),
      ],
    },
    keywords: [
      definition.title.toLowerCase(),
      definition.title.toLowerCase().replace(/конвейер/g, 'транспортер'),
      `купить ${definition.title.toLowerCase()}`,
      `изготовление ${definition.title.toLowerCase()}`,
      'ленточный конвейер на заказ',
    ],
  };
}

export function createBeltVariantPage(slug: BeltVariantSlug): IndustrialPage {
  const definition = getDefinition(slug);
  const group = groupDefinitions.find((item) => item.id === definition.group);
  return {
    ...createProductPage(createOptions(slug)),
    parentBreadcrumb,
    imageAlt: `Пример конструкции: ${definition.title.toLowerCase()}`,
    imageFit: 'contain',
    imageCaption:
      'Пример конструктивного исполнения. Материалы, размеры и комплектация согласуются по ТЗ; иллюстрация не является чертежом поставки.',
    heroTitleVariant: 'wide-light',
    hideCatalog: true,
    galleryTitle: 'Другие варианты в этой группе',
    catalogVariant: 'categories',
    classificationGroups: [
      {
        title: group?.title ?? 'Варианты ленточных конвейеров',
        description: 'Сравните соседние варианты. Все признаки классификации собраны на странице ленточных конвейеров.',
        items: beltVariantDefinitions
          .filter((item) => item.group === definition.group && item.slug !== slug)
          .map(toCard),
      },
    ],
    faq: [
      { question: 'Что важно учесть при выборе этого исполнения?', answer: definition.limitations },
      ...createIndustrialFaq(
        `Помимо груза, производительности и схемы участка, укажите: ${definition.selection.join('; ').toLowerCase()}.`,
      ),
    ],
  };
}

export function createBeltVariantSeo(slug: BeltVariantSlug): PageSeo {
  const definition = getDefinition(slug);
  const seo = createProductSeo(createOptions(slug));
  const title = `${definition.title} — купить на заказ | АБАТЭК`;
  const description = `${definition.description} Подбор, изготовление по ТЗ и поставка по России. Запросите расчёт в АБАТЭК.`;
  return {
    ...seo,
    title,
    description,
    image: { src: definition.image, alt: definition.title, type: 'image/webp' },
    openGraph: { ...seo.openGraph, title, description },
    twitter: { ...seo.twitter, title, description },
    breadcrumbs: [
      { name: 'Главная', path: '/' },
      { name: 'Конвейеры и транспортеры по видам', path: '/konveyery-po-vidam/' },
      { name: parentBreadcrumb.label, path: parentBreadcrumb.to },
      { name: definition.title, path: `/${slug}/` },
    ],
    schema: { ...seo.schema, pageType: 'WebPage', category: 'Ленточные конвейеры' },
  };
}
