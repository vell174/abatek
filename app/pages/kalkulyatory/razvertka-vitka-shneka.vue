<script setup lang="ts">
import {
  screwFlightContent as content,
  screwFlightDefaults,
  screwFlightFields,
  screwFlightResults,
  screwFlightSeo,
} from '~/data/screw-flight-calculator';
import { calculateScrewFlight } from '~/utils/calculate-screw-flight';

usePageSeo(screwFlightSeo);

const form = reactive({ ...screwFlightDefaults });
const result = ref(calculateScrewFlight(form));
const error = ref('');

watch(
  form,
  () => {
    result.value = null;
    error.value = '';
  },
  { flush: 'sync' },
);

function calculate() {
  result.value = calculateScrewFlight(form);
  error.value = result.value ? '' : content.invalid;
}

function reset() {
  Object.assign(form, screwFlightDefaults);
  result.value = calculateScrewFlight(form);
  error.value = '';
}

function format(value: number, digits = 3) {
  return new Intl.NumberFormat('ru-RU', { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
}
const diagramResult = computed(() => calculateScrewFlight(form));
</script>

<template>
  <main class="screw-flight-calculator">
    <header class="screw-flight-calculator__hero">
      <div class="site-container">
        <BreadcrumbsNavigation
          :items="[
            { label: content.homeLabel, to: '/' },
            { label: content.usefulLabel, to: '/poleznoe/' },
            { label: content.title },
          ]"
        />
        <p class="screw-flight-calculator__eyebrow">{{ content.eyebrow }}</p>
        <h1 class="screw-flight-calculator__title">{{ content.title }}</h1>
        <p class="screw-flight-calculator__description">{{ content.description }}</p>
      </div>
    </header>

    <ScrewFlightDiagrams :result="diagramResult" />

    <div class="screw-flight-calculator__workspace content-section site-container">
      <form class="screw-flight-calculator__panel" novalidate @submit.prevent="calculate">
        <h2 class="screw-flight-calculator__heading">{{ content.inputTitle }}</h2>
        <div class="screw-flight-calculator__fields">
          <div v-for="field in screwFlightFields" :key="field.key" class="screw-flight-calculator__field">
            <label class="screw-flight-calculator__label" :for="`flight-${field.key}`">
              <span>{{ field.label }} ({{ field.symbol }})</span>
              <span>{{ field.unit }}</span>
            </label>
            <input
              :id="`flight-${field.key}`"
              v-model.number="form[field.key]"
              class="screw-flight-calculator__input"
              type="number"
              min="0.000001"
              step="any"
              inputmode="decimal"
              required
              :aria-invalid="Boolean(error)"
            />
          </div>
        </div>
        <p class="screw-flight-calculator__hint">{{ content.densityHint }}</p>
        <p v-if="error" class="screw-flight-calculator__error" role="alert">{{ error }}</p>
        <div class="screw-flight-calculator__actions">
          <button class="screw-flight-calculator__calculate" type="submit">{{ content.calculate }}</button>
          <button class="screw-flight-calculator__reset" type="button" @click="reset">{{ content.reset }}</button>
        </div>
      </form>

      <section class="screw-flight-calculator__panel" aria-live="polite">
        <h2 class="screw-flight-calculator__heading">{{ content.outputTitle }}</h2>
        <template v-if="result">
          <dl class="screw-flight-calculator__results">
            <div v-for="item in screwFlightResults" :key="item.key" class="screw-flight-calculator__result">
              <dt class="screw-flight-calculator__result-label">{{ item.label }} ({{ item.symbol }})</dt>
              <dd class="screw-flight-calculator__result-value">
                {{ format(result[item.key], item.digits) }} {{ item.unit }}
              </dd>
            </div>
          </dl>
        </template>
      </section>
    </div>

    <section class="screw-flight-calculator__method">
      <div class="content-section site-container">
        <h2 class="screw-flight-calculator__heading">{{ content.methodTitle }}</h2>
        <p v-for="paragraph in content.method" :key="paragraph" class="screw-flight-calculator__paragraph">
          {{ paragraph }}
        </p>
        <p class="screw-flight-calculator__limitation">{{ content.limitation }}</p>
        <h2 class="screw-flight-calculator__heading">{{ content.relatedTitle }}</h2>
        <nav class="screw-flight-calculator__related" :aria-label="content.relatedTitle">
          <NuxtLink
            v-for="link in content.relatedLinks"
            :key="link.to"
            class="screw-flight-calculator__related-link"
            :to="link.to"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@use '~/assets/styles/mixins' as *;

.screw-flight-calculator {
  color: $ink;

  &__hero {
    padding-block: 54px 68px;
    color: #fff;
    background: $navy;
  }

  &__eyebrow {
    margin: 34px 0 12px;
    font-size: 12px;
    font-weight: 700;
    color: $yellow;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  &__title {
    margin: 0 0 18px;
    font-size: clamp(34px, 5vw, 60px);
    line-height: 1.1;
  }

  &__description {
    max-width: 900px;
    margin: 0;
    font-size: 17px;
    line-height: 1.65;
  }

  &__workspace {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 24px;
    align-items: start;
  }

  &__panel {
    min-width: 0;
    padding: 28px;
    background: #fff;
    border: 1px solid $line;
    border-radius: 18px;
  }

  &__heading {
    margin: 0 0 24px;
    font-size: clamp(24px, 2.5vw, 32px);
    line-height: 1.2;
  }

  &__fields {
    display: grid;
    gap: 18px;
  }

  &__label {
    display: flex;
    gap: 16px;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 600;
  }

  &__input {
    width: 100%;
    min-height: 48px;
    padding: 10px 14px;
    font: inherit;
    color: $ink;
    background: #fff;
    border: 1px solid $line;
    border-radius: 8px;

    &:focus-visible {
      outline: 3px solid $blue;
      outline-offset: 2px;
    }
  }

  &__hint {
    margin: 16px 0 0;
    font-size: 13px;
    line-height: 1.6;
    color: $muted;
  }

  &__error {
    margin: 16px 0 0;
    font-size: 14px;
    color: $navy;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 24px;
  }

  &__calculate,
  &__reset {
    min-height: 46px;
    padding: 10px 18px;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
    border-radius: 8px;

    &:focus-visible {
      outline: 3px solid $blue;
      outline-offset: 3px;
    }
  }

  &__calculate {
    color: #fff;
    background: $blue;
    border: 1px solid $blue;
  }

  &__reset {
    color: $ink;
    background: #fff;
    border: 1px solid $line;
  }

  &__sketch-note {
    margin-top: 0;
  }

  &__results {
    margin: 0;
  }

  &__result {
    display: flex;
    gap: 16px;
    justify-content: space-between;
    padding-block: 10px;
    font-size: 14px;
    line-height: 1.4;
    border-bottom: 1px solid $line;
  }

  &__result-value {
    flex: 0 0 auto;
    margin: 0;
    font-weight: 700;
    text-align: right;
  }

  &__method {
    background: $soft;
  }

  &__paragraph,
  &__limitation {
    max-width: 950px;
    font-size: 16px;
    line-height: 1.75;
  }

  &__limitation {
    padding: 18px 22px;
    margin: 24px 0 48px;
    background: #fff;
    border-left: 4px solid $yellow;
  }

  &__related {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 24px;
  }

  &__related-link {
    color: $blue;

    &:focus-visible {
      outline: 3px solid $blue;
      outline-offset: 3px;
    }
  }
}

@include tablet {
  .screw-flight-calculator {
    &__workspace {
      grid-template-columns: 1fr;
    }
  }
}

@include phone {
  .screw-flight-calculator {
    &__panel {
      padding: 20px;
    }

    &__result {
      flex-direction: column;
      gap: 4px;
    }

    &__result-value {
      text-align: left;
    }
  }
}
</style>
