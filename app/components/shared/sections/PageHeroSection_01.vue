<script setup lang="ts">
const { title, text = '', eyebrow = 'АБАТЭК' } = defineProps<{ title: string; text?: string; eyebrow?: string }>();
</script>

<template>
  <section class="page-hero">
    <div class="site-container page-hero__container">
      <p class="page-hero__eyebrow">{{ eyebrow }}</p>
      <h1 class="page-hero__title">{{ title }}</h1>
      <p v-if="text" class="page-hero__text">{{ text }}</p>
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

  &__text {
    max-width: 650px;
    margin: 28px 0 0;
    font-size: 15px;
    line-height: 1.6;
    color: #c2d1df;
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
  }
}
</style>
