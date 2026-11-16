import { createBeltVariantPage } from '../_shared/create-belt-variant-page';
import { beltVariantDefinitions } from '../_shared/belt-variant-definitions';

const basePage = createBeltVariantPage('povorotnye-lentochnye-konvejery');
const additionalSlugs = [
  'konveyery-s-pvh-lentoy',
  'lentochnye-konveyery-dlya-sklada',
  'lentochnye-konveyery-dlya-sortirovki',
  'lentochnye-konveyery-dlya-shtuchnyh-gruzov',
];

export const pageData = {
  ...basePage,
  relatedLinks: undefined,
  relatedLinksTitle: undefined,
  usefulLinks: undefined,
  usefulLinksTitle: undefined,
  hideProjects: true,
  classificationGroups: basePage.classificationGroups.map((group) => ({
    ...group,
    items: [
      ...group.items.filter((item) => item.href !== '/g-obraznye-lentochnye-konvejery/'),
      ...additionalSlugs.map((slug) => {
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
    ],
  })),
};
