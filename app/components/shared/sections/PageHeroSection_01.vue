<script setup lang="ts">
const {
  title,
  text = '',
  accentTexts = [],
  eyebrow = 'АБАТЭК',
  backgroundImage = '',
  backgroundImageAlt = '',
  backgroundImagePosition = 'center 52%',
  backgroundImageWidth = 1920,
  backgroundImageHeight = 720,
  actionLabel = '',
  backgroundVariant = 'default',
  compact = false,
  titleVariant = 'default',
} = defineProps<{
  title: string;
  text?: string;
  accentTexts?: readonly string[];
  eyebrow?: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
  backgroundImagePosition?: string;
  backgroundImageWidth?: number;
  backgroundImageHeight?: number;
  actionLabel?: string;
  backgroundVariant?:
    | 'default'
    | 'drawing'
    | 'scraper-drawing'
    | 'elevator-drawing'
    | 'photo'
    | 'feeder-photo'
    | 'photo-clear'
    | 'product'
    | 'product-dark'
    | 'product-dark-contained'
    | 'rgs-photo'
    | 'rvs-photo'
    | 'screw-flight-photo'
    | 'flat-conveyor-photo'
    | 'smooth-belt-photo'
    | 'partitioned-conveyor-photo'
    | 'straight-conveyor-photo'
    | 'firewood-photo';
  compact?: boolean;
  titleVariant?: 'default' | 'wide-light';
}>();
defineEmits<{ action: [] }>();
</script>

<template>
  <section
    class="page-hero"
    :class="[
      backgroundImage && 'page-hero--custom-background',
      backgroundImageAlt && 'page-hero--image-element',
      compact && 'page-hero--compact',
      `page-hero--${backgroundVariant}`,
    ]"
    :style="backgroundImage ? { '--page-hero-background-image': `url('${backgroundImage}')` } : undefined"
  >
    <img
      v-if="backgroundImage && backgroundImageAlt"
      class="page-hero__background-image"
      :src="backgroundImage"
      :style="{ objectPosition: backgroundImagePosition }"
      :alt="backgroundImageAlt"
      :width="backgroundImageWidth"
      :height="backgroundImageHeight"
      loading="eager"
      fetchpriority="high"
      decoding="async"
    />
    <div class="site-container page-hero__container">
      <p class="page-hero__eyebrow">{{ eyebrow }}</p>
      <h1 class="page-hero__title" :class="`page-hero__title--${titleVariant}`">{{ title }}</h1>
      <p v-if="text" class="page-hero__text">
        {{ text }}
        <span v-if="accentTexts?.length" class="page-hero__text-accents">
          <strong v-for="accent in accentTexts" :key="accent" class="page-hero__text-accent">{{ accent }}</strong>
        </span>
      </p>
      <UiButton v-if="actionLabel" class="page-hero__action" @click="$emit('action')">{{ actionLabel }}</UiButton>
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

  &--photo {
    background:
      linear-gradient(90deg, rgba($navy, 0.95), rgba($navy, 0.78) 58%, rgba($navy, 0.45)),
      var(--page-hero-background-image) center 52% / cover;
  }

  &--feeder-photo {
    background:
      linear-gradient(90deg, rgba($navy, 0.98), rgba($navy, 0.9) 42%, rgba($navy, 0.28)),
      var(--page-hero-background-image) 94% center / auto 170% no-repeat,
      $navy;
  }

  &--photo-clear::before {
    background: none;
  }

  &--photo-clear &__container {
    text-shadow: 0 2px 8px rgba($navy, 0.8);
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

  &--rgs-photo {
    background:
      linear-gradient(90deg, rgba($navy, 1) 0%, rgba($navy, 0.98) 36%, rgba($navy, 0.68) 58%, rgba($navy, 0.12) 100%),
      var(--page-hero-background-image) right center / 68% auto no-repeat,
      $navy;
  }

  &--rvs-photo {
    background:
      linear-gradient(90deg, rgba($navy, 1) 0%, rgba($navy, 0.98) 36%, rgba($navy, 0.76) 60%, rgba($navy, 0.2) 100%),
      var(--page-hero-background-image) right center / 72% auto no-repeat,
      $navy;
  }

  &--image-element {
    background: $navy;

    &::before {
      position: absolute;
      inset: 0;
      z-index: 1;
      content: '';
      background: linear-gradient(90deg, rgba($navy, 0.97), rgba($navy, 0.82) 52%, rgba($navy, 0.34));
    }
  }

  &--screw-flight-photo::before {
    background: linear-gradient(
      90deg,
      rgba($navy, 0.96) 0%,
      rgba($navy, 0.84) 37%,
      rgba($navy, 0.28) 74%,
      rgba($navy, 0.12) 100%
    );
  }

  &--scraper-drawing {
    min-height: 390px;
    padding-block: 52px 48px;
  }

  &--scraper-drawing::before {
    background: linear-gradient(90deg, $navy 0%, rgba($navy, 0.96) 28%, rgba($navy, 0.65) 62%, rgba($navy, 0.3));
  }

  &--scraper-drawing &__background-image {
    right: 0;
    left: auto;
    width: 70%;
    object-fit: contain;
    object-position: right center;
  }

  &--elevator-drawing {
    min-height: 390px;
    padding-block: 52px 48px;
  }

  &--elevator-drawing::before {
    background: linear-gradient(
      90deg,
      rgba($navy, 0.99) 0%,
      rgba($navy, 0.95) 38%,
      rgba($navy, 0.64) 67%,
      rgba($navy, 0.32)
    );
  }

  &--elevator-drawing &__background-image {
    right: -4%;
    left: auto;
    width: 66%;
    object-fit: contain;
    object-position: right center;
  }

  &--elevator-drawing &__title {
    max-width: none;
    font-size: clamp(34px, 3.5vw, 54px);
    white-space: nowrap;
  }

  &--elevator-drawing &__text {
    max-width: 620px;
  }

  &--screw-flight-photo &__background-image {
    object-position: 62% center;
  }

  &--flat-conveyor-photo {
    min-height: clamp(380px, 30vw, 430px);
  }

  &--flat-conveyor-photo::before {
    background: linear-gradient(
      90deg,
      rgba($navy, 0.98),
      rgba($navy, 0.92) 35%,
      rgba($navy, 0.25) 80%,
      rgba($navy, 0.16)
    );
  }

  &--flat-conveyor-photo &__background-image {
    left: auto;
    width: min(68%, 1000px);
    object-fit: cover;
    object-position: center 56%;
  }

  &--straight-conveyor-photo &__background-image {
    left: auto;
    width: min(80%, 1250px);
    object-fit: contain;
    object-position: right center;
  }

  &--firewood-photo::before {
    background: linear-gradient(
      90deg,
      rgba($navy, 0.99) 0%,
      rgba($navy, 0.94) 38%,
      rgba($navy, 0.46) 70%,
      rgba($navy, 0.18) 100%
    );
  }

  &--firewood-photo &__background-image {
    right: 3%;
    left: auto;
    width: min(58%, 850px);
    object-fit: contain;
    object-position: right center;
    filter: brightness(1.12) contrast(1.04);
  }

  &--flat-conveyor-photo &__title {
    max-width: 780px;
    font-size: clamp(34px, 4.3vw, 58px);
  }

  &--flat-conveyor-photo &__text {
    max-width: 670px;
  }

  &--smooth-belt-photo,
  &--partitioned-conveyor-photo {
    min-height: clamp(320px, 24vw, 360px);
  }

  &--smooth-belt-photo::before,
  &--partitioned-conveyor-photo::before {
    background: linear-gradient(90deg, rgba($navy, 0.98), rgba($navy, 0.9) 38%, rgba($navy, 0.12));
  }

  &--smooth-belt-photo &__background-image,
  &--partitioned-conveyor-photo &__background-image {
    left: auto;
    width: min(70%, 1100px);
    object-fit: contain;
    object-position: right center;
  }

  &--smooth-belt-photo &__title,
  &--partitioned-conveyor-photo &__title {
    max-width: 720px;
  }

  &__background-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 52%;
  }

  &--image-element &__container {
    z-index: 2;
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

  &__action {
    margin-top: 24px;
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

    &--image-element::before {
      background: linear-gradient(90deg, rgba($navy, 0.94), rgba($navy, 0.72));
    }

    &--scraper-drawing {
      min-height: 0;
    }

    &--scraper-drawing::before {
      background: linear-gradient(90deg, rgba($navy, 0.97), rgba($navy, 0.85));
    }

    &--scraper-drawing &__background-image {
      width: 100%;
      object-fit: contain;
    }

    &--elevator-drawing {
      min-height: 0;
    }

    &--elevator-drawing::before {
      background: linear-gradient(90deg, rgba($navy, 0.98), rgba($navy, 0.82));
    }

    &--elevator-drawing &__background-image {
      right: 0;
      width: 100%;
      opacity: 0.55;
    }

    &--elevator-drawing &__title {
      white-space: normal;
    }

    &--screw-flight-photo::before {
      background: linear-gradient(90deg, rgba($navy, 0.93), rgba($navy, 0.78));
    }

    &--screw-flight-photo &__background-image {
      object-position: 72% center;
    }

    &--flat-conveyor-photo::before {
      background: linear-gradient(90deg, rgba($navy, 0.95), rgba($navy, 0.82));
    }

    &--flat-conveyor-photo {
      min-height: 0;
    }

    &--flat-conveyor-photo &__background-image {
      width: 100%;
      object-position: 72% center;
    }

    &--flat-conveyor-photo &__title {
      max-width: 100%;
      font-size: 30px;
    }

    &--flat-conveyor-photo &__text {
      max-width: 100%;
    }

    &--smooth-belt-photo,
    &--partitioned-conveyor-photo {
      min-height: 0;
    }

    &--smooth-belt-photo::before,
    &--partitioned-conveyor-photo::before {
      background: linear-gradient(90deg, rgba($navy, 0.94), rgba($navy, 0.78));
    }

    &--smooth-belt-photo &__background-image,
    &--partitioned-conveyor-photo &__background-image {
      width: 100%;
    }

    &--rgs-photo,
    &--rvs-photo {
      background:
        linear-gradient(90deg, rgba($navy, 0.96), rgba($navy, 0.8)),
        var(--page-hero-background-image) 72% center / cover,
        $navy;
    }

    &--feeder-photo {
      background:
        linear-gradient(90deg, rgba($navy, 0.94), rgba($navy, 0.78)),
        var(--page-hero-background-image) center / auto 120% no-repeat,
        $navy;
    }
  }
}
</style>
