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
const kind = computed(() => {
  if (definition.value?.template === 'reservoir-model' || definition.value?.template === 'reservoirs')
    return 'Резервуарное оборудование';
  if (definition.value?.template === 'conveyor-application') return 'Конвейеры по назначению';
  if (/konvejer|konveyer|rolgang|transporter/.test(slug.value)) return 'Конвейерное оборудование';
  if (/shneki|komplektuyushie/.test(slug.value)) return 'Комплектующие';
  return 'Промышленное оборудование';
});
const isElectronKnivesPage = computed(() => definition.value?.template === 'electron-knives');
const isScrewConveyorsPage = computed(() => definition.value?.template === 'screw-conveyors');
const isReservoirsPage = computed(() => definition.value?.template === 'reservoirs');
const isSilosPage = computed(() => definition.value?.template === 'silos');
const isRollerConveyorsPage = computed(() => definition.value?.template === 'roller-conveyors');
const isCyclonesPage = computed(() => definition.value?.template === 'cyclones');

usePageSeo(definition.value.seo);
</script>

<template>
  <div>
    <PageHeroSection_01 :eyebrow="kind" :title="h1" :text="description" />
    <LazyElectronKnivesPage v-if="isElectronKnivesPage" />
    <LazyScrewConveyorsPage v-else-if="isScrewConveyorsPage" />
    <LazyReservoirsPage v-else-if="isReservoirsPage" />
    <LazySilosPage v-else-if="isSilosPage" />
    <LazyRollerConveyorsPage v-else-if="isRollerConveyorsPage" />
    <LazyCyclonesPage v-else-if="isCyclonesPage" />
    <LazyConveyorApplicationPage v-else-if="applicationPage" :page="applicationPage" />
    <LazyReservoirModelPage v-else-if="reservoirModelPage" :page="reservoirModelPage" />
    <LazyIndustrialEquipmentPage v-else-if="industrialPage" :page="industrialPage" :catalog="definition?.catalog" />
    <LazyProjectGallerySlider
      v-if="definition?.gallery?.length"
      :key="slug"
      :images="definition.gallery"
      :title="`Выполненные проекты: ${title}`"
    />
  </div>
</template>
