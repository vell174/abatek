import type { PageRoutes } from './types';
export const productRoute = (slug: string): PageRoutes => ({ root: slug, slugs: [slug] });
