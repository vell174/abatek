<script setup lang="ts">
import { pageData, pageLabels, diagrams, construction } from '~/data/pages/vintovye-konvejery/data';
import { catalog } from '~/data/pages/vintovye-konvejery/data-catalog';

const isProjectRequestOpen = useState('project-request-open', () => false);
const requestContext = useState('project-request-context', () => '');
const selectionItems = pageData.sections.map((section) => ({
  question: section.shortTitle ?? section.title,
  answerTitle: section.shortTitle ? section.title : undefined,
  answer: section.text ?? [],
}));
const openRequest = () => {
  requestContext.value = pageData.title;
  isProjectRequestOpen.value = true;
};
</script>

<template>
  <div class="screw-page">
    <ProductIntroSection_02
      :title="pageData.introTitle"
      :image="pageData.image"
      :image-alt="pageData.imageAlt ?? pageData.title"
      :variant="pageData.introVariant"
      :button-label="pageLabels.request"
      :eyebrow="pageLabels.production"
      @action="openRequest"
    >
      <template #breadcrumbs>
        <BreadcrumbsNavigation
          :items="[{ label: 'Главная', to: '/' }, { label: 'Каталог', to: '/#catalog' }, { label: pageData.title }]"
        />
      </template>
      <p v-for="paragraph in pageData.intro" :key="paragraph" class="screw-page__text">{{ paragraph }}</p>
    </ProductIntroSection_02>

    <section class="content-section site-container">
      <p class="screw-page__eyebrow">{{ pageLabels.catalog }}</p>
      <h2 class="screw-page__title">{{ pageData.galleryTitle }}</h2>
      <div class="screw-page__catalog">
        <ScraperProductCard
          v-for="(product, index) in catalog"
          :key="product.href"
          :product="product"
          :index="index"
          variant="category"
        />
      </div>
    </section>

    <SpecsTableSection
      v-if="pageData.table"
      :title="pageData.table.title"
      :columns="pageData.table.headers"
      :rows="pageData.table.rows"
      :eyebrow="pageLabels.selection"
      tone="soft"
    />

    <FaqSection_last_01
      :items="selectionItems"
      :title="pageLabels.selectionTitle"
      :eyebrow="pageLabels.selection"
      title-id="screw-selection-title"
      tone="white"
      layout="cards"
      preserve-content
    />

    <section class="content-section--soft">
      <div class="content-section site-container">
        <h2 class="screw-page__title">{{ pageLabels.schemes }}</h2>
        <div class="screw-page__diagrams">
          <figure
            v-for="(diagram, index) in diagrams"
            :key="diagram.src"
            class="screw-page__diagram"
            :class="[index >= 4 && 'screw-page__diagram--configuration']"
          >
            <img
              class="screw-page__diagram-image"
              :src="diagram.src"
              :alt="diagram.alt"
              :width="diagram.width"
              :height="diagram.height"
              loading="lazy"
              decoding="async"
            />
            <figcaption class="screw-page__caption">{{ diagram.alt }}</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section class="content-section site-container" aria-labelledby="screw-construction-title">
      <h2 id="screw-construction-title" class="screw-page__title">{{ construction.title }}</h2>
      <div class="screw-page__construction">
        <p class="screw-page__text">{{ construction.description }}</p>
        <img
          class="screw-page__construction-image"
          :src="construction.image.src"
          :alt="construction.image.alt"
          :width="construction.image.width"
          :height="construction.image.height"
          loading="lazy"
          decoding="async"
        />
        <ol class="screw-page__parts">
          <li v-for="part in construction.parts" :key="part.number" class="screw-page__part">
            <span class="screw-page__part-number" aria-hidden="true">{{ part.number }}</span>
            <div>
              <h3 class="screw-page__part-title">{{ part.title }}</h3>
              <p class="screw-page__part-text">{{ part.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <FaqSection_last_01
      v-if="pageData.faq"
      :items="pageData.faq"
      :title="pageLabels.faq"
      title-id="screw-faq-title"
      tone="soft"
    />
  </div>
</template>

<style scoped lang="scss">
.screw-page {
  color: $ink;

  &__title {
    margin: 0 0 32px;
    font-size: clamp(30px, 4vw, 48px);
    line-height: 1.15;
    letter-spacing: -0.035em;
  }

  &__eyebrow {
    margin: 0 0 12px;
    font-size: 11px;
    font-weight: 800;
    color: $blue;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  &__catalog {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  }

  &__text {
    margin: 0 0 16px;
    line-height: 1.75;
    color: $muted;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__diagrams {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 16px;
  }

  &__diagram {
    grid-column: span 3;
    padding: 16px;
    margin: 0;
    background: #fff;
    border: 1px solid $line;
    border-radius: 16px;

    &--configuration {
      grid-column: span 4;
    }
  }

  &__diagram-image {
    display: block;
    width: 100%;
    height: 170px;
    object-fit: contain;
  }

  &__caption {
    margin-top: 12px;
    font-size: 13px;
    font-weight: 600;
    line-height: 1.5;
    color: $muted;
  }

  &__construction {
    padding: clamp(20px, 3vw, 40px);
    border: 1px solid $line;
    border-radius: 16px;
  }

  &__construction-image {
    display: block;
    width: 100%;
    height: auto;
    margin: 24px 0;
  }

  &__parts {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px 32px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__part {
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }

  &__part-number {
    display: grid;
    flex: 0 0 30px;
    place-items: center;
    height: 30px;
    font-weight: 700;
    color: #fff;
    background: $blue;
    border-radius: 50%;
  }

  &__part-title {
    margin: 0 0 6px;
    font-size: 16px;
    line-height: 1.5;
  }

  &__part-text {
    margin: 0;
    font-size: 14px;
    line-height: 1.65;
    color: $muted;
  }
}

@media (max-width: $tablet) {
  .screw-page__catalog,
  .screw-page__diagrams {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .screw-page__diagram,
  .screw-page__diagram--configuration {
    grid-column: auto;
  }
}

@media (max-width: $phone) {
  .screw-page__catalog,
  .screw-page__parts,
  .screw-page__diagrams {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
