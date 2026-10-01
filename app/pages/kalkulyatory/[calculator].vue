<script setup lang="ts">
import {
  operatingCategories,
  operatingDefaults,
  operatingFields,
  operatingOptions,
  operatingResultLabels,
  recommendedSpeeds,
  speedDefaults,
  speedFields,
  speedResultLabels,
  toolInterface as ui,
  toolNavigation,
  toolPages,
  widthDefaults,
  widthFields,
  widthOptions,
  widthResultLabels,
} from '~/data/conveyor-tools';
import { beltSpeeds } from '~/data/conveyor-calculator';
import { referenceLinkLabels, referenceRoutes } from '~/data/conveyor-references';
import { calculateBeltWidth, calculateConveyorSpeed, calculateOperatingConditions } from '~/utils/conveyor-tools';

definePageMeta({ key: (route) => route.fullPath });

const route = useRoute();
const slug = String(route.params.calculator);
const page = toolPages[slug as keyof typeof toolPages];
if (!page) throw createError({ statusCode: 404, statusMessage: ui.notFound });
usePageSeo(page.seo);

const widthInput = reactive({ ...widthDefaults });
const operatingInput = reactive({ ...operatingDefaults });
const speedInput = reactive({ ...speedDefaults });
const widthResult = ref<ReturnType<typeof calculateBeltWidth> | null>(null);
const operatingResult = ref<ReturnType<typeof calculateOperatingConditions> | null>(null);
const speedResult = ref<ReturnType<typeof calculateConveyorSpeed> | null>(null);
const errors = ref<Record<string, string>>({});

const widthNumberFields = [
  { key: 'throughput', label: widthFields.throughput },
  { key: 'pieceSize', label: widthFields.pieceSize },
  { key: 'density', label: widthFields.density },
  { key: 'unevenness', label: widthFields.unevenness },
  { key: 'utilization', label: widthFields.utilization },
  { key: 'availability', label: widthFields.availability },
] as const;
const widthSelectFields = [
  { key: 'inclineRange', label: widthFields.inclineRange },
  { key: 'sideRollAngle', label: widthFields.sideRollAngle },
  { key: 'reposeRange', label: widthFields.reposeRange },
  { key: 'cargoType', label: widthFields.cargoType },
] as const;
const operatingSelectFields = [
  { key: 'pieceSize', label: operatingFields.pieceSize },
  { key: 'abrasiveness', label: operatingFields.abrasiveness },
  { key: 'densityFactor', label: operatingFields.densityFactor },
  { key: 'dropFactor', label: operatingFields.dropFactor },
  { key: 'loadingFactor', label: operatingFields.loadingFactor },
  { key: 'temperature', label: operatingFields.temperature },
  { key: 'moisture', label: operatingFields.moisture },
  { key: 'service', label: operatingFields.service },
] as const;
const speedNumberFields = [
  { key: 'rpm', label: speedFields.rpm },
  { key: 'drumDiameter', label: speedFields.drumDiameter },
] as const;
const allBeltSpeeds = [...beltSpeeds, 4, 5, 6.3];

watch(
  widthInput,
  () => {
    widthResult.value = null;
    errors.value = {};
  },
  { flush: 'sync' },
);
watch(
  operatingInput,
  () => {
    operatingResult.value = null;
  },
  { flush: 'sync' },
);
watch(
  speedInput,
  () => {
    speedResult.value = null;
    errors.value = {};
  },
  { flush: 'sync' },
);

function format(value: number, digits = 2) {
  return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: digits }).format(value);
}

function calculate() {
  errors.value = {};
  if (page.kind === 'width') {
    for (const field of widthNumberFields) {
      const value = widthInput[field.key];
      if (!Number.isFinite(value) || value <= 0) errors.value[field.key] = ui.positiveError;
    }
    for (const key of ['utilization', 'availability'] as const) {
      if (widthInput[key] > 1) errors.value[key] = ui.fractionError;
    }
    if (Object.keys(errors.value).length) return;
    widthResult.value = calculateBeltWidth(widthInput);
  } else if (page.kind === 'operating') {
    operatingResult.value = calculateOperatingConditions(operatingInput);
  } else {
    for (const field of speedNumberFields) {
      const value = speedInput[field.key];
      if (!Number.isFinite(value) || value <= 0) errors.value[field.key] = ui.positiveError;
    }
    if (Object.keys(errors.value).length) return;
    speedResult.value = calculateConveyorSpeed(speedInput);
  }
}

function reset() {
  Object.assign(widthInput, widthDefaults);
  Object.assign(operatingInput, operatingDefaults);
  Object.assign(speedInput, speedDefaults);
  widthResult.value = null;
  operatingResult.value = null;
  speedResult.value = null;
  errors.value = {};
}
</script>

<template>
  <main class="conveyor-tool">
    <section class="conveyor-tool__hero">
      <div class="site-container">
        <BreadcrumbsNavigation :items="[{ label: ui.home, to: '/' }, { label: page.title }]" />
        <p class="conveyor-tool__eyebrow">{{ page.eyebrow }}</p>
        <h1 class="conveyor-tool__title">{{ page.title }}</h1>
        <p class="conveyor-tool__intro">{{ page.description }}</p>
      </div>
    </section>

    <nav class="conveyor-tool__navigation site-container" :aria-label="ui.related">
      <NuxtLink
        v-for="item in toolNavigation"
        :key="item.to"
        :to="item.to"
        class="conveyor-tool__navigation-link"
        :class="{ 'conveyor-tool__navigation-link--active': item.to === page.seo.canonicalPath }"
      >
        {{ item.label }}
      </NuxtLink>
    </nav>

    <section class="conveyor-tool__workspace site-container">
      <form class="conveyor-tool__form" novalidate @submit.prevent="calculate">
        <h2>{{ ui.inputs }}</h2>

        <template v-if="page.kind === 'width'">
          <div v-for="field in widthNumberFields" :key="field.key" class="conveyor-tool__field">
            <label :for="field.key" class="conveyor-tool__label">{{ field.label }}</label>
            <input
              :id="field.key"
              v-model.number="widthInput[field.key]"
              class="conveyor-tool__input"
              type="number"
              min="0.01"
              step="any"
              inputmode="decimal"
              :aria-invalid="Boolean(errors[field.key])"
              :aria-describedby="errors[field.key] ? `${field.key}-error` : undefined"
            />
            <span v-if="errors[field.key]" :id="`${field.key}-error`" class="conveyor-tool__error">
              {{ errors[field.key] }}
            </span>
            <NuxtLink v-if="field.key === 'density'" class="conveyor-tool__help" :to="referenceRoutes.materials">
              {{ referenceLinkLabels.materials }}
            </NuxtLink>
          </div>
          <div class="conveyor-tool__field">
            <label class="conveyor-tool__label" for="speed">{{ widthFields.speed }}</label>
            <select id="speed" v-model.number="widthInput.speed" class="conveyor-tool__input">
              <option v-for="speed in allBeltSpeeds" :key="speed" :value="speed">{{ format(speed, 3) }}</option>
            </select>
            <NuxtLink class="conveyor-tool__help" :to="`${referenceRoutes.parameters}#recommended-speeds`">
              {{ recommendedSpeeds.title }}
            </NuxtLink>
          </div>
          <div v-for="field in widthSelectFields" :key="field.key" class="conveyor-tool__field">
            <label class="conveyor-tool__label" :for="field.key">{{ field.label }}</label>
            <select :id="field.key" v-model.number="widthInput[field.key]" class="conveyor-tool__input">
              <option v-for="(option, index) in widthOptions[field.key]" :key="option" :value="index">
                {{ option }}
              </option>
            </select>
            <NuxtLink
              v-if="field.key === 'inclineRange' || field.key === 'reposeRange'"
              class="conveyor-tool__help"
              :to="referenceRoutes.materials"
            >
              {{ referenceLinkLabels.materials }}
            </NuxtLink>
          </div>
        </template>

        <template v-else-if="page.kind === 'operating'">
          <div v-for="field in operatingSelectFields" :key="field.key" class="conveyor-tool__field">
            <label class="conveyor-tool__label" :for="field.key">{{ field.label }}</label>
            <select :id="field.key" v-model.number="operatingInput[field.key]" class="conveyor-tool__input">
              <option v-for="option in operatingOptions[field.key]" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
            <NuxtLink
              v-if="field.key === 'abrasiveness'"
              class="conveyor-tool__help"
              :to="referenceRoutes.abrasiveness"
            >
              {{ referenceLinkLabels.abrasiveness }}
            </NuxtLink>
          </div>
        </template>

        <template v-else>
          <div v-for="field in speedNumberFields" :key="field.key" class="conveyor-tool__field">
            <label class="conveyor-tool__label" :for="field.key">{{ field.label }}</label>
            <input
              :id="field.key"
              v-model.number="speedInput[field.key]"
              class="conveyor-tool__input"
              type="number"
              min="0.01"
              step="any"
              inputmode="decimal"
              :aria-invalid="Boolean(errors[field.key])"
              :aria-describedby="errors[field.key] ? `${field.key}-error` : undefined"
            />
            <span v-if="errors[field.key]" :id="`${field.key}-error`" class="conveyor-tool__error">
              {{ errors[field.key] }}
            </span>
          </div>
        </template>

        <div class="conveyor-tool__actions">
          <button class="conveyor-tool__button" type="submit">{{ ui.calculate }}</button>
          <button class="conveyor-tool__reset" type="button" @click="reset">{{ ui.reset }}</button>
        </div>
      </form>

      <aside class="conveyor-tool__results" aria-live="polite">
        <p class="conveyor-tool__results-kicker">{{ ui.results }}</p>
        <template v-if="page.kind === 'width' && widthResult">
          <div class="conveyor-tool__primary">
            <span>{{ widthResultLabels.standardWidth }}</span>
            <strong>
              {{ widthResult.standardWidth === null ? '—' : format(widthResult.standardWidth, 0) }}
              <small>{{ ui.units.width }}</small>
            </strong>
          </div>
          <p v-if="widthResult.standardWidth === null" class="conveyor-tool__notice">
            {{ widthResultLabels.noStandard }}
          </p>
          <dl class="conveyor-tool__metrics">
            <div>
              <dt>{{ widthResultLabels.throughputWidth }}</dt>
              <dd>{{ format(widthResult.throughputWidth, 0) }} {{ ui.units.width }}</dd>
            </div>
            <div>
              <dt>{{ widthResultLabels.pieceWidth }}</dt>
              <dd>{{ format(widthResult.pieceWidth, 0) }} {{ ui.units.width }}</dd>
            </div>
            <div>
              <dt>{{ widthResultLabels.designThroughput }}</dt>
              <dd>{{ format(widthResult.designThroughput) }} {{ ui.units.throughput }}</dd>
            </div>
            <div>
              <dt>{{ widthResultLabels.carryingFactor }}</dt>
              <dd>{{ widthResult.carryingFactor }}</dd>
            </div>
          </dl>
        </template>
        <template v-else-if="page.kind === 'operating' && operatingResult">
          <div class="conveyor-tool__primary">
            <span>{{ operatingResultLabels.category }}</span>
            <strong class="conveyor-tool__primary-text">{{ operatingCategories[operatingResult.category] }}</strong>
          </div>
          <dl class="conveyor-tool__metrics">
            <div>
              <dt>{{ operatingResultLabels.totalPoints }}</dt>
              <dd>{{ format(operatingResult.totalPoints, 1) }}</dd>
            </div>
          </dl>
        </template>
        <template v-else-if="page.kind === 'speed' && speedResult">
          <div class="conveyor-tool__primary">
            <span>{{ speedResultLabels.linearSpeed }}</span>
            <strong>
              {{ format(speedResult.linearSpeed) }}
              <small>{{ ui.units.speed }}</small>
            </strong>
          </div>
          <dl class="conveyor-tool__metrics">
            <div>
              <dt>{{ speedResultLabels.angularVelocity }}</dt>
              <dd>{{ format(speedResult.angularVelocity) }} {{ ui.units.angular }}</dd>
            </div>
          </dl>
        </template>
        <p v-else class="conveyor-tool__empty">{{ ui.empty }}</p>
      </aside>
    </section>

    <section class="conveyor-tool__method">
      <div class="site-container conveyor-tool__method-inner">
        <h2>{{ ui.method }}</h2>
        <div>
          <p>{{ page.method }}</p>
          <a :href="page.source" target="_blank" rel="noopener noreferrer">{{ ui.source }} ↗</a>
        </div>
      </div>
    </section>

    <section v-if="page.kind === 'speed'" id="recommended-speeds" class="conveyor-tool__reference">
      <SpecsTableSection
        :title="recommendedSpeeds.title"
        :eyebrow="recommendedSpeeds.eyebrow"
        :columns="[...recommendedSpeeds.columns]"
        :rows="recommendedSpeeds.rows.map((row) => [...row])"
        tone="soft"
      />
      <div class="site-container conveyor-tool__reference-note">
        <p>{{ recommendedSpeeds.note }}</p>
        <a :href="recommendedSpeeds.source" target="_blank" rel="noopener noreferrer">{{ ui.source }} ↗</a>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@use '~/assets/styles/mixins' as *;

.conveyor-tool {
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

  &__navigation {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding-top: 28px;
  }

  &__navigation-link {
    padding: 10px 14px;
    font-size: 12px;
    font-weight: 700;
    color: $blue;
    text-decoration: none;
    background: #fff;
    border: 1px solid $line;
    border-radius: 30px;

    &--active {
      color: $navy;
      background: $yellow;
      border-color: $yellow;
    }

    &:focus-visible {
      outline: 2px solid $blue;
      outline-offset: 2px;
    }
  }

  &__workspace {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(300px, 0.8fr);
    gap: 28px;
    align-items: start;
    padding-block: 32px 80px;
  }

  &__form {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
    padding: 30px;
    background: #fff;
    border: 1px solid $line;
    border-radius: 16px;
  }

  &__form h2 {
    grid-column: 1 / -1;
    margin: 0 0 5px;
    font-size: 22px;
  }

  &__field {
    min-width: 0;
  }

  &__label {
    display: block;
    min-height: 40px;
    margin-bottom: 7px;
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
  }

  &__help {
    display: inline-block;
    margin-top: 7px;
    font-size: 11px;
    font-weight: 700;
    color: $blue;
  }

  &__error {
    display: block;
    margin-top: 6px;
    font-size: 11px;
    color: $blue;
  }

  &__actions {
    display: flex;
    grid-column: 1 / -1;
    gap: 12px;
    margin-top: 10px;
  }

  &__button,
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
    font-size: clamp(36px, 4vw, 54px);
    line-height: 1.1;
  }

  &__primary small {
    font-size: 18px;
  }

  &__primary &__primary-text {
    font-size: clamp(20px, 2vw, 28px);
  }

  &__notice {
    font-size: 12px;
    line-height: 1.5;
    color: $yellow;
  }

  &__metrics {
    padding: 0;
    margin: 17px 0 0;
  }

  &__metrics div {
    display: flex;
    gap: 15px;
    justify-content: space-between;
    padding: 13px 0;
    border-bottom: 1px solid rgba(#fff, 0.16);
  }

  &__metrics dt {
    font-size: 11px;
    line-height: 1.4;
    color: rgba(#fff, 0.75);
  }

  &__metrics dd {
    margin: 0;
    font-size: 12px;
    font-weight: 800;
    text-align: right;
    white-space: nowrap;
  }

  &__method {
    padding: 64px 0;
    background: #fff;
  }

  &__method-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 70px;
  }

  &__method h2 {
    margin: 0;
    font-size: clamp(28px, 3vw, 44px);
  }

  &__method p,
  &__reference-note p {
    margin: 0 0 12px;
    font-size: 14px;
    line-height: 1.7;
    color: $muted;
  }

  &__method a,
  &__reference-note a {
    font-size: 13px;
    font-weight: 700;
    color: $blue;
  }

  &__reference {
    scroll-margin-top: 20px;
  }

  &__reference-note {
    padding-bottom: 55px;
  }
}

@include tablet {
  .conveyor-tool {
    &__workspace {
      grid-template-columns: 1fr;
    }

    &__results {
      position: static;
    }
  }
}

@include phone {
  .conveyor-tool {
    &__hero {
      padding: 45px 0 50px;
    }

    &__eyebrow {
      margin-top: 36px;
    }

    &__intro {
      font-size: 14px;
    }

    &__workspace {
      padding-bottom: 55px;
    }

    &__form {
      grid-template-columns: 1fr;
      padding: 20px;
    }

    &__label {
      min-height: 0;
    }

    &__results {
      padding: 20px;
    }

    &__method-inner {
      grid-template-columns: 1fr;
      gap: 18px;
    }
  }
}
</style>
