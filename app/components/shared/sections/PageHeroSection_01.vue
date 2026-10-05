<script setup lang="ts">
const {
  title,
  text = '',
  accentTexts = [],
  eyebrow = 'АБАТЭК',
  backgroundImage = '',
  backgroundVariant = 'default',
  compact = false,
  titleVariant = 'default',
} = defineProps<{
  title: string;
  text?: string;
  accentTexts?: readonly string[];
  eyebrow?: string;
  backgroundImage?: string;
  backgroundVariant?: 'default' | 'drawing' | 'product' | 'product-dark' | 'product-dark-contained';
  compact?: boolean;
  titleVariant?: 'default' | 'wide-light';
}>();
</script>

<template>
  <section
    class="page-hero"
    :class="[
      backgroundImage && 'page-hero--custom-background',
      compact && 'page-hero--compact',
      `page-hero--${backgroundVariant}`,
    ]"
    :style="backgroundImage ? { '--page-hero-background-image': `url('${backgroundImage}')` } : undefined"
  >
    <div class="site-container page-hero__container">
      <p class="page-hero__eyebrow">{{ eyebrow }}</p>
      <h1 class="page-hero__title" :class="`page-hero__title--${titleVariant}`">{{ title }}</h1>
      <p v-if="text" class="page-hero__text">
        {{ text }}
        <span v-if="accentTexts?.length" class="page-hero__text-accents">
          <strong v-for="accent in accentTexts" :key="accent" class="page-hero__text-accent">{{ accent }}</strong>
        </span>
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.page-hero {
  position: relative;
  padding-block: 72px 68px;
  overflow: hidden;
  color: #fff;
  background:
    linear-gradient(90deg, rgba($navy, 0.98), rgba($navy, 0.9) 58%, rgba($navy, 0.65)),
    url('/images/26009373.webp') center 55% / cover;

  &--custom-background {
    background:
      linear-gradient(90deg, rgba($navy, 0.96), rgba($navy, 0.84) 58%, rgba($navy, 0.72)),
      var(--page-hero-background-image) center 52% / cover;
  }

  &--drawing {
    background:
      linear-gradient(90deg, rgba($navy, 0.94), rgba($navy, 0.8) 58%, rgba($navy, 0.35)),
      var(--page-hero-background-image) center 52% / cover;
  }

  &--product {
    padding-block: clamp(64px, 8vw, 112px);
    background:
      linear-gradient(90deg, rgba($navy, 0.98), rgba($navy, 0.92) 35%, rgba($navy, 0.38) 80%),
      var(--page-hero-background-image) center / cover;
  }

  &--product-dark {
    padding-block: clamp(64px, 8vw, 112px);
    background:
      linear-gradient(90deg, rgba($navy, 0.99), rgba($navy, 0.95) 40%, rgba($navy, 0.72) 82%),
      var(--page-hero-background-image) center / cover;
  }

  &--product-dark-contained {
    padding-block: clamp(64px, 8vw, 112px);
    color: #fff;
    background:
      linear-gradient(rgba($navy, 0.48), rgba($navy, 0.48)),
      #fff var(--page-hero-background-image) 94% center / 55% auto no-repeat;
  }

  &--product &__title,
  &--product-dark &__title,
  &--product-dark-contained &__title {
    max-width: 780px;
    font-size: clamp(34px, 4.3vw, 58px);
  }

  &--product &__text,
  &--product-dark &__text,
  &--product-dark-contained &__text {
    max-width: 670px;
  }

  &--product-dark-contained &__eyebrow {
    color: #fff;
  }

  &--product-dark-contained &__text {
    color: #fff;
  }

  &--compact {
    padding-block: 40px;
  }

  &::after {
    position: absolute;
    right: -80px;
    bottom: -180px;
    width: 430px;
    aspect-ratio: 1;
    content: '';
    border: 1px solid rgb(255 255 255 / 12%);
    border-radius: 50%;
  }

  &__container {
    position: relative;
    z-index: 1;
  }

  &__eyebrow {
    margin: 0 0 14px;
    font-size: 10px;
    font-weight: 900;
    color: $yellow;
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }

  &__title {
    max-width: 980px;
    margin: 0;
    font-size: clamp(38px, 5vw, 62px);
    line-height: 1.05;
    letter-spacing: -0.045em;
  }

  &__title--wide-light {
    max-width: 100%;
    font-weight: 500;
    white-space: pre-line;
  }

  &__text {
    max-width: 650px;
    margin: 28px 0 0;
    font-size: 15px;
    line-height: 1.6;
    color: #c2d1df;
  }

  &__text-accents {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 14px;
  }

  &__text-accent {
    display: inline-flex;
    align-items: center;
    padding: 8px 12px;
    font-size: 13px;
    font-weight: 850;
    line-height: 1.35;
    color: $navy;
    background: $yellow;
    border-radius: 7px;
  }
}

@media (max-width: $phone) {
  .page-hero {
    padding-block: 58px;

    &__title {
      max-width: 100%;
      font-size: 30px;
      line-height: 1.1;
      letter-spacing: -0.03em;
      overflow-wrap: anywhere;
    }

    &--compact {
      padding-block: 36px;
    }
  }
}
</style>
