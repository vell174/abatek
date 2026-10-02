<script setup lang="ts">
import { metalCalculatorContent as content, metalFields, metalMaterials, metalShapes } from '~/data/metal-calculator';
import type { MetalField, MetalShape } from '~/data/metal-calculator';
import { seo } from '~/data/pages/kalkulyator-vesa-metalla/seo';
import { calculateMetalWeight } from '~/utils/calculate-metal-weight';
import type { MetalDimensions, MetalWeightResult } from '~/utils/calculate-metal-weight';

usePageSeo(seo);

const shape = ref<MetalShape>('sheet');
const material = ref<(typeof metalMaterials)[number]['id']>('steel');
const dimensions = reactive(
  Object.fromEntries(Object.entries(metalFields).map(([key, field]) => [key, field.default])) as MetalDimensions,
);
const customDensity = ref(7850);
const quantity = ref(1);
const result = ref<MetalWeightResult | null>(null);
const error = ref('');

const selectedShape = computed(() => metalShapes.find((item) => item.id === shape.value) ?? metalShapes[0]!);
const selectedMaterial = computed(() => metalMaterials.find((item) => item.id === material.value) ?? metalMaterials[0]);
const density = computed(() => (material.value === 'custom' ? customDensity.value : selectedMaterial.value.density));

watch([shape, material, customDensity, quantity, dimensions], () => {
  result.value = null;
  error.value = '';
});

function calculate() {
  error.value = '';
  if (!Number.isInteger(quantity.value) || quantity.value < 1) {
    error.value = content.quantityError;
    result.value = null;
    return;
  }
  result.value = calculateMetalWeight({
    shape: shape.value,
    dimensions,
    density: density.value,
    quantity: quantity.value,
  });
  if (!result.value) error.value = content.invalid;
}

function reset() {
  shape.value = 'sheet';
  material.value = 'steel';
  for (const [key, field] of Object.entries(metalFields)) dimensions[key as MetalField] = field.default;
  customDensity.value = 7850;
  quantity.value = 1;
  result.value = null;
  error.value = '';
}

function format(value: number, digits = 3) {
  return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: digits }).format(value);
}
</script>

<template>
  <main class="metal-calculator">
    <section class="metal-calculator__hero">
      <div class="site-container">
        <BreadcrumbsNavigation :items="[{ label: content.home, to: '/' }, { label: content.title }]" />
        <p class="metal-calculator__eyebrow">{{ content.eyebrow }}</p>
        <h1 class="metal-calculator__title">{{ content.title }}</h1>
        <p class="metal-calculator__intro">{{ content.description }}</p>
      </div>
    </section>

    <section class="metal-calculator__workspace site-container">
      <form class="metal-calculator__form" novalidate @submit.prevent="calculate">
        <h2 class="metal-calculator__heading">{{ content.material }}</h2>
        <div class="metal-calculator__grid">
          <div class="metal-calculator__field">
            <label class="metal-calculator__label" for="metal-material">{{ content.material }}</label>
            <select id="metal-material" v-model="material" class="metal-calculator__input">
              <option v-for="item in metalMaterials" :key="item.id" :value="item.id">{{ item.label }}</option>
            </select>
          </div>
          <div class="metal-calculator__field">
            <label class="metal-calculator__label" for="metal-density">{{ content.density }}</label>
            <input
              v-if="material === 'custom'"
              id="metal-density"
              v-model.number="customDensity"
              class="metal-calculator__input"
              type="number"
              min="0.01"
              step="any"
              inputmode="decimal"
            />
            <output v-else id="metal-density" class="metal-calculator__input metal-calculator__input--read-only">
              {{ format(density, 0) }}
            </output>
          </div>
        </div>
        <p class="metal-calculator__hint">{{ content.densityNote }}</p>

        <h2 class="metal-calculator__heading">{{ content.shape }}</h2>
        <div class="metal-calculator__field">
          <label class="metal-calculator__label" for="metal-shape">{{ content.shape }}</label>
          <select id="metal-shape" v-model="shape" class="metal-calculator__input">
            <option v-for="item in metalShapes" :key="item.id" :value="item.id">{{ item.label }}</option>
          </select>
        </div>

        <h2 class="metal-calculator__heading">{{ content.dimensions }}</h2>
        <div class="metal-calculator__grid">
          <div v-for="key in selectedShape.fields" :key="key" class="metal-calculator__field">
            <label class="metal-calculator__label" :for="`metal-${key}`">
              {{ shape === 'sheet' && key === 'height' ? content.sheetLength : metalFields[key].label }},
              {{ metalFields[key].unit }}
            </label>
            <input
              :id="`metal-${key}`"
              v-model.number="dimensions[key]"
              class="metal-calculator__input"
              type="number"
              min="0.01"
              step="any"
              inputmode="decimal"
            />
          </div>
          <div class="metal-calculator__field">
            <label class="metal-calculator__label" for="metal-quantity">{{ content.quantity }}</label>
            <input
              id="metal-quantity"
              v-model.number="quantity"
              class="metal-calculator__input"
              type="number"
              min="1"
              step="1"
              inputmode="numeric"
            />
          </div>
        </div>
        <p v-if="selectedShape.note" class="metal-calculator__hint">{{ selectedShape.note }}</p>
        <p v-if="error" class="metal-calculator__error" role="alert">{{ error }}</p>
        <div class="metal-calculator__actions">
          <button class="metal-calculator__calculate" type="submit">{{ content.calculate }}</button>
          <button class="metal-calculator__reset" type="button" @click="reset">{{ content.reset }}</button>
        </div>
      </form>

      <aside class="metal-calculator__results" aria-live="polite">
        <p class="metal-calculator__results-kicker">{{ content.results }}</p>
        <template v-if="result">
          <div class="metal-calculator__primary">
            <span>{{ content.totalWeight }}</span>
            <strong>
              {{ format(result.totalKg) }}
              <small>кг</small>
            </strong>
          </div>
          <dl class="metal-calculator__metrics">
            <div class="metal-calculator__metric">
              <dt>{{ content.pieceWeight }}</dt>
              <dd>{{ format(result.pieceKg) }} кг</dd>
            </div>
            <div v-if="result.kgPerMeter !== null" class="metal-calculator__metric">
              <dt>{{ content.meterWeight }}</dt>
              <dd>{{ format(result.kgPerMeter) }} кг/м</dd>
            </div>
            <div class="metal-calculator__metric">
              <dt>{{ content.volume }}</dt>
              <dd>{{ format(result.totalLiters) }} л</dd>
            </div>
          </dl>
        </template>
        <p v-else class="metal-calculator__empty">{{ content.empty }}</p>
      </aside>
    </section>

    <section class="metal-calculator__method">
      <div class="site-container metal-calculator__method-inner">
        <h2>{{ content.methodTitle }}</h2>
        <div>
          <p>{{ content.method }}</p>
          <p>{{ content.methodNote }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@use '~/assets/styles/mixins' as *;

.metal-calculator {
  color: $ink;
  background: $soft;

  &__hero {
    padding: 72px 0 68px;
    color: #fff;
    background: $navy;
  }

  &__eyebrow {
    margin: 46px 0 16px;
    font-size: 11px;
    font-weight: 800;
    color: $yellow;
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }

  &__title {
    max-width: 950px;
    margin: 0;
    font-size: clamp(36px, 5vw, 68px);
    line-height: 1.05;
    letter-spacing: -0.045em;
  }

  &__intro {
    max-width: 750px;
    margin: 24px 0 0;
    font-size: 16px;
    line-height: 1.6;
    color: rgba(#fff, 0.78);
  }

  &__workspace {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(300px, 0.8fr);
    gap: 28px;
    align-items: start;
    padding-block: 32px 80px;
  }

  &__form {
    padding: 30px;
    background: #fff;
    border: 1px solid $line;
    border-radius: 16px;
  }

  &__heading {
    padding-top: 20px;
    margin: 0 0 18px;
    font-size: 21px;
    border-top: 1px solid $line;

    &:first-child {
      padding-top: 0;
      border-top: 0;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }

  &__field {
    min-width: 0;
    margin-bottom: 18px;
  }

  &__label {
    display: block;
    margin-bottom: 8px;
    font-size: 12px;
    font-weight: 700;
  }

  &__input {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 48px;
    padding: 10px 13px;
    font: inherit;
    font-size: 14px;
    color: $ink;
    background: #fff;
    border: 1px solid $line;
    border-radius: 8px;

    &:focus-visible {
      outline: 2px solid $blue;
      outline-offset: 2px;
    }

    &--read-only {
      background: $soft;
    }
  }

  &__hint {
    margin: 0 0 20px;
    font-size: 12px;
    line-height: 1.5;
    color: $muted;
  }

  &__error {
    margin: 0 0 18px;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.5;
    color: $blue;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  &__calculate,
  &__reset {
    min-height: 50px;
    padding: 12px 24px;
    font: inherit;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
    border-radius: 8px;

    &:focus-visible {
      outline: 2px solid $blue;
      outline-offset: 2px;
    }
  }

  &__calculate {
    color: $navy;
    background: $yellow;
    border: 1px solid $yellow;
  }

  &__reset {
    color: $ink;
    background: #fff;
    border: 1px solid $line;
  }

  &__results {
    position: sticky;
    top: 24px;
    padding: 30px;
    color: #fff;
    background: $navy;
    border-radius: 16px;
  }

  &__results-kicker {
    margin: 0 0 20px;
    font-size: 11px;
    font-weight: 800;
    color: $yellow;
    text-transform: uppercase;
    letter-spacing: 0.14em;
  }

  &__empty {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: rgba(#fff, 0.75);
  }

  &__primary {
    display: grid;
    gap: 10px;
    padding: 22px;
    color: $ink;
    background: $yellow;
    border-radius: 10px;
  }

  &__primary span {
    font-size: 12px;
    font-weight: 700;
  }

  &__primary strong {
    font-size: clamp(30px, 4vw, 52px);
    line-height: 1.1;
    overflow-wrap: anywhere;
  }

  &__primary small {
    font-size: 18px;
  }

  &__metrics {
    margin: 17px 0 0;
  }

  &__metric {
    display: flex;
    gap: 15px;
    justify-content: space-between;
    padding: 13px 0;
    border-bottom: 1px solid rgba(#fff, 0.16);
  }

  &__metric dt {
    font-size: 11px;
    line-height: 1.4;
    color: rgba(#fff, 0.75);
  }

  &__metric dd {
    margin: 0;
    font-size: 12px;
    font-weight: 800;
    text-align: right;
  }

  &__method {
    padding: 64px 0;
    background: #fff;
  }

  &__method-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
  }

  &__method-inner h2 {
    margin: 0;
    font-size: 30px;
  }

  &__method-inner p {
    margin: 0 0 15px;
    font-size: 14px;
    line-height: 1.7;
    color: $muted;
  }
}

@include tablet {
  .metal-calculator {
    &__workspace {
      grid-template-columns: 1fr;
    }

    &__results {
      position: static;
    }
  }
}

@include phone {
  .metal-calculator {
    &__hero {
      padding: 42px 0 52px;
    }

    &__eyebrow {
      margin-top: 36px;
    }

    &__grid,
    &__method-inner {
      grid-template-columns: 1fr;
      gap: 0;
    }

    &__form,
    &__results {
      padding: 22px;
    }

    &__method-inner h2 {
      margin-bottom: 20px;
    }
  }
}
</style>
