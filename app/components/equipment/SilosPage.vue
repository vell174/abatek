<script setup lang="ts">
import { catalog } from '~/data/pages/silosy/data-catalog';
import { pageData } from '~/data/pages/silosy/data';

const isProjectRequestOpen = useState('project-request-open', () => false);
</script>

<template>
  <div class="silos-page">
    <ProductIntroSection_02
      :title="pageData.introTitle"
      :image="pageData.image"
      :image-alt="pageData.imageAlt"
      :button-label="pageData.ctaLabel"
      @action="isProjectRequestOpen = true"
    >
      <template #breadcrumbs>
        <BreadcrumbsNavigation :items="pageData.breadcrumbs" />
      </template>
      <p v-for="paragraph in pageData.intro" :key="paragraph">{{ paragraph }}</p>
    </ProductIntroSection_02>

    <ProductFactsSection_03 :facts="pageData.facts" />

    <section class="silos-page__types content-section site-container" aria-labelledby="silos-types-title">
      <div class="silos-page__heading">
        <p class="silos-page__eyebrow">{{ pageData.typesEyebrow }}</p>
        <h2 id="silos-types-title" class="silos-page__title">{{ pageData.typesTitle }}</h2>
        <p class="silos-page__lead">{{ pageData.typesDescription }}</p>
      </div>
      <div class="silos-page__grid">
        <article v-for="item in catalog" :key="item.title" class="silos-page__card">
          <span class="silos-page__volume">{{ item.shortTitle }}</span>
          <h3 class="silos-page__card-title">{{ item.title }}</h3>
          <p v-for="paragraph in item.text" :key="paragraph" class="silos-page__card-text">{{ paragraph }}</p>
          <ul v-if="item.items?.length" class="silos-page__card-list">
            <li v-for="feature in item.items" :key="feature" class="silos-page__card-feature">{{ feature }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="silos-page__selection" aria-labelledby="silos-selection-title">
      <div class="content-section site-container silos-page__selection-inner">
        <div>
          <p class="silos-page__eyebrow">{{ pageData.selectionEyebrow }}</p>
          <h2 id="silos-selection-title" class="silos-page__title">{{ pageData.selectionTitle }}</h2>
          <p class="silos-page__lead">{{ pageData.selectionDescription }}</p>
        </div>
        <ul class="silos-page__selection-list">
          <li v-for="item in pageData.selectionItems" :key="item" class="silos-page__selection-item">{{ item }}</li>
        </ul>
      </div>
    </section>

    <section class="silos-page__equipment content-section site-container" aria-labelledby="silos-equipment-title">
      <div>
        <p class="silos-page__eyebrow">{{ pageData.equipmentEyebrow }}</p>
        <h2 id="silos-equipment-title" class="silos-page__title">{{ pageData.equipmentTitle }}</h2>
        <p class="silos-page__lead">{{ pageData.equipmentDescription }}</p>
      </div>
      <div class="silos-page__equipment-groups">
        <article v-for="group in pageData.equipmentGroups" :key="group.title" class="silos-page__equipment-card">
          <h3 class="silos-page__equipment-heading">{{ group.title }}</h3>
          <ul class="silos-page__equipment-list">
            <li v-for="item in group.items" :key="item" class="silos-page__equipment-item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="silos-page__materials" aria-labelledby="silos-materials-title">
      <div class="content-section site-container silos-page__materials-inner">
        <div>
          <p class="silos-page__eyebrow">{{ pageData.materialsEyebrow }}</p>
          <h2 id="silos-materials-title" class="silos-page__title">{{ pageData.materialsTitle }}</h2>
        </div>
        <div class="silos-page__materials-copy">
          <p class="silos-page__lead">{{ pageData.materialsDescription }}</p>
          <p class="silos-page__lead">{{ pageData.materialsNote }}</p>
        </div>
      </div>
    </section>

    <SpecsTableSection
      :eyebrow="pageData.specs.eyebrow"
      :title="pageData.specs.title"
      :columns="pageData.specs.columns"
      :rows="pageData.specs.rows"
    />

    <ManufacturingStagesSection_last_02
      :title="pageData.workflow.title"
      :items="pageData.workflow.items"
      :note="pageData.workflow.note"
      :eyebrow="pageData.workflow.eyebrow"
    />

    <section class="silos-page__request" aria-labelledby="silos-request-title">
      <div class="content-section site-container silos-page__request-inner">
        <div>
          <h2 id="silos-request-title" class="silos-page__request-title">{{ pageData.priceTitle }}</h2>
          <p class="silos-page__request-text">{{ pageData.priceDescription }}</p>
        </div>
        <UiButton @click="isProjectRequestOpen = true">{{ pageData.ctaLabel }}</UiButton>
      </div>
    </section>

    <FaqSection_last_01 :items="pageData.faq" :title="pageData.faqTitle" title-id="silos-faq-title" />
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/styles/mixins' as *;

.silos-page {
  color: $ink;

  &__heading {
    max-width: 820px;
    margin-bottom: 36px;
  }

  &__eyebrow {
    margin: 0 0 12px;
    font-size: 11px;
    font-weight: 900;
    color: $blue;
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }

  &__title {
    margin: 0 0 20px;
    font-size: clamp(30px, 4vw, 52px);
    line-height: 1.08;
    letter-spacing: -0.04em;
  }

  &__lead {
    margin: 0;
    line-height: 1.7;
    color: $muted;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }

  &__card {
    padding: clamp(26px, 3vw, 38px);
    background: $soft;
    border: 1px solid $line;
    border-radius: 18px;
  }

  &__volume {
    display: inline-block;
    padding: 8px 12px;
    margin-bottom: 22px;
    font-size: 13px;
    font-weight: 800;
    color: $navy;
    background: $yellow;
    border-radius: 6px;
  }

  &__card-title {
    margin: 0 0 14px;
    font-size: clamp(22px, 2.3vw, 28px);
    line-height: 1.25;
  }

  &__card-text {
    margin: 0;
    line-height: 1.65;
    color: $muted;
  }

  &__card-list {
    display: grid;
    gap: 8px;
    padding-left: 20px;
    margin: 22px 0 0;
  }

  &__card-feature {
    line-height: 1.5;
  }

  &__selection {
    background: $soft;
  }

  &__selection-inner,
  &__equipment,
  &__materials-inner {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: clamp(32px, 6vw, 86px);
  }

  &__selection-list {
    display: grid;
    gap: 14px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__selection-item {
    padding: 20px 24px;
    line-height: 1.6;
    background: #fff;
    border: 1px solid $line;
    border-radius: 12px;
  }

  &__equipment-groups {
    display: grid;
    gap: 18px;
  }

  &__equipment-card {
    padding: 24px;
    background: $soft;
    border: 1px solid $line;
    border-radius: 12px;
  }

  &__equipment-heading {
    margin: 0 0 16px;
    font-size: 21px;
    line-height: 1.3;
  }

  &__equipment-list {
    display: grid;
    gap: 10px;
    padding-left: 20px;
    margin: 0;
  }

  &__equipment-item {
    line-height: 1.6;
  }

  &__materials {
    background: $soft;
  }

  &__materials-copy {
    display: grid;
    gap: 16px;
  }

  &__request {
    color: #fff;
    background: $navy;
  }

  &__request-inner {
    display: flex;
    gap: 32px;
    align-items: center;
    justify-content: space-between;
  }

  &__request-title {
    margin: 0 0 16px;
    font-size: clamp(28px, 3.5vw, 46px);
    line-height: 1.1;
  }

  &__request-text {
    max-width: 800px;
    margin: 0;
    line-height: 1.7;
  }
}

@include tablet {
  .silos-page {
    &__selection-inner,
    &__equipment,
    &__materials-inner {
      grid-template-columns: 1fr;
    }

    &__request-inner {
      flex-direction: column;
      align-items: flex-start;
    }
  }
}

@include phone {
  .silos-page {
    &__grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
