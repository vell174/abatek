<script setup lang="ts">
import { computed } from 'vue';
import { getEquipmentPage } from '~/data/pages';
import type { IndustrialPage } from '~/data/pages/_shared/types';

const route = useRoute();
const slug = computed(() => decodeURIComponent(String(route.params.slug)));
const asyncDataKey = computed(() => `equipment-page:${slug.value}`);
const { data: definition } = await useAsyncData(asyncDataKey, () => getEquipmentPage(slug.value));

if (!definition.value) {
  throw createError({ statusCode: 404, statusMessage: 'Страница не найдена' });
}

const industrialPage = computed(() =>
  definition.value?.template === 'industrial' ? (definition.value.data as IndustrialPage) : undefined,
);
const applicationPage = computed(() =>
  definition.value?.template === 'conveyor-application' ? (definition.value.data as IndustrialPage) : undefined,
);
const reservoirModelPage = computed(() =>
  definition.value?.template === 'reservoir-model' ? (definition.value.data as IndustrialPage) : undefined,
);
const title = computed(
  () => definition.value?.data?.title ?? definition.value?.seo.title ?? 'Промышленное оборудование АБАТЭК',
);
const h1 = computed(() => title.value);
const description = computed(() => definition.value?.data?.description ?? definition.value?.seo.description ?? '');
const heroAccents = computed(() => definition.value?.data?.heroAccents ?? []);
const heroTitleVariant = computed(() => industrialPage.value?.heroTitleVariant);
const heroImageAlt = computed(() => industrialPage.value?.heroImageAlt);
const heroActionLabel = computed(() => industrialPage.value?.heroActionLabel);
const heroImage = computed(() => {
  if (definition.value?.template === 'reservoirs') return definition.value.data.heroImage;
  if (['electron-knives', 'screw-conveyors'].includes(definition.value?.template ?? ''))
    return definition.value?.data?.image;
  if (definition.value?.template === 'custom-metal') return (definition.value.data as IndustrialPage).heroImage;
  if (definition.value?.template === 'silos') return definition.value.data.heroImage;
  if (definition.value?.template === 'roller-conveyors') return definition.value.data.heroImage;
  if (definition.value?.template === 'reservoir-model') return reservoirModelPage.value?.heroImage;
  return industrialPage.value?.heroImage;
});
const kind = computed(() => {
  if (definition.value?.template === 'reservoir-model' || definition.value?.template === 'reservoirs')
    return 'Резервуарное оборудование';
  if (definition.value?.template === 'conveyor-application') return 'Конвейеры по назначению';
  if (definition.value?.template === 'custom-metal') return 'Изготовление на заказ';
  if (/konvejer|konveyer|rolgang|transporter/.test(slug.value)) return 'Конвейерное оборудование';
  if (/shneki|vitki-shneka|komplektuyushie/.test(slug.value)) return 'Комплектующие';
  return 'Промышленное оборудование';
});
const isElectronKnivesPage = computed(() => definition.value?.template === 'electron-knives');
const isScrewConveyorsPage = computed(() => definition.value?.template === 'screw-conveyors');
const isReservoirsPage = computed(() => definition.value?.template === 'reservoirs');
const isSilosPage = computed(() => definition.value?.template === 'silos');
const isRollerConveyorsPage = computed(() => definition.value?.template === 'roller-conveyors');
const isCyclonesPage = computed(() => definition.value?.template === 'cyclones');
const isProjectRequestOpen = useState('project-request-open', () => false);
const requestContext = useState('project-request-context', () => '');
const openHeroRequest = () => {
  requestContext.value = industrialPage.value?.heroRequestContext ?? '';
  isProjectRequestOpen.value = true;
};

usePageSeo(definition.value.seo);
</script>

<template>
  <div>
    <PageHeroSection_01
      :eyebrow="kind"
      :title="h1"
      :text="description"
      :accent-texts="heroAccents"
      :title-variant="heroTitleVariant"
      :compact="industrialPage?.heroCompact"
      :background-image="heroImage"
      :background-image-alt="heroImageAlt"
      :background-image-width="definition?.seo.image?.width"
      :background-image-height="definition?.seo.image?.height"
      :action-label="heroActionLabel"
      :background-variant="
        definition?.data?.heroBackgroundVariant ??
        (['custom-metal', 'screw-conveyors'].includes(definition?.template ?? '') ? 'drawing' : 'default')
      "
      @action="openHeroRequest"
    />
    <LazyElectronKnivesPage v-if="isElectronKnivesPage" />
    <LazyScrewConveyorsPage v-else-if="isScrewConveyorsPage" />
    <LazyReservoirsPage v-else-if="isReservoirsPage" :gallery="definition?.gallery" />
    <LazySilosPage v-else-if="isSilosPage" />
    <LazyRollerConveyorsPage
      v-else-if="isRollerConveyorsPage"
      :gallery="definition?.gallery"
      :gallery-title="`Выполненные проекты: ${title}`"
    />
    <LazyCyclonesPage v-else-if="isCyclonesPage" />
    <LazyCustomMetalProductsPage v-else-if="definition?.template === 'custom-metal'" />
    <LazyConveyorApplicationPage v-else-if="applicationPage" :page="applicationPage" />
    <LazyReservoirModelPage v-else-if="reservoirModelPage" :page="reservoirModelPage" />
    <LazyIndustrialEquipmentPage
      v-else-if="industrialPage"
      :page="industrialPage"
      :catalog="definition?.catalog"
      :gallery="definition?.gallery"
    />
    <LazyProjectGallerySlider
      v-if="
        !industrialPage &&
        definition?.template !== 'custom-metal' &&
        definition?.template !== 'roller-conveyors' &&
        definition?.template !== 'reservoirs' &&
        definition?.template !== 'reservoir-model' &&
        definition?.gallery?.length
      "
      :key="slug"
      :images="definition.gallery"
      :title="`Выполненные проекты: ${title}`"
    />
  </div>
</template>
