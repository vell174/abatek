import type { PageSeo } from '~/data/pages/_shared/types';
import { conveyorToolRoutes } from '~/data/conveyor-tools';
import { referenceRoutes } from '~/data/conveyor-references';
import { screwFlightRoute } from '~/data/screw-flight-calculator';

export const usefulResources = {
  homeLabel: 'Главная',
  title: 'Калькуляторы и справочники для конвейеров',
  eyebrow: 'Полезное',
  description:
    'Инженерные инструменты для предварительных расчётов и справочные данные для выбора конвейерного оборудования и комплектующих.',
  calculatorsTitle: 'Калькуляторы',
  referencesTitle: 'Справочники',
  calculators: [
    {
      title: 'Калькулятор веса металла',
      description: 'Оценка массы листа, трубы, круга и других видов металлопроката по размерам и материалу.',
      to: '/kalkulyator-vesa-metalla/',
    },
    {
      title: 'Калькулятор мощности привода ленточного конвейера',
      description: 'Предварительный подбор мощности привода по параметрам ленточного конвейера и груза.',
      to: conveyorToolRoutes.power,
    },
    {
      title: 'Расчёт ширины конвейерной ленты',
      description: 'Подбор ширины по производительности, плотности и крупности груза.',
      to: conveyorToolRoutes.width,
    },
    {
      title: 'Условия эксплуатации ленты',
      description: 'Оценка условий работы ленты по свойствам груза и режиму эксплуатации.',
      to: conveyorToolRoutes.operating,
    },
    {
      title: 'Скорость конвейера',
      description: 'Расчёт линейной скорости ленты по диаметру и частоте вращения приводного барабана.',
      to: conveyorToolRoutes.speed,
    },
    {
      title: 'Развертка витка шнека',
      description: 'Размеры кольцевой заготовки, угол выреза и масса пера шнека по размерам готового витка.',
      to: screwFlightRoute,
    },
  ],
  references: [
    {
      title: 'Параметры ленточных конвейеров',
      description: 'Типовые ширины и скорости ленты, размеры роликов, барабанов и шаг роликоопор.',
      to: referenceRoutes.parameters,
    },
    {
      title: 'Абразивность грузов',
      description: 'Категории абразивности и примеры материалов для оценки износа.',
      to: referenceRoutes.abrasiveness,
    },
    {
      title: 'Свойства сыпучих грузов',
      description: 'Насыпная плотность, угол естественного откоса и допустимый угол подъёма.',
      to: referenceRoutes.materials,
    },
  ],
} as const;

export const usefulResourcesSeo: PageSeo = {
  title: 'Калькуляторы и справочники для конвейеров | АБАТЭК',
  description:
    'Расчёт мощности и скорости ленточного конвейера, ширины ленты, веса металла и развертки витка шнека. Справочники свойств грузов и параметров конвейеров.',
  keywords: [
    'калькуляторы конвейеров',
    'расчёт конвейера онлайн',
    'калькулятор шнека',
    'справочник конвейеров',
    'параметры конвейеров',
  ],
  canonicalPath: '/poleznoe/',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    title: 'Калькуляторы и справочники для конвейеров | АБАТЭК',
    description: 'Инструменты для предварительного расчёта конвейеров и справочные данные.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'АБАТЭК',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Калькуляторы и справочники для конвейеров | АБАТЭК',
    description: 'Расчёты и справочные данные для выбора конвейерного оборудования.',
  },
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Калькуляторы и справочники', path: '/poleznoe/' },
  ],
  schema: {
    pageType: 'CollectionPage',
    entityType: 'ItemList',
    name: 'Калькуляторы и справочники для конвейеров',
    items: [...usefulResources.calculators, ...usefulResources.references].map((item) => ({
      name: item.title,
      url: item.to,
      description: item.description,
    })),
  },
};
