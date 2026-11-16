import { createBeltVariantPage } from '../_shared/create-belt-variant-page';

const basePage = createBeltVariantPage('konveyery-s-gladkoy-lentoy');
const excludedVariantPaths = new Set(['/statsionarnye-lentochnye-konveyery/', '/mini-lentochnyy-konveyer/']);

export const pageData = {
  ...basePage,
  relatedLinksTitle: undefined,
  relatedLinks: undefined,
  classificationGroups: basePage.classificationGroups.map((group) => ({
    ...group,
    items: group.items.filter((item) => !excludedVariantPaths.has(item.href ?? '')),
  })),
  heroImage: '/images/belt-classification/smooth-belt-conveyors-clean-hero.webp',
  heroImageAlt: 'Два конвейера с гладкой чёрной лентой, роликовыми опорами и синими приводами',
  heroBackgroundVariant: 'smooth-belt-photo' as const,
  imageWidthPx: 1619,
  imageHeightPx: 971,
  imageFit: 'contain' as const,
};
