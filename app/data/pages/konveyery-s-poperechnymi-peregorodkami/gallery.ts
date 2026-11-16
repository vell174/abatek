import type { GalleryImage } from '../_shared/types';

const imageBase = '/images/belt-projects/partitioned';

export const gallery = [
  {
    src: `${imageBase}/konveyer-dlya-sortirovki-s-prodolnymi-bortami-i-poperechnymi-peregorodkami.jpg`,
    alt: 'Конвейер для сортировки с продольными бортами и поперечными перегородками',
    width: 578,
    height: 434,
  },
  {
    src: `${imageBase}/konveyer-peredvizhnoy-dlya-sklada-s-shevronnoy-pvh-lentoy.jpg`,
    alt: 'Конвейер передвижной для склада с шевронной ПВХ лентой',
    width: 1200,
    height: 1600,
    imageFit: 'contain',
  },
  {
    src: `${imageBase}/mini-konveyer-s-peregorodkami-i-gofrobortami.jpg`,
    alt: 'Мини конвейер с перегородками и гофробортами',
    width: 1600,
    height: 900,
  },
  {
    src: `${imageBase}/naklonnyy-konveyer-dlya-shtuchnyh-gruzov.jpg`,
    alt: 'Наклонный конвейер для штучных грузов',
    width: 720,
    height: 1280,
    imageFit: 'contain',
  },
  {
    src: `${imageBase}/otgruzka-konveyera-dlya-podachi-meshkov.jpg`,
    alt: 'Отгрузка конвейера для подачи мешков',
    width: 1280,
    height: 768,
  },
  {
    src: `${imageBase}/pvh-lenta-s-poperechnymi-peregorodkami.jpg`,
    alt: 'ПВХ лента с поперечными перегородками',
    width: 1600,
    height: 1200,
  },
  {
    src: `${imageBase}/skladskie-konveyery-s-peregorodkami-na-pvh-lente.jpg`,
    alt: 'Складские конвейеры с перегородками на ПВХ ленте',
    width: 1280,
    height: 768,
  },
] as const satisfies readonly GalleryImage[];
