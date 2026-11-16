<script setup lang="ts">
import MetalProfileDiagram from '~/components/calculators/MetalProfileDiagram.vue';
import {
  metalCalculatorContent as content,
  metalFields,
  metalMaterials,
  metalShapes,
  rebarDiameters,
  standardChannelSizes,
} from '~/data/metal-calculator';
import type { MetalField, MetalShape } from '~/data/metal-calculator';
import { seo } from '~/data/pages/kalkulyator-vesa-metalla/seo';
import { usefulResourcesBreadcrumb } from '~/data/useful-resources';
import { calculateMetalLength, calculateMetalWeight } from '~/utils/calculate-metal-weight';
import type { MetalDimensions, MetalLengthResult, MetalWeightResult } from '~/utils/calculate-metal-weight';

usePageSeo(seo);

const shape = ref<MetalShape>('sheet');
const mode = ref<'weight' | 'length'>('weight');
const material = ref<(typeof metalMaterials)[number]['id']>('steel');
const dimensions = reactive(
  Object.fromEntries(Object.entries(metalFields).map(([key, field]) => [key, field.default])) as MetalDimensions,
);
const customDensity = ref(7850);
const quantity = ref(1);
const targetKg = ref(100);
const channelSize = ref<(typeof standardChannelSizes)[number]['id']>('10P');
const result = ref<MetalWeightResult | null>(null);
const lengthResult = ref<MetalLengthResult | null>(null);
const error = ref('');

const selectedShape = computed(() => metalShapes.find((item) => item.id === shape.value) ?? metalShapes[0]!);
const selectedMaterial = computed(() => metalMaterials.find((item) => item.id === material.value) ?? metalMaterials[0]);
const selectedStandardChannel = computed(
  () => standardChannelSizes.find((item) => item.id === channelSize.value) ?? standardChannelSizes[0],
);
const density = computed(() => (material.value === 'custom' ? customDensity.value : selectedMaterial.value.density));
const lengthAvailable = computed(() => shape.value !== 'flange' && shape.value !== 'elbow');
const visibleFields = computed(() =>
  mode.value === 'length'
    ? selectedShape.value.fields.filter((field) => field !== (shape.value === 'sheet' ? 'height' : 'length'))
    : selectedShape.value.fields,
);

watch([shape, mode, material, customDensity, quantity, targetKg, channelSize, dimensions], () => {
  result.value = null;
  lengthResult.value = null;
  error.value = '';
});

watch(shape, () => {
  if (!lengthAvailable.value) mode.value = 'weight';
});

function calculate() {
  error.value = '';
  if (!Number.isInteger(quantity.value) || quantity.value < 1) {
    error.value = content.quantityError;
    result.value = null;
    return;
  }
  if (mode.value === 'length') {
    if (!lengthAvailable.value) {
      error.value = content.lengthUnavailable;
      return;
    }
    lengthResult.value = calculateMetalLength({
      shape: shape.value,
      dimensions,
      density: density.value,
      quantity: quantity.value,
      targetKg: targetKg.value,
      channelSize: channelSize.value,
    });
    if (!lengthResult.value) error.value = content.invalidLength;
  } else {
    result.value = calculateMetalWeight({
      shape: shape.value,
      dimensions,
      density: density.value,
      quantity: quantity.value,
      channelSize: channelSize.value,
    });
    if (!result.value) error.value = content.invalid;
  }
}

function reset() {
  shape.value = 'sheet';
  mode.value = 'weight';
  material.value = 'steel';
  for (const [key, field] of Object.entries(metalFields)) dimensions[key as MetalField] = field.default;
  customDensity.value = 7850;
  quantity.value = 1;
  targetKg.value = 100;
  channelSize.value = '10P';
  result.value = null;
  lengthResult.value = null;
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
        <BreadcrumbsNavigation
          tone="light"
          :items="[{ label: content.home, to: '/' }, usefulResourcesBreadcrumb, { label: content.title }]"
        />
        <p class="metal-calculator__eyebrow">{{ content.eyebrow }}</p>
        <h1 class="metal-calculator__title">{{ content.title }}</h1>
        <p class="metal-calculator__intro">{{ content.description }}</p>
      </div>
    </section>

    <section class="metal-calculator__workspace site-container">
      <div class="metal-calculator__selector">
        <h2 class="metal-calculator__selector-title">{{ content.parameters }}</h2>
        <div class="metal-calculator__selector-columns">
          <div class="metal-calculator__selector-group">
            <h3 class="metal-calculator__selector-heading">{{ content.material }}</h3>
            <button
              v-for="item in metalMaterials"
              :key="item.id"
              class="metal-calculator__selector-button"
              :class="{ 'metal-calculator__selector-button--active': material === item.id }"
              type="button"
              :aria-pressed="material === item.id"
              @click="material = item.id"
            >
              {{ item.label }}
            </button>
          </div>
          <div class="metal-calculator__selector-group">
            <h3 class="metal-calculator__selector-heading">{{ content.shape }}</h3>
            <button
              v-for="item in metalShapes"
              :key="item.id"
              class="metal-calculator__selector-button"
              :class="{ 'metal-calculator__selector-button--active': shape === item.id }"
              type="button"
              :aria-pressed="shape === item.id"
              @click="shape = item.id"
            >
              {{ item.label }}
            </button>
          </div>
        </div>
        <div class="metal-calculator__selector-density">
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
          <p class="metal-calculator__density-note">{{ content.densityNote }}</p>
        </div>
      </div>

      <figure class="metal-calculator__diagram">
        <h2 class="metal-calculator__diagram-title">{{ selectedShape.label }}</h2>
        <MetalProfileDiagram :shape="shape" :title="selectedShape.label" />
        <figcaption class="metal-calculator__diagram-caption">{{ content.diagramCaption }}</figcaption>
      </figure>

      <form class="metal-calculator__form" novalidate @submit.prevent="calculate">
        <h2 class="metal-calculator__heading">
          {{ mode === 'weight' ? content.weightMode : content.lengthMode }}: {{ selectedShape.label.toLowerCase() }}
        </h2>

        <fieldset class="metal-calculator__mode">
          <legend class="metal-calculator__mode-label">{{ content.mode }}</legend>
          <div class="metal-calculator__mode-options">
            <label
              class="metal-calculator__mode-option"
              :class="{ 'metal-calculator__mode-option--active': mode === 'weight' }"
            >
              <input
                v-model="mode"
                class="metal-calculator__mode-radio"
                type="radio"
                name="metal-mode"
                value="weight"
              />
              {{ content.weightMode }}
            </label>
            <label
              class="metal-calculator__mode-option"
              :class="{ 'metal-calculator__mode-option--active': mode === 'length' }"
            >
              <input
                v-model="mode"
                class="metal-calculator__mode-radio"
                type="radio"
                name="metal-mode"
                value="length"
                :disabled="!lengthAvailable"
              />
              {{ content.lengthMode }}
            </label>
          </div>
          <p class="metal-calculator__mode-note">{{ content.lengthNote }}</p>
        </fieldset>

        <h2 class="metal-calculator__heading">{{ content.dimensions }}</h2>
        <div v-if="shape === 'channel'" class="metal-calculator__field">
          <label class="metal-calculator__label" for="metal-channel-size">{{ content.channelSize }}</label>
          <select id="metal-channel-size" v-model="channelSize" class="metal-calculator__input">
            <option v-for="item in standardChannelSizes" :key="item.id" :value="item.id">{{ item.label }}</option>
          </select>
          <p class="metal-calculator__channel-spec">
            {{ content.channelSpec }} ({{ content.channelSource }}): h
            {{ format(selectedStandardChannel.height, 0) }} мм · b
            {{ format(selectedStandardChannel.flangeWidth, 0) }} мм · s
            {{ format(selectedStandardChannel.webThickness, 1) }} мм · t
            {{ format(selectedStandardChannel.flangeThickness, 1) }} мм
          </p>
        </div>
        <div class="metal-calculator__grid">
          <div v-for="key in visibleFields" :key="key" class="metal-calculator__field">
            <label class="metal-calculator__label" :for="`metal-${key}`">
              {{ shape === 'sheet' && key === 'height' ? content.sheetLength : metalFields[key].label }},
              {{ metalFields[key].unit }}
            </label>
            <select
              v-if="shape === 'rebar' && key === 'diameter'"
              :id="`metal-${key}`"
              v-model.number="dimensions[key]"
              class="metal-calculator__input"
            >
              <option v-for="diameter in rebarDiameters" :key="diameter" :value="diameter">{{ diameter }} мм</option>
            </select>
            <input
              v-else
              :id="`metal-${key}`"
              v-model.number="dimensions[key]"
              class="metal-calculator__input"
              type="number"
              min="0.01"
              step="any"
              inputmode="decimal"
            />
          </div>
          <div v-if="mode === 'length'" class="metal-calculator__field">
            <label class="metal-calculator__label" for="metal-target-weight">{{ content.targetWeight }}</label>
            <input
              id="metal-target-weight"
              v-model.number="targetKg"
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
          <button class="metal-calculator__calculate" type="submit">
            {{ mode === 'weight' ? content.calculate : content.calculateLength }}
          </button>
          <button class="metal-calculator__reset" type="button" @click="reset">{{ content.reset }}</button>
        </div>
      </form>

      <aside class="metal-calculator__results" aria-live="polite">
        <p class="metal-calculator__results-kicker">{{ content.results }}</p>
        <template v-if="mode === 'length' && lengthResult">
          <div class="metal-calculator__primary">
            <span>{{ content.totalLength }}</span>
            <strong>
              {{ format(lengthResult.totalMeters) }}
              <small>м</small>
            </strong>
          </div>
          <dl class="metal-calculator__metrics">
            <div class="metal-calculator__metric">
              <dt>{{ content.pieceLength }}</dt>
              <dd>{{ format(lengthResult.pieceMeters) }} м</dd>
            </div>
            <div class="metal-calculator__metric">
              <dt>{{ content.meterWeight }}</dt>
              <dd>{{ format(lengthResult.kgPerMeter) }} кг/м</dd>
            </div>
            <div class="metal-calculator__metric">
              <dt>{{ content.totalWeight }}</dt>
              <dd>{{ format(targetKg) }} кг</dd>
            </div>
          </dl>
        </template>
        <template v-else-if="result">
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
        <p v-else class="metal-calculator__empty">{{ mode === 'weight' ? content.empty : content.emptyLength }}</p>
      </aside>
    </section>

    <section class="metal-calculator__method">
      <div class="site-container metal-calculator__method-inner">
        <h2>{{ content.methodTitle }}</h2>
        <div>
          <p>{{ content.method }}</p>
          <p>{{ content.inverseMethod }}</p>
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
    padding: 34px 0 40px;
    color: #fff;
    background: $navy;
  }

  &__eyebrow {
    margin: 22px 0 10px;
    font-size: 11px;
    font-weight: 800;
    color: $yellow;
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }

  &__title {
    max-width: 1100px;
    margin: 0;
    font-size: var(--resource-hero-title-size);
    line-height: 1.12;
    letter-spacing: -0.045em;
  }

  &__intro {
    max-width: 750px;
    margin: 14px 0 0;
    font-size: 15px;
    line-height: 1.5;
    color: rgba(#fff, 0.78);
  }

  &__workspace {
    display: grid;
    grid-template-columns: minmax(240px, 0.95fr) minmax(220px, 0.9fr) minmax(280px, 1.1fr) minmax(190px, 0.7fr);
    gap: 12px;
    align-items: stretch;
    padding-block: 32px 80px;
  }

  &__selector,
  &__diagram,
  &__form {
    min-width: 0;
    padding: 22px;
    background: #fff;
    border: 1px solid $line;
    border-radius: 12px;
  }

  &__selector-title,
  &__diagram-title {
    margin: 0 0 20px;
    font-size: 17px;
    line-height: 1.3;
  }

  &__selector-columns {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    gap: 10px;
  }

  &__selector-group {
    min-width: 0;
  }

  &__selector-heading {
    margin: 0 0 10px;
    font-size: 11px;
    font-weight: 800;
    color: $muted;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  &__selector-button {
    display: block;
    width: 100%;
    min-height: 38px;
    padding: 8px 9px;
    font: inherit;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.25;
    color: $ink;
    text-align: left;
    cursor: pointer;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 8px;

    &:hover,
    &--active {
      background: rgba($blue, 0.1);
      border-color: $line;
    }

    &:focus-visible {
      outline: 2px solid $blue;
      outline-offset: 2px;
    }
  }

  &__selector-density {
    margin-top: 25px;
  }

  &__density-note,
  &__diagram-caption,
  &__channel-spec {
    margin: 9px 0 0;
    font-size: 11px;
    line-height: 1.5;
    color: $muted;
  }

  &__diagram {
    margin: 0;
  }

  &__diagram-title {
    text-align: center;
  }

  &__diagram-caption {
    text-align: center;
  }

  &__heading {
    padding-top: 20px;
    margin: 0 0 18px;
    font-size: 17px;
    border-top: 1px solid $line;

    &:first-child {
      padding-top: 0;
      border-top: 0;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
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

  &__mode {
    min-width: 0;
    padding: 0 0 24px;
    margin: 0;
    border: 0;
  }

  &__mode-label {
    padding: 0 0 10px;
    font-size: 12px;
    font-weight: 700;
  }

  &__mode-options {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  &__mode-option {
    display: flex;
    gap: 9px;
    align-items: center;
    min-height: 50px;
    padding: 10px 14px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    border: 1px solid $line;
    border-radius: 8px;

    &--active {
      color: $navy;
      background: $soft;
      border-color: $blue;
    }

    &:has(:disabled) {
      color: $muted;
      cursor: not-allowed;
    }
  }

  &__mode-radio {
    flex: 0 0 auto;
    margin: 0;
    accent-color: $blue;

    &:focus-visible {
      outline: 2px solid $blue;
      outline-offset: 3px;
    }
  }

  &__mode-note {
    margin: 9px 0 0;
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
    min-width: 0;
    padding: 22px;
    color: #fff;
    background: $navy;
    border-radius: 12px;
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
    font-size: var(--section-heading-size);
    line-height: var(--section-heading-leading);
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
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    &__selector,
    &__results {
      grid-column: 1 / -1;
    }

    &__results {
      position: static;
    }
  }
}

@include phone {
  .metal-calculator {
    &__hero {
      padding: 26px 0 34px;
    }

    &__eyebrow {
      margin-top: 18px;
    }

    &__grid,
    &__method-inner,
    &__mode-options {
      grid-template-columns: 1fr;
      gap: 0;
    }

    &__workspace {
      grid-template-columns: 1fr;
    }

    &__selector,
    &__results {
      grid-column: auto;
    }

    &__selector,
    &__diagram,
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
