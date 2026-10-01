<script setup lang="ts">
import {
  beltSpeeds,
  beltWidths,
  conveyorCalculatorContent as content,
  defaultConveyorInput,
  drumSurfaces,
  operatingConditions,
  winterOptions,
  wrapAngles,
} from '~/data/conveyor-calculator';
import type { ConveyorCalculatorInput } from '~/data/conveyor-calculator';
import { conveyorToolRoutes } from '~/data/conveyor-tools';
import { referenceLinkLabels, referenceRoutes } from '~/data/conveyor-references';
import { seo } from '~/data/pages/kalkulyator-moshchnosti-privoda-lentochnogo-konveyera/seo';
import { calculateConveyorPower } from '~/utils/calculate-conveyor-power';
import type { ConveyorCalculatorResult } from '~/utils/calculate-conveyor-power';

usePageSeo(seo);

type NumberField = Exclude<keyof ConveyorCalculatorInput, 'geometry'>;
type FieldConfig = { key: NumberField; min?: number; max?: number };

const geometryFields: FieldConfig[] = [
  { key: 'horizontalLength', min: 0.01 },
  { key: 'inclinedLength', min: 0.01 },
  { key: 'inclineAngle', min: 0.01, max: 25 },
];
const loadFields: FieldConfig[] = [
  { key: 'throughput', min: 0.01 },
  { key: 'density', min: 0.01 },
  { key: 'unevenness', min: 0.01 },
  { key: 'utilization', min: 0.01, max: 1 },
  { key: 'availability', min: 0.01, max: 1 },
];
const driveFields: FieldConfig[] = [
  { key: 'lossFactor', min: 0.01 },
  { key: 'efficiency', min: 0.01, max: 0.99 },
];
const form = reactive<ConveyorCalculatorInput>({ ...defaultConveyorInput });
const result = ref<ConveyorCalculatorResult | null>(null);
const errors = ref<Partial<Record<NumberField, string>>>({});
const showMore = ref(false);

watch(
  form,
  () => {
    result.value = null;
    errors.value = {};
  },
  { flush: 'sync' },
);

const visibleGeometryFields = computed(() =>
  geometryFields.filter((field) => {
    if (field.key === 'horizontalLength') return form.geometry !== 'inclined';
    return form.geometry !== 'horizontal';
  }),
);

const detailRows = computed(() => {
  if (!result.value) return [];
  const values = result.value;
  return [
    { label: content.results.designThroughput, value: format(values.designThroughput), unit: content.units.throughput },
    { label: content.results.load, value: format(values.load), unit: content.units.lineLoad },
    { label: content.results.beltLoad, value: format(values.beltLoad), unit: content.units.lineLoad },
    { label: content.results.upperRollerLoad, value: format(values.upperRollerLoad), unit: content.units.lineLoad },
    { label: content.results.lowerRollerLoad, value: format(values.lowerRollerLoad), unit: content.units.lineLoad },
    { label: content.results.dragCoefficient, value: format(values.dragCoefficient, 3), unit: '' },
    { label: content.results.inclineCoefficient, value: format(values.inclineCoefficient, 3), unit: '' },
    { label: content.results.resistanceCoefficient, value: format(values.resistanceCoefficient, 3), unit: '' },
    { label: content.results.tractionFactor, value: format(values.tractionFactor), unit: '' },
    { label: content.results.totalLength, value: format(values.totalLength), unit: content.units.length },
    { label: content.results.liftHeight, value: format(values.liftHeight), unit: content.units.length },
  ];
});

function format(value: number, digits = 2) {
  return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: digits }).format(value);
}

function validate() {
  errors.value = {};
  const activeFields = [...visibleGeometryFields.value, ...loadFields, ...driveFields];
  for (const field of activeFields) {
    const value = form[field.key];
    if (!Number.isFinite(value) || value <= 0) errors.value[field.key] = content.errors.positive;
  }
  if (form.geometry !== 'horizontal' && (form.inclineAngle <= 0 || form.inclineAngle > 25)) {
    errors.value.inclineAngle = content.errors.angle;
  }
  for (const key of ['utilization', 'availability'] as const) {
    if (form[key] > 1) errors.value[key] = content.errors.fraction;
  }
  if (form.efficiency >= 1) errors.value.efficiency = content.errors.efficiency;
  return Object.keys(errors.value).length === 0;
}

function calculate() {
  result.value = null;
  if (!validate()) return;
  result.value = calculateConveyorPower(form);
}

function reset() {
  Object.assign(form, defaultConveyorInput);
  errors.value = {};
  result.value = null;
  showMore.value = false;
}
</script>

<template>
  <main class="conveyor-calculator">
    <section class="conveyor-calculator__hero">
      <div class="site-container conveyor-calculator__hero-inner">
        <BreadcrumbsNavigation
          :items="[{ label: content.homeBreadcrumb, to: '/' }, { label: content.pageBreadcrumb }]"
        />
        <p class="conveyor-calculator__eyebrow">{{ content.eyebrow }}</p>
        <h1 class="conveyor-calculator__title">{{ content.title }}</h1>
        <p class="conveyor-calculator__intro">{{ content.introduction }}</p>
      </div>
    </section>

    <section class="conveyor-calculator__workspace site-container">
      <form class="conveyor-calculator__form" novalidate @submit.prevent="calculate">
        <fieldset class="conveyor-calculator__panel">
          <legend class="conveyor-calculator__panel-title">01 / {{ content.geometryTitle }}</legend>
          <div class="conveyor-calculator__geometry-options">
            <label
              v-for="option in content.geometryOptions"
              :key="option.value"
              class="conveyor-calculator__geometry-option"
              :class="{ 'conveyor-calculator__geometry-option--active': form.geometry === option.value }"
            >
              <input
                v-model="form.geometry"
                class="conveyor-calculator__radio"
                type="radio"
                name="geometry"
                :value="option.value"
              />
              <img
                class="conveyor-calculator__geometry-sketch"
                :src="option.image"
                :alt="option.imageAlt"
                width="220"
                height="110"
              />
              <span class="conveyor-calculator__geometry-name">{{ option.label }}</span>
              <span class="conveyor-calculator__geometry-description">{{ option.description }}</span>
            </label>
          </div>
          <div class="conveyor-calculator__fields">
            <div v-for="field in visibleGeometryFields" :key="field.key" class="conveyor-calculator__field">
              <label class="conveyor-calculator__label" :for="field.key">{{ content.fields[field.key] }}</label>
              <input
                :id="field.key"
                v-model.number="form[field.key]"
                class="conveyor-calculator__input"
                type="number"
                :min="field.min"
                :max="field.max"
                step="any"
                inputmode="decimal"
                :aria-invalid="Boolean(errors[field.key])"
                :aria-describedby="errors[field.key] ? `${field.key}-error` : undefined"
              />
              <span v-if="errors[field.key]" :id="`${field.key}-error`" class="conveyor-calculator__error">
                {{ errors[field.key] }}
              </span>
            </div>
          </div>
        </fieldset>

        <fieldset class="conveyor-calculator__panel">
          <legend class="conveyor-calculator__panel-title">02 / {{ content.loadTitle }}</legend>
          <div class="conveyor-calculator__fields">
            <div v-for="field in loadFields" :key="field.key" class="conveyor-calculator__field">
              <label class="conveyor-calculator__label" :for="field.key">{{ content.fields[field.key] }}</label>
              <input
                :id="field.key"
                v-model.number="form[field.key]"
                class="conveyor-calculator__input"
                type="number"
                :min="field.min"
                :max="field.max"
                step="any"
                inputmode="decimal"
                :aria-invalid="Boolean(errors[field.key])"
                :aria-describedby="errors[field.key] ? `${field.key}-error` : undefined"
              />
              <span v-if="errors[field.key]" :id="`${field.key}-error`" class="conveyor-calculator__error">
                {{ errors[field.key] }}
              </span>
              <NuxtLink
                v-if="field.key === 'density'"
                class="conveyor-calculator__field-help"
                :to="referenceRoutes.materials"
              >
                {{ referenceLinkLabels.materials }}
              </NuxtLink>
            </div>
            <div class="conveyor-calculator__field">
              <label class="conveyor-calculator__label" for="beltWidth">{{ content.fields.beltWidth }}</label>
              <select id="beltWidth" v-model.number="form.beltWidth" class="conveyor-calculator__input">
                <option v-for="width in beltWidths" :key="width" :value="width">{{ width }}</option>
              </select>
              <NuxtLink class="conveyor-calculator__field-help" :to="conveyorToolRoutes.width">
                {{ content.helpLinks.width }}
              </NuxtLink>
            </div>
            <div class="conveyor-calculator__field">
              <label class="conveyor-calculator__label" for="beltSpeed">{{ content.fields.beltSpeed }}</label>
              <select id="beltSpeed" v-model.number="form.beltSpeed" class="conveyor-calculator__input">
                <option v-for="speed in beltSpeeds" :key="speed" :value="speed">{{ format(speed, 3) }}</option>
              </select>
              <NuxtLink
                class="conveyor-calculator__field-help"
                :to="`${referenceRoutes.parameters}#recommended-speeds`"
              >
                {{ content.helpLinks.speedTable }}
              </NuxtLink>
              <NuxtLink class="conveyor-calculator__field-help" :to="conveyorToolRoutes.speed">
                {{ content.helpLinks.speedCalculator }}
              </NuxtLink>
            </div>
          </div>
        </fieldset>

        <fieldset class="conveyor-calculator__panel">
          <legend class="conveyor-calculator__panel-title">03 / {{ content.driveTitle }}</legend>
          <div class="conveyor-calculator__fields">
            <div class="conveyor-calculator__field">
              <label class="conveyor-calculator__label" for="drumSurface">{{ content.fields.drumSurface }}</label>
              <select id="drumSurface" v-model.number="form.drumSurface" class="conveyor-calculator__input">
                <option v-for="(surface, index) in drumSurfaces" :key="surface" :value="index">{{ surface }}</option>
              </select>
            </div>
            <div class="conveyor-calculator__field">
              <label class="conveyor-calculator__label" for="wrapAngle">{{ content.fields.wrapAngle }}</label>
              <select id="wrapAngle" v-model.number="form.wrapAngle" class="conveyor-calculator__input">
                <option v-for="angle in wrapAngles" :key="angle" :value="angle">{{ angle }}</option>
              </select>
            </div>
            <div class="conveyor-calculator__field">
              <label class="conveyor-calculator__label" for="operatingConditions">
                {{ content.fields.operatingConditions }}
              </label>
              <select
                id="operatingConditions"
                v-model.number="form.operatingConditions"
                class="conveyor-calculator__input"
              >
                <option v-for="(condition, index) in operatingConditions" :key="condition" :value="index">
                  {{ condition }}
                </option>
              </select>
              <NuxtLink class="conveyor-calculator__field-help" :to="conveyorToolRoutes.operating">
                {{ content.helpLinks.operating }}
              </NuxtLink>
            </div>
            <div class="conveyor-calculator__field">
              <label class="conveyor-calculator__label" for="winter">{{ content.fields.winter }}</label>
              <select id="winter" v-model.number="form.winter" class="conveyor-calculator__input">
                <option v-for="option in winterOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
            <div v-for="field in driveFields" :key="field.key" class="conveyor-calculator__field">
              <label class="conveyor-calculator__label" :for="field.key">{{ content.fields[field.key] }}</label>
              <input
                :id="field.key"
                v-model.number="form[field.key]"
                class="conveyor-calculator__input"
                type="number"
                :min="field.min"
                :max="field.max"
                step="any"
                inputmode="decimal"
                :aria-invalid="Boolean(errors[field.key])"
                :aria-describedby="errors[field.key] ? `${field.key}-error` : undefined"
              />
              <span v-if="errors[field.key]" :id="`${field.key}-error`" class="conveyor-calculator__error">
                {{ errors[field.key] }}
              </span>
            </div>
          </div>
        </fieldset>

        <div class="conveyor-calculator__actions">
          <button class="conveyor-calculator__button" type="submit">{{ content.calculate }}</button>
          <button class="conveyor-calculator__reset" type="button" @click="reset">{{ content.reset }}</button>
        </div>
      </form>

      <aside class="conveyor-calculator__results" aria-live="polite">
        <div class="conveyor-calculator__result-header">
          <span class="conveyor-calculator__result-kicker">{{ content.resultKicker }}</span>
          <h2>{{ content.resultTitle }}</h2>
        </div>
        <p v-if="!result" class="conveyor-calculator__empty">{{ content.emptyResult }}</p>
        <template v-else>
          <div class="conveyor-calculator__power">
            <span>{{ content.results.requiredPower }}</span>
            <strong>
              {{ format(result.requiredPower) }}
              <small>{{ content.units.power }}</small>
            </strong>
          </div>
          <div class="conveyor-calculator__nominal">
            <span>{{ content.results.selectedPower }}</span>
            <strong v-if="result.selectedPower !== null">
              {{ format(result.selectedPower) }} {{ content.units.power }}
            </strong>
            <strong v-else>—</strong>
          </div>
          <p v-if="result.selectedPower === null" class="conveyor-calculator__notice">
            {{ content.errors.unavailablePower }}
          </p>
          <dl class="conveyor-calculator__metrics">
            <div class="conveyor-calculator__metric">
              <dt>{{ content.results.force }}</dt>
              <dd>{{ format(result.force) }} {{ content.units.force }}</dd>
            </div>
            <div class="conveyor-calculator__metric">
              <dt>{{ content.results.tightTension }}</dt>
              <dd>{{ format(result.tightTension) }} {{ content.units.force }}</dd>
            </div>
            <div class="conveyor-calculator__metric">
              <dt>{{ content.results.slackTension }}</dt>
              <dd>{{ format(result.slackTension) }} {{ content.units.force }}</dd>
            </div>
            <div class="conveyor-calculator__metric">
              <dt>{{ content.results.rollerDiameter }}</dt>
              <dd>{{ result.rollerDiameter }} {{ content.units.diameter }}</dd>
            </div>
            <div class="conveyor-calculator__metric">
              <dt>{{ content.results.upperRollerSpacing }}</dt>
              <dd>{{ format(result.upperRollerSpacing) }} {{ content.units.length }}</dd>
            </div>
            <div class="conveyor-calculator__metric">
              <dt>{{ content.results.lowerRollerSpacing }}</dt>
              <dd>{{ format(result.lowerRollerSpacing) }} {{ content.units.length }}</dd>
            </div>
          </dl>
          <button
            class="conveyor-calculator__more"
            type="button"
            :aria-expanded="showMore"
            @click="showMore = !showMore"
          >
            {{ content.moreResults }}
            <span aria-hidden="true">{{ showMore ? '−' : '+' }}</span>
          </button>
          <dl v-if="showMore" class="conveyor-calculator__metrics conveyor-calculator__metrics--more">
            <div v-for="row in detailRows" :key="row.label" class="conveyor-calculator__metric">
              <dt>{{ row.label }}</dt>
              <dd>{{ row.value }} {{ row.unit }}</dd>
            </div>
          </dl>
        </template>
      </aside>
    </section>

    <section class="conveyor-calculator__method">
      <div class="site-container conveyor-calculator__method-inner">
        <h2>{{ content.methodTitle }}</h2>
        <div class="conveyor-calculator__method-copy">
          <p>{{ content.method }}</p>
          <p>{{ content.methodNote }}</p>
          <a :href="content.referenceUrl" target="_blank" rel="noopener noreferrer">{{ content.referenceLabel }} ↗</a>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@use '~/assets/styles/mixins' as *;

.conveyor-calculator {
  color: $ink;
  background: $soft;

  &__hero {
    padding: 74px 0 66px;
    color: #fff;
    background: $navy;
  }

  &__hero-inner {
    max-width: $wide;
  }

  &__eyebrow,
  &__result-kicker {
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }

  &__eyebrow {
    margin: 50px 0 18px;
    color: $yellow;
  }

  &__title {
    max-width: 900px;
    margin: 0;
    font-size: clamp(38px, 5vw, 72px);
    line-height: 1.04;
    letter-spacing: -0.045em;
  }

  &__intro {
    max-width: 720px;
    margin: 24px 0 0;
    font-size: 17px;
    line-height: 1.65;
    color: rgba(#fff, 0.78);
  }

  &__workspace {
    display: grid;
    grid-template-columns: minmax(0, 1.5fr) minmax(320px, 0.85fr);
    gap: 28px;
    align-items: start;
    padding-block: 54px 92px;
  }

  &__form {
    display: grid;
    gap: 20px;
    min-width: 0;
  }

  &__panel {
    min-width: 0;
    padding: 28px;
    margin: 0;
    background: #fff;
    border: 1px solid $line;
    border-radius: 16px;
  }

  &__panel-title {
    padding: 0 8px;
    font-size: 18px;
    font-weight: 800;
  }

  &__geometry-options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin: 12px 0 24px;
  }

  &__geometry-option {
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-height: 215px;
    padding: 17px;
    cursor: pointer;
    border: 1px solid $line;
    border-radius: 10px;

    &--active {
      background: $soft;
      border-color: $blue;
    }

    &:focus-within {
      outline: 2px solid $blue;
      outline-offset: 2px;
    }
  }

  &__radio {
    accent-color: $blue;
  }

  &__geometry-sketch {
    display: block;
    width: 100%;
    max-width: 220px;
    height: auto;
    margin: 7px auto 2px;
  }

  &__geometry-name {
    font-size: 13px;
    font-weight: 800;
  }

  &__geometry-description {
    font-size: 11px;
    line-height: 1.4;
    color: $muted;
  }

  &__fields {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }

  &__field {
    min-width: 0;
  }

  &__label {
    display: block;
    min-height: 38px;
    margin-bottom: 8px;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.45;
  }

  &__input {
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

    &[aria-invalid='true'] {
      border-color: $blue;
    }
  }

  &__error {
    display: block;
    margin-top: 6px;
    font-size: 11px;
    color: $blue;
  }

  &__field-help {
    display: block;
    margin-top: 7px;
    font-size: 11px;
    font-weight: 700;
    color: $blue;
  }

  &__actions {
    display: flex;
    gap: 12px;
  }

  &__button,
  &__reset {
    min-height: 51px;
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

  &__button {
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

  &__result-header h2 {
    margin: 12px 0 28px;
    font-size: 25px;
    line-height: 1.15;
  }

  &__result-kicker {
    color: $yellow;
  }

  &__empty {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: rgba(#fff, 0.72);
  }

  &__power {
    display: grid;
    gap: 13px;
    padding: 23px;
    color: $ink;
    background: $yellow;
    border-radius: 10px;
  }

  &__power span,
  &__nominal span {
    font-size: 12px;
    font-weight: 700;
  }

  &__power strong {
    font-size: clamp(38px, 4vw, 56px);
    line-height: 1;
  }

  &__power small {
    font-size: 19px;
  }

  &__nominal {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    padding: 23px 0;
    border-bottom: 1px solid rgba(#fff, 0.2);
  }

  &__nominal strong {
    flex: 0 0 auto;
    font-size: 20px;
  }

  &__notice {
    font-size: 12px;
    line-height: 1.5;
    color: $yellow;
  }

  &__metrics {
    display: grid;
    gap: 0;
    padding: 0;
    margin: 10px 0 0;
  }

  &__metrics--more {
    margin-top: 0;
  }

  &__metric {
    display: flex;
    gap: 15px;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid rgba(#fff, 0.15);
  }

  &__metric dt {
    max-width: 67%;
    font-size: 11px;
    line-height: 1.4;
    color: rgba(#fff, 0.73);
  }

  &__metric dd {
    margin: 0;
    font-size: 12px;
    font-weight: 800;
    text-align: right;
    white-space: nowrap;
  }

  &__more {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 16px 0 0;
    font: inherit;
    font-size: 12px;
    font-weight: 800;
    color: $yellow;
    text-align: left;
    cursor: pointer;
    background: transparent;
    border: 0;

    &:focus-visible {
      outline: 2px solid $yellow;
      outline-offset: 2px;
    }
  }

  &__method {
    padding: 70px 0;
    background: #fff;
  }

  &__method-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
  }

  &__method h2 {
    max-width: 490px;
    margin: 0;
    font-size: clamp(30px, 3.5vw, 48px);
    line-height: 1.1;
  }

  &__method-copy {
    font-size: 14px;
    line-height: 1.7;
    color: $muted;
  }

  &__method-copy p {
    margin: 0 0 18px;
  }

  &__method-copy a {
    font-weight: 700;
    color: $blue;
  }
}

@include tablet {
  .conveyor-calculator {
    &__workspace {
      grid-template-columns: 1fr;
    }

    &__results {
      position: static;
    }
  }
}

@include phone {
  .conveyor-calculator {
    &__hero {
      padding: 44px 0 50px;
    }

    &__eyebrow {
      margin-top: 38px;
    }

    &__intro {
      font-size: 14px;
    }

    &__workspace {
      padding-block: 28px 60px;
    }

    &__panel,
    &__results {
      padding: 20px;
    }

    &__geometry-options,
    &__fields,
    &__method-inner {
      grid-template-columns: 1fr;
    }

    &__geometry-option {
      min-height: auto;
    }

    &__label {
      min-height: 0;
    }

    &__method {
      padding: 54px 0;
    }

    &__method-inner {
      gap: 24px;
    }
  }
}
</style>
