import type { IndustrialPage, IndustrialSection, PageSeo } from './types';
import { beltCapacityReferenceCard } from './belt-capacity-reference';
import { createIndustrialFaq } from './faq';
import { createProductPage, createProductSeo } from './create-product-page';
import { beltVariantDefinitions, type BeltVariantSlug } from './belt-variant-definitions';
import { beltRouteContent } from './belt-route-content';

const parentBreadcrumb = { label: 'Ленточные конвейеры', to: '/lentochnye-konvejery/' };
const inclinedHeroImage = {
  src: '/images/belt-projects/inclined/naklonnyy-zhelobchatyy-konveyer-proizvodstvennaya-liniya.webp',
  alt: 'Наклонный желобчатый ленточный конвейер в производственной линии',
  width: 1060,
  height: 456,
} as const;

const capacityReferenceSlugs = new Set<BeltVariantSlug>([
  'lentochnye-konveyery-dlya-sypuchih-materialov',
  'lentochnye-konveyery-dlya-kuskovyh-gruzov',
  'gorizontalnyj-lentochnyj-konvejer',
  'naklonnyj-lentochnyj-konvejer',
  'ploskie-lentochnye-konveyery',
  'konveyer-lentochnyy-zhelobchatyy',
  'pryamye-lentochnye-konveyery',
  'konveyery-s-gladkoy-lentoy',
  'shevronnye-lentochnye-konveyery',
]);

const groupDefinitions = [
  {
    id: 'surface',
    title: 'По форме несущей поверхности',
    description: 'Плоская опора для изделий или желоб для потока сыпучего материала.',
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
  {
    id: 'direction',
    title: 'По направлению транспортировки',
    description: 'Движение на одной высоте или подъём; высоту выгрузки наклонного конвейера можно регулировать.',
  },
  {
    id: 'construction',
    title: 'По конструкции поверхности ленты, возможности перемещения и конструкции',
    description: 'Профиль ленты, стационарное или передвижное исполнение, компактные размеры и закрытый корпус.',
  },
  {
    id: 'route',
    title: 'По конфигурации трассы',
    description: 'Форма трассы в плане и по высоте. Прямой конвейер не обязательно горизонтальный.',
  },
  {
    id: 'material',
    title: 'По типу ленточного полотна',
    description: 'Материал и строение ленты выбираются по нагрузке, продукту и условиям очистки.',
  },
  {
    id: 'length',
    title: 'По возможности изменения длины',
    description: 'Постоянная рабочая длина или телескопическое выдвижение.',
  },
] as const;

const variantImageAlt = (slug: string, title: string) => {
  if (slug === 'konveyery-s-poperechnymi-peregorodkami')
    return 'Прямой наклонный конвейер с поперечными перегородками без боковых гофробортов';
  if (slug === 'shevronnye-lentochnye-konveyery')
    return 'Длинный наклонный конвейер с шевронной лентой на желобчатых трёхроликовых опорах';
  return `Пример конструкции: ${title.toLowerCase()}`;
};

const toCard = (definition: (typeof beltVariantDefinitions)[number]): IndustrialSection => ({
  title: definition.title,
  text: [definition.description],
  image: definition.image,
  imageAlt: variantImageAlt(definition.slug, definition.title),
  imageFit: 'contain',
  href: `/${definition.slug}/`,
});

const beltVariantCardDefinitions = beltVariantDefinitions.filter(
  (definition) =>
    definition.slug !== 'konveyery-s-poliuretanovoy-lentoy' && definition.slug !== 'konveyery-s-postoyannym-uglom',
);
const classificationSlugs = new Set(beltVariantCardDefinitions.map((definition) => definition.slug));

export const beltClassificationGroups = groupDefinitions
  .filter((group) => group.id !== 'length')
  .map((group) => ({
    ...group,
    items: beltVariantCardDefinitions.filter((definition) => definition.group === group.id).map(toCard),
  }));

export const beltVariantRouteGroups = beltVariantDefinitions.map(({ slug }) => ({ root: slug, slugs: [slug] }));

function getDefinition(slug: BeltVariantSlug) {
  const definition = beltVariantDefinitions.find((item) => item.slug === slug);
  if (!definition) throw new Error(`Unknown belt conveyor variant: ${slug}`);
  return definition;
}

function createOptions(slug: BeltVariantSlug) {
  const definition = getDefinition(slug);
  const routeContent = beltRouteContent[slug];
  const isInclined = slug === 'naklonnyj-lentochnyj-konvejer';
  return {
    slug,
    title: definition.title,
    description: routeContent?.description ?? definition.description,
    image: routeContent?.image ?? definition.image,
    imageAlt: routeContent?.imageAlt,
    intro: routeContent?.intro ?? [
      definition.description,
      definition.construction,
      ...(isInclined
        ? [
            'Для пологого подъёма может подойти гладкая лента, если груз не скользит и не скатывается. Шевронный профиль увеличивает сцепление с сыпучим материалом. При более крутом подъёме или склонности груза к обратному скатыванию рассматривают поперечные перегородки и при необходимости боковые борта. Решение зависит от угла, размеров частиц, влажности и требуемой подачи.',
          ]
        : []),
      'АБАТЭК изготавливает ленточные конвейеры и транспортеры на заказ по техническому заданию. Длину, ширину, привод и комплектацию согласовываем с учётом груза и условий эксплуатации. Готовое оборудование отправляем в регионы России.',
    ],
    facts: [] as Array<[string, string]>,
    sections: routeContent?.sections ?? [
      ...(isInclined
        ? [
            {
              title: 'Наклонный конвейер для сыпучих и штучных грузов',
              text: [
                'Наклонными ленточными конвейерами перемещают не только песок, зерно или гранулы, но и коробки, мешки, детали и другую штучную продукцию. Для сыпучего потока проверяют гранулометрию, влажность и просыпание; для штучного груза — опорную площадь, устойчивость на ленте и положение при выгрузке.',
              ],
            },
            {
              title: 'Форма трассы и передвижное исполнение',
              text: [
                'Прямая наклонная трасса связывает две высоты. Г-образная компоновка добавляет горизонтальный участок для приёма или выдачи груза, Z-образная — горизонтальные участки до и после подъёма. Наклонный конвейер также может быть передвижным, если точки подачи меняются между рабочими позициями.',
              ],
            },
            {
              title: 'Постоянный или регулируемый угол наклона',
              text: [
                'Если высота выгрузки не меняется, угол фиксируют в опорах. Для загрузки машин или ёмкостей разной высоты предусматривают подъёмный механизм с согласованным диапазоном регулировки. В каждом рабочем положении проверяют устойчивость рамы, положение точки загрузки, работу привода и удержание груза; способ фиксации выбирают по частоте перестановок.',
                'Регулировка угла меняет высоту выгрузки, но сама по себе не меняет длину конвейера. Работа во время изменения наклона возможна только при специально рассчитанной конструкции.',
              ],
            },
            {
              title: 'Как угол наклона влияет на привод',
              text: [
                'При одинаковой загрузке и скорости ленты увеличение угла наклона повышает составляющую веса груза вдоль трассы. Для подъёма требуется большее тяговое усилие и крутящий момент на выходе мотор-редуктора. Мощность двигателя подбирают расчётом: на неё также влияют высота подъёма, производительность, скорость ленты и сопротивления механизмов.',
              ],
            },
          ]
        : []),
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
      ...(routeContent?.keywords ?? []),
      ...(isInclined ? ['конвейер с регулируемым углом наклона', 'наклонный передвижной ленточный конвейер'] : []),
      `купить ${definition.title.toLowerCase()}`,
      `изготовление ${definition.title.toLowerCase()}`,
      'ленточный конвейер на заказ',
    ],
  };
}

export function createBeltVariantPage(slug: BeltVariantSlug): IndustrialPage {
  const definition = getDefinition(slug);
  const routeContent = beltRouteContent[slug];
  const group = groupDefinitions.find((item) => item.id === definition.group);
  const inclinedVariantSlugs: BeltVariantSlug[] = [
    'g-obraznye-lentochnye-konvejery',
    'z-obraznyj-lentochnyj-konvejer',
    'shevronnye-lentochnye-konveyery',
    'konveyery-s-poperechnymi-peregorodkami',
    'peredvizhnye-lentochnye-konveyery',
    'krutonaklonnye-lentochnye-konveyery',
  ];
  const flatVariantSlugs: BeltVariantSlug[] = [
    'lentochnye-konveyery-dlya-shtuchnyh-gruzov',
    'lentochnye-konveyery-dlya-sklada',
    'lentochnye-konveyery-dlya-sortirovki',
    'modulnye-konvejery',
    'konveyery-s-pvh-lentoy',
  ];
  const additionalVariantSlugs =
    slug === 'konveyer-lentochnyy-zhelobchatyy'
      ? new Set(['lentochnye-konveyery-dlya-sypuchih-materialov', 'lentochnye-konveyery-dlya-kuskovyh-gruzov'])
      : undefined;
  return {
    ...createProductPage(createOptions(slug)),
    compactLayout: true,
    projectsThenDetails: true,
    ...(routeContent
      ? {
          heroImage: routeContent.image,
          heroImageAlt: routeContent.imageAlt,
          heroBackgroundVariant: 'photo' as const,
        }
      : {}),
    ...(slug === 'naklonnyj-lentochnyj-konvejer'
      ? {
          heroImage: inclinedHeroImage.src,
          heroImageAlt: inclinedHeroImage.alt,
          heroBackgroundVariant: 'photo' as const,
        }
      : {}),
    parentBreadcrumb,
    introTitleSize: classificationSlugs.has(slug) ? 'compact' : undefined,
    imageAlt: routeContent?.imageAlt ?? variantImageAlt(slug, definition.title),
    imageFit: routeContent ? 'cover' : 'contain',
    imageCaption: routeContent
      ? routeContent.imageCaption
      : 'Пример конструктивного исполнения. Материалы, размеры и комплектация согласуются по ТЗ; иллюстрация не является чертежом поставки.',
    heroTitleVariant: 'wide-light',
    hideCatalog: true,
    referenceCard: capacityReferenceSlugs.has(slug) ? beltCapacityReferenceCard : undefined,
    projectsTitle: routeContent ? 'Выполненные проекты АБАТЭК: ленточные конвейеры' : undefined,
    relatedLinksTitle: routeContent ? 'Смежные решения' : undefined,
    relatedLinks: routeContent?.relatedSlugs?.map((relatedSlug) => {
      const related = getDefinition(relatedSlug as BeltVariantSlug);
      return { label: related.title, to: `/${relatedSlug}/`, description: related.description };
    }),
    usefulLinksTitle: routeContent ? 'Полезно для предварительного расчёта' : undefined,
    usefulLinks: routeContent
      ? [
          {
            label: 'Калькулятор мощности привода',
            to: '/kalkulyator-moshchnosti-privoda-lentochnogo-konveyera/',
            description: 'Предварительная оценка мощности по параметрам трассы и груза.',
          },
          {
            label: 'Расчёт ширины конвейерной ленты',
            to: '/kalkulyatory/shirina-lenty/',
            description: 'Оценка ширины ленты по подаче и свойствам материала.',
          },
        ]
      : undefined,
    galleryTitle: 'Другие варианты в этой группе',
    catalogVariant: 'categories',
    classificationGroups: [
      {
        title:
          slug === 'naklonnyj-lentochnyj-konvejer'
            ? 'Варианты исполнения наклонных конвейеров'
            : (group?.title ?? 'Варианты ленточных конвейеров'),
        description:
          slug === 'naklonnyj-lentochnyj-konvejer'
            ? 'Наклонную трассу можно дополнить горизонтальными участками, сделать передвижной и оснастить лентой под угол подъёма и свойства груза.'
            : slug === 'ploskie-lentochnye-konveyery'
              ? 'Сравните решения для штучных грузов, склада и сортировки, а также конвейеры с ПВХ- и модульной лентой. Желобчатый вариант показывает другую форму рабочей ветви.'
              : 'Сравните соседние варианты. Все признаки классификации собраны на странице ленточных конвейеров.',
        items:
          slug === 'naklonnyj-lentochnyj-konvejer'
            ? inclinedVariantSlugs.map((variantSlug) => toCard(getDefinition(variantSlug)))
            : slug === 'ploskie-lentochnye-konveyery'
              ? [
                  ...flatVariantSlugs.map((variantSlug) => toCard(getDefinition(variantSlug))),
                  ...beltVariantCardDefinitions
                    .filter((item) => item.group === definition.group && item.slug !== slug)
                    .map(toCard),
                ]
              : beltVariantCardDefinitions
                  .filter(
                    (item) =>
                      item.slug !== slug && (item.group === definition.group || additionalVariantSlugs?.has(item.slug)),
                  )
                  .map(toCard),
      },
    ],
    faq: routeContent?.faq ?? [
      { question: 'Что важно учесть при выборе этого исполнения?', answer: definition.limitations },
      ...createIndustrialFaq(
        `Помимо груза, производительности и схемы участка, укажите: ${definition.selection.join('; ').toLowerCase()}.`,
      ),
    ],
  };
}

export function createBeltVariantSeo(slug: BeltVariantSlug): PageSeo {
  const definition = getDefinition(slug);
  const routeContent = beltRouteContent[slug];
  const seo = createProductSeo(createOptions(slug));
  const title =
    routeContent?.seoTitle ??
    (slug === 'naklonnyj-lentochnyj-konvejer'
      ? 'Наклонные ленточные конвейеры на заказ | АБАТЭК'
      : `${definition.title} — купить на заказ | АБАТЭК`);
  const description =
    routeContent?.seoDescription ??
    (slug === 'naklonnyj-lentochnyj-konvejer'
      ? 'Наклонные ленточные конвейеры для сыпучих и штучных грузов: стационарные, передвижные, с регулируемым углом. Подбор ленты и изготовление по ТЗ.'
      : slug === 'ploskie-lentochnye-konveyery'
        ? 'Конвейеры с плоской лентой для штучных и сыпучих грузов, овощей и отходов. Резинотканевое, ПВХ- или модульное полотно, боковые борта. Изготовление по ТЗ.'
        : `${definition.description} Подбор, изготовление по ТЗ и поставка по России. Запросите расчёт в АБАТЭК.`);
  return {
    ...seo,
    title,
    description,
    image: routeContent
      ? {
          src: routeContent.image,
          alt: routeContent.imageAlt,
          width: routeContent.imageWidth,
          height: routeContent.imageHeight,
          type: 'image/webp',
        }
      : slug === 'naklonnyj-lentochnyj-konvejer'
        ? { ...inclinedHeroImage, type: 'image/webp' }
        : { src: definition.image, alt: variantImageAlt(slug, definition.title), type: 'image/webp' },
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
