<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    image: string;
    imageAlt: string;
    eyebrow?: string;
    buttonLabel?: string;
    label?: string;
    labelIcon?: string;
  }>(),
  {
    eyebrow: 'Производство АБАТЭК',
    buttonLabel: 'Получить консультацию',
    label: '',
    labelIcon: 'lucide:factory',
  },
);
defineEmits<{ action: [] }>();
</script>

<template>
  <section class="product-intro-02 site-container">
    <div class="product-intro-02__content">
      <div v-if="$slots.breadcrumbs" class="product-intro-02__breadcrumbs">
        <slot name="breadcrumbs" />
      </div>
      <p class="product-intro-02__eyebrow">{{ eyebrow }}</p>
      <h2>{{ title }}</h2>
      <div class="product-intro-02__copy"><slot /></div>
      <button type="button" @click="$emit('action')">{{ buttonLabel }}</button>
    </div>
    <figure>
      <img :src="image" :alt="imageAlt" width="1920" height="1080" />
      <span v-if="label" class="product-intro-02__label">
        <Icon :name="labelIcon" mode="svg" aria-hidden="true" />
        {{ label }}
      </span>
      <figcaption v-if="$slots.caption"><slot name="caption" /></figcaption>
    </figure>
  </section>
</template>

<style scoped lang="scss">
.product-intro-02 {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(340px, 1fr);
  gap: clamp(42px, 7vw, 94px);
  align-items: center;
  padding-block: clamp(52px, 7vw, 86px);
}

.product-intro-02__content {
  position: relative;
  min-width: 0;
}

.product-intro-02__content::before {
  display: block;
  width: 64px;
  height: 6px;
  margin-bottom: 24px;
  content: '';
  background: linear-gradient(90deg, #0757a4 0 72%, #f5c518 72%);
  border-radius: 6px;
}

.product-intro-02__breadcrumbs {
  margin-bottom: 22px;
}

.product-intro-02__eyebrow {
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 900;
  color: #0757a4;
  text-transform: uppercase;
  letter-spacing: 0.16em;
}

.product-intro-02 h2 {
  max-width: 700px;
  margin: 0;
  font-size: clamp(35px, 4.5vw, 60px);
  line-height: 1.08;
  color: #052f55;
  letter-spacing: -0.045em;
}

.product-intro-02__copy {
  margin-top: 18px;

  :deep(p) {
    line-height: 1.7;
    color: $muted;
  }
}

.product-intro-02 button {
  min-height: 54px;
  padding-inline: 28px;
  margin-top: 8px;
  font-weight: 850;
  color: #052f55;
  cursor: pointer;
  background: #f5c518;
  border: 1px solid #f5c518;
  border-radius: 7px;
}

.product-intro-02 figure {
  position: relative;
  padding: 14px;
  margin: 0;
  background: #eef5fb;
  border: 1px solid rgb(7 87 164 / 10%);
  border-radius: 22px;
}

.product-intro-02__label {
  position: absolute;
  bottom: 32px;
  left: 32px;
  display: inline-flex;
  gap: 10px;
  align-items: center;
  max-width: calc(100% - 64px);
  padding: 12px 17px 12px 13px;
  font-size: 11px;
  font-weight: 850;
  line-height: 1.2;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.11em;
  background: rgb(5 47 85 / 92%);
  border: 1px solid rgb(255 255 255 / 72%);
  border-radius: 999px;
  box-shadow: 0 10px 28px rgb(5 47 85 / 28%);
  backdrop-filter: blur(8px);
}

.product-intro-02__label :deep(svg) {
  flex: 0 0 auto;
  width: 17px;
  height: 17px;
  color: #f5c518;
  stroke-width: 2.2;
}

.product-intro-02__label::after {
  position: absolute;
  inset: 3px;
  pointer-events: none;
  content: '';
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: inherit;
}

.product-intro-02 img {
  display: block;
  width: 100%;
  height: clamp(310px, 34vw, 430px);
  object-fit: cover;
  background: #fff;
  border-radius: 14px;
}

.product-intro-02 figcaption {
  margin-top: 9px;
  font-size: 12px;
  color: $muted;
}

@media (width <= $tablet) {
  .product-intro-02 {
    grid-template-columns: 1fr;
  }

  .product-intro-02 figure {
    max-width: 680px;
  }
}

@media (width <= $phone) {
  .product-intro-02,
  .product-intro-02__content,
  .product-intro-02__copy {
    min-width: 0;
    max-width: 100%;
  }

  .product-intro-02 h2 {
    width: 100%;
    max-width: 100%;
    font-size: 32px;
    hyphens: auto;
    overflow-wrap: anywhere;
  }

  .product-intro-02__copy :deep(p) {
    overflow-wrap: anywhere;
  }

  .product-intro-02 button {
    max-width: 100%;
    white-space: normal;
  }

  .product-intro-02 img {
    height: 280px;
  }

  .product-intro-02__label {
    bottom: 24px;
    left: 24px;
    max-width: calc(100% - 48px);
    padding: 10px 14px 10px 11px;
    font-size: 9px;
  }
}
</style>
