<script setup lang="ts">
import { NuxtLink } from '#components';
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from 'reka-ui';
import { homeCatalog } from '~/data/home/catalog';
import { catalogGroups } from '~/data/navigation/catalog';
</script>

<template>
  <section id="catalog" class="content-section site-container home-categories">
    <div class="home-categories__heading">
      <h2 class="home-categories__title">{{ homeCatalog.title }}</h2>
      <p class="home-categories__subtitle">{{ homeCatalog.description }}</p>
    </div>
    <div class="home-categories__grid">
      <CollapsibleRoot
        v-for="category in catalogGroups"
        :key="category.title"
        as="article"
        class="home-categories__item"
      >
        <component
          :is="category.items.length ? CollapsibleTrigger : NuxtLink"
          class="home-categories__hero"
          v-bind="!category.items.length && category.to ? { to: category.to } : {}"
        >
          <img
            class="home-categories__image"
            :src="category.image"
            alt=""
            width="720"
            height="480"
            loading="lazy"
            decoding="async"
          />
          <span class="home-categories__content">
            <span class="home-categories__name">{{ category.title }}</span>
            <Icon
              class="home-categories__arrow"
              :class="[category.items.length ? 'home-categories__arrow--toggle' : '']"
              :name="category.items.length ? 'lucide:chevron-down' : 'lucide:arrow-up-right'"
              aria-hidden="true"
              mode="svg"
            />
          </span>
        </component>
        <CollapsibleContent v-if="category.items.length" class="home-categories__panel">
          <ul class="home-categories__list">
            <li v-if="category.to" class="home-categories__subitem">
              <NuxtLink class="home-categories__link" :to="category.to">
                {{ category.overviewLabel || category.title }}
              </NuxtLink>
            </li>
            <li v-for="item in category.items" :key="item.label" class="home-categories__subitem">
              <NuxtLink v-if="item.to" class="home-categories__link" :to="item.to">{{ item.label }}</NuxtLink>
              <span v-else class="home-categories__text">{{ item.label }}</span>
            </li>
          </ul>
        </CollapsibleContent>
      </CollapsibleRoot>
    </div>
  </section>
</template>

<style scoped lang="scss">
.home-categories {
  &__heading {
    margin-bottom: 38px;
  }

  &__title {
    margin: 0;
    font-size: clamp(36px, 4vw, 54px);
    letter-spacing: -0.035em;
  }

  &__subtitle {
    max-width: 720px;
    margin: 14px 0 0;
    font-size: 17px;
    line-height: 1.5;
    color: $muted;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
    align-items: start;
  }

  &__item {
    overflow: hidden;
    background: #fff;
    border: 1px solid $line;
    border-radius: 16px;
  }

  &__hero {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    min-height: 290px;
    padding: 18px;
    overflow: hidden;
    font: inherit;
    color: $ink;
    text-align: left;
    text-decoration: none;
    cursor: pointer;
    background: #fff;
    border: 0;

    &:focus-visible {
      outline: 3px solid $blue;
      outline-offset: -3px;
    }
  }

  &__hero:hover &__image {
    transform: scale(1.035);
  }

  &__image {
    display: block;
    width: 100%;
    height: 148px;
    object-fit: contain;
    transition: transform 0.3s ease;
  }

  &__content {
    display: flex;
    gap: 10px;
    align-items: start;
    width: 100%;
    padding-top: 16px;
    border-top: 1px solid $line;
  }

  &__name {
    display: block;
    flex: 1;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.45;
    color: $ink;
  }

  &__arrow {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-top: 2px;
    color: $blue;
    transition: transform 0.25s ease;
  }

  &__hero[data-state='open'] &__arrow--toggle {
    transform: rotate(180deg);
  }

  &__panel {
    overflow: hidden;

    &[data-state='open'] {
      animation: home-categories-expand 0.25s ease-out;
    }

    &[data-state='closed'] {
      animation: home-categories-collapse 0.25s ease-out;
    }
  }

  &__list {
    display: grid;
    gap: 4px;
    padding: 12px;
    margin: 0;
    list-style: none;
    background: $soft;
  }

  &__link,
  &__text {
    display: block;
    padding: 9px 10px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    color: $ink;
    text-decoration: none;
    border-radius: 6px;
  }

  &__link {
    &:hover,
    &:focus-visible {
      color: $blue;
      background: #fff;
    }

    &:focus-visible {
      outline: 2px solid $blue;
      outline-offset: 2px;
    }
  }

  &__text {
    color: $muted;
  }
}

@keyframes home-categories-expand {
  from {
    height: 0;
    opacity: 0;
  }

  to {
    height: var(--reka-collapsible-content-height);
    opacity: 1;
  }
}

@keyframes home-categories-collapse {
  from {
    height: var(--reka-collapsible-content-height);
    opacity: 1;
  }

  to {
    height: 0;
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-categories__image,
  .home-categories__arrow {
    transition: none;
  }

  .home-categories__panel[data-state] {
    animation: none;
  }
}

@media (max-width: $tablet) {
  .home-categories__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: $phone) {
  .home-categories__grid {
    grid-template-columns: 1fr;
  }
}
</style>
