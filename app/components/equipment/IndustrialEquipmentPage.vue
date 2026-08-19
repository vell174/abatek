<script setup lang="ts">
import type { IndustrialPage, IndustrialSection } from '~/data/pages/_shared/types';
import { industrialWorkflow } from '~/data/pages/_shared/workflow';
import ScraperProductCard from '~/components/shared/card/ScraperProductCard.vue';

const props = defineProps<{ page: IndustrialPage; catalog?: IndustrialSection[] }>();

const mediaSections = computed(() => (props.catalog ?? props.page.sections).filter((section) => section.image));
const textSections = computed(() => props.page.sections.filter((section) => !section.image));
const scraperCatalogSections = computed(() => {
  if (props.page.theme === 'amber') return mediaSections.value.slice(1);
  if (props.page.theme === 'wine' || props.page.theme === 'teal') return mediaSections.value;
  return [];
});
const manufacturingStages = industrialWorkflow.map(([title, description]) => `${title}. ${description}`);

const isProjectRequestOpen = useState('project-request-open', () => false);
const faq = [
  {
    question: 'Можно ли изготовить оборудование по индивидуальным размерам?',
    answer:
      'Да. Конструкция, материалы, привод, габариты и производительность рассчитываются по техническому заданию и условиям эксплуатации.',
  },
  {
    question: 'Какие данные нужны для расчета?',
    answer:
      'Нужны свойства и объем груза, требуемая производительность, схема трассы, точки загрузки и выгрузки, режим работы и условия окружающей среды.',
  },
  {
    question: 'Как согласуется конструкция?',
    answer:
      'До запуска в производство мы предоставляем чертеж общего вида, обсуждаем узлы и фиксируем согласованную комплектацию.',
  },
  {
    question: 'Организуете ли вы доставку?',
    answer: 'Да, готовое оборудование отправляем транспортом подходящей грузоподъемности в регионы России.',
  },
];
</script>

<template>
  <div class="industrial-page" :class="`industrial-page--${page.theme}`">
    <ProductIntroSection_02
      :title="page.introTitle"
      :image="page.image"
      :image-alt="page.title"
      button-label="Заказать расчёт"
      label="Собственное производство"
      label-icon="lucide:factory"
      @action="isProjectRequestOpen = true"
    >
      <template #breadcrumbs>
        <BreadcrumbsNavigation
          :items="[
            { label: 'Главная', to: '/' },
            { label: page.theme === 'steel' ? 'Металлоконструкции' : 'Каталог оборудования', to: '/#catalog' },
            { label: page.introTitle },
          ]"
        />
      </template>
      <p v-for="paragraph in page.intro" :key="paragraph">{{ paragraph }}</p>
    </ProductIntroSection_02>

    <ProductFactsSection_03 :facts="page.facts" />

    <SpecsTableSection
      v-if="page.table"
      :title="page.table.title"
      :columns="page.table.headers"
      :rows="page.table.rows"
      eyebrow="Расчётные данные"
      tone="soft"
    />

    <section v-if="textSections.length" class="industrial-editorial">
      <div class="content-section site-container">
        <div class="industrial-section-heading">
          <div class="industrial-section-heading__intro">
            <p>Инженерный разбор</p>
            <span>Ключевые сведения для выбора оборудования под вашу производственную задачу</span>
          </div>
          <h2>
            Конструкция, применение
            <em>и подбор</em>
          </h2>
        </div>
        <div class="industrial-editorial__grid">
          <article
            v-for="(section, index) in textSections"
            :key="section.title"
            :class="{
              'industrial-editorial__card--wide':
                index === 0 && textSections.length > 2 && textSections.length % 2 === 1 && section.text?.length,
            }"
          >
            <div class="industrial-editorial__card-head">
              <span class="industrial-editorial__number">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="industrial-editorial__label">Практика и технология</span>
            </div>
            <div class="industrial-editorial__body">
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

    <ScraperConveyorsCatalog
      v-if="page.theme === 'copper'"
      :title="page.galleryTitle"
      :sections="mediaSections"
      @action="isProjectRequestOpen = true"
    />

    <section v-else-if="mediaSections.length" class="industrial-catalog">
      <div class="content-section site-container">
        <div class="industrial-section-heading industrial-section-heading--light">
          <p v-if="page.theme !== 'amber' && page.title !== 'Барабаны ленточного конвейера'">Модельный ряд</p>
          <p v-else-if="page.title === 'Барабаны ленточного конвейера'" class="industrial-section-heading__kicker">
            Точная комплектация для стабильного движения ленты
          </p>
          <h2>{{ page.galleryTitle }}</h2>
        </div>
        <div class="industrial-catalog__grid">
          <article v-if="page.theme === 'amber' && mediaSections[0]" class="industrial-catalog__card">
            <figure>
              <img
                :src="mediaSections[0].image"
                :alt="mediaSections[0].imageAlt || mediaSections[0].title"
                loading="lazy"
                width="1200"
                height="900"
              />
            </figure>
            <div>
              <h3>{{ mediaSections[0].title }}</h3>
              <p v-for="paragraph in mediaSections[0].text" :key="paragraph">{{ paragraph }}</p>
              <ul v-if="mediaSections[0].items">
                <li v-for="item in mediaSections[0].items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </article>

          <ScraperProductCard
            v-for="(product, index) in scraperCatalogSections"
            :key="product.title"
            :product="product"
            :index="index"
            @action="isProjectRequestOpen = true"
          />

          <template v-if="!['amber', 'wine', 'teal'].includes(page.theme)">
            <article v-for="section in mediaSections" :key="section.title" class="industrial-catalog__card">
              <figure>
                <img
                  :src="section.image"
                  :alt="section.imageAlt || section.title"
                  loading="lazy"
                  width="1200"
                  height="900"
                />
              </figure>
              <div>
                <h3>{{ section.title }}</h3>
                <p v-for="paragraph in section.text" :key="paragraph">{{ paragraph }}</p>
                <ul v-if="section.items">
                  <li v-for="item in section.items" :key="item">{{ item }}</li>
                </ul>
              </div>
            </article>
          </template>
        </div>
      </div>
    </section>

    <section v-if="page.video" class="industrial-video">
      <div class="content-section site-container">
        <p class="industrial-content__eyebrow">Видео оборудования</p>
        <h2>{{ page.video.title }}</h2>
        <div class="industrial-video__frame">
          <iframe
            :src="page.video.embedUrl"
            :title="page.video.title"
            loading="lazy"
            allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
            allowfullscreen
          />
        </div>
      </div>
    </section>

    <ManufacturingStagesSection_last_02
      title="От задачи до готового оборудования"
      :items="manufacturingStages"
      note="Каждый этап фиксируем до запуска следующего: от исходных данных и чертежей до контроля готового оборудования и доставки."
      eyebrow="Производственный цикл АБАТЭК"
    />
    <FaqSection_last_01 :items="faq" :title="`Частые вопросы: ${page.title.toLowerCase()}`" tone="soft" />
  </div>
</template>

<style scoped lang="scss">
.industrial-page {
  --page-accent: #1769aa;
  --page-deep: #082f52;
  --page-tint: #edf5fb;
}

.industrial-page--forest {
  --page-accent: #0757a4;
  --page-deep: #052f55;
  --page-tint: #eef5fb;
}

.industrial-page--copper {
  --page-accent: #0757a4;
  --page-deep: #052f55;
  --page-tint: #eef5fb;
}

.industrial-page--blue {
  --page-accent: #1769aa;
  --page-deep: #082f52;
  --page-tint: #edf5fb;
}

.industrial-page--blue .industrial-editorial {
  background: linear-gradient(135deg, rgb(23 105 170 / 7%), transparent 42%), #f4f8fb;
}

.industrial-page--blue .industrial-editorial__grid {
  gap: 24px;
}

.industrial-page--blue .industrial-editorial__grid article {
  grid-template-columns: 72px minmax(0, 1fr);
  min-height: 380px;
  border: 1px solid rgb(23 105 170 / 13%);
  border-radius: 16px;
  box-shadow: 0 18px 44px rgb(8 47 82 / 8%);
}

.industrial-page--blue .industrial-editorial__grid article::before {
  inset: 0 0 auto;
  width: auto;
  height: 5px;
  background: linear-gradient(90deg, #1769aa 0 72%, #f5c518 72% 88%, transparent 88%);
}

.industrial-page--blue .industrial-editorial__number {
  color: #1769aa;
}

.industrial-page--blue .industrial-catalog {
  background: #f4f8fb;
  border-top: 1px solid rgb(23 105 170 / 12%);
}

.industrial-page--blue .industrial-catalog__grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.industrial-page--blue .industrial-catalog__card {
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  border: 1px solid rgb(23 105 170 / 12%);
  border-radius: 14px;
  box-shadow: 0 12px 32px rgb(8 47 82 / 7%);
}

.industrial-page--blue .industrial-catalog figure {
  height: 210px;
  aspect-ratio: auto;
  background: #fff;
  border-bottom: 1px solid rgb(23 105 170 / 10%);
}

.industrial-page--blue .industrial-catalog__card > div {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 24px;
}

.industrial-page--blue .industrial-catalog h3 {
  margin-bottom: 12px;
  font-size: clamp(21px, 2vw, 27px);
}

.industrial-page--blue .industrial-catalog p {
  font-size: 14px;
  line-height: 1.62;
}

.industrial-page--blue .industrial-catalog ul {
  gap: 8px;
  margin-top: 16px;
}

.industrial-page--blue .industrial-catalog li {
  font-size: 14px;
  line-height: 1.45;
}

.industrial-page--blue .industrial-section-heading--light {
  margin-bottom: 34px;
}

.industrial-page--blue .industrial-section-heading--light h2 {
  color: #082f52;
}

.industrial-page--blue .industrial-section-heading--light p {
  color: #1769aa;
}

.industrial-page--graphite {
  --page-accent: #0757a4;
  --page-deep: #052f55;
  --page-tint: #eef5fb;
}

.industrial-page--graphite :deep(.product-intro) {
  position: relative;
  gap: clamp(42px, 7vw, 92px);
  padding-block: clamp(52px, 7vw, 88px);
}

.industrial-page--graphite :deep(.product-intro)::before {
  position: absolute;
  top: 36px;
  left: -42px;
  width: 86px;
  height: 86px;
  pointer-events: none;
  content: '';
  border: 15px solid rgb(7 87 164 / 8%);
  border-radius: 50%;
}

.industrial-page--graphite :deep(.product-intro h2) {
  max-width: 650px;
  font-size: clamp(34px, 4.4vw, 58px);
  color: #052f55;
}

.industrial-page--graphite :deep(.product-intro figure) {
  position: relative;
}

.industrial-page--graphite :deep(.product-intro figure)::after {
  position: absolute;
  right: -14px;
  bottom: -14px;
  z-index: -1;
  width: 72%;
  height: 72%;
  content: '';
  background: #f5c518;
  border-radius: 8px 8px 24px;
}

.industrial-page--graphite :deep(.product-intro img) {
  height: clamp(320px, 34vw, 440px);
  object-fit: contain;
  background: #eef5fb;
  border-radius: 8px 8px 24px;
  box-shadow: 0 24px 60px rgb(5 47 85 / 16%);
}

.industrial-page--graphite .industrial-editorial {
  background: #eef5fb;
}

.industrial-page--graphite .industrial-editorial::after {
  background: linear-gradient(90deg, #0757a4 0 26%, #f5c518 26% 33%, transparent 33%);
}

.industrial-page--graphite .industrial-editorial__grid {
  gap: 20px;
}

.industrial-page--graphite .industrial-editorial__grid article {
  grid-template-columns: 64px minmax(0, 1fr);
  min-height: 330px;
  padding: clamp(28px, 3.5vw, 42px);
  background: #fff;
  border: 1px solid rgb(5 47 85 / 9%);
  border-radius: 8px;
  box-shadow: 0 14px 38px rgb(5 47 85 / 6%);
}

.industrial-page--graphite .industrial-editorial__grid article::before {
  inset: 0 0 auto;
  width: auto;
  height: 4px;
  background: #0757a4;
}

.industrial-page--graphite .industrial-editorial__grid article:nth-child(even)::before {
  background: #f5c518;
}

.industrial-page--graphite .industrial-editorial__number {
  color: #0757a4;
}

.industrial-page--graphite .industrial-editorial__grid article:nth-child(even) .industrial-editorial__number {
  color: #0757a4;
}

.industrial-page--graphite .industrial-editorial h3 {
  font-size: clamp(25px, 2.5vw, 34px);
}

.industrial-page--graphite .industrial-catalog {
  background: #fff;
  border-top: 1px solid rgb(7 87 164 / 12%);
  border-bottom: 1px solid rgb(7 87 164 / 12%);
}

.industrial-page--graphite .industrial-catalog .industrial-section-heading {
  margin-bottom: 36px;
}

.industrial-page--graphite .industrial-catalog .industrial-section-heading > p {
  color: #0757a4;
}

.industrial-page--graphite .industrial-catalog .industrial-section-heading h2 {
  color: #052f55;
}

.industrial-page--graphite .industrial-catalog__grid {
  grid-template-columns: 1fr;
}

.industrial-page--graphite .industrial-catalog__card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(340px, 0.8fr);
  min-height: 360px;
  color: #052f55;
  background: #eef5fb;
  border: 1px solid rgb(7 87 164 / 12%);
  border-radius: 16px;
  box-shadow: 0 16px 42px rgb(5 47 85 / 8%);
}

.industrial-page--graphite .industrial-catalog figure {
  order: 2;
  height: 100%;
  min-height: 360px;
  aspect-ratio: auto;
  background: #fff;
  border-left: 1px solid rgb(7 87 164 / 10%);
}

.industrial-page--graphite .industrial-catalog__card > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(34px, 5vw, 64px);
}

.industrial-page--graphite .industrial-catalog__card > div::before {
  width: 54px;
  height: 5px;
  margin-bottom: 22px;
  content: '';
  background: #f5c518;
  border-radius: 5px;
}

.industrial-page--graphite .industrial-catalog h3 {
  font-size: clamp(28px, 3.2vw, 42px);
  color: #052f55;
}

.industrial-page--graphite .industrial-catalog p {
  max-width: 680px;
  color: $muted;
}

.industrial-page--graphite .industrial-catalog__card:hover {
  box-shadow: 0 22px 52px rgb(5 47 85 / 13%);
  transform: translateY(-3px);
}

.industrial-page--wine {
  --page-accent: #0757a4;
  --page-deep: #052f55;
  --page-tint: #eef5fb;
}

.industrial-page--teal {
  --page-accent: #0757a4;
  --page-deep: #052f55;
  --page-tint: #eef5fb;
}

.industrial-page--teal :deep(.product-intro) {
  gap: clamp(38px, 7vw, 88px);
  padding-block: clamp(48px, 6vw, 76px);
}

.industrial-page--teal :deep(.product-intro > div:first-child) {
  position: relative;
  padding-left: clamp(22px, 3vw, 40px);
}

.industrial-page--teal :deep(.product-intro > div:first-child)::before {
  position: absolute;
  inset: 0 auto 0 0;
  width: 6px;
  content: '';
  background: linear-gradient(#0757a4 0 72%, #f5c518 72%);
  border-radius: 6px;
}

.industrial-page--teal :deep(.product-intro h2) {
  max-width: 680px;
  font-size: clamp(34px, 4.2vw, 56px);
  color: #052f55;
}

.industrial-page--teal :deep(.product-intro img) {
  height: clamp(300px, 32vw, 410px);
  object-fit: contain;
  background: #eef5fb;
  border: 1px solid rgb(7 87 164 / 10%);
  border-radius: 18px;
  box-shadow: 0 20px 50px rgb(5 47 85 / 12%);
}

.industrial-page--teal .industrial-catalog {
  background: #eef5fb;
  border-top: 1px solid rgb(7 87 164 / 10%);
}

.industrial-page--teal .industrial-section-heading--light h2 {
  color: #052f55;
}

.industrial-page--teal .industrial-section-heading--light p {
  color: #0757a4;
}

.industrial-page--teal .industrial-catalog__grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.industrial-page--teal .industrial-catalog__card {
  display: flex;
  flex-direction: column;
  min-height: 560px;
  border: 1px solid rgb(7 87 164 / 11%);
  border-radius: 16px;
  box-shadow: 0 14px 38px rgb(5 47 85 / 7%);
}

.industrial-page--teal .industrial-catalog figure {
  height: 250px;
  aspect-ratio: auto;
  background: #fff;
  border-bottom: 1px solid rgb(7 87 164 / 9%);
}

.industrial-page--teal .industrial-catalog__card > div {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 28px;
}

.industrial-page--teal .industrial-catalog h3 {
  font-size: clamp(23px, 2.3vw, 31px);
  color: #052f55;
}

.industrial-page--teal .industrial-catalog ul {
  gap: 8px;
  margin-top: 18px;
}

.industrial-page--teal .industrial-catalog li::before {
  background: #0757a4;
}

.industrial-page--teal .industrial-catalog__card::after {
  width: 48px;
  height: 4px;
  margin: auto 28px 24px;
  content: '';
  background: #f5c518;
  border-radius: 4px;
}

.industrial-page--teal :deep(.manufacturing-stages) {
  background: #eef5fb;
}

.industrial-page--teal :deep(.faq-section) {
  background: #fff;
}

.industrial-page--indigo {
  --page-accent: #0757a4;
  --page-deep: #052f55;
  --page-tint: #eef5fb;
}

.industrial-page--indigo :deep(.product-intro) {
  gap: clamp(40px, 7vw, 90px);
  padding-block: clamp(50px, 7vw, 82px);
}

.industrial-page--indigo :deep(.product-intro > div:first-child) {
  position: relative;
  z-index: 1;
}

.industrial-page--indigo :deep(.product-intro > div:first-child)::after {
  display: block;
  width: 72px;
  height: 5px;
  margin-top: 30px;
  content: '';
  background: linear-gradient(90deg, #0757a4 0 70%, #f5c518 70%);
  border-radius: 5px;
}

.industrial-page--indigo :deep(.product-intro h2) {
  max-width: 690px;
  font-size: clamp(35px, 4.5vw, 60px);
  color: #052f55;
}

.industrial-page--indigo :deep(.product-intro figure) {
  position: relative;
  padding: 16px;
  background: #eef5fb;
  border-radius: 24px 8px;
}

.industrial-page--indigo :deep(.product-intro figure)::before {
  position: absolute;
  top: -8px;
  right: 32px;
  width: 64px;
  height: 8px;
  content: '';
  background: #f5c518;
  border-radius: 8px 8px 0 0;
}

.industrial-page--indigo :deep(.product-intro img) {
  height: clamp(310px, 34vw, 430px);
  object-fit: contain;
  background: #fff;
  border-radius: 16px 4px;
  box-shadow: none;
}

.industrial-page--indigo .industrial-catalog {
  background: #eef5fb;
  border-top: 1px solid rgb(7 87 164 / 10%);
}

.industrial-page--indigo .industrial-section-heading--light h2 {
  color: #052f55;
}

.industrial-page--indigo .industrial-section-heading--light p {
  color: #0757a4;
}

.industrial-page--indigo .industrial-catalog__grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

.industrial-page--indigo .industrial-catalog__card {
  display: grid;
  grid-template-columns: minmax(210px, 0.72fr) minmax(0, 1.28fr);
  min-height: 390px;
  border: 1px solid rgb(7 87 164 / 11%);
  border-radius: 16px;
  box-shadow: 0 14px 36px rgb(5 47 85 / 7%);
}

.industrial-page--indigo .industrial-catalog__card:first-child {
  grid-template-columns: minmax(360px, 1fr) minmax(0, 1fr);
  grid-column: 1 / -1;
  min-height: 420px;
}

.industrial-page--indigo .industrial-catalog figure {
  height: 100%;
  min-height: 390px;
  aspect-ratio: auto;
  background: #fff;
  border-right: 1px solid rgb(7 87 164 / 9%);
}

.industrial-page--indigo .industrial-catalog__card:first-child figure {
  min-height: 420px;
}

.industrial-page--indigo .industrial-catalog__card > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(24px, 3vw, 38px);
}

.industrial-page--indigo .industrial-catalog h3 {
  font-size: clamp(23px, 2.2vw, 31px);
  color: #052f55;
}

.industrial-page--indigo .industrial-catalog__card:first-child h3 {
  font-size: clamp(28px, 3.2vw, 43px);
}

.industrial-page--indigo .industrial-catalog ul {
  gap: 8px;
  margin-top: 18px;
}

.industrial-page--indigo .industrial-catalog li {
  font-size: 14px;
}

.industrial-page--indigo .industrial-catalog li::before {
  background: #0757a4;
}

.industrial-page--indigo .industrial-catalog__card:first-child li::before {
  background: #f5c518;
}

.industrial-page--indigo :deep(.manufacturing-stages) {
  background: #fff;
}

.industrial-page--indigo :deep(.faq-section) {
  background: #eef5fb;
}

.industrial-page--steel {
  --page-accent: #0757a4;
  --page-deep: #052f55;
  --page-tint: #eef5fb;
}

.industrial-page--steel .industrial-editorial {
  background: #fff;
}

.industrial-page--steel .industrial-editorial::after {
  background: linear-gradient(90deg, #0757a4 0 34%, #f5c518 34% 42%, transparent 42%);
}

.industrial-page--steel .industrial-editorial__grid {
  gap: 22px;
}

.industrial-page--steel .industrial-editorial__grid article {
  grid-template-columns: 70px minmax(0, 1fr);
  min-height: 360px;
  background: #eef5fb;
  border: 1px solid rgb(7 87 164 / 10%);
  border-radius: 14px;
  box-shadow: none;
}

.industrial-page--steel .industrial-editorial__grid article::before {
  inset: 0 0 auto;
  width: auto;
  height: 5px;
  background: #0757a4;
}

.industrial-page--steel .industrial-editorial__grid article:first-child {
  min-height: 330px;
  color: #fff;
  background: #052f55;
  border: 0;
}

.industrial-page--steel .industrial-editorial__grid article:first-child::before {
  background: linear-gradient(90deg, #0757a4 0 76%, #f5c518 76%);
}

.industrial-page--steel .industrial-editorial__grid article:first-child h3 {
  color: #fff;
}

.industrial-page--steel .industrial-editorial__grid article:first-child p,
.industrial-page--steel .industrial-editorial__grid article:first-child li {
  color: rgb(255 255 255 / 76%);
}

.industrial-page--steel .industrial-editorial__grid article:first-child .industrial-editorial__number {
  color: #f5c518;
}

.industrial-page--steel .industrial-editorial h3 {
  font-size: clamp(25px, 2.6vw, 36px);
  color: #052f55;
}

.industrial-page--steel .industrial-editorial li {
  padding: 13px 16px 13px 40px;
  background: #fff;
  border: 1px solid rgb(7 87 164 / 9%);
  border-radius: 8px;
}

.industrial-page--steel .industrial-editorial li::before {
  top: 50%;
  left: 18px;
  background: #0757a4;
  transform: translateY(-50%);
}

.industrial-page--steel :deep(.manufacturing-stages) {
  background: #eef5fb;
}

.industrial-page--steel :deep(.faq-section) {
  background: #fff;
}

.industrial-page--amber {
  --page-accent: #0757a4;
  --page-deep: #052f55;
  --page-tint: #eef5fb;
}

.industrial-page--amber .industrial-editorial {
  background: #fff;
}

.industrial-page--amber .industrial-editorial::after {
  background: linear-gradient(90deg, #0757a4 0 34%, #f5c518 34% 42%, transparent 42%);
}

.industrial-page--amber .industrial-editorial__grid {
  gap: 20px;
}

.industrial-page--amber .industrial-editorial__grid article {
  grid-template-columns: 66px minmax(0, 1fr);
  min-height: 360px;
  padding: clamp(28px, 3.5vw, 42px);
  background: #eef5fb;
  border: 1px solid rgb(7 87 164 / 10%);
  border-radius: 14px;
  box-shadow: none;
}

.industrial-page--amber .industrial-editorial__grid article::before {
  inset: 0 0 auto;
  width: auto;
  height: 4px;
  background: #0757a4;
}

.industrial-page--amber .industrial-editorial__grid article:nth-child(3n + 1)::before {
  background: #f5c518;
}

.industrial-page--amber .industrial-editorial__number {
  color: #0757a4;
}

.industrial-page--amber .industrial-editorial h3 {
  font-size: clamp(24px, 2.4vw, 33px);
  color: #052f55;
}

.industrial-page--amber .industrial-editorial ul {
  gap: 8px;
  margin-top: 18px;
}

.industrial-page--amber .industrial-editorial li::before {
  background: #0757a4;
}

.industrial-page--amber .industrial-catalog {
  background: #eef5fb;
  border-top: 1px solid rgb(7 87 164 / 10%);
}

.industrial-page--amber .industrial-section-heading--light h2 {
  color: #052f55;
}

.industrial-page--amber .industrial-catalog .industrial-section-heading {
  grid-template-columns: 1fr;
  margin-bottom: 28px;
}

.industrial-page--amber .industrial-catalog .industrial-section-heading h2 {
  max-width: 820px;
  font-size: clamp(30px, 3.6vw, 46px);
}

.industrial-page--amber .industrial-section-heading--light p {
  color: #0757a4;
}

.industrial-page--amber .industrial-catalog__grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

.industrial-page--amber .industrial-catalog__card {
  display: flex;
  flex-direction: column;
  min-height: 480px;
  border: 1px solid rgb(7 87 164 / 11%);
  border-radius: 16px;
  box-shadow: 0 14px 38px rgb(5 47 85 / 7%);
}

.industrial-page--amber .industrial-catalog__card:first-child {
  display: grid;
  grid-template-columns: minmax(380px, 1fr) minmax(0, 1fr);
  grid-column: 1 / -1;
  min-height: 420px;
  background: #052f55;
  border: 0;
}

.industrial-page--amber .industrial-catalog figure {
  height: 245px;
  aspect-ratio: auto;
  background: #fff;
  border-bottom: 1px solid rgb(7 87 164 / 9%);
}

.industrial-page--amber .industrial-catalog__card:first-child figure {
  height: 100%;
  min-height: 420px;
  border: 0;
}

.industrial-page--amber .industrial-catalog__card:first-child figure img {
  object-fit: cover;
}

.industrial-page--amber .industrial-catalog__card > div {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: clamp(26px, 3.5vw, 42px);
}

.industrial-page--amber .industrial-catalog h3 {
  font-size: clamp(24px, 2.5vw, 34px);
  color: #052f55;
}

.industrial-page--amber .industrial-catalog__card:first-child h3 {
  font-size: clamp(30px, 3.5vw, 46px);
  color: #fff;
}

.industrial-page--amber .industrial-catalog__card:first-child p,
.industrial-page--amber .industrial-catalog__card:first-child li {
  color: rgb(255 255 255 / 76%);
}

.industrial-page--amber .industrial-catalog__card:first-child li::before {
  background: #f5c518;
}

.industrial-page--amber :deep(.manufacturing-stages) {
  background: #fff;
}

.industrial-page--amber :deep(.faq-section) {
  background: #eef5fb;
}

.industrial-section-heading {
  display: grid;
  grid-template-columns: minmax(220px, 0.42fr) minmax(0, 1fr);
  gap: clamp(32px, 6vw, 88px);
  align-items: end;
  margin-bottom: clamp(38px, 6vw, 68px);
}

.industrial-section-heading__intro p {
  margin: 0 0 14px;
  font-size: 11px;
  font-weight: 900;
  color: var(--page-accent);
  text-transform: uppercase;
  letter-spacing: 0.16em;
}

.industrial-section-heading__intro span {
  display: block;
  max-width: 330px;
  font-size: 15px;
  line-height: 1.6;
  color: $muted;
}

.industrial-section-heading h2 {
  max-width: 820px;
  margin: 0;
  font-size: clamp(34px, 4.6vw, 62px);
  line-height: 1.02;
  color: $ink;
  letter-spacing: -0.05em;
}

.industrial-section-heading h2 em {
  font-style: normal;
  color: var(--page-accent);
}

.industrial-editorial {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 100% 0, color-mix(in srgb, var(--page-accent) 10%, transparent), transparent 34%),
    var(--page-tint);
  border-top: 1px solid color-mix(in srgb, var(--page-accent) 18%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--page-accent) 18%, transparent);
  box-shadow:
    inset 0 16px 34px rgb(5 47 85 / 3%),
    inset 0 -16px 34px rgb(5 47 85 / 3%);
}

.industrial-editorial::after {
  position: absolute;
  inset: 0 0 auto;
  z-index: 1;
  height: 6px;
  pointer-events: none;
  content: '';
  background: linear-gradient(90deg, var(--page-accent) 0 34%, #f5c518 34% 42%, transparent 42%);
}

.industrial-editorial .content-section {
  position: relative;
  z-index: 2;
}

.industrial-editorial__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.industrial-editorial__grid article {
  position: relative;
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr);
  min-height: 100%;
  padding: clamp(28px, 4vw, 46px);
  overflow: hidden;
  background: #fff;
  border: 1px solid rgb(10 39 62 / 9%);
  border-radius: 4px 22px 22px 4px;
  box-shadow: 0 18px 50px rgb(16 45 69 / 7%);
}

.industrial-editorial__grid article::before {
  position: absolute;
  inset: 0 auto 0 0;
  width: 5px;
  content: '';
  background: var(--page-accent);
}

.industrial-editorial__card--wide {
  grid-column: 1 / -1;
}

.industrial-editorial__card-head {
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: flex-start;
}

.industrial-editorial__number {
  font-size: clamp(28px, 3vw, 42px);
  font-weight: 900;
  line-height: 1;
  color: var(--page-accent);
  letter-spacing: -0.06em;
}

.industrial-editorial__label {
  font-size: 9px;
  font-weight: 800;
  color: $muted;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

.industrial-editorial__body {
  min-width: 0;
}

.industrial-editorial h3,
.industrial-catalog h3 {
  margin: 0 0 16px;
  font-size: clamp(22px, 2.3vw, 32px);
  line-height: 1.16;
  color: $ink;
  letter-spacing: -0.035em;
}

.industrial-editorial p,
.industrial-catalog p {
  margin: 10px 0 0;
  line-height: 1.72;
  color: $muted;
}

.industrial-editorial ul,
.industrial-catalog ul {
  display: grid;
  gap: 10px;
  padding: 0;
  margin: 24px 0 0;
  list-style: none;
}

.industrial-editorial li,
.industrial-catalog li {
  position: relative;
  padding-left: 20px;
  line-height: 1.55;
  color: $ink;
}

.industrial-editorial li::before,
.industrial-catalog li::before {
  position: absolute;
  top: 0.63em;
  left: 0;
  width: 7px;
  height: 7px;
  content: '';
  background: var(--page-accent);
  border-radius: 50%;
}

.industrial-catalog {
  background: var(--page-deep);
}

.industrial-section-heading--light h2 {
  color: #fff;
}

.industrial-section-heading--light p {
  color: #ffd65c;
}

.industrial-catalog__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.industrial-catalog__card {
  overflow: hidden;
  background: #fff;
  border-radius: 18px;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.industrial-catalog__card:hover {
  box-shadow: 0 20px 48px rgb(0 0 0 / 22%);
  transform: translateY(-5px);
}

.industrial-catalog figure {
  aspect-ratio: 4 / 3;
  margin: 0;
  overflow: hidden;
  background: #f5f6f7;
}

.industrial-catalog figure img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.4s ease;
}

.industrial-catalog__card:hover img {
  transform: scale(1.035);
}

.industrial-catalog__card > div {
  padding: 25px;
}

.industrial-catalog__action {
  min-height: 52px;
  padding-inline: 22px;
  margin-top: 24px;
  font-size: 16px;
  font-weight: 850;
  color: #052f55;
  cursor: pointer;
  background: #f5c518;
  border: 1px solid #f5c518;
  border-radius: 7px;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.industrial-catalog__action:hover {
  background: #ffdc54;
  transform: translateY(-2px);
}

.industrial-page--copper .industrial-editorial {
  background: #fff;
}

.industrial-page--copper .industrial-editorial__grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.industrial-page--copper .industrial-editorial__grid article {
  background: #eef5fb;
  border: 0;
  border-radius: 10px;
  box-shadow: none;
}

.industrial-page--copper .industrial-editorial__grid article:first-child {
  position: relative;
  overflow: hidden;
  color: #fff;
  background: #052f55;
}

.industrial-page--copper .industrial-editorial__grid article:first-child::after {
  position: absolute;
  right: -70px;
  bottom: -90px;
  width: 220px;
  height: 220px;
  content: '';
  border: 36px solid rgb(245 197 24 / 12%);
  border-radius: 50%;
}

.industrial-page--copper .industrial-editorial__grid article:first-child h3 {
  color: #fff;
}

.industrial-page--copper .industrial-editorial__grid article:first-child p,
.industrial-page--copper .industrial-editorial__grid article:first-child li {
  color: rgb(255 255 255 / 72%);
}

.industrial-page--copper .industrial-catalog {
  background: #eef5fb;
}

.industrial-page--copper .industrial-section-heading--light h2 {
  color: #052f55;
}

.industrial-page--copper .industrial-section-heading--light p {
  color: #0757a4;
}

.industrial-page--copper .industrial-catalog__grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.industrial-page--copper .industrial-catalog__card {
  display: flex;
  flex-direction: column;
  min-height: 510px;
  border: 1px solid rgb(7 87 164 / 10%);
  border-radius: 16px;
  box-shadow: 0 15px 45px rgb(5 47 85 / 8%);
}

.industrial-page--copper .industrial-catalog figure {
  height: 245px;
  min-height: 0;
  aspect-ratio: 4 / 3;
  background: #fff;
}

.industrial-page--copper .industrial-catalog figure img {
  object-fit: contain;
}

.industrial-page--copper .industrial-catalog__card > div {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 26px;
}

.industrial-page--copper .industrial-catalog__action {
  width: 100%;
  margin-top: auto;
}

.industrial-page--copper .industrial-catalog__card:first-child {
  display: grid;
  grid-template-columns: minmax(360px, 1.1fr) minmax(0, 0.9fr);
  grid-column: 1 / -1;
  min-height: 390px;
  overflow: hidden;
  color: #fff;
  background: #052f55;
  border: 0;
}

.industrial-page--copper .industrial-catalog__card:first-child figure {
  height: 100%;
  min-height: 390px;
  aspect-ratio: auto;
}

.industrial-page--copper .industrial-catalog__card:first-child > div {
  justify-content: center;
  padding: clamp(34px, 5vw, 60px);
}

.industrial-page--copper .industrial-catalog__card:first-child h3 {
  color: #fff;
}

.industrial-page--copper .industrial-catalog__card:first-child p {
  color: rgb(255 255 255 / 72%);
}

.industrial-page--copper .industrial-catalog__card:first-child .industrial-catalog__action {
  width: auto;
  margin-top: 28px;
}

.industrial-page--wine .industrial-catalog {
  background: #eef5fb;
  border-top: 1px solid rgb(7 87 164 / 14%);
}

.industrial-page--wine .industrial-section-heading--light h2 {
  color: #052f55;
}

.industrial-page--wine .industrial-section-heading--light p {
  color: #0757a4;
}

.industrial-page--wine .industrial-catalog__grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.industrial-page--wine .industrial-catalog__card {
  display: flex;
  flex-direction: column;
  min-height: 520px;
  border: 1px solid rgb(7 87 164 / 12%);
  border-radius: 16px;
  box-shadow: 0 14px 40px rgb(5 47 85 / 7%);
}

.industrial-page--wine .industrial-catalog figure {
  height: 250px;
  aspect-ratio: auto;
  background: #fff;
  border-bottom: 1px solid rgb(7 87 164 / 9%);
}

.industrial-page--wine .industrial-catalog__card > div {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  padding: 28px;
}

.industrial-page--wine .industrial-catalog__action {
  width: 100%;
  margin-top: auto;
  color: #052f55;
  background: #f5c518;
  border-color: #f5c518;
  box-shadow: 0 10px 24px rgb(245 197 24 / 20%);
}

.industrial-page--wine .industrial-catalog__action:hover {
  color: #052f55;
  background: #ffda45;
}

.industrial-page--wine .industrial-catalog__card:first-child {
  display: grid;
  grid-template-columns: minmax(380px, 1.08fr) minmax(0, 0.92fr);
  grid-column: 1 / -1;
  min-height: 410px;
  color: #fff;
  background: #052f55;
  border: 0;
}

.industrial-page--wine .industrial-catalog__card:first-child figure {
  height: 100%;
  min-height: 410px;
  border: 0;
}

.industrial-page--wine .industrial-catalog__card:first-child > div {
  justify-content: center;
  padding: clamp(34px, 5vw, 58px);
}

.industrial-page--wine .industrial-catalog__card:first-child h3 {
  font-size: clamp(30px, 3.4vw, 46px);
  color: #fff;
}

.industrial-page--wine .industrial-catalog__card:first-child p {
  color: rgb(255 255 255 / 72%);
}

.industrial-page--wine .industrial-catalog__card:first-child .industrial-catalog__action {
  width: auto;
  margin-top: 28px;
  color: #052f55;
  background: #f5c518;
  border-color: #f5c518;
  box-shadow: none;
}

.industrial-page--wine .industrial-catalog__card:first-child .industrial-catalog__action:hover {
  background: #ffda45;
}

.industrial-page--forest .industrial-editorial {
  position: relative;
  overflow: hidden;
  background: #fff;
}

.industrial-page--forest .industrial-editorial::before {
  position: absolute;
  top: 70px;
  right: -90px;
  width: 280px;
  height: 280px;
  content: '';
  background: #eef5fb;
  border-radius: 50%;
}

.industrial-page--forest .industrial-editorial__grid {
  grid-template-columns: 1fr;
}

.industrial-page--forest .industrial-editorial__grid article {
  display: grid;
  grid-template-columns: 70px minmax(0, 1fr);
  column-gap: 28px;
  padding: clamp(30px, 5vw, 58px);
  background: #eef5fb;
  border: 0;
  border-left: 5px solid #0757a4;
  border-radius: 8px 24px 24px 8px;
  box-shadow: none;
}

.industrial-page--forest .industrial-editorial__number {
  grid-row: 1 / 5;
  margin: 4px 0 0;
  font-size: 36px;
  color: #0757a4;
  opacity: 0.32;
}

.industrial-page--forest .industrial-editorial h3 {
  max-width: 800px;
  font-size: clamp(28px, 3.4vw, 46px);
}

.industrial-page--forest .industrial-editorial p {
  max-width: 900px;
}

.industrial-page--forest .industrial-editorial ul {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.industrial-page--forest .industrial-editorial li {
  padding: 15px 18px 15px 42px;
  background: #fff;
  border-radius: 8px;
}

.industrial-page--forest .industrial-editorial li::before {
  top: 50%;
  left: 19px;
  width: 9px;
  height: 9px;
  background: #f5c518;
  transform: translateY(-50%);
}

.industrial-page--forest .industrial-catalog {
  background: linear-gradient(135deg, #052f55 0%, #0757a4 100%);
}

.industrial-page--forest .industrial-catalog .industrial-section-heading {
  margin-bottom: 26px;
}

.industrial-page--forest .industrial-catalog .industrial-section-heading h2 {
  max-width: none;
  font-size: clamp(32px, 3.8vw, 50px);
  white-space: nowrap;
}

.industrial-page--forest .industrial-catalog__grid {
  grid-template-columns: 1fr;
}

.industrial-page--forest .industrial-catalog__card {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(380px, 1.2fr);
  gap: clamp(28px, 5vw, 68px);
  align-items: stretch;
  min-height: 480px;
  overflow: visible;
  background: transparent;
  border-radius: 0;
}

.industrial-page--forest .industrial-catalog figure {
  order: 2;
  min-height: 480px;
  aspect-ratio: auto;
  background: #fff;
  border: 10px solid rgb(255 255 255 / 12%);
  border-radius: 24px;
  box-shadow: 0 28px 70px rgb(0 0 0 / 24%);
}

.industrial-page--forest .industrial-catalog figure img {
  object-fit: contain;
  background: #fff;
}

.industrial-page--forest .industrial-catalog__card > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(30px, 4vw, 54px) 0;
}

.industrial-page--forest .industrial-catalog__card > div::before {
  width: 62px;
  height: 5px;
  margin-bottom: 26px;
  content: '';
  background: #f5c518;
  border-radius: 4px;
}

.industrial-page--forest .industrial-catalog h3 {
  font-size: clamp(30px, 3.6vw, 48px);
  color: #fff;
}

.industrial-page--forest .industrial-catalog p {
  font-size: 16px;
  color: rgb(255 255 255 / 72%);
}

.industrial-page--forest .industrial-catalog ul {
  gap: 9px;
}

.industrial-page--forest .industrial-catalog li {
  padding: 13px 16px 13px 40px;
  color: #fff;
  background: rgb(255 255 255 / 8%);
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 8px;
}

.industrial-page--forest .industrial-catalog li::before {
  top: 50%;
  left: 17px;
  width: 8px;
  height: 8px;
  background: #f5c518;
  transform: translateY(-50%);
}

.industrial-page--forest .industrial-catalog__card:hover {
  box-shadow: none;
  transform: none;
}

.industrial-page--forest .industrial-catalog__card:hover img {
  transform: scale(1.02);
}

.industrial-page--forest .industrial-video {
  background: #fff;
}

.industrial-page--forest .industrial-video .industrial-content__eyebrow {
  color: #0757a4;
}

.industrial-page--forest .industrial-video h2 {
  color: #052f55;
}

.industrial-page--forest .industrial-video__frame {
  border: 8px solid #fff;
  box-shadow: 0 22px 65px rgb(5 47 85 / 18%);
}

.industrial-content {
  background: $soft;
}

.industrial-content--white {
  background: #fff;
}

.industrial-content__eyebrow {
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 900;
  color: $blue;
  text-transform: uppercase;
  letter-spacing: 0.16em;
}

.industrial-content h2,
.industrial-video h2 {
  max-width: 900px;
  margin: 0 0 28px;
  font-size: clamp(30px, 4vw, 52px);
  line-height: 1.08;
  color: $ink;
  letter-spacing: -0.04em;
}

.industrial-content__lead {
  max-width: 900px;
  line-height: 1.75;
  color: $muted;
}

.industrial-content__layout--media {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(300px, 0.85fr);
  gap: clamp(32px, 6vw, 80px);
  align-items: center;
}

.industrial-content figure {
  margin: 0;
}

.industrial-content figure img {
  display: block;
  width: 100%;
  max-height: 460px;
  object-fit: contain;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 20px 55px rgb(3 35 68 / 12%);
}

.industrial-content ul {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  max-width: 1050px;
  padding: 0;
  margin: 26px 0 0;
  list-style: none;
}

.industrial-content li {
  display: flex;
  gap: 13px;
  align-items: flex-start;
  padding: 20px;
  color: $ink;
  background: #fff;
  border: 1px solid $line;
  border-radius: 12px;
}

.industrial-content--white li {
  background: $soft;
}

.industrial-content li svg {
  flex: 0 0 auto;
  width: 20px;
  color: $blue;
}

.industrial-video {
  background: $navy;
}

.industrial-video .industrial-content__eyebrow {
  color: $yellow;
}

.industrial-video h2 {
  color: #fff;
}

.industrial-video__frame {
  position: relative;
  max-width: 1050px;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #000;
  border-radius: 18px;
  box-shadow: 0 22px 60px rgb(0 0 0 / 25%);
}

.industrial-video iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

@media (width <= $tablet) {
  .industrial-content__layout--media {
    grid-template-columns: 1fr;
  }

  .industrial-catalog__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .industrial-page--forest .industrial-catalog__card {
    grid-template-columns: 1fr;
  }

  .industrial-page--graphite .industrial-catalog__card {
    grid-template-columns: 1fr;
  }

  .industrial-page--indigo .industrial-catalog__card,
  .industrial-page--indigo .industrial-catalog__card:first-child {
    grid-template-columns: 1fr;
  }

  .industrial-page--amber .industrial-catalog__card:first-child {
    grid-template-columns: 1fr;
  }

  .industrial-page--amber .industrial-catalog__card:first-child figure {
    min-height: 320px;
  }

  .industrial-page--indigo .industrial-catalog figure,
  .industrial-page--indigo .industrial-catalog__card:first-child figure {
    min-height: 300px;
    border-right: 0;
    border-bottom: 1px solid rgb(7 87 164 / 9%);
  }

  .industrial-page--graphite .industrial-catalog figure {
    order: 0;
    min-height: 320px;
    border-bottom: 1px solid rgb(7 87 164 / 10%);
    border-left: 0;
  }

  .industrial-page--copper .industrial-catalog__grid,
  .industrial-page--copper .industrial-catalog__card,
  .industrial-page--copper .industrial-catalog__card:first-child,
  .industrial-page--wine .industrial-catalog__card:first-child {
    grid-template-columns: 1fr;
  }

  .industrial-page--blue .industrial-catalog__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .industrial-page--wine .industrial-catalog__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .industrial-page--teal .industrial-catalog__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .industrial-page--wine .industrial-catalog__card:first-child {
    grid-column: 1 / -1;
  }

  .industrial-page--copper .industrial-catalog figure {
    min-height: 280px;
  }

  .industrial-page--forest .industrial-catalog figure {
    order: 0;
    min-height: 360px;
  }
}

@media (width <= $phone) {
  .industrial-content ul {
    grid-template-columns: 1fr;
  }

  .industrial-section-heading,
  .industrial-catalog__grid {
    grid-template-columns: 1fr;
  }

  .industrial-page .industrial-editorial__grid {
    grid-template-columns: 1fr;
  }

  .industrial-page--wine .industrial-catalog__grid {
    grid-template-columns: 1fr;
  }

  .industrial-page--teal .industrial-catalog__grid {
    grid-template-columns: 1fr;
  }

  .industrial-page--indigo .industrial-catalog__grid {
    grid-template-columns: 1fr;
  }

  .industrial-page--amber .industrial-catalog__grid {
    grid-template-columns: 1fr;
  }

  .industrial-page--amber .industrial-catalog__card,
  .industrial-page--amber .industrial-catalog__card:first-child {
    min-height: 0;
  }

  .industrial-page--amber .industrial-catalog__card:first-child {
    grid-column: auto;
  }

  .industrial-page--amber .industrial-catalog__card:first-child figure {
    min-height: 260px;
  }

  .industrial-page--indigo .industrial-catalog__card:first-child {
    grid-column: auto;
  }

  .industrial-page--indigo .industrial-catalog figure,
  .industrial-page--indigo .industrial-catalog__card:first-child figure {
    min-height: 240px;
  }

  .industrial-page--teal .industrial-catalog__card {
    min-height: 0;
  }

  .industrial-page--teal .industrial-catalog figure {
    height: 220px;
  }

  .industrial-page--blue .industrial-catalog__grid {
    grid-template-columns: 1fr;
  }

  .industrial-page--blue .industrial-catalog figure {
    height: 190px;
  }

  .industrial-page--blue .industrial-catalog__card > div {
    padding: 20px;
  }

  .industrial-page--blue .industrial-editorial__grid article {
    min-height: 0;
  }

  .industrial-page--wine .industrial-catalog__card {
    min-height: 0;
  }

  .industrial-page--wine .industrial-catalog__card:first-child figure {
    min-height: 280px;
  }

  .industrial-section-heading {
    gap: 22px;
    margin-bottom: 32px;
  }

  .industrial-section-heading__intro span {
    max-width: 460px;
  }

  .industrial-section-heading h2 {
    font-size: 30px;
    line-height: 1.08;
    letter-spacing: -0.035em;
  }

  .industrial-page .industrial-editorial__grid article {
    display: grid;
    grid-template-columns: 1fr;
    gap: 18px;
    min-height: 0;
    padding: 24px 20px;
    border-radius: 4px 16px 16px 4px;
  }

  .industrial-page .industrial-editorial__card-head {
    position: relative;
    z-index: 1;
    flex-direction: row;
    gap: 12px;
    align-items: center;
  }

  .industrial-page .industrial-editorial__number {
    grid-row: auto;
    margin: 0;
    font-size: 24px;
    opacity: 1;
  }

  .industrial-page .industrial-editorial__label {
    writing-mode: initial;
    transform: none;
  }

  .industrial-page .industrial-editorial__body {
    position: relative;
    z-index: 1;
  }

  .industrial-page .industrial-editorial h3 {
    margin-bottom: 12px;
    font-size: 24px;
    line-height: 1.2;
  }

  .industrial-page .industrial-editorial p {
    margin-top: 8px;
    font-size: 15px;
    line-height: 1.62;
  }

  .industrial-page .industrial-editorial ul {
    gap: 8px;
    margin-top: 18px;
  }

  .industrial-page .industrial-editorial li {
    padding-left: 18px;
    font-size: 15px;
  }

  .industrial-page--steel .industrial-editorial ul {
    gap: 10px;
  }

  .industrial-page--steel .industrial-editorial li {
    padding: 12px 14px 12px 38px;
    line-height: 1.45;
  }

  .industrial-page--steel .industrial-editorial li::before {
    left: 16px;
  }

  .industrial-editorial__card--wide {
    grid-column: auto;
  }

  .industrial-page--graphite .industrial-editorial__grid article {
    min-height: 0;
  }

  .industrial-page--steel .industrial-editorial__grid article,
  .industrial-page--steel .industrial-editorial__grid article:first-child {
    min-height: 0;
  }

  .industrial-page--graphite .industrial-catalog figure {
    min-height: 260px;
  }

  .industrial-page--forest .industrial-editorial ul {
    grid-template-columns: 1fr;
  }

  .industrial-page--forest .industrial-catalog .industrial-section-heading h2 {
    white-space: normal;
  }
}
</style>
