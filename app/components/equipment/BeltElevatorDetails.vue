<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui';
import type { GalleryImage, IndustrialSection } from '~/data/pages/_shared/types';

defineProps<{
  product: IndustrialSection;
  number: number;
  image?: GalleryImage;
  imageCaption?: string;
  secondImage?: GalleryImage;
  secondImageCaption?: string;
  sketch?: { src: string; alt: string; viewBox: string; width: number; height: number };
  tables: Array<{ title: string; eyebrow?: string; headers: string[]; rows: string[][] }>;
}>();

const isOpen = ref(false);
</script>

<template>
  <article class="belt-details">
    <button
      class="belt-details__card"
      type="button"
      :aria-label="`Открыть характеристики: ${product.title}`"
      @click="isOpen = true"
    >
      <span class="belt-details__number">{{ String(number).padStart(2, '0') }}</span>
      <span class="belt-details__title">{{ product.title }}</span>
      <span v-for="paragraph in product.text" :key="paragraph" class="belt-details__text">{{ paragraph }}</span>
      <span v-if="product.items?.length" class="belt-details__list">
        <span v-for="item in product.items" :key="item" class="belt-details__list-item">{{ item }}</span>
      </span>
      <span class="belt-details__action">Технические характеристики и размеры ковшей</span>
    </button>

    <DialogRoot v-model:open="isOpen">
      <DialogPortal>
        <DialogOverlay class="belt-details__overlay" />
        <DialogContent class="belt-details__dialog">
          <div class="belt-details__heading">
            <div>
              <DialogTitle class="belt-details__dialog-title">{{ product.title }}</DialogTitle>
              <DialogDescription class="belt-details__dialog-description">
                Технические характеристики и размеры ковшей
              </DialogDescription>
            </div>
            <DialogClose class="belt-details__close" aria-label="Закрыть окно">
              <Icon name="lucide:x" aria-hidden="true" />
            </DialogClose>
          </div>
          <div v-if="image" class="belt-details__figures" :class="{ 'belt-details__figures--pair': secondImage }">
            <figure class="belt-details__figure">
              <img
                class="belt-details__image"
                :src="image.src"
                :alt="image.alt"
                :width="image.width"
                :height="image.height"
              />
              <figcaption v-if="imageCaption" class="belt-details__caption">{{ imageCaption }}</figcaption>
            </figure>
            <figure v-if="secondImage" class="belt-details__figure">
              <img
                class="belt-details__image"
                :src="secondImage.src"
                :alt="secondImage.alt"
                :width="secondImage.width"
                :height="secondImage.height"
              />
              <figcaption v-if="secondImageCaption" class="belt-details__caption">{{ secondImageCaption }}</figcaption>
            </figure>
          </div>
          <div
            v-for="(table, index) in tables"
            :key="table.title"
            :class="index === 1 && sketch && 'belt-details__sizes'"
          >
            <figure v-if="index === 1 && sketch" class="belt-details__sketch">
              <svg class="belt-details__sketch-image" :viewBox="sketch.viewBox" role="img" :aria-label="sketch.alt">
                <image :href="sketch.src" :width="sketch.width" :height="sketch.height" />
              </svg>
            </figure>
            <SpecsTableSection
              :title="table.title"
              :columns="table.headers"
              :rows="table.rows"
              :eyebrow="table.eyebrow"
              compact
            />
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </article>
</template>

<style scoped lang="scss">
@use '~/assets/styles/mixins' as *;

.belt-details {
  min-width: 0;

  &__card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    height: 100%;
    padding: 28px;
    text-align: left;
    cursor: pointer;
    background: #fff;
    border: 1px solid $line;
    border-radius: 14px;
  }

  &__card:hover,
  &__card:focus-visible {
    border-color: $blue;
  }

  &__number {
    font-weight: 800;
    color: $blue;
  }

  &__title {
    font-size: 20px;
    font-weight: 700;
    color: $ink;
  }

  &__text,
  &__list {
    font-size: 14px;
    line-height: 1.6;
  }

  &__text {
    color: $muted;
  }

  &__list {
    display: grid;
    gap: 4px;
    padding-left: 20px;
    color: $ink;
  }

  &__list-item {
    display: list-item;
  }

  &__action {
    margin-top: auto;
    font-weight: 700;
    color: $blue;
  }

  &__overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgb(0 0 0 / 65%);
  }

  &__dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 1001;
    width: min(1100px, calc(100vw - 32px));
    max-height: calc(100vh - 32px);
    padding: 28px;
    overflow-y: auto;
    background: #fff;
    border-radius: 16px;
    transform: translate(-50%, -50%);
  }

  &__heading {
    display: flex;
    gap: 16px;
    justify-content: space-between;
  }

  &__dialog-title {
    font-size: 24px;
    font-weight: 700;
    color: $ink;
  }

  &__dialog-description {
    margin-top: 8px;
    color: $muted;
  }

  &__close {
    align-self: flex-start;
    padding: 8px;
    cursor: pointer;
    background: $soft;
    border: 0;
    border-radius: 8px;
  }

  &__figures {
    margin-top: 24px;
  }

  &__figures--pair {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
    align-items: start;
  }

  &__figure {
    min-width: 0;
    margin: 0;
  }

  &__image {
    display: block;
    width: min(100%, 560px);
    height: auto;
    margin: auto;
  }

  &__caption {
    margin-top: 12px;
    font-size: 15px;
    font-weight: 700;
    color: $ink;
    text-align: center;
  }

  &__sizes {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    gap: 24px;
    align-items: start;
  }

  &__sketch {
    margin: 84px 0 0;
  }

  &__sketch-image {
    display: block;
    width: 100%;
    height: auto;
  }
}

@include tablet {
  .belt-details__sizes {
    grid-template-columns: 1fr;
  }

  .belt-details__sketch {
    width: min(100%, 420px);
    margin: 28px auto 0;
  }
}

@include phone {
  .belt-details__figures--pair {
    grid-template-columns: 1fr;
  }

  .belt-details__dialog {
    padding: 18px;
  }
}
</style>
