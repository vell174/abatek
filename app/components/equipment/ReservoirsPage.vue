<script setup lang="ts">
import { rgsDimensionsTable } from '~/data/pages/_shared/create-rgs-page';
import { catalog } from '~/data/pages/rezervuary/data-catalog';
import { pageData, reservoirContent, reservoirProjectsLink } from '~/data/pages/rezervuary/data';
import type { GalleryImage } from '~/data/pages/_shared/types';

const { gallery = [] } = defineProps<{ gallery?: readonly GalleryImage[] }>();

const isProjectRequestOpen = useState('project-request-open', () => false);
</script>

<template>
  <div class="reservoir-page">
    <ProductIntroSection_02
      :title="reservoirContent.introTitle"
      :image="pageData.image"
      :image-alt="reservoirContent.introImageAlt"
      :image-width-px="718"
      :image-height-px="771"
      image-height="tall"
      :label="reservoirContent.introLabel"
      label-icon="lucide:factory"
      :button-label="reservoirContent.requestLabel"
      @action="isProjectRequestOpen = true"
    >
      <template #breadcrumbs>
        <BreadcrumbsNavigation :items="[...reservoirContent.breadcrumbs, { label: pageData.title }]" />
      </template>
      <p v-for="paragraph in reservoirContent.intro" :key="paragraph">{{ paragraph }}</p>
    </ProductIntroSection_02>

    <ProductFactsSection_03 :facts="catalog" />

    <section class="reservoir-page__section reservoir-page__section--soft">
      <div class="content-section site-container">
        <header class="reservoir-page__heading">
          <p class="reservoir-page__eyebrow">{{ reservoirContent.modelsEyebrow }}</p>
          <h2 class="reservoir-page__title">{{ reservoirContent.modelsTitle }}</h2>
          <p class="reservoir-page__lead">{{ reservoirContent.modelsIntro }}</p>
        </header>
        <nav class="reservoir-page__models" :aria-label="reservoirContent.modelsAriaLabel">
          <NuxtLink
            v-for="model in reservoirContent.models"
            :key="model.href"
            class="reservoir-page__model-link"
            :to="model.href"
          >
            {{ model.label }}
          </NuxtLink>
        </nav>
        <p class="reservoir-page__note">{{ reservoirContent.dimensionsNote }}</p>
      </div>
    </section>

    <SpecsTableSection
      :title="reservoirContent.dimensionsTitle"
      :columns="rgsDimensionsTable.headers"
      :rows="rgsDimensionsTable.rows"
      :eyebrow="reservoirContent.dimensionsEyebrow"
    />

    <ProjectGallerySlider
      v-if="gallery.length"
      :id="reservoirProjectsLink.id"
      :images="gallery"
      :title="reservoirProjectsLink.title"
    />

    <section class="reservoir-page__section">
      <div class="content-section site-container">
        <header class="reservoir-page__heading">
          <p class="reservoir-page__eyebrow">{{ reservoirContent.applicationsEyebrow }}</p>
          <h2 class="reservoir-page__title">{{ reservoirContent.applicationsTitle }}</h2>
          <p class="reservoir-page__lead">{{ reservoirContent.applicationsIntro }}</p>
        </header>
        <div class="reservoir-page__grid">
          <article v-for="item in reservoirContent.applications" :key="item.title" class="reservoir-page__card">
            <h3 class="reservoir-page__card-title">{{ item.title }}</h3>
            <p class="reservoir-page__card-text">{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="reservoir-page__section reservoir-page__section--soft">
      <div class="content-section site-container">
        <div class="reservoir-page__split">
          <div class="reservoir-page__installation-copy">
            <header class="reservoir-page__heading reservoir-page__heading--installation">
              <p class="reservoir-page__eyebrow">{{ reservoirContent.installationEyebrow }}</p>
              <h2 class="reservoir-page__title">{{ reservoirContent.installationTitle }}</h2>
              <p class="reservoir-page__lead">{{ reservoirContent.installationIntro }}</p>
            </header>
            <div class="reservoir-page__stack">
              <article v-for="item in reservoirContent.installations" :key="item.title" class="reservoir-page__card">
                <h3 class="reservoir-page__card-title">{{ item.title }}</h3>
                <p class="reservoir-page__card-text">{{ item.text }}</p>
              </article>
            </div>
          </div>
          <div class="reservoir-page__diagram-list">
            <figure
              v-for="item in reservoirContent.installations"
              :key="item.diagramLabel"
              class="reservoir-page__diagram"
            >
              <svg class="reservoir-page__diagram-art" viewBox="0 0 440 160" aria-hidden="true" focusable="false">
                <template v-if="item.diagramVariant === 'surface'">
                  <path class="reservoir-page__diagram-ground" d="M20 134h400" />
                  <path class="reservoir-page__diagram-support" d="M125 103h42l10 31h-62z" />
                  <path class="reservoir-page__diagram-support" d="M273 103h42l10 31h-62z" />
                  <rect class="reservoir-page__diagram-tank" x="76" y="44" width="288" height="64" rx="32" />
                  <path class="reservoir-page__diagram-seam" d="M112 50v52m216-52v52" />
                  <rect class="reservoir-page__diagram-neck" x="211" y="27" width="38" height="18" rx="4" />
                  <path class="reservoir-page__diagram-neck-line" d="M206 27h48" />
                </template>
                <template v-else>
                  <rect class="reservoir-page__diagram-soil" x="20" y="46" width="400" height="100" rx="8" />
                  <path class="reservoir-page__diagram-ground" d="M20 46h400" />
                  <rect class="reservoir-page__diagram-tank" x="76" y="75" width="288" height="62" rx="31" />
                  <path class="reservoir-page__diagram-seam" d="M112 80v52m216-52v52" />
                  <rect class="reservoir-page__diagram-neck" x="211" y="43" width="38" height="35" rx="4" />
                  <path class="reservoir-page__diagram-neck-line" d="M205 43h50" />
                </template>
              </svg>
              <figcaption class="reservoir-page__diagram-caption">
                <strong class="reservoir-page__diagram-label">{{ item.diagramLabel }}</strong>
                <span class="reservoir-page__diagram-description">{{ item.diagramDescription }}</span>
              </figcaption>
            </figure>
            <p class="reservoir-page__diagram-note">{{ reservoirContent.installationDiagramNote }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="reservoir-page__section">
      <div class="content-section site-container">
        <header class="reservoir-page__heading">
          <p class="reservoir-page__eyebrow">{{ reservoirContent.variantsEyebrow }}</p>
          <h2 class="reservoir-page__title">{{ reservoirContent.variantsTitle }}</h2>
          <p class="reservoir-page__lead">{{ reservoirContent.variantsIntro }}</p>
        </header>
        <div class="reservoir-page__grid">
          <article v-for="item in reservoirContent.variants" :key="item.title" class="reservoir-page__card">
            <h3 class="reservoir-page__card-title">{{ item.title }}</h3>
            <p class="reservoir-page__card-text">{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="reservoir-page__section reservoir-page__section--soft">
      <div class="content-section site-container reservoir-page__split">
        <div>
          <p class="reservoir-page__eyebrow">{{ reservoirContent.projectEyebrow }}</p>
          <h2 class="reservoir-page__title">{{ reservoirContent.projectTitle }}</h2>
          <p class="reservoir-page__lead">{{ reservoirContent.projectIntro }}</p>
          <ul class="reservoir-page__input-list">
            <li v-for="item in reservoirContent.projectInputs" :key="item" class="reservoir-page__input-item">
              {{ item }}
            </li>
          </ul>
        </div>
        <figure class="reservoir-page__figure">
          <img
            class="reservoir-page__figure-image"
            :src="reservoirContent.projectImage"
            :alt="reservoirContent.projectImageAlt"
            width="955"
            height="675"
            loading="lazy"
            decoding="async"
          />
          <figcaption class="reservoir-page__figure-caption">{{ reservoirContent.projectImageCaption }}</figcaption>
        </figure>
      </div>
    </section>

    <ManufacturingStagesSection_last_02
      :title="reservoirContent.workflowTitle"
      :items="reservoirContent.workflowItems"
      :eyebrow="reservoirContent.workflowEyebrow"
      :note="reservoirContent.workflowNote"
    />

    <FaqSection_last_01 :items="reservoirContent.faq" :title="reservoirContent.faqTitle" tone="white" />

    <section class="reservoir-page__related">
      <div class="site-container reservoir-page__related-inner">
        <div>
          <h2 class="reservoir-page__related-title">{{ reservoirContent.relatedTitle }}</h2>
          <p class="reservoir-page__related-text">{{ reservoirContent.relatedText }}</p>
        </div>
        <NuxtLink class="reservoir-page__related-link" :to="reservoirContent.relatedLink.href">
          {{ reservoirContent.relatedLink.label }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.reservoir-page {
  color: $ink;

  &__section--soft {
    background: $soft;
  }

  &__heading {
    max-width: 900px;
    margin-bottom: 32px;
  }

  &__heading--installation {
    margin-bottom: 24px;
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
    margin: 0;
    font-size: clamp(30px, 4vw, 54px);
    line-height: 1.07;
    letter-spacing: -0.045em;
  }

  &__lead,
  &__note {
    max-width: 850px;
    margin: 20px 0 0;
    line-height: 1.7;
    color: $muted;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }

  &__card {
    padding: 30px;
    background: #fff;
    border: 1px solid $line;
    border-radius: 18px;
  }

  &__card-title {
    margin: 0 0 12px;
    font-size: 23px;
    line-height: 1.2;
  }

  &__card-text {
    margin: 0;
    line-height: 1.7;
    color: $muted;
  }

  &__split {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: clamp(32px, 6vw, 80px);
    align-items: start;
  }

  &__installation-copy {
    min-width: 0;
  }

  &__stack {
    display: grid;
    gap: 18px;
  }

  &__figure {
    margin: 0;
  }

  &__figure-image {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid $line;
    border-radius: 16px;
  }

  &__figure-caption {
    margin-top: 10px;
    font-size: 12px;
    line-height: 1.5;
    color: $muted;
  }

  &__diagram-list {
    display: grid;
    gap: 14px;
  }

  &__diagram {
    padding: 12px;
    margin: 0;
    background: #fff;
    border: 1px solid $line;
    border-radius: 16px;
  }

  &__diagram-art {
    display: block;
    width: 100%;
    height: auto;
  }

  &__diagram-soil {
    fill: rgba($blue, 0.08);
  }

  &__diagram-ground {
    fill: none;
    stroke: $muted;
    stroke-width: 3;
    stroke-linecap: round;
  }

  &__diagram-tank {
    fill: rgba($blue, 0.16);
    stroke: $navy;
    stroke-width: 3;
  }

  &__diagram-support,
  &__diagram-neck {
    fill: rgba($blue, 0.28);
    stroke: $navy;
    stroke-width: 3;
  }

  &__diagram-seam {
    fill: none;
    stroke: $blue;
    stroke-width: 2;
  }

  &__diagram-neck-line {
    fill: none;
    stroke: $navy;
    stroke-width: 3;
    stroke-linecap: round;
  }

  &__diagram-caption {
    display: grid;
    gap: 4px;
    padding: 0 8px 4px;
  }

  &__diagram-label {
    color: $navy;
  }

  &__diagram-description,
  &__diagram-note {
    font-size: 13px;
    line-height: 1.5;
    color: $muted;
  }

  &__diagram-note {
    margin: 2px 4px 0;
  }

  &__models {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 10px;
  }

  &__model-link {
    padding: 14px 10px;
    font-size: 14px;
    font-weight: 800;
    color: $blue;
    text-align: center;
    text-decoration: none;
    background: #fff;
    border: 1px solid $line;
    border-radius: 10px;
    transition: border-color 0.2s ease;

    &:hover,
    &:focus-visible {
      border-color: $blue;
    }

    &:focus-visible {
      outline: 3px solid $yellow;
      outline-offset: 2px;
    }
  }

  &__input-list {
    display: grid;
    gap: 12px;
    padding-left: 22px;
    margin: 24px 0 0;
  }

  &__input-item {
    line-height: 1.6;
    color: $muted;
  }

  &__related {
    padding-block: 36px;
    background: $navy;
  }

  &__related-inner {
    display: flex;
    gap: 24px;
    align-items: center;
    justify-content: space-between;
  }

  &__related-title {
    margin: 0 0 8px;
    font-size: 24px;
    color: #fff;
  }

  &__related-text {
    margin: 0;
    line-height: 1.6;
    color: #fff;
  }

  &__related-link {
    flex: 0 0 auto;
    padding: 14px 18px;
    font-weight: 800;
    color: $navy;
    text-decoration: none;
    background: $yellow;
    border-radius: 8px;

    &:focus-visible {
      outline: 3px solid #fff;
      outline-offset: 3px;
    }
  }
}

@media (width <= $tablet) {
  .reservoir-page {
    &__models {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    &__split {
      grid-template-columns: 1fr;
    }
  }
}

@media (width <= $phone) {
  .reservoir-page {
    &__grid,
    &__models {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    &__card {
      padding: 22px;
    }

    &__related-inner {
      flex-direction: column;
      align-items: start;
    }
  }
}
</style>
