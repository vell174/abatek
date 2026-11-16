import { beltProjectPhotos as photos } from '../_shared/belt-project-gallery';

export const gallery = [
  {
    src: '/images/belt-projects/production/peredvizhnoy-konveyer-dlya-makrirovki-gruza.webp',
    alt: 'Передвижной ленточный конвейер на колёсных опорах для подачи штучного груза',
    width: 408,
    height: 612,
  },
  {
    src: '/images/belt-projects/inclined/peredvizhnoy-naklonnyy-konveyer-s-pvh-lentoy-dlya-korobok.webp',
    alt: 'Передвижной наклонный конвейер с ПВХ-лентой для коробок',
  },
  photos.mobilePotatoConveyor,
  photos.mobilePartsConveyor,
  {
    src: '/images/belt-projects/peredvizhnoy-lentochnyy-konveyer-na-kolesah.webp',
    alt: 'Передвижной ленточный конвейер с зелёной лентой на поворотных колёсах при отгрузке',
    width: 868,
    height: 1089,
    imageFit: 'contain',
  },
  {
    src: '/images/belt-projects/pryamoy-peredvizhnoy-lentochnyy-konveyer.webp',
    alt: 'Прямой передвижной ленточный конвейер с зелёной лентой и боковыми направляющими на колёсах',
    width: 1497,
    height: 1051,
    imageFit: 'contain',
  },
] as const;
