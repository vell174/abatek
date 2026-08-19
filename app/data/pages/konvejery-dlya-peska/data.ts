import { createApplicationPage, type ApplicationPageOptions } from '../_shared/create-application-page';
export const options = {
  slug: 'konvejery-dlya-peska',
  title: 'Конвейеры для песка',
  shortTitle: 'песка',
  description: 'Желобчатые и винтовые транспортеры для песка, грунта, земли и глины.',
  intro: [
    'Транспортеры песка предназначены для эффективного перемещения мелкозернистых сыпучих материалов: песка, грунта, земли и глины.',
    'Оборудование применяется в строительстве, горнодобывающей и других отраслях, сокращает рассыпание и потери материала, выдерживает сложные условия эксплуатации.',
  ],
  hero: '/images/sand-conveyor-application-26759703.webp',
  feature: '/images/sand-conveyor-application-26759703.webp',
  featureTitle: 'Где применяются конвейеры для транспортировки песка',
  featureText: [
    'Конвейеры перемещают большие объёмы сыпучих грузов на различные расстояния и высоты и обеспечивают бесперебойную подачу сырья.',
  ],
  tableSubject: 'песка',
  keywords: ['конвейер для песка', 'транспортер песка', 'винтовой конвейер песка'],
  imageType: 'image/png',
  standardTechnical: false,
  extraSections: [
    {
      title: 'Достоинства винтовых конвейеров',
      text: [
        'Компактная закрытая конструкция уменьшает пыление и потери материала, допускает горизонтальную и наклонную подачу.',
      ],
      image: '/images/sand-conveyor-advantages-26760005.webp',
    },
    {
      title: 'Недостатки винтовых конвейеров',
      text: [
        'При подборе учитывают износ рабочих поверхностей, энергозатраты, длину трассы и свойства абразивного материала.',
      ],
      image: '/images/sand-conveyor-disadvantages-26760009.webp',
    },
    {
      title: 'Стоимость конвейера для песка',
      text: [
        'Стоимость зависит от комплектации, производительности, материалов и дополнительного оснащения. Гарантия на оборудование — до 12 месяцев.',
      ],
    },
  ],
} satisfies ApplicationPageOptions;
export const pageData = createApplicationPage(options);
