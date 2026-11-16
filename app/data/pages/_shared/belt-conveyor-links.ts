import type { IndustrialPage } from './types';
import { conveyorToolRoutes } from '~/data/conveyor-tools';
import { usefulResources } from '~/data/useful-resources';

export const beltConveyorNodeLinks = [
  {
    label: 'Верхние желобчатые роликоопоры',
    to: '/rolikoopory/#verhnie-zhelobchatye-rolikoopory',
    description: 'Поддерживают рабочую ветвь и задают поперечную форму ленты.',
  },
  {
    label: 'Верхние центрирующие роликоопоры',
    to: '/rolikoopory/#verhnie-centriruyushchie-rolikoopory',
    description: 'Помогают удерживать рабочую ветвь относительно продольной оси конвейера.',
  },
  {
    label: 'Демпферные столы для ленточных конвейеров',
    to: '/dempfernye-stoly-dlya-lentochnyh-konveyerov/',
    description: 'Поддерживают профиль желоба и защищают ленту от ударов в зоне загрузки.',
  },
  {
    label: 'Барабаны конвейерные',
    to: '/barabany/',
    description: 'Передают тяговое усилие, натягивают ленту и меняют направление её движения.',
  },
  {
    label: 'Ролики конвейерные',
    to: '/rolikikonveyernye/',
    description: 'Поддерживают ленту в роликоопорах на рабочей и холостой ветвях.',
  },
] satisfies NonNullable<IndustrialPage['relatedLinks']>;

export const beltConveyorCalculatorLinks = usefulResources.calculators
  .filter((resource) => Object.values(conveyorToolRoutes).some((route) => route === resource.to))
  .map((resource) => ({
    label: resource.title,
    description: resource.description,
    to: resource.to,
  })) satisfies NonNullable<IndustrialPage['usefulLinks']>;
