<script setup lang="ts">
import type { IndustrialSection } from '~/data/pages/_shared/types';
import ScraperProductCard from '~/components/shared/card/ScraperProductCard.vue';

const props = defineProps<{ title: string; sections: IndustrialSection[] }>();
defineEmits<{ action: [] }>();

const overview = computed(() => props.sections[0]);
const products = computed(() => props.sections.slice(1));
</script>

<template>
  <section class="scraper-catalog">
    <div class="content-section site-container">
      <header class="scraper-catalog__header">
        <div>
          <p>Скребковые конвейеры АБАТЭК</p>
          <h2>{{ title }}</h2>
        </div>
        <p>Подберём тяговый орган, ширину короба, угол трассы и привод под материал и производительность линии.</p>
      </header>

      <article v-if="overview" class="scraper-catalog__overview">
        <figure>
          <img
            :src="overview.image"
            :alt="overview.imageAlt || overview.title"
            loading="lazy"
            width="1200"
            height="800"
          />
        </figure>
        <div>
          <span>Производство под задачу</span>
          <h3>{{ overview.title }}</h3>
          <p v-for="paragraph in overview.text" :key="paragraph">{{ paragraph }}</p>
          <button type="button" @click="$emit('action')">Обсудить проект</button>
        </div>
      </article>

      <div class="scraper-catalog__products">
        <ScraperProductCard
          v-for="(product, index) in products"
          :key="product.title"
          :product="product"
          :index="index"
          @action="$emit('action')"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.scraper-catalog {
  background: #fff;
}

.scraper-catalog__header {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(280px, 0.7fr);
  gap: clamp(35px, 7vw, 90px);
  align-items: end;
  margin-bottom: 46px;
}

.scraper-catalog__header > div > p {
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 900;
  color: #0757a4;
  text-transform: uppercase;
  letter-spacing: 0.16em;
}

.scraper-catalog__header h2 {
  max-width: 820px;
  margin: 0;
  font-size: clamp(36px, 5vw, 66px);
  line-height: 1;
  color: #052f55;
  letter-spacing: -0.055em;
}

.scraper-catalog__header > p {
  padding-left: 22px;
  margin: 0 0 6px;
  line-height: 1.7;
  color: #52677a;
  border-left: 4px solid #f5c518;
}

.scraper-catalog__overview {
  display: grid;
  grid-template-columns: minmax(380px, 1.1fr) minmax(0, 0.9fr);
  min-height: 390px;
  overflow: hidden;
  background: #052f55;
  border: 1px solid #d7e2ea;
  border-radius: 20px;
}

.scraper-catalog figure {
  margin: 0;
}

.scraper-catalog__overview figure {
  min-height: 390px;
  background: #f4f7f9;
}

.scraper-catalog__overview img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.scraper-catalog__overview img {
  object-fit: cover;
}

.scraper-catalog__overview > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(34px, 5vw, 62px);
}

.scraper-catalog__overview > div > span {
  margin-bottom: 15px;
  font-size: 11px;
  font-weight: 900;
  color: #f5c518;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

.scraper-catalog h3 {
  margin: 0;
  color: #052f55;
  letter-spacing: -0.035em;
}

.scraper-catalog__overview h3 {
  font-size: clamp(28px, 3vw, 42px);
  color: #fff;
}

.scraper-catalog__overview p {
  margin: 18px 0 0;
  line-height: 1.7;
  color: rgb(255 255 255 / 70%);
}

.scraper-catalog button {
  min-height: 52px;
  font-size: 16px;
  font-weight: 850;
  cursor: pointer;
}

.scraper-catalog__overview button {
  align-self: flex-start;
  padding-inline: 24px;
  margin-top: 28px;
  color: #052f55;
  background: #f5c518;
  border: 1px solid #f5c518;
  border-radius: 7px;
}

.scraper-catalog__products {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-top: 20px;
}

@media (width <= $tablet) {
  .scraper-catalog__header,
  .scraper-catalog__overview {
    grid-template-columns: 1fr;
  }

  .scraper-catalog__products {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (width <= $phone) {
  .scraper-catalog__products {
    grid-template-columns: 1fr;
  }

  .scraper-catalog__overview,
  .scraper-catalog__overview figure {
    min-height: 0;
  }

  .scraper-catalog__overview figure {
    height: 280px;
  }
}
</style>
