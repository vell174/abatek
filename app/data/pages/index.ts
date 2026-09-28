import type { GalleryImage, IndustrialPage, IndustrialSection, PageRoutes, PageSeo } from './_shared/types';
import { equipmentRouteGroups } from './equipment-routes';
import { beltVariantDefinitions } from './_shared/belt-variant-definitions';

type EquipmentPageData =
  | IndustrialPage
  | {
      title: string;
      description: string;
      heroAccents?: readonly string[];
      image: string;
    };

export interface EquipmentPageDefinition {
  routes: PageRoutes;
  seo: PageSeo;
  data: EquipmentPageData;
  catalog?: IndustrialSection[];
  gallery?: readonly GalleryImage[];
  template:
    | 'industrial'
    | 'custom-metal'
    | 'conveyor-application'
    | 'reservoir-model'
    | 'cyclones'
    | 'electron-knives'
    | 'screw-conveyors'
    | 'reservoirs'
    | 'silos'
    | 'roller-conveyors';
}

const pageDataModules = import.meta.glob<{ pageData: EquipmentPageData }>('./*/data.ts');
const seoModules = import.meta.glob<{ seo: PageSeo }>('./*/seo.ts');
const catalogModules = import.meta.glob<{ catalog: IndustrialSection[] }>('./*/data-catalog.ts');
const galleryModules = import.meta.glob<{ gallery: readonly GalleryImage[] }>('./*/gallery.ts');

const pageTemplates = new Map<string, EquipmentPageDefinition['template']>([
  ['konveyery-po-vidam', 'industrial'],
  ['lentochnye-pitateli', 'industrial'],
  ['transporterdlyadrov', 'industrial'],
  ['konveyery-skrebkovye', 'industrial'],
  ['elevatory', 'industrial'],
  ['shneki-konveera', 'industrial'],
  ['shlyuzovyezatvory', 'industrial'],
  ['shlyuzovye-pitateli-shp', 'industrial'],
  ['shp-150', 'industrial'],
  ['shp-200', 'industrial'],
  ['shp-260', 'industrial'],
  ['shp-300', 'industrial'],
  ['shp-350', 'industrial'],
  ['shp-400', 'industrial'],
  ['shp-450', 'industrial'],
  ['shp-500', 'industrial'],
  ['shp-nestandartnyh-razmerov', 'industrial'],
  ['komplektuyushie-k-konvejeram', 'industrial'],
  ['ciklony', 'cyclones'],
  ['metallokonstruktsii-na-zakaz', 'custom-metal'],
  ['lentochnye-konvejery', 'industrial'],
  ['elektronoji-dlya-rezki-konveyernih-lent-tehnicheskih-plastin', 'electron-knives'],
  ['vintovye-konvejery', 'screw-conveyors'],
  ['vintovoy-konveyer-v-zhelobe', 'industrial'],
  ['vintovoy-konveyer-v-trube', 'industrial'],
  ['vintovoy-pitatel', 'industrial'],
  ['rezervuary', 'reservoirs'],
  ['silosy', 'silos'],
  ['rolgang', 'roller-conveyors'],
  ['barabany', 'industrial'],
  ['cepnye-konveyeri', 'industrial'],
  ['kovshi', 'industrial'],
  ['conveyors', 'industrial'],
  ['g-obraznye-lentochnye-konvejery', 'industrial'],
  ['gorizontalnyj-lentochnyj-konvejer', 'industrial'],
  ['gravitatcionnyj-konvejery', 'industrial'],
  ['konvejery-dlya-kartofelya', 'conveyor-application'],
  ['konvejery-dlya-markirovki', 'conveyor-application'],
  ['konvejery-dlya-meshkov', 'conveyor-application'],
  ['konvejery-dlya-othodov', 'conveyor-application'],
  ['konvejery-dlya-ovoshchey', 'conveyor-application'],
  ['konvejery-dlya-peska', 'conveyor-application'],
  ['konvejery-dlya-sklada', 'conveyor-application'],
  ['konvejery-dlya-sortirovki', 'conveyor-application'],
  ['konvejery-dlya-uglya', 'conveyor-application'],
  ['konvejery-dlya-zerna', 'conveyor-application'],
  ['konveyer-dlya-upakovki', 'conveyor-application'],
  ['konveyer-lentochnyy-zhelobchatyy', 'industrial'],
  ['modulnye-konvejery', 'industrial'],
  ['naklonnyj-lentochnyj-konvejer', 'industrial'],
  ['neprivodnye-rolikovye-konveyery', 'industrial'],
  ['plastinchatye-konvejery', 'industrial'],
  ['povorotnye-lentochnye-konvejery', 'industrial'],
  ['privodnye-rolikovye-konveyery', 'industrial'],
  ['razdvizhnoj-rolgang', 'industrial'],
  ['rgs-10', 'reservoir-model'],
  ['rgs-100', 'reservoir-model'],
  ['rgs-120', 'reservoir-model'],
  ['rgs-15', 'reservoir-model'],
  ['rgs-150', 'reservoir-model'],
  ['rgs-20', 'reservoir-model'],
  ['rgs-25', 'reservoir-model'],
  ['rgs-3', 'reservoir-model'],
  ['rgs-30', 'reservoir-model'],
  ['rgs-40', 'reservoir-model'],
  ['rgs-5', 'reservoir-model'],
  ['rgs-50', 'reservoir-model'],
  ['rgs-60', 'reservoir-model'],
  ['rgs-75', 'reservoir-model'],
  ['rolikikonveyernye', 'industrial'],
  ['rolikoopory', 'industrial'],
  ['sharikovye-stoly', 'industrial'],
  ['stroitelnye-konvejery', 'industrial'],
  ['z-obraznyj-lentochnyj-konvejer', 'industrial'],
  ...beltVariantDefinitions.map(({ slug }) => [slug, 'industrial'] as const),
]);

function requiredModuleLoader<T>(modules: Record<string, () => Promise<T>>, key: string) {
  const loader = modules[key];
  if (!loader) throw new Error(`Page module was not found: ${key}`);
  return loader;
}

export const equipmentRoutes = equipmentRouteGroups.flatMap(({ slugs }) => slugs);
const equipmentRouteBySlug = new Map(
  equipmentRouteGroups.flatMap((routes) => routes.slugs.map((slug) => [slug, routes] as const)),
);

export async function getEquipmentPage(slug: string): Promise<EquipmentPageDefinition | null> {
  const routes = equipmentRouteBySlug.get(slug);
  if (!routes) return null;

  const template = pageTemplates.get(routes.root);
  if (!template) throw new Error(`Page template was not found: ${routes.root}`);

  const dataKey = `./${routes.root}/data.ts`;
  const seoKey = `./${routes.root}/seo.ts`;
  const catalogLoader = catalogModules[`./${routes.root}/data-catalog.ts`];
  const galleryLoader = galleryModules[`./${routes.root}/gallery.ts`];
  const [dataModule, seoModule, catalogModule, galleryModule] = await Promise.all([
    requiredModuleLoader(pageDataModules, dataKey)(),
    requiredModuleLoader(seoModules, seoKey)(),
    catalogLoader?.(),
    galleryLoader?.(),
  ]);

  return {
    routes,
    data: dataModule.pageData,
    seo: seoModule.seo,
    catalog: catalogModule?.catalog,
    gallery: galleryModule?.gallery ?? [],
    template,
  };
}
