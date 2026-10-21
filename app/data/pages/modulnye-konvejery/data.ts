import type { IndustrialPage } from '../_shared/types';
import { createBeltVariantPage } from '../_shared/create-belt-variant-page';

export const pageData = {
  ...createBeltVariantPage('modulnye-konvejery'),
  heroImage: '/images/mini-conveyor-projects/mini-modular-conveyor-guide-rails-full.webp',
  heroBackgroundVariant: 'product',
} satisfies IndustrialPage;
