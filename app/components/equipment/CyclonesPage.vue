<script setup lang="ts">
import ScraperProductCard from '~/components/shared/card/ScraperProductCard.vue';
import { catalog } from '~/data/pages/ciklony/data-catalog';
import { pageData } from '~/data/pages/ciklony/data';
import type { GalleryImage } from '~/data/pages/_shared/types';

const { gallery = [] } = defineProps<{ gallery?: readonly GalleryImage[] }>();

const isProjectRequestOpen = useState('project-request-open', () => false);
</script>

<template>
  <div class="cyclones-page">
    <ProductIntroSection_02
      variant="text-only"
      :title="pageData.introTitle"
      title-size="compact"
      :image="pageData.image"
      :image-alt="pageData.imageAlt"
      :image-width-px="720"
      :image-height-px="480"
      image-fit="contain"
      :eyebrow="pageData.heroEyebrow"
      :button-label="pageData.heroButton"
      :label="pageData.heroLabel"
      label-icon="lucide:wind"
      @action="isProjectRequestOpen = true"
    >
      <template #breadcrumbs>
        <BreadcrumbsNavigation
          :items="[
            { label: 'Главная', to: '/' },
            { label: 'Каталог', to: '/#catalog' },
            { label: 'Циклоны для систем аспирации' },
          ]"
        />
      </template>
      <p v-for="paragraph in pageData.intro" :key="paragraph">{{ paragraph }}</p>
    </ProductIntroSection_02>

    <ProjectGallerySlider v-if="gallery.length" :images="gallery" title="Выполненные проекты: циклоны" />

    <section class="cyclones-page__application">
      <div class="content-section site-container cyclones-page__application-grid">
        <div>
          <p class="cyclones-page__eyebrow">{{ pageData.applicationEyebrow }}</p>
          <h2>{{ pageData.applicationTitle }}</h2>
          <p>{{ pageData.applicationDescription }}</p>
        </div>
        <ul>
          <li v-for="industry in pageData.industries" :key="industry">
            <Icon name="lucide:check" aria-hidden="true" mode="svg" />
            <span>{{ industry }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="cyclones-page__catalog">
      <div class="content-section site-container">
        <header class="cyclones-page__heading">
          <div>
            <p class="cyclones-page__eyebrow">{{ pageData.catalogEyebrow }}</p>
            <h2>{{ pageData.catalogTitle }}</h2>
          </div>
          <p>{{ pageData.catalogDescription }}</p>
        </header>
        <div class="cyclones-page__products">
          <ScraperProductCard
            v-for="(product, index) in catalog"
            :key="product.title"
            :product="product"
            :index="index"
            @action="isProjectRequestOpen = true"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.cyclones-page {
  --page-deep: #{$navy};

  &__eyebrow {
    margin: 0 0 12px;
    font-size: 11px;
    font-weight: 900;
    color: $blue;
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }

  &__application {
    background: $soft;
  }

  &__application-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(360px, 0.8fr);
    gap: clamp(44px, 8vw, 110px);
    align-items: start;

    h2 {
      max-width: 760px;
      margin: 0;
      font-size: var(--section-heading-size);
      line-height: var(--section-heading-leading);
      color: $navy;
      letter-spacing: -0.05em;
    }

    > div > p:last-child {
      max-width: 760px;
      margin: 24px 0 0;
      font-size: 17px;
      line-height: 1.75;
      color: $muted;
    }

    ul {
      display: grid;
      gap: 10px;
      padding: 0;
      margin: 0;
      list-style: none;
    }

    li {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      gap: 13px;
      align-items: center;
      min-height: 62px;
      padding: 14px 18px;
      font-weight: 750;
      line-height: 1.4;
      color: $navy;
      background: #fff;
      border: 1px solid $line;
      border-radius: 10px;
    }

    /* Icon renders an SVG inside the component; scope the visual marker to this list. */
    :deep(svg) {
      width: 21px;
      height: 21px;
      padding: 4px;
      color: $navy;
      background: $yellow;
      border-radius: 50%;
    }
  }

  &__catalog {
    background: #fff;
  }

  &__heading {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
    gap: clamp(36px, 7vw, 90px);
    align-items: end;
    margin-bottom: 28px;

    h2 {
      max-width: 820px;
      margin: 0;
      font-size: var(--section-heading-size);
      line-height: var(--section-heading-leading);
      color: $navy;
      letter-spacing: -0.05em;
    }

    > p {
      padding-left: 24px;
      margin: 0;
      line-height: 1.7;
      color: $muted;
      border-left: 4px solid $yellow;
    }
  }

  &__products {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
  }
}

@media (width <= $tablet) {
  .cyclones-page {
    &__application-grid,
    &__heading {
      grid-template-columns: 1fr;
    }

    &__products {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
}

@media (width <= $phone) {
  .cyclones-page__products {
    grid-template-columns: 1fr;
  }
}
</style>
