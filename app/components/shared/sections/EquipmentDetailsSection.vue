<script setup lang="ts">
import type { IndustrialSection } from '~/data/pages/_shared/types';

defineProps<{ title: string; sections: IndustrialSection[] }>();
</script>

<template>
  <section class="equipment-details">
    <div class="site-container content-section">
      <h2 class="equipment-details__title">{{ title }}</h2>
      <article
        v-for="(section, index) in sections"
        :id="section.id"
        :key="section.title"
        class="equipment-details__section"
      >
        <div class="equipment-details__main" :class="section.cardImage && 'equipment-details__main--with-image'">
          <div>
            <div class="equipment-details__heading">
              <span class="equipment-details__number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
              <h3 class="equipment-details__subtitle">{{ section.title }}</h3>
            </div>
            <p v-for="paragraph in section.text" :key="paragraph" class="equipment-details__text">{{ paragraph }}</p>
          </div>
          <img
            v-if="section.cardImage"
            class="equipment-details__image"
            :src="section.cardImage.src"
            :alt="section.cardImage.alt"
            :width="section.cardImage.width ?? 1440"
            :height="section.cardImage.height ?? 960"
            loading="lazy"
            decoding="async"
          />
        </div>
        <ul v-if="section.items?.length" class="equipment-details__list">
          <li v-for="item in section.items" :key="item" class="equipment-details__item">{{ item }}</li>
        </ul>
        <dl v-if="section.features?.length" class="equipment-details__features">
          <div v-for="feature in section.features" :key="feature.title" class="equipment-details__feature">
            <dt class="equipment-details__feature-title">{{ feature.title }}</dt>
            <dd class="equipment-details__feature-text">{{ feature.text }}</dd>
          </div>
        </dl>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.equipment-details {
  background: #fff;

  &__title {
    max-width: 920px;
    margin: 0 0 44px;
    font-size: clamp(30px, 3.5vw, 46px);
    line-height: 1.16;
    color: $navy;
    letter-spacing: -0.035em;
  }

  &__section {
    padding-block: 36px;
    border-top: 1px solid $line;
  }

  &__heading {
    display: flex;
    gap: 20px;
    align-items: baseline;
    margin-bottom: 20px;
  }

  &__main--with-image {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(28px, 4vw, 54px);
    align-items: center;
  }

  &__number {
    flex-shrink: 0;
    font-size: 16px;
    font-weight: 700;
    color: $blue;
  }

  &__subtitle {
    margin: 0;
    font-size: clamp(23px, 2.5vw, 32px);
    font-weight: 600;
    line-height: 1.25;
    color: $ink;
  }

  &__text {
    max-width: 1040px;
    margin: 0 0 16px;
    font-size: 17px;
    line-height: 1.8;
    color: $muted;
  }

  &__image {
    display: block;
    width: 100%;
    height: clamp(220px, 21vw, 300px);
    object-fit: contain;
    background: $soft;
    border: 1px solid $line;
    border-radius: 18px;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
    padding: 0;
    margin: 24px 0 0;
    list-style: none;
  }

  &__item {
    padding: 22px 26px;
    line-height: 1.7;
    color: $ink;
    background: $soft;
    border-left: 4px solid $yellow;
    border-radius: 0 12px 12px 0;
  }

  &__features {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
    margin: 28px 0 0;
  }

  &__feature {
    padding: 28px;
    border: 1px solid $line;
    border-radius: 14px;
  }

  &__feature-title {
    margin-bottom: 14px;
    font-size: 20px;
    font-weight: 700;
    color: $blue;
  }

  &__feature-text {
    margin: 0;
    font-size: 15px;
    line-height: 1.8;
    color: $muted;
  }
}

@media (max-width: $phone) {
  .equipment-details {
    &__main--with-image {
      grid-template-columns: 1fr;
    }

    &__image {
      height: auto;
      max-height: 340px;
    }

    &__list,
    &__features {
      grid-template-columns: 1fr;
    }

    &__heading {
      gap: 12px;
    }

    &__feature {
      padding: 22px;
    }
  }
}
</style>
