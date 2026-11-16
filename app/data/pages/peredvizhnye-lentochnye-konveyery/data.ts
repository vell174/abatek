import { beltClassificationGroups, createBeltVariantPage } from '../_shared/create-belt-variant-page';

const classificationCards = beltClassificationGroups.flatMap((group) => group.items);
const relatedVariantSlugs = [
  'shevronnye-lentochnye-konveyery',
  'lentochnye-konveyery-s-prodolnymi-pryamymi-bortami',
  'konveyery-s-poperechnymi-peregorodkami',
  'konveyer-lentochnyy-zhelobchatyy',
] as const;
const relatedVariantCards = relatedVariantSlugs.map((slug) => {
  const card = classificationCards.find((item) => item.href === `/${slug}/`);
  if (!card) throw new Error(`Не найдена карточка ленточного конвейера: ${slug}`);
  return card;
});

export const pageData = {
  ...createBeltVariantPage('peredvizhnye-lentochnye-konveyery'),
  heroImage: '/images/belt-classification/mobile-conveyor-clean-hero.webp',
  heroImageAlt: 'Передвижной ленточный конвейер с шевронной лентой и колёсной рамой',
  heroBackgroundVariant: 'photo' as const,
  relatedLinksTitle: undefined,
  relatedLinks: undefined,
  classificationGroups: [
    {
      title: 'Лента и конструкция рабочей ветви',
      description:
        'Для передвижной установки сравните профиль ленты, удержание груза боковыми бортами и желобчатую опору для сыпучего потока.',
      items: relatedVariantCards,
    },
  ],
};
