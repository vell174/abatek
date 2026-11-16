<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui';
import ScraperProductCard from '~/components/shared/card/ScraperProductCard.vue';
import type { GalleryImage, IndustrialSection } from '~/data/pages/_shared/types';
import { catalog } from '~/data/pages/rolgang/data-catalog';
import { pageData, rollerContent } from '~/data/pages/rolgang/data';

defineProps<{ gallery?: readonly GalleryImage[]; galleryTitle: string }>();

const isProjectRequestOpen = useState('project-request-open', () => false);
const selectedProduct = ref<IndustrialSection | null>(null);
const detailsOpen = ref(false);
const showDetails = (product: IndustrialSection) => {
  selectedProduct.value = product;
  detailsOpen.value = true;
};
</script>

<template>
  <div class="roller-page">
    <ProductIntroSection_02
      compact
      :title="rollerContent.introTitle"
      title-size="compact"
      :image="pageData.image"
      :image-alt="pageData.imageAlt"
      :label="rollerContent.labels.hero"
      :button-label="rollerContent.labels.calculate"
      label-icon="lucide:factory"
      @action="isProjectRequestOpen = true"
    >
      <template #breadcrumbs>
        <BreadcrumbsNavigation
          :items="[{ label: 'Главная', to: '/' }, { label: 'Каталог', to: '/#catalog' }, { label: 'Рольганги' }]"
        />
      </template>
      <p v-for="paragraph in rollerContent.intro" :key="paragraph">{{ paragraph }}</p>
      <template #caption>{{ rollerContent.heroCaption }}</template>
    </ProductIntroSection_02>
    <ProductFactsSection_03 :facts="rollerContent.facts" />
    <LazyProjectGallerySlider v-if="gallery?.length" :images="gallery" :title="galleryTitle" />

    <section class="content-section site-container roller-page__section roller-page__catalog">
      <header class="roller-page__section-header">
        <p class="roller-page__eyebrow">{{ rollerContent.labels.catalog }}</p>
        <h2 class="roller-page__heading">{{ rollerContent.headings.catalog }}</h2>
        <p class="roller-page__text roller-page__section-lead">{{ rollerContent.catalogLead }}</p>
      </header>
      <div class="roller-page__product-grid">
        <ScraperProductCard
          v-for="(product, index) in catalog"
          :key="product.title"
          :product="product"
          :index="index"
          compact
          details-button
          @action="isProjectRequestOpen = true"
          @details="showDetails(product)"
        />
      </div>
      <p class="roller-page__catalog-caption">{{ rollerContent.catalogCaption }}</p>
    </section>

    <section class="content-section site-container roller-page__section roller-page__overview">
      <div>
        <p class="roller-page__eyebrow">{{ rollerContent.labels.overview }}</p>
        <h2 class="roller-page__heading">{{ rollerContent.headings.overview }}</h2>
      </div>
      <div class="roller-page__prose">
        <p v-for="paragraph in rollerContent.overview" :key="paragraph" class="roller-page__text">{{ paragraph }}</p>
      </div>
    </section>

    <section class="roller-page__band">
      <div class="content-section site-container roller-page__section">
        <header class="roller-page__section-header">
          <p class="roller-page__eyebrow">{{ rollerContent.labels.driveTypes }}</p>
          <h2 class="roller-page__heading">{{ rollerContent.headings.driveTypes }}</h2>
        </header>
        <div class="roller-page__drive-grid">
          <article v-for="drive in rollerContent.driveTypes" :key="drive.title" class="roller-page__drive-card">
            <p class="roller-page__eyebrow">{{ drive.eyebrow }}</p>
            <h3 class="roller-page__card-title">{{ drive.title }}</h3>
            <p v-for="paragraph in drive.paragraphs" :key="paragraph" class="roller-page__text">{{ paragraph }}</p>
            <ul class="roller-page__point-list">
              <li v-for="point in drive.points" :key="point" class="roller-page__point">{{ point }}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="content-section site-container roller-page__section">
      <header class="roller-page__section-header">
        <p class="roller-page__eyebrow">{{ rollerContent.labels.cargo }}</p>
        <h2 class="roller-page__heading">{{ rollerContent.headings.cargo }}</h2>
      </header>
      <div class="roller-page__cargo-grid">
        <article v-for="cargo in rollerContent.cargoGroups" :key="cargo.title" class="roller-page__info-card">
          <h3 class="roller-page__card-title">{{ cargo.title }}</h3>
          <p class="roller-page__text">{{ cargo.text }}</p>
        </article>
      </div>
    </section>

    <section class="roller-page__band">
      <div class="content-section site-container roller-page__section">
        <header class="roller-page__section-header">
          <p class="roller-page__eyebrow">{{ rollerContent.labels.applications }}</p>
          <h2 class="roller-page__heading">{{ rollerContent.headings.applications }}</h2>
        </header>
        <div class="roller-page__application-grid">
          <article
            v-for="application in rollerContent.applications"
            :key="application.title"
            class="roller-page__info-card"
          >
            <h3 class="roller-page__card-title">{{ application.title }}</h3>
            <p class="roller-page__text">{{ application.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="roller-page__band">
      <div class="content-section site-container roller-page__section roller-page__selection">
        <div>
          <p class="roller-page__eyebrow">{{ rollerContent.labels.selection }}</p>
          <h2 class="roller-page__heading">{{ rollerContent.headings.selection }}</h2>
        </div>
        <ol class="roller-page__selection-list">
          <li v-for="item in rollerContent.selection" :key="item" class="roller-page__selection-item">{{ item }}</li>
        </ol>
      </div>
    </section>

    <section class="content-section site-container roller-page__section roller-page__price">
      <div>
        <p class="roller-page__eyebrow">{{ rollerContent.labels.price }}</p>
        <h2 class="roller-page__heading">{{ rollerContent.headings.price }}</h2>
      </div>
      <div class="roller-page__prose">
        <p v-for="paragraph in rollerContent.price" :key="paragraph" class="roller-page__text">{{ paragraph }}</p>
        <UiButton @click="isProjectRequestOpen = true">{{ rollerContent.labels.calculate }}</UiButton>
      </div>
    </section>

    <ManufacturingStagesSection_last_02
      :title="rollerContent.headings.workflow"
      :items="rollerContent.workflow"
      :note="rollerContent.workflowNote"
    />
    <FaqSection_last_01 :items="rollerContent.faq" :title="rollerContent.headings.faq" title-id="roller-faq-title" />

    <DialogRoot v-model:open="detailsOpen">
      <DialogPortal>
        <DialogOverlay class="roller-details__overlay" />
        <DialogContent v-if="selectedProduct" class="roller-details__dialog">
          <DialogTitle class="roller-details__title">{{ selectedProduct.title }}</DialogTitle>
          <DialogDescription class="roller-details__description">
            {{ selectedProduct.text?.join(' ') }}
          </DialogDescription>
          <div class="roller-details__body">
            <img
              v-if="selectedProduct.image"
              class="roller-details__image"
              :src="selectedProduct.image"
              :alt="selectedProduct.imageAlt || selectedProduct.title"
              width="720"
              height="480"
            />
            <div>
              <h3 class="roller-details__subtitle">{{ rollerContent.labels.features }}</h3>
              <ul class="roller-details__list">
                <li v-for="feature in selectedProduct.features" :key="feature.title" class="roller-details__item">
                  <strong class="roller-details__feature-title">{{ feature.title }}</strong>
                  <span class="roller-details__feature-text">{{ feature.text }}</span>
                </li>
              </ul>
            </div>
          </div>
          <UiButton
            class="roller-details__action"
            @click="
              detailsOpen = false;
              isProjectRequestOpen = true;
            "
          >
            {{ rollerContent.labels.calculate }}
          </UiButton>
          <DialogClose class="roller-details__close" aria-label="Закрыть описание модели">
            <Icon name="lucide:x" aria-hidden="true" mode="svg" />
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/styles/mixins' as *;

.roller-page {
  color: $ink;

  --content-section-space: 56px;
  --content-section-space-mobile: 40px;
  --product-facts-card-height: 112px;
  --product-facts-card-padding: 20px;
  --product-facts-card-height-mobile: 100px;
  --product-facts-card-padding-mobile: 16px;

  &__section {
    padding-block: clamp(40px, 4vw, 64px);
  }

  &__band {
    background: $soft;
  }

  &__overview,
  &__selection,
  &__price {
    display: grid;
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    gap: clamp(24px, 4vw, 56px);
  }

  &__eyebrow {
    margin: 0 0 12px;
    font-size: 11px;
    font-weight: 900;
    color: $blue;
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }

  &__heading {
    margin: 0;
    font-size: var(--section-heading-size);
    line-height: var(--section-heading-leading);
    letter-spacing: -0.04em;
  }

  &__section-header {
    max-width: 850px;
    margin-bottom: 24px;
  }

  &__section-lead {
    margin-top: 18px;
  }

  &__catalog-caption {
    margin: 20px 0 0;
    font-size: 13px;
    line-height: 1.5;
    color: $muted;
  }

  &__prose {
    display: grid;
    gap: 14px;
    align-content: start;
  }

  &__text {
    margin: 0;
    line-height: 1.7;
    color: $muted;
  }

  &__drive-grid,
  &__application-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  &__cargo-grid,
  &__product-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
  }

  &__drive-card,
  &__info-card {
    padding: clamp(18px, 2.5vw, 28px);
    background: #fff;
    border: 1px solid $line;
    border-radius: 16px;
  }

  &__drive-card {
    display: grid;
    gap: 12px;
    align-content: start;
    border-top: 4px solid $yellow;
  }

  &__info-card {
    border-top: 4px solid $blue;
  }

  &__card-title {
    margin: 0 0 10px;
    font-size: var(--card-heading-size);
    line-height: var(--card-heading-leading);
    color: $navy;
  }

  &__drive-card &__card-title {
    margin-bottom: 0;
  }

  &__point-list {
    display: grid;
    gap: 8px;
    padding-left: 20px;
    margin: 4px 0 0;
  }

  &__point {
    line-height: 1.5;
    color: $ink;
  }

  &__selection-list {
    display: grid;
    gap: 12px;
    padding-left: 24px;
    margin: 0;
  }

  &__selection-item {
    padding-left: 6px;
    line-height: 1.6;
    color: $ink;
  }
}

.roller-details {
  &__overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgba($navy, 0.72);
  }

  &__dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 101;
    width: min(900px, calc(100vw - 32px));
    max-height: calc(100vh - 32px);
    padding: 32px;
    overflow-y: auto;
    background: #fff;
    border-radius: 16px;
    transform: translate(-50%, -50%);
  }

  &__title {
    padding-right: 40px;
    margin: 0 0 12px;
    font-size: 28px;
    color: $navy;
  }

  &__description {
    margin: 0 0 24px;
    line-height: 1.6;
    color: $muted;
  }

  &__body {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: 24px;
  }

  &__image {
    width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 10px;
  }

  &__subtitle {
    margin: 0 0 14px;
    font-size: 18px;
    color: $navy;
  }

  &__list {
    display: grid;
    gap: 14px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__item {
    display: grid;
    gap: 4px;
    line-height: 1.5;
    color: $muted;
  }

  &__feature-title {
    color: $ink;
  }

  &__action {
    margin-top: 24px;
  }

  &__close {
    position: absolute;
    top: 18px;
    right: 18px;
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    color: $navy;
    cursor: pointer;
    background: $soft;
    border: 0;
    border-radius: 50%;
  }
}

@include phone {
  .roller-details {
    &__dialog {
      padding: 20px;
    }

    &__body {
      grid-template-columns: 1fr;
    }
  }
}

@include tablet {
  .roller-page {
    &__overview,
    &__selection,
    &__price {
      grid-template-columns: 1fr;
    }

    &__cargo-grid,
    &__product-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
}

@include phone {
  .roller-page {
    &__drive-grid,
    &__cargo-grid,
    &__application-grid,
    &__product-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
