<script setup lang="ts">
import type { IndustrialPage } from '~/data/pages/_shared/types';

defineProps<{ page: IndustrialPage }>();

const isProjectRequestOpen = useState('project-request-open', () => false);
</script>

<template>
  <div class="reservoir-model-page">
    <ProductIntroSection_02
      :title="page.introTitle"
      :image="page.image"
      :image-alt="page.title"
      eyebrow="Модель горизонтального резервуара"
      button-label="Запросить расчёт РГС"
      label="Наземное и подземное исполнение"
      label-icon="lucide:cylinder"
      @action="isProjectRequestOpen = true"
    >
      <template #breadcrumbs>
        <BreadcrumbsNavigation
          :items="[
            { label: 'Главная', to: '/' },
            { label: 'Резервуары РГС', to: '/rezervuary/' },
            { label: page.introTitle },
          ]"
        />
      </template>
      <p v-for="paragraph in page.intro" :key="paragraph">{{ paragraph }}</p>
    </ProductIntroSection_02>

    <ProductFactsSection_03 :facts="page.facts" />

    <section class="reservoir-model-page__details">
      <div class="content-section site-container">
        <header>
          <p>Конструкция конкретной модели</p>
          <h2>Исполнения, материалы и комплектация</h2>
        </header>

        <div class="reservoir-model-page__sections">
          <article
            v-for="(section, index) in page.sections"
            :key="section.title"
            :class="{ 'reservoir-model-page__section--media': section.image }"
          >
            <div>
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              <h3>{{ section.title }}</h3>
              <p v-for="paragraph in section.text" :key="paragraph">{{ paragraph }}</p>
              <ul v-if="section.items">
                <li v-for="item in section.items" :key="item">{{ item }}</li>
              </ul>
            </div>
            <figure v-if="section.image">
              <img
                :src="section.image"
                :alt="section.imageAlt || section.title"
                loading="lazy"
                width="1200"
                height="800"
              />
            </figure>
          </article>
        </div>
      </div>
    </section>

    <SpecsTableSection
      v-if="page.table"
      :title="page.table.title"
      :columns="page.table.headers"
      :rows="page.table.rows"
      eyebrow="Типоразмерный ряд РГС"
      tone="soft"
    />
  </div>
</template>

<style scoped lang="scss">
.reservoir-model-page {
  --page-deep: #173f63;
}

.reservoir-model-page :deep(.product-intro-02 img) {
  object-fit: contain;
}

.reservoir-model-page__details {
  background: #fff;
}

.reservoir-model-page__details header {
  max-width: 900px;
  margin-bottom: 44px;
}

.reservoir-model-page__details header p {
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 900;
  color: #0757a4;
  text-transform: uppercase;
  letter-spacing: 0.16em;
}

.reservoir-model-page__details header h2 {
  margin: 0;
  font-size: clamp(34px, 4.8vw, 62px);
  line-height: 1.02;
  color: #052f55;
  letter-spacing: -0.05em;
}

.reservoir-model-page__sections {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.reservoir-model-page__sections article {
  padding: clamp(28px, 4vw, 46px);
  background: #eef5fb;
  border: 1px solid rgb(7 87 164 / 12%);
  border-radius: 16px;
}

.reservoir-model-page__sections article:first-child,
.reservoir-model-page__section--media {
  grid-column: 1 / -1;
}

.reservoir-model-page__section--media {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.8fr);
  gap: clamp(30px, 6vw, 74px);
  align-items: center;
}

.reservoir-model-page__sections span {
  display: block;
  margin-bottom: 18px;
  font-size: 12px;
  font-weight: 900;
  color: #0757a4;
  letter-spacing: 0.14em;
}

.reservoir-model-page__sections h3 {
  margin: 0;
  font-size: clamp(25px, 3vw, 38px);
  line-height: 1.08;
  color: #052f55;
  letter-spacing: -0.04em;
}

.reservoir-model-page__sections p,
.reservoir-model-page__sections li {
  line-height: 1.7;
  color: #52677a;
}

.reservoir-model-page__sections p {
  margin: 18px 0 0;
}

.reservoir-model-page__sections ul {
  display: grid;
  gap: 9px;
  padding-left: 20px;
  margin: 20px 0 0;
}

.reservoir-model-page__sections figure {
  margin: 0;
  overflow: hidden;
  background: #fff;
  border-radius: 12px;
}

.reservoir-model-page__sections img {
  display: block;
  width: 100%;
  height: 100%;
  max-height: 420px;
  object-fit: contain;
}

@media (width <= $tablet) {
  .reservoir-model-page__sections,
  .reservoir-model-page__section--media {
    grid-template-columns: 1fr;
  }

  .reservoir-model-page__sections article {
    grid-column: auto;
  }
}
</style>
