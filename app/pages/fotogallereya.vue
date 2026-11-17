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
import { photoGalleryContent as content } from '~/data/pages/primery-rabot/content';
import { gallery, galleryCategories, galleryGroups } from '~/data/pages/primery-rabot/gallery';
import { seo } from '~/data/pages/primery-rabot/seo';

usePageSeo(seo);

type GalleryItem = (typeof gallery)[number];
const activeCategory = ref('all');
const selectedImage = ref<GalleryItem>();
const viewerOpen = ref(false);
const activeCategoryData = computed(() => galleryCategories.find((item) => item.id === activeCategory.value));
const visibleImages = computed(() =>
  activeCategory.value === 'all' ? gallery : gallery.filter((image) => image.categoryId === activeCategory.value),
);

function selectCategory(id: string) {
  activeCategory.value = id;
}

function openImage(image: GalleryItem) {
  selectedImage.value = image;
  viewerOpen.value = true;
}

function moveViewer(direction: 1 | -1) {
  if (!selectedImage.value || visibleImages.value.length < 2) return;
  const index = visibleImages.value.findIndex((image) => image.src === selectedImage.value?.src);
  selectedImage.value =
    visibleImages.value[(index + direction + visibleImages.value.length) % visibleImages.value.length];
}
</script>

<template>
  <div class="photo-gallery">
    <header class="photo-gallery__hero">
      <div class="site-container photo-gallery__hero-inner">
        <div>
          <p class="photo-gallery__eyebrow">{{ content.eyebrow }}</p>
          <h1 class="photo-gallery__title">{{ content.title }}</h1>
          <p class="photo-gallery__lead">{{ content.lead }}</p>
          <a class="photo-gallery__jump" href="#gallery">
            {{ content.categoriesTitle }}
            <Icon name="lucide:arrow-down-right" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>

    <main id="gallery" class="photo-gallery__main site-container">
      <div class="photo-gallery__section-heading">
        <div>
          <p class="photo-gallery__eyebrow">{{ content.title }}</p>
          <h2>{{ content.categoriesTitle }}</h2>
        </div>
        <span>{{ gallery.length }} {{ content.photoCount }}</span>
      </div>

      <div class="photo-gallery__groups" aria-label="Категории фотогалереи">
        <section v-for="group in galleryGroups" :key="group.title" class="photo-group">
          <h3 class="photo-group__title">{{ group.title }}</h3>
          <div class="photo-group__items">
            <button
              v-for="category in group.categories"
              :key="category.id"
              class="photo-group__item"
              :class="{ 'photo-group__item--active': activeCategory === category.id }"
              type="button"
              :aria-pressed="activeCategory === category.id"
              @click="selectCategory(category.id)"
            >
              <span>{{ category.label }}</span>
              <b>{{ category.images.length }}</b>
            </button>
          </div>
        </section>
      </div>

      <div class="photo-gallery__results">
        <div>
          <p class="photo-gallery__eyebrow">{{ content.title }}</p>
          <h2>{{ activeCategoryData?.label || content.allPhotos }}</h2>
          <p class="photo-gallery__description">{{ activeCategoryData?.description || content.lead }}</p>
        </div>
        <button
          class="photo-gallery__all"
          :class="{ 'photo-gallery__all--active': activeCategory === 'all' }"
          type="button"
          :aria-pressed="activeCategory === 'all'"
          @click="selectCategory('all')"
        >
          {{ content.allPhotos }}
          <b>{{ gallery.length }}</b>
        </button>
      </div>

      <div class="photo-gallery__grid">
        <article v-for="image in visibleImages" :key="image.src" class="photo-card">
          <button
            class="photo-card__button"
            type="button"
            :aria-label="`${content.openPhoto}: ${image.alt}`"
            @click="openImage(image)"
          >
            <img
              class="photo-card__image"
              :src="image.src"
              :alt="image.alt"
              :width="image.width || 800"
              :height="image.height || 600"
              loading="lazy"
            />
            <span class="photo-card__expand"><Icon name="lucide:expand" aria-hidden="true" /></span>
          </button>
          <p class="photo-card__caption">{{ image.alt }}</p>
        </article>
      </div>

      <div class="photo-gallery__contact">
        <NuxtLink to="/kontakty">
          {{ content.contactLabel }}
          <Icon name="lucide:arrow-up-right" aria-hidden="true" />
        </NuxtLink>
      </div>
    </main>

    <DialogRoot :open="viewerOpen" @update:open="viewerOpen = $event">
      <DialogPortal>
        <DialogOverlay class="photo-viewer__overlay" />
        <DialogContent v-if="selectedImage" class="photo-viewer__content">
          <DialogTitle class="photo-viewer__title">{{ selectedImage.alt }}</DialogTitle>
          <DialogDescription class="photo-viewer__description">{{ content.title }}</DialogDescription>
          <img
            class="photo-viewer__image"
            :src="selectedImage.fullSrc || selectedImage.src"
            :alt="selectedImage.alt"
            :width="selectedImage.fullWidth || selectedImage.width || 1600"
            :height="selectedImage.fullHeight || selectedImage.height || 1200"
          />
          <button
            class="photo-viewer__previous"
            type="button"
            :aria-label="content.previousPhoto"
            @click="moveViewer(-1)"
          >
            <Icon name="lucide:arrow-left" aria-hidden="true" />
          </button>
          <button class="photo-viewer__next" type="button" :aria-label="content.nextPhoto" @click="moveViewer(1)">
            <Icon name="lucide:arrow-right" aria-hidden="true" />
          </button>
          <DialogClose class="photo-viewer__close" :aria-label="content.closePhoto">
            <Icon name="lucide:x" aria-hidden="true" />
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/styles/mixins' as *;

.photo-gallery {
  background: $soft;

  &__hero {
    color: #fff;
    background-color: $navy;
    background-image:
      linear-gradient(rgba($navy, 0.84), rgba($navy, 0.84)),
      url('/images/photogallery/proizvodstvo-bunkera-mirrored.webp');
    background-position: center 45%;
    background-size: cover;
  }

  &__hero-inner {
    padding-block: 3.5rem;
  }

  &__eyebrow {
    margin: 0 0 0.75rem;
    font-size: 0.78rem;
    font-weight: 700;
    color: $blue;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  &__title {
    margin: 0 0 0.75rem;
    font-size: clamp(2.8rem, 6vw, 5.5rem);
    line-height: 1.04;
  }

  &__lead {
    max-width: 680px;
    margin: 0 0 1rem;
    font-size: 1.12rem;
    line-height: 1.7;
  }

  &__jump {
    display: inline-flex;
    gap: 0.75rem;
    align-items: center;
    padding: 0.9rem 1.25rem;
    font-weight: 700;
    color: $navy;
    text-decoration: none;
    background: $yellow;
    border-radius: 0.6rem;
  }

  &__main {
    padding-block: 4rem 6rem;
  }

  &__section-heading,
  &__results {
    display: flex;
    gap: 2rem;
    align-items: end;
    justify-content: space-between;
  }

  &__section-heading {
    margin-bottom: 1.5rem;
  }

  &__section-heading h2,
  &__results h2 {
    margin: 0;
    font-size: clamp(1.7rem, 3vw, 2.5rem);
    color: $navy;
  }

  &__groups {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    margin-bottom: 4rem;
  }

  &__results {
    padding-bottom: 1.25rem;
    border-bottom: 1px solid $line;
  }

  &__description {
    max-width: 650px;
    margin: 0.75rem 0 0;
    line-height: 1.6;
    color: $muted;
  }

  &__all {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    padding: 0.75rem 1rem;
    font: inherit;
    color: $navy;
    cursor: pointer;
    background: #fff;
    border: 1px solid $line;
    border-radius: 0.5rem;
  }

  &__all--active {
    border-color: $blue;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
    padding-top: 2rem;
  }

  &__contact {
    margin-top: 3rem;
    text-align: center;
  }

  &__contact a {
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
    font-weight: 700;
    color: $blue;
  }
}

.photo-group {
  min-height: 180px;
  padding: 1.4rem;
  background: #fff;
  border: 1px solid $line;
  border-radius: 0.8rem;

  &__title {
    margin: 0 0 1rem;
    font-size: 1rem;
    line-height: 1.35;
    color: $navy;
  }

  &__items {
    display: grid;
    gap: 0.35rem;
  }

  &__item {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.55rem 0.7rem;
    font: inherit;
    color: $ink;
    text-align: left;
    cursor: pointer;
    background: $soft;
    border: 1px solid transparent;
    border-radius: 0.35rem;
  }

  &__item--active {
    color: $blue;
    border-color: $blue;
  }
}

.photo-card {
  overflow: hidden;
  background: #fff;
  border: 1px solid $line;
  border-radius: 0.75rem;

  &__button {
    position: relative;
    display: block;
    width: 100%;
    padding: 0;
    cursor: pointer;
    border: 0;
  }

  &__image {
    display: block;
    width: 100%;
    height: 240px;
    object-fit: cover;
  }

  &__expand {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    display: grid;
    place-items: center;
    width: 2.5rem;
    height: 2.5rem;
    color: $navy;
    background: #fff;
    border-radius: 50%;
  }

  &__caption {
    padding: 1rem;
    margin: 0;
    line-height: 1.5;
    color: $ink;
  }
}

.photo-viewer {
  &__overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgba($navy, 0.9);
  }

  &__content {
    position: fixed;
    inset: 50% auto auto 50%;
    z-index: 101;
    display: grid;
    align-items: center;
    width: min(92vw, 1300px);
    height: min(90vh, 900px);
    padding: 3rem;
    color: #fff;
    background: $navy;
    border-radius: 0.8rem;
    transform: translate(-50%, -50%);
  }

  &__title {
    margin: 0 2rem 0.5rem 0;
    font-size: 1rem;
  }

  &__description {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
  }

  &__image {
    max-width: 100%;
    max-height: calc(90vh - 8rem);
    margin: auto;
    object-fit: contain;
  }

  &__previous,
  &__next,
  &__close {
    position: absolute;
    display: grid;
    place-items: center;
    width: 2.5rem;
    height: 2.5rem;
    color: $navy;
    cursor: pointer;
    background: #fff;
    border: 0;
    border-radius: 50%;
  }

  &__previous {
    top: 50%;
    left: 0.5rem;
  }

  &__next {
    top: 50%;
    right: 0.5rem;
  }

  &__close {
    top: 0.75rem;
    right: 0.75rem;
  }
}

@include tablet {
  .photo-gallery {
    &__groups,
    &__grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
}

@include phone {
  .photo-gallery {
    &__groups,
    &__grid {
      grid-template-columns: 1fr;
    }

    &__hero-inner {
      padding-block: 2.5rem;
    }

    &__section-heading,
    &__results {
      flex-direction: column;
      align-items: start;
    }
  }
}
</style>
