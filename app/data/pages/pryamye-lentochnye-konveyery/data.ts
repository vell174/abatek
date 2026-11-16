import { createBeltVariantPage } from '../_shared/create-belt-variant-page';
import { beltVariantDefinitions } from '../_shared/belt-variant-definitions';

const basePage = createBeltVariantPage('pryamye-lentochnye-konveyery');
const relatedSlugs = [
  'ploskie-lentochnye-konveyery',
  'konveyer-lentochnyy-zhelobchatyy',
  'naklonnyj-lentochnyj-konvejer',
  'lentochnye-konveyery-s-prodolnymi-pryamymi-bortami',
  'zakrytyy-lentochnyy-konveyer',
  'shevronnye-lentochnye-konveyery',
];

export const pageData = {
  ...basePage,
  heroImage: '/images/belt-classification/pryamoy-lentochnyy-konveyer-politekh.webp',
  heroImageAlt: 'Прямой ленточный конвейер на производственной площадке',
  heroBackgroundVariant: 'straight-conveyor-photo' as const,
  introVariant: 'text-only' as const,
  relatedLinks: undefined,
  relatedLinksTitle: undefined,
  classificationGroups: basePage.classificationGroups.map((group) => ({
    ...group,
    title: 'Другие варианты в этой группе',
    items: relatedSlugs.map((slug) => {
      const item = beltVariantDefinitions.find((candidate) => candidate.slug === slug);
      if (!item) throw new Error(`Unknown belt variant: ${slug}`);
      return {
        title: item.title,
        text: [item.description],
        image: item.image,
        imageAlt: item.title,
        imageFit: 'contain' as const,
        href: `/${slug}/`,
      };
    }),
  })),
};
