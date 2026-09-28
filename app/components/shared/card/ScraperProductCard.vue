<script setup lang="ts">
import type { IndustrialSection } from '~/data/pages/_shared/types';

const { variant = 'default', headingTag = 'h3' } = defineProps<{
  product: IndustrialSection;
  index: number;
  variant?: 'default' | 'category';
  headingTag?: 'h3' | 'h4';
}>();
defineEmits<{ action: [] }>();
</script>

<template>
  <article
    :id="product.id"
    class="scraper-product"
    :class="[variant === 'category' ? 'scraper-product--category' : '']"
  >
    <NuxtLink v-if="variant === 'category' && product.href" class="scraper-product__category-link" :to="product.href">
      <img
        class="scraper-product__category-image"
        :src="product.image"
        :alt="product.imageAlt || product.title"
        width="720"
        height="480"
        loading="lazy"
        decoding="async"
      />
      <div class="scraper-product__category-heading">
        <component :is="headingTag" class="scraper-product__category-title">{{ product.title }}</component>
        <Icon class="scraper-product__category-arrow" name="lucide:arrow-up-right" aria-hidden="true" mode="svg" />
      </div>
      <p v-for="paragraph in product.text" :key="paragraph" class="scraper-product__category-text">{{ paragraph }}</p>
    </NuxtLink>
    <template v-else>
      <figure>
        <img
          class="scraper-product__image"
          :class="{ 'scraper-product__image--contain': product.imageFit === 'contain' }"
          :src="product.image"
          :alt="product.imageAlt || product.title"
          loading="lazy"
          width="900"
          height="700"
        />
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
      </figure>
      <div class="scraper-product__body">
        <div class="scraper-product__content">
          <h3>{{ product.title }}</h3>
          <p v-for="paragraph in product.text" :key="paragraph">{{ paragraph }}</p>
          <ul v-if="product.items?.length">
            <li v-for="item in product.items" :key="item">{{ item }}</li>
          </ul>
        </div>
        <NuxtLink v-if="product.href" class="scraper-product__link" :to="product.href">
          Подробнее о товаре
          <Icon name="lucide:arrow-up-right" aria-hidden="true" mode="svg" />
        </NuxtLink>
        <button type="button" @click="$emit('action')">
          Получить расчёт
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </template>
  </article>
</template>

<style scoped lang="scss">
.scraper-product {
  display: flex;
  flex-direction: column;
  min-height: 470px;
  overflow: hidden;
  background: #f2f6f9;
  border: 1px solid #e1e9ef;
  border-radius: 14px;
  transition:
    border-color 0.22s ease,
    transform 0.22s ease;

  &--category {
    min-height: 0;
    background: #fff;
    border: 1px solid $line;
  }

  &__category-link {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 14px;
    padding: 20px;
    color: $ink;
    text-decoration: none;

    &:focus-visible {
      outline: 3px solid $blue;
      outline-offset: -3px;
    }
  }

  &__category-image {
    display: block;
    width: 100%;
    height: 180px;
    object-fit: contain;
  }

  &__category-heading {
    display: flex;
    gap: 12px;
    align-items: start;
    padding-top: 14px;
    border-top: 1px solid $line;
  }

  &--category &__category-title {
    flex: 1;
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.4;
    color: $ink;
    letter-spacing: normal;
  }

  &__category-arrow {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-top: 2px;
    color: $blue;
  }

  &--category &__category-text {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: $muted;
  }
}

.scraper-product:hover {
  border-color: rgb(7 87 164 / 35%);
  transform: translateY(-4px);
}

.scraper-product figure {
  position: relative;
  height: 250px;
  margin: 0;
  background: #fff;
}

.scraper-product__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.scraper-product__image--contain {
  padding: 12px;
  object-fit: contain;
}

.scraper-product figure > span {
  position: absolute;
  top: 16px;
  left: 16px;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  font-size: 11px;
  font-weight: 900;
  color: #052f55;
  background: #f5c518;
  border-radius: 50%;
}

.scraper-product__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 25px;
}

.scraper-product__content {
  flex: 1;
}

.scraper-product h3 {
  margin: 0;
  font-size: 23px;
  line-height: 1.18;
  color: #052f55;
  letter-spacing: -0.035em;
}

.scraper-product p {
  margin: 14px 0 0;
  line-height: 1.65;
  color: #627386;
}

.scraper-product ul {
  display: grid;
  gap: 8px;
  padding: 0;
  margin: 16px 0 0;
  list-style: none;
}

.scraper-product li {
  position: relative;
  padding: 9px 11px 9px 28px;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.45;
  color: #284863;
  background: #fff;
  border: 1px solid #e1e9ef;
  border-radius: 7px;
}

.scraper-product li::before {
  position: absolute;
  top: 15px;
  left: 12px;
  width: 6px;
  height: 6px;
  content: '';
  background: #f5c518;
  border-radius: 50%;
}

.scraper-product__link {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  min-height: 48px;
  padding: 0 17px;
  margin-top: 18px;
  font-size: 14px;
  font-weight: 800;
  color: #0757a4;
  text-decoration: none;
  background: #fff;
  border: 1px solid rgb(7 87 164 / 22%);
  border-radius: 7px;
  transition:
    color 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;
}

.scraper-product__link:hover {
  color: #fff;
  background: #0757a4;
  border-color: #0757a4;
}

.scraper-product__link :deep(svg) {
  flex: 0 0 auto;
  width: 18px;
  height: 18px;
}

.scraper-product button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 52px;
  padding: 0 18px;
  margin-top: 10px;
  font-size: 16px;
  font-weight: 850;
  color: #052f55;
  text-align: left;
  cursor: pointer;
  background: #f5c518;
  border: 1px solid #f5c518;
  border-radius: 7px;
  box-shadow: 0 8px 20px rgb(245 197 24 / 20%);
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.scraper-product button:hover {
  background: #ffda45;
  border-color: #ffda45;
  box-shadow: 0 11px 24px rgb(245 197 24 / 30%);
  transform: translateY(-2px);
}

.scraper-product button span {
  font-size: 22px;
  transition: transform 0.2s ease;
}

.scraper-product button:hover span {
  transform: translateX(4px);
}
</style>
