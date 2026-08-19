<script setup lang="ts">
import type { IndustrialPage } from '~/data/pages/_shared/types';

defineProps<{ page: IndustrialPage }>();

const isProjectRequestOpen = useState('project-request-open', () => false);
</script>

<template>
  <div class="application-page">
    <ProductIntroSection_02
      :title="page.introTitle"
      :image="page.image"
      :image-alt="page.title"
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

    <ProductFactsSection_03 :facts="page.facts" />

    <section class="application-page__solutions">
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
}

.application-page__solutions {
  background: #fff;
}

.application-page__heading {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr);
  gap: clamp(34px, 7vw, 90px);
  align-items: end;
  margin-bottom: 46px;
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
  font-size: clamp(34px, 4.8vw, 62px);
  line-height: 1.02;
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
  gap: 22px;
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
  min-height: 390px;
}

.application-page__section--reverse figure {
  order: 2;
}

.application-page__section figure {
  min-height: 390px;
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
  padding: clamp(30px, 5vw, 58px);
}

.application-page__copy > span {
  display: block;
  margin-bottom: 18px;
  font-size: 12px;
  font-weight: 900;
  color: #0757a4;
  letter-spacing: 0.14em;
}

.application-page__copy h3 {
  max-width: 760px;
  margin: 0;
  font-size: clamp(26px, 3.2vw, 42px);
  line-height: 1.08;
  color: #052f55;
  letter-spacing: -0.04em;
}

.application-page__copy p,
.application-page__copy li {
  line-height: 1.7;
  color: #52677a;
}

.application-page__copy p {
  max-width: 850px;
  margin: 18px 0 0;
}

.application-page__copy ul {
  display: grid;
  gap: 9px;
  padding-left: 20px;
  margin: 20px 0 0;
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
