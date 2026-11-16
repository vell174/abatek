<script setup lang="ts">
import type { GalleryImage, IndustrialPage } from '~/data/pages/_shared/types';

defineProps<{ page: IndustrialPage; gallery?: readonly GalleryImage[] }>();

const isProjectRequestOpen = useState('project-request-open', () => false);
</script>

<template>
  <div class="application-page">
    <ProductIntroSection_02
      compact
      :title="page.introTitle"
      :title-size="page.introTitleSize"
      :image="page.image"
      :image-alt="page.title"
      :variant="page.relatedLinksTitle === 'Другие варианты ленточных конвейеров' ? 'text-only' : 'default'"
      eyebrow="Решение для технологической линии"
      button-label="Рассчитать конвейер"
      label="Производство по техническому заданию"
      label-icon="lucide:settings"
      @action="isProjectRequestOpen = true"
    >
      <template #breadcrumbs>
        <BreadcrumbsNavigation
          :items="[
            { label: 'Главная', to: '/' },
            { label: 'Конвейеры', to: '/conveyors/' },
            { label: page.introTitle },
          ]"
        />
      </template>
      <p v-for="paragraph in page.intro" :key="paragraph">{{ paragraph }}</p>
    </ProductIntroSection_02>

    <LazyProjectGallerySlider
      v-if="gallery?.length && !page.hideProjects"
      :images="gallery"
      :title="page.projectsTitle ?? `Выполненные проекты: ${page.title}`"
    />

    <ProductFactsSection_03 v-if="page.facts.length" :facts="page.facts" />

    <section v-if="page.sections.length" class="application-page__solutions">
      <div class="content-section site-container">
        <header class="application-page__heading">
          <div>
            <p>Применение и подбор</p>
            <h2>Особенности применения и выбор конвейера</h2>
          </div>
          <span>{{ page.description }}</span>
        </header>

        <div class="application-page__list">
          <article
            v-for="(section, index) in page.sections"
            :key="section.title"
            class="application-page__section"
            :class="{
              'application-page__section--media': section.image,
              'application-page__section--reverse': section.image && index % 2 === 1,
            }"
          >
            <figure v-if="section.image">
              <img
                :src="section.image"
                :alt="section.imageAlt || section.title"
                loading="lazy"
                width="1200"
                height="800"
              />
            </figure>
            <div class="application-page__copy">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              <h3>{{ section.title }}</h3>
              <p v-for="paragraph in section.text" :key="paragraph">{{ paragraph }}</p>
              <ul v-if="section.items">
                <li v-for="item in section.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>

    <RelatedProductLinks
      v-if="page.relatedLinks?.length && page.relatedLinksTitle"
      :title="page.relatedLinksTitle"
      :links="page.relatedLinks"
    />

    <FaqSection_last_01
      v-if="page.faq?.length"
      :items="page.faq"
      :title="`Частые вопросы: ${page.title.toLowerCase()}`"
      tone="soft"
    />

    <SpecsTableSection
      v-if="page.table"
      :title="page.table.title"
      :columns="page.table.headers"
      :rows="page.table.rows"
      eyebrow="Расчёт производительности"
      tone="soft"
    />
  </div>
</template>

<style scoped lang="scss">
.application-page {
  --page-deep: #052f55;
  --content-section-space: 56px;
  --content-section-space-mobile: 40px;
}

.application-page__solutions {
  background: #fff;
}

.application-page__heading {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr);
  gap: clamp(24px, 4vw, 56px);
  align-items: end;
  margin-bottom: 28px;
}

.application-page__heading p {
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 900;
  color: #0757a4;
  text-transform: uppercase;
  letter-spacing: 0.16em;
}

.application-page__heading h2 {
  max-width: 850px;
  margin: 0;
  font-size: var(--section-heading-size);
  line-height: var(--section-heading-leading);
  color: #052f55;
  letter-spacing: -0.05em;
}

.application-page__heading > span {
  padding-left: 24px;
  line-height: 1.7;
  color: #52677a;
  border-left: 4px solid #f5c518;
}

.application-page__list {
  display: grid;
  gap: 14px;
}

.application-page__section {
  position: relative;
  overflow: hidden;
  background: #eef5fb;
  border: 1px solid rgb(7 87 164 / 12%);
  border-radius: 18px;
}

.application-page__section--media {
  display: grid;
  grid-template-columns: minmax(320px, 0.9fr) minmax(0, 1.1fr);
  min-height: 310px;
}

.application-page__section--reverse figure {
  order: 2;
}

.application-page__section figure {
  min-height: 310px;
  margin: 0;
  background: #fff;
}

.application-page__section img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.application-page__copy {
  padding: clamp(22px, 3vw, 36px);
}

.application-page__copy > span {
  display: block;
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 900;
  color: #0757a4;
  letter-spacing: 0.14em;
}

.application-page__copy h3 {
  max-width: 760px;
  margin: 0;
  font-size: var(--card-heading-size);
  line-height: var(--card-heading-leading);
  color: #052f55;
  letter-spacing: -0.04em;
}

.application-page__copy p,
.application-page__copy li {
  line-height: 1.55;
  color: #52677a;
}

.application-page__copy p {
  max-width: 850px;
  margin: 12px 0 0;
}

.application-page__copy ul {
  display: grid;
  gap: 6px;
  padding-left: 20px;
  margin: 14px 0 0;
}

@media (width <= $tablet) {
  .application-page__heading,
  .application-page__section--media {
    grid-template-columns: 1fr;
  }

  .application-page__section--reverse figure {
    order: 0;
  }
}

@media (width <= $phone) {
  .application-page__section figure {
    min-height: 260px;
  }
}
</style>
