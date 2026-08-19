<script setup lang="ts">
import emblaCarouselVue from 'embla-carousel-vue';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui';
import type { GalleryImage } from '~/data/pages/_shared/types';

defineProps<{ images: readonly GalleryImage[]; title: string }>();

const [emblaRef, emblaApi] = emblaCarouselVue({ align: 'start', loop: true });
const selectedIndex = ref(0);
const scrollSnaps = ref<number[]>([]);
const selectedImage = ref<GalleryImage>();
const viewerOpen = ref(false);

const updateCarouselState = () => {
  const api = emblaApi.value;
  if (!api) return;
  selectedIndex.value = api.selectedScrollSnap();
  scrollSnaps.value = api.scrollSnapList();
};

watch(
  emblaApi,
  (api, _, onCleanup) => {
    if (!api) return;
    updateCarouselState();
    api.on('select', updateCarouselState);
    api.on('reInit', updateCarouselState);
    onCleanup(() => {
      api.off('select', updateCarouselState);
      api.off('reInit', updateCarouselState);
    });
  },
  { immediate: true },
);

const scrollPrev = () => emblaApi.value?.scrollPrev();
const scrollNext = () => emblaApi.value?.scrollNext();
const scrollTo = (index: number) => emblaApi.value?.scrollTo(index);
const openImage = (image: GalleryImage) => {
  selectedImage.value = image;
  viewerOpen.value = true;
};
const setViewerOpen = (open: boolean) => {
  viewerOpen.value = open;
};
</script>

<template>
  <section class="project-gallery" aria-labelledby="project-gallery-title">
    <div class="content-section site-container">
      <header class="project-gallery__heading">
        <div>
          <p>Реализованные решения</p>
          <h2 id="project-gallery-title">{{ title }}</h2>
        </div>
        <div class="project-gallery__controls">
          <span>{{ String(selectedIndex + 1).padStart(2, '0') }} / {{ String(images.length).padStart(2, '0') }}</span>
          <button type="button" aria-label="Предыдущая фотография" @click="scrollPrev">
            <Icon name="lucide:arrow-left" aria-hidden="true" mode="svg" />
          </button>
          <button type="button" aria-label="Следующая фотография" @click="scrollNext">
            <Icon name="lucide:arrow-right" aria-hidden="true" mode="svg" />
          </button>
        </div>
      </header>

      <div ref="emblaRef" class="project-gallery__viewport">
        <div class="project-gallery__track">
          <figure v-for="(image, index) in images" :key="`${image.src}-${index}`" class="project-gallery__slide">
            <button type="button" :aria-label="`Открыть фотографию: ${image.alt}`" @click="openImage(image)">
              <img :src="image.src" :alt="image.alt" width="1200" height="800" loading="lazy" />
              <span class="project-gallery__shade" aria-hidden="true" />
              <span class="project-gallery__number">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="project-gallery__caption">{{ image.alt }}</span>
              <Icon class="project-gallery__zoom" name="lucide:move-up-right" aria-hidden="true" mode="svg" />
            </button>
          </figure>
        </div>
      </div>

      <div v-if="scrollSnaps.length > 1" class="project-gallery__dots" aria-label="Выбор слайда">
        <button
          v-for="(_, index) in scrollSnaps"
          :key="index"
          type="button"
          :class="{ 'project-gallery__dot--active': index === selectedIndex }"
          :aria-label="`Перейти к фотографии ${index + 1}`"
          :aria-current="index === selectedIndex ? 'true' : undefined"
          @click="scrollTo(index)"
        />
      </div>
    </div>

    <DialogRoot :open="viewerOpen" @update:open="setViewerOpen">
      <DialogPortal>
        <DialogOverlay class="gallery-viewer__overlay" />
        <DialogContent v-if="selectedImage" class="gallery-viewer__content">
          <DialogTitle class="gallery-viewer__title">{{ selectedImage.alt }}</DialogTitle>
          <DialogDescription class="gallery-viewer__description">
            Фотография выполненного проекта АБАТЭК
          </DialogDescription>
          <img :src="selectedImage.src" :alt="selectedImage.alt" width="1920" height="1280" />
          <DialogClose class="gallery-viewer__close" aria-label="Закрыть фотографию">
            <Icon name="lucide:x" aria-hidden="true" mode="svg" />
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </section>
</template>

<style scoped lang="scss">
.project-gallery {
  position: relative;
  overflow: hidden;
  color: #fff;
  background:
    radial-gradient(circle at 88% 5%, rgb(23 105 170 / 28%), transparent 32%), linear-gradient(145deg, #031d38, #052f55);

  &::before {
    position: absolute;
    top: -180px;
    right: -120px;
    width: 440px;
    height: 440px;
    pointer-events: none;
    content: '';
    border: 1px solid rgb(255 255 255 / 8%);
    border-radius: 50%;
    box-shadow:
      0 0 0 48px rgb(255 255 255 / 2.5%),
      0 0 0 96px rgb(255 255 255 / 1.5%);
  }

  &__heading {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 32px;
    align-items: end;
    justify-content: space-between;
    margin-bottom: 38px;

    p {
      margin: 0 0 12px;
      font-size: 11px;
      font-weight: 900;
      color: #f5c518;
      text-transform: uppercase;
      letter-spacing: 0.16em;
    }

    h2 {
      max-width: 900px;
      margin: 0;
      font-size: clamp(36px, 5vw, 64px);
      line-height: 1.03;
      letter-spacing: -0.05em;
    }
  }

  &__controls {
    display: flex;
    flex: 0 0 auto;
    gap: 10px;
    align-items: center;

    > span {
      min-width: 82px;
      font-size: 13px;
      font-weight: 850;
      color: #b8cad9;
      letter-spacing: 0.08em;
    }

    button {
      display: grid;
      place-items: center;
      width: 50px;
      height: 50px;
      padding: 0;
      color: #fff;
      cursor: pointer;
      background: rgb(255 255 255 / 8%);
      border: 1px solid rgb(255 255 255 / 20%);
      border-radius: 50%;
      transition:
        color 0.2s ease,
        background 0.2s ease,
        border-color 0.2s ease;

      &:hover {
        color: #052f55;
        background: #f5c518;
        border-color: #f5c518;
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  &__viewport {
    position: relative;
    z-index: 1;
    overflow: hidden;
  }

  &__track {
    display: flex;
    margin-left: -20px;
    touch-action: pan-y pinch-zoom;
  }

  &__slide {
    flex: 0 0 33.333%;
    min-width: 0;
    padding-left: 20px;
    margin: 0;

    button {
      position: relative;
      display: block;
      width: 100%;
      height: clamp(340px, 34vw, 470px);
      padding: 0;
      overflow: hidden;
      color: #fff;
      text-align: left;
      cursor: zoom-in;
      background: #071a2e;
      border: 1px solid rgb(255 255 255 / 14%);
      border-radius: 18px;
      box-shadow: 0 22px 55px rgb(0 0 0 / 22%);
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.45s ease;
    }

    button:hover img {
      transform: scale(1.045);
    }

    .project-gallery__caption {
      position: absolute;
      right: 24px;
      bottom: 22px;
      left: 24px;
      z-index: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 15px;
      font-weight: 750;
      line-height: 1.4;
      white-space: nowrap;
    }
  }

  &__shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 45%, rgb(2 14 28 / 90%) 100%);
  }

  &__number {
    position: absolute;
    top: 18px;
    left: 18px;
    display: grid;
    place-items: center;
    width: 46px;
    height: 46px;
    font-size: 12px;
    font-weight: 900;
    color: #052f55;
    background: #f5c518;
    border-radius: 50%;
  }

  &__zoom {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 22px;
    height: 22px;
    color: #fff;
    filter: drop-shadow(0 2px 8px rgb(0 0 0 / 45%));
  }

  &__dots {
    position: relative;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    justify-content: center;
    margin-top: 30px;

    button {
      width: 24px;
      height: 4px;
      padding: 0;
      cursor: pointer;
      background: rgb(255 255 255 / 22%);
      border: 0;
      border-radius: 4px;
      transition:
        width 0.2s ease,
        background 0.2s ease;
    }

    .project-gallery__dot--active {
      width: 42px;
      background: #f5c518;
    }
  }
}

.gallery-viewer {
  &__overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgb(2 12 24 / 92%);
    backdrop-filter: blur(14px);
  }

  &__content {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 101;
    width: min(94vw, 1600px);
    max-height: 94vh;
    padding: 0;
    overflow: hidden;
    background: #020c18;
    border: 1px solid rgb(255 255 255 / 18%);
    border-radius: 20px;
    box-shadow: 0 36px 120px rgb(0 0 0 / 68%);
    transform: translate(-50%, -50%);

    > img {
      display: block;
      width: 100%;
      max-height: 94vh;
      object-fit: contain;
    }
  }

  &__title,
  &__description {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
  }

  &__close {
    position: absolute;
    top: 18px;
    right: 18px;
    display: grid;
    place-items: center;
    width: 50px;
    height: 50px;
    padding: 0;
    color: #fff;
    cursor: pointer;
    background: rgb(3 22 43 / 86%);
    border: 1px solid rgb(255 255 255 / 32%);
    border-radius: 50%;

    svg {
      width: 30px;
      height: 30px;
    }
  }
}

@media (width <= $tablet) {
  .project-gallery__slide {
    flex-basis: 50%;
  }
}

@media (width <= $phone) {
  .project-gallery {
    &__heading {
      flex-direction: column;
      align-items: start;
    }

    &__controls {
      width: 100%;

      > span {
        margin-right: auto;
      }
    }

    &__slide {
      flex-basis: 100%;

      button {
        height: 380px;
      }
    }
  }

  .gallery-viewer {
    &__content {
      inset: 0;
      width: 100%;
      height: 100dvh;
      max-height: none;
      border: 0;
      border-radius: 0;
      transform: none;

      > img {
        width: 100%;
        height: 100%;
        max-height: none;
      }
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-gallery__slide img {
    transition: none;
  }
}
</style>
