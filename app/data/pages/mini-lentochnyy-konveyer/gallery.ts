import type { GalleryImage } from '../_shared/types';

const imageRoot = '/images/mini-conveyor-projects';

export const gallery = [
  {
    src: `${imageRoot}/mini-conveyor-green-belt.webp`,
    fullSrc: `${imageRoot}/mini-conveyor-green-belt-full.webp`,
    alt: 'Мини ленточный конвейер с зелёной лентой, боковыми направляющими и опорами на колёсах',
    width: 800,
    height: 562,
    fullWidth: 1497,
    fullHeight: 1051,
  },
  {
    src: `${imageRoot}/mini-modular-conveyor-guide-rails.webp`,
    fullSrc: `${imageRoot}/mini-modular-conveyor-guide-rails-full.webp`,
    alt: 'Компактный конвейер с белой модульной лентой и регулируемыми направляющими',
    width: 800,
    height: 600,
    fullWidth: 1448,
    fullHeight: 1086,
  },
  {
    src: `${imageRoot}/mini-conveyor-white-belt.webp`,
    fullSrc: `${imageRoot}/mini-conveyor-white-belt-full.webp`,
    alt: 'Мини ленточный конвейер с белой лентой и синим приводом, вид со стороны барабана',
    width: 598,
    height: 800,
    fullWidth: 1084,
    fullHeight: 1451,
  },
  {
    src: `${imageRoot}/mini-conveyor-blue-frame.webp`,
    fullSrc: `${imageRoot}/mini-conveyor-blue-frame-full.webp`,
    alt: 'Компактный ленточный конвейер с синей рамой, белой лентой и мотор-редуктором',
    width: 800,
    height: 450,
    fullWidth: 1600,
    fullHeight: 900,
  },
  {
    src: `${imageRoot}/mini-belt-feeder-drive.webp`,
    fullSrc: `${imageRoot}/mini-belt-feeder-drive-full.webp`,
    alt: 'Ленточный мини-питатель с тёмной лентой, зелёными бортами и синим приводом',
    width: 600,
    height: 800,
    fullWidth: 1086,
    fullHeight: 1448,
  },
] as const satisfies readonly GalleryImage[];
