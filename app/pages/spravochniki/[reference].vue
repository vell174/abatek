<script setup lang="ts">
import { materialProperties } from '~/data/conveyor-reference-materials';
import {
  abrasivenessTables,
  parameterSeries,
  recommendedSpeeds,
  referenceInterface as ui,
  referenceNavigation,
  referencePages,
  rollerDiameterTable,
  rollerSpacingTable,
} from '~/data/conveyor-references';
import { toolNavigation } from '~/data/conveyor-tools';

definePageMeta({ key: (route) => route.fullPath });

const route = useRoute();
const page = referencePages[String(route.params.reference) as keyof typeof referencePages];
if (!page) throw createError({ statusCode: 404, statusMessage: ui.notFound });
usePageSeo(page.seo);

const query = ref('');
const selectedMaterial = ref('');
const filteredMaterials = computed(() => {
  const term = query.value.trim().toLocaleLowerCase('ru-RU');
  return term
    ? materialProperties.filter((material) => material.name.toLocaleLowerCase('ru-RU').includes(term))
    : materialProperties;
});
const material = computed(() => materialProperties.find((item) => item.name === selectedMaterial.value));
</script>

<template>
  <main class="reference-page">
    <section class="reference-page__hero">
      <div class="site-container">
        <BreadcrumbsNavigation :items="[{ label: ui.home, to: '/' }, { label: page.title }]" />
        <p class="reference-page__eyebrow">{{ ui.eyebrow }}</p>
        <h1 class="reference-page__title">{{ page.title }}</h1>
        <p class="reference-page__intro">{{ page.description }}</p>
      </div>
    </section>

    <nav class="reference-page__navigation site-container" :aria-label="ui.navigation">
      <NuxtLink
        v-for="item in referenceNavigation"
        :key="item.to"
        :to="item.to"
        class="reference-page__navigation-link"
        :class="{ 'reference-page__navigation-link--active': item.to === page.seo.canonicalPath }"
      >
        {{ item.label }}
      </NuxtLink>
    </nav>

    <template v-if="page.kind === 'parameters'">
      <section class="reference-page__series site-container">
        <p class="reference-page__note">{{ ui.parameterNote }}</p>
        <div v-for="series in parameterSeries" :key="series.title" class="reference-page__series-group">
          <h2>{{ series.title }}</h2>
          <ul class="reference-page__value-list">
            <li v-for="value in series.values" :key="value" class="reference-page__value">{{ value }}</li>
          </ul>
        </div>
      </section>
      <div id="recommended-speeds" class="reference-page__table-block">
        <SpecsTableSection
          :title="recommendedSpeeds.title"
          :eyebrow="recommendedSpeeds.eyebrow"
          :columns="[...recommendedSpeeds.columns]"
          :rows="recommendedSpeeds.rows.map((row) => [...row])"
          tone="soft"
        />
        <p class="site-container reference-page__table-note">{{ ui.speedNote }}</p>
      </div>
      <div class="reference-page__table-block">
        <SpecsTableSection
          :title="rollerDiameterTable.title"
          :eyebrow="rollerDiameterTable.eyebrow"
          :columns="[...rollerDiameterTable.columns]"
          :rows="rollerDiameterTable.rows.map((row) => [...row])"
        />
        <p class="site-container reference-page__table-note">{{ ui.rollerNote }}</p>
      </div>
      <div class="reference-page__table-block">
        <SpecsTableSection
          :title="rollerSpacingTable.title"
          :eyebrow="rollerSpacingTable.eyebrow"
          :columns="[...rollerSpacingTable.columns]"
          :rows="rollerSpacingTable.rows.map((row) => [...row])"
          tone="soft"
        />
        <p class="site-container reference-page__table-note">{{ rollerSpacingTable.note }}</p>
      </div>
    </template>

    <template v-else-if="page.kind === 'abrasiveness'">
      <p class="site-container reference-page__abrasiveness-intro">{{ ui.abrasivenessIntro }}</p>
      <div v-for="(table, index) in abrasivenessTables" :key="table.title" class="reference-page__table-block">
        <SpecsTableSection
          :title="table.title"
          :eyebrow="table.eyebrow"
          :columns="[...table.columns]"
          :rows="table.rows.map((row) => [...row])"
          :tone="index % 2 ? 'soft' : 'white'"
        />
      </div>
      <p class="site-container reference-page__table-note">{{ ui.abrasivenessNote }}</p>
    </template>

    <section v-else class="reference-page__material site-container">
      <div class="reference-page__material-form">
        <div class="reference-page__field">
          <label for="material-search">{{ ui.materialSearchLabel }}</label>
          <input id="material-search" v-model="query" type="search" :placeholder="ui.materialSearchPlaceholder" />
        </div>
        <div class="reference-page__field">
          <label for="material-select">{{ ui.materialSelectLabel }}</label>
          <select id="material-select" v-model="selectedMaterial">
            <option value="">{{ ui.materialPlaceholder }}</option>
            <option v-for="item in filteredMaterials" :key="item.name" :value="item.name">{{ item.name }}</option>
          </select>
          <p v-if="filteredMaterials.length === 0" class="reference-page__empty">{{ ui.materialEmpty }}</p>
        </div>
      </div>
      <div class="reference-page__material-result" aria-live="polite">
        <h2>{{ ui.materialResultTitle }}</h2>
        <p v-if="!material" class="reference-page__empty">{{ ui.materialPlaceholder }}</p>
        <dl v-else class="reference-page__properties">
          <div>
            <dt>{{ ui.materialDensity }}</dt>
            <dd>{{ material.density }} {{ ui.units.density }}</dd>
          </div>
          <div>
            <dt>{{ ui.materialRepose }}</dt>
            <dd>{{ material.reposeAngle }}{{ ui.units.angle }}</dd>
          </div>
          <div>
            <dt>{{ ui.materialIncline }}</dt>
            <dd>{{ material.maxIncline }}{{ ui.units.angle }}</dd>
          </div>
        </dl>
        <p class="reference-page__material-note">{{ ui.materialNote }}</p>
      </div>
    </section>

    <section class="reference-page__bottom">
      <div class="site-container reference-page__bottom-inner">
        <div>
          <p class="reference-page__bottom-kicker">{{ ui.source }}</p>
          <a :href="page.source" target="_blank" rel="noopener noreferrer">{{ page.source }} ↗</a>
        </div>
        <div>
          <p class="reference-page__bottom-kicker">{{ ui.relatedCalculators }}</p>
          <div class="reference-page__related">
            <NuxtLink v-for="item in toolNavigation" :key="item.to" :to="item.to">{{ item.label }}</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@use '~/assets/styles/mixins' as *;

.reference-page {
  color: $ink;
  background: #fff;

  &__hero {
    padding: 72px 0 67px;
    color: #fff;
    background: $navy;
  }

  &__eyebrow {
    margin: 46px 0 16px;
    font-size: 11px;
    font-weight: 800;
    color: $yellow;
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }

  &__title {
    max-width: 1000px;
    margin: 0;
    font-size: clamp(36px, 5vw, 68px);
    line-height: 1.04;
    letter-spacing: -0.045em;
  }

  &__intro {
    max-width: 750px;
    margin: 24px 0 0;
    font-size: 16px;
    line-height: 1.6;
    color: rgba(#fff, 0.78);
  }

  &__navigation {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding-block: 27px;
  }

  &__navigation-link {
    padding: 10px 14px;
    font-size: 12px;
    font-weight: 700;
    color: $blue;
    text-decoration: none;
    background: $soft;
    border: 1px solid $line;
    border-radius: 30px;

    &--active {
      color: $navy;
      background: $yellow;
      border-color: $yellow;
    }

    &:focus-visible {
      outline: 2px solid $blue;
      outline-offset: 2px;
    }
  }

  &__series {
    display: grid;
    gap: 34px;
    padding-block: 25px 75px;
  }

  &__note,
  &__table-note {
    font-size: 13px;
    line-height: 1.65;
    color: $muted;
  }

  &__abrasiveness-intro {
    padding-block: 25px 0;
    margin-block: 0;
    font-size: 14px;
    line-height: 1.65;
    color: $muted;
  }

  &__note {
    max-width: 950px;
    margin: 0;
  }

  &__series-group h2 {
    margin: 0 0 18px;
    font-size: clamp(22px, 2.5vw, 34px);
  }

  &__value-list {
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__value {
    padding: 9px 12px;
    font-size: 13px;
    font-weight: 700;
    background: $soft;
    border: 1px solid $line;
    border-radius: 6px;
  }

  &__table-block {
    scroll-margin-top: 20px;
  }

  &__table-note {
    padding-bottom: 45px;
    margin-block: -20px 0;
  }

  &__material {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(300px, 0.8fr);
    gap: 28px;
    align-items: start;
    padding-block: 30px 90px;
  }

  &__material-form,
  &__material-result {
    padding: 30px;
    border: 1px solid $line;
    border-radius: 16px;
  }

  &__material-form {
    display: grid;
    gap: 20px;
  }

  &__field label {
    display: block;
    margin-bottom: 8px;
    font-size: 13px;
    font-weight: 800;
  }

  &__field input,
  &__field select {
    width: 100%;
    min-height: 48px;
    padding: 10px 13px;
    font: inherit;
    font-size: 14px;
    color: $ink;
    background: #fff;
    border: 1px solid $line;
    border-radius: 8px;

    &:focus-visible {
      outline: 2px solid $blue;
      outline-offset: 2px;
    }
  }

  &__material-result {
    color: #fff;
    background: $navy;
    border-color: $navy;
  }

  &__material-result h2 {
    margin: 0 0 25px;
    font-size: 24px;
  }

  &__properties {
    padding: 0;
    margin: 0;
  }

  &__properties div {
    display: flex;
    gap: 16px;
    justify-content: space-between;
    padding: 16px 0;
    border-bottom: 1px solid rgba(#fff, 0.18);
  }

  &__properties dt {
    font-size: 12px;
    line-height: 1.4;
    color: rgba(#fff, 0.72);
  }

  &__properties dd {
    margin: 0;
    font-size: 13px;
    font-weight: 800;
    text-align: right;
  }

  &__empty {
    margin: 0;
    font-size: 13px;
    line-height: 1.5;
    color: $muted;
  }

  &__material-result &__empty {
    color: rgba(#fff, 0.72);
  }

  &__material-note {
    margin: 24px 0 0;
    font-size: 12px;
    line-height: 1.6;
    color: rgba(#fff, 0.72);
  }

  &__bottom {
    padding: 58px 0 65px;
    background: $soft;
  }

  &__bottom-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
  }

  &__bottom-kicker {
    margin: 0 0 14px;
    font-size: 11px;
    font-weight: 800;
    color: $blue;
    text-transform: uppercase;
    letter-spacing: 0.14em;
  }

  &__bottom a {
    font-size: 13px;
    font-weight: 700;
    line-height: 1.7;
    color: $blue;
    overflow-wrap: anywhere;
  }

  &__related {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 18px;
  }
}

@include tablet {
  .reference-page {
    &__material {
      grid-template-columns: 1fr;
    }
  }
}

@include phone {
  .reference-page {
    &__hero {
      padding: 45px 0 50px;
    }

    &__eyebrow {
      margin-top: 36px;
    }

    &__intro {
      font-size: 14px;
    }

    &__material-form,
    &__material-result {
      padding: 20px;
    }

    &__bottom-inner {
      grid-template-columns: 1fr;
      gap: 30px;
    }
  }
}
</style>
