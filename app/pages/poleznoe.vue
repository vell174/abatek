<script setup lang="ts">
import { usefulResources as content, usefulResourcesSeo } from '~/data/useful-resources';

usePageSeo(usefulResourcesSeo);
</script>

<template>
  <main class="useful-page">
    <header class="useful-page__hero">
      <div class="site-container">
        <BreadcrumbsNavigation :items="[{ label: content.homeLabel, to: '/' }, { label: content.eyebrow }]" />
        <p class="useful-page__eyebrow">{{ content.eyebrow }}</p>
        <h1 class="useful-page__title">{{ content.title }}</h1>
        <p class="useful-page__description">{{ content.description }}</p>
      </div>
    </header>

    <section class="content-section site-container" aria-labelledby="useful-calculators-title">
      <h2 id="useful-calculators-title" class="useful-page__heading">{{ content.calculatorsTitle }}</h2>
      <div class="useful-page__grid">
        <NuxtLink v-for="item in content.calculators" :key="item.to" class="useful-page__card" :to="item.to">
          <span class="useful-page__card-title">{{ item.title }}</span>
          <span class="useful-page__card-description">{{ item.description }}</span>
          <span class="useful-page__card-arrow" aria-hidden="true">↗</span>
        </NuxtLink>
      </div>
    </section>

    <section class="useful-page__references" aria-labelledby="useful-references-title">
      <div class="content-section site-container">
        <h2 id="useful-references-title" class="useful-page__heading">{{ content.referencesTitle }}</h2>
        <div class="useful-page__grid">
          <NuxtLink v-for="item in content.references" :key="item.to" class="useful-page__card" :to="item.to">
            <span class="useful-page__card-title">{{ item.title }}</span>
            <span class="useful-page__card-description">{{ item.description }}</span>
            <span class="useful-page__card-arrow" aria-hidden="true">↗</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@use '~/assets/styles/mixins' as *;

.useful-page {
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
    max-width: 900px;
    margin: 0 0 20px;
    font-size: clamp(34px, 5vw, 64px);
    line-height: 1.1;
  }

  &__description {
    max-width: 780px;
    margin: 0;
    font-size: 18px;
    line-height: 1.65;
  }

  &__heading {
    margin: 0 0 28px;
    font-size: clamp(28px, 3vw, 42px);
    line-height: 1.2;
    color: $ink;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
  }

  &__card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-height: 185px;
    padding: 26px 52px 26px 26px;
    color: $ink;
    text-decoration: none;
    background: #fff;
    border: 1px solid $line;
    border-radius: 16px;
    transition:
      border-color 0.2s ease,
      transform 0.2s ease;

    &:hover {
      border-color: $blue;
      transform: translateY(-2px);
    }

    &:focus-visible {
      outline: 3px solid $blue;
      outline-offset: 3px;
    }
  }

  &__card-title {
    font-size: 20px;
    font-weight: 700;
    line-height: 1.35;
  }

  &__card-description {
    font-size: 14px;
    line-height: 1.6;
    color: $muted;
  }

  &__card-arrow {
    position: absolute;
    top: 26px;
    right: 26px;
    font-size: 22px;
    color: $blue;
  }

  &__references {
    background: $soft;
  }
}

@include tablet {
  .useful-page {
    &__grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
}

@include phone {
  .useful-page {
    &__grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
