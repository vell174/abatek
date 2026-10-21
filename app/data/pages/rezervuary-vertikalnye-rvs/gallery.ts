import type { GalleryImage } from '../_shared/types';

export const gallery = [
  {
    src: '/images/rezervuary-rvs/projects/izgotovlenie-korpusa-rezervuara-rvs-dlya-ochistki-vody-800.webp',
    fullSrc: '/images/rezervuary-rvs/projects/izgotovlenie-korpusa-rezervuara-rvs-dlya-ochistki-vody.webp',
    alt: 'Изготовление корпуса резервуара РВС для системы очистки воды в цехе АБАТЭК',
    width: 800,
    height: 600,
    fullWidth: 1600,
    fullHeight: 1200,
  },
  {
    src: '/images/rezervuary-rvs/projects/sborka-rezervuara-rvs-dlya-ochistki-vody-800.webp',
    fullSrc: '/images/rezervuary-rvs/projects/sborka-rezervuara-rvs-dlya-ochistki-vody.webp',
    alt: 'Сборка резервуара РВС для системы очистки воды с опорной конструкцией',
    width: 800,
    height: 600,
    fullWidth: 1600,
    fullHeight: 1200,
  },
  {
    src: '/images/rezervuary-rvs/projects/rezervuar-rvs-dlya-ochistki-vody-v-cehu-800.webp',
    fullSrc: '/images/rezervuary-rvs/projects/rezervuar-rvs-dlya-ochistki-vody-v-cehu.webp',
    alt: 'Резервуар РВС для системы очистки воды на производстве АБАТЭК',
    width: 800,
    height: 600,
    fullWidth: 1600,
    fullHeight: 1200,
  },
  {
    src: '/images/rezervuary-rvs/projects/otgruzka-rezervuara-rvs-dlya-ochistki-vody-800.webp',
    fullSrc: '/images/rezervuary-rvs/projects/otgruzka-rezervuara-rvs-dlya-ochistki-vody.webp',
    alt: 'Отгрузка резервуара РВС для системы очистки воды на грузовом автомобиле',
    width: 800,
    height: 600,
    fullWidth: 1600,
    fullHeight: 1200,
  },
] as const satisfies readonly GalleryImage[];
