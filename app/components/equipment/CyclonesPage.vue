<script setup lang="ts">
import ScraperProductCard from '~/components/shared/card/ScraperProductCard.vue';
import { catalog } from '~/data/pages/ciklony/data-catalog';
import { pageData } from '~/data/pages/ciklony/data';

const isProjectRequestOpen = useState('project-request-open', () => false);
const industries = [
  'Металлургическая промышленность',
  'Деревообрабатывающие предприятия',
  'Химическая промышленность',
  'Сельское хозяйство, элеваторы и зернохранилища',
  'Энергетический сектор',
  'Производство сыпучих строительных материалов',
];
</script>

<template>
  <div class="cyclones-page">
    <ProductIntroSection_02
      :title="pageData.introTitle"
      :image="pageData.image"
      :image-alt="pageData.title"
      eyebrow="Пылеулавливающее оборудование"
      button-label="Подобрать циклон"
      label="Изготовление по техническому заданию"
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

    <ProductFactsSection_03 :facts="pageData.facts" />

    <section class="cyclones-page__application">
      <div class="content-section site-container cyclones-page__application-grid">
        <div>
          <p class="cyclones-page__eyebrow">Области применения</p>
          <h2>Где применяется циклонная установка</h2>
          <p>
            Циклон применяется как первая или основная ступень очистки в подготовительных и технологических операциях.
            Конструкция подбирается по фракции, влажности, абразивности и склонности пыли к слипанию.
          </p>
        </div>
        <ul>
          <li v-for="industry in industries" :key="industry">
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
            <p class="cyclones-page__eyebrow">Модельный ряд</p>
            <h2>Циклоны под вид и свойства пыли</h2>
          </div>
          <p>
            В локальном каталоге представлены решения НИИОГАЗа, деревообрабатывающие и зерновые циклоны, аппараты для
            сухой пыли и модели с обратным конусом.
          </p>
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
  --page-deep: #073b5c;

  :deep(.product-intro-02 img) {
    object-fit: contain;
  }

  &__eyebrow {
    margin: 0 0 12px;
    font-size: 11px;
    font-weight: 900;
    color: #0757a4;
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }

  &__application {
    background: linear-gradient(135deg, rgb(7 87 164 / 7%), transparent 50%), #eef5fb;
  }

  &__application-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(360px, 0.8fr);
    gap: clamp(44px, 8vw, 110px);
    align-items: start;

    h2 {
      max-width: 760px;
      margin: 0;
      font-size: clamp(36px, 5vw, 60px);
      line-height: 1.03;
      color: #052f55;
      letter-spacing: -0.05em;
    }

    > div > p:last-child {
      max-width: 760px;
      margin: 24px 0 0;
      font-size: 17px;
      line-height: 1.75;
      color: #52677a;
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
      color: #052f55;
      background: #fff;
      border: 1px solid rgb(7 87 164 / 12%);
      border-radius: 10px;
    }

    svg {
      width: 21px;
      height: 21px;
      padding: 4px;
      color: #052f55;
      background: #f5c518;
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
    margin-bottom: 44px;

    h2 {
      max-width: 820px;
      margin: 0;
      font-size: clamp(36px, 5vw, 60px);
      line-height: 1.03;
      color: #052f55;
      letter-spacing: -0.05em;
    }

    > p {
      padding-left: 24px;
      margin: 0;
      line-height: 1.7;
      color: #52677a;
      border-left: 4px solid #f5c518;
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
