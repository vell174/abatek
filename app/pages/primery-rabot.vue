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
import { gallery, galleryCategories } from '~/data/pages/primery-rabot/gallery';
import { seo } from '~/data/pages/primery-rabot/seo';

usePageSeo(seo);

type CategoryId = 'all' | (typeof galleryCategories)[number]['id'];
type GalleryItem = (typeof gallery)[number];

const activeCategory = ref<CategoryId>('all');
const selectedImage = ref<GalleryItem>();
const viewerOpen = ref(false);

const activeCategoryData = computed(() =>
  activeCategory.value === 'all' ? null : galleryCategories.find((category) => category.id === activeCategory.value),
);

const visibleImages = computed(() =>
  activeCategory.value === 'all' ? gallery : gallery.filter((image) => image.categoryId === activeCategory.value),
);

const sectionTitle = computed(() => activeCategoryData.value?.label ?? 'Все проекты');
const sectionDescription = computed(
  () =>
    activeCategoryData.value?.description ??
    'Реализованные проекты АБАТЭК: от отдельных узлов до комплексных транспортирующих систем.',
);

const selectCategory = (category: CategoryId) => {
  activeCategory.value = category;
};

const openImage = (image: GalleryItem) => {
  selectedImage.value = image;
  viewerOpen.value = true;
};

const setViewerOpen = (open: boolean) => {
  viewerOpen.value = open;
};

const moveViewer = (direction: 1 | -1) => {
  if (!selectedImage.value || visibleImages.value.length < 2) return;
  const index = visibleImages.value.findIndex((image) => image.src === selectedImage.value?.src);
  selectedImage.value =
    visibleImages.value[(index + direction + visibleImages.value.length) % visibleImages.value.length];
};
</script>

<template>
  <div class="projects-page">
    <section class="projects-hero">
      <div class="site-container projects-hero__inner">
        <div class="projects-hero__copy">
          <p class="projects-hero__eyebrow">
            <span>Инженерное портфолио</span>
          </p>
          <h1>
            Выполненные
            <br />
            <em>проекты</em>
          </h1>
          <p class="projects-hero__lead">
            Показываем оборудование таким, каким оно выходит из нашего производства — готовым к работе на вашем
            предприятии.
          </p>
          <div class="projects-hero__actions">
            <a href="#gallery">
              Смотреть проекты
              <Icon name="lucide:arrow-down-right" aria-hidden="true" mode="svg" />
            </a>
            <span>
              <b>{{ gallery.length }}</b>
              фотографий
              <br />
              реализованных решений
            </span>
          </div>
        </div>
        <div class="projects-hero__visual">
          <figure class="projects-hero__photo projects-hero__photo--main">
            <img :src="gallery[0].src" :alt="gallery[0].alt" width="1100" height="1300" />
            <figcaption>
              <span>01</span>
              Ленточные системы
            </figcaption>
          </figure>
          <figure class="projects-hero__photo projects-hero__photo--small">
            <img :src="gallery[20].src" :alt="gallery[20].alt" width="680" height="520" />
          </figure>
          <span class="projects-hero__stamp">
            <Icon name="lucide:badge-check" aria-hidden="true" mode="svg" />
            Реальные
            <br />
            проекты
          </span>
        </div>
      </div>
    </section>

    <section id="gallery" class="projects-gallery">
      <div class="site-container projects-gallery__layout">
        <aside class="projects-nav" aria-label="Категории проектов">
          <div class="projects-nav__heading">
            <span>Категории</span>
            <b>{{ String(galleryCategories.length).padStart(2, '0') }}</b>
          </div>
          <div class="projects-nav__tabs" role="tablist" aria-orientation="vertical">
            <button
              class="projects-nav__tab"
              type="button"
              role="tab"
              :aria-selected="activeCategory === 'all'"
              :class="{ 'projects-nav__tab--active': activeCategory === 'all' }"
              @click="selectCategory('all')"
            >
              <span>Все проекты</span>
              <b>{{ gallery.length }}</b>
            </button>
            <button
              v-for="(category, index) in galleryCategories"
              :key="category.id"
              class="projects-nav__tab"
              type="button"
              role="tab"
              :aria-selected="activeCategory === category.id"
              :class="{ 'projects-nav__tab--active': activeCategory === category.id }"
              @click="selectCategory(category.id)"
            >
              <small>{{ String(index + 1).padStart(2, '0') }}</small>
              <span>{{ category.shortLabel }}</span>
              <b>{{ category.images.length }}</b>
            </button>
          </div>
          <NuxtLink class="projects-nav__cta" to="/kontakty">
            <span>Обсудить свой проект</span>
            <Icon name="lucide:arrow-up-right" aria-hidden="true" mode="svg" />
          </NuxtLink>
        </aside>

        <div class="projects-gallery__content">
          <header class="projects-gallery__header">
            <div>
              <p>Реализованные решения</p>
              <h2>{{ sectionTitle }}</h2>
            </div>
            <span>{{ sectionDescription }}</span>
          </header>

          <Transition name="gallery-switch" mode="out-in">
            <div :key="activeCategory" class="projects-gallery__grid" role="tabpanel">
              <article
                v-for="(image, index) in visibleImages"
                :key="image.src"
                class="project-card"
                :class="{ 'project-card--feature': index === 0 }"
              >
                <button type="button" :aria-label="`Открыть фотографию: ${image.alt}`" @click="openImage(image)">
                  <img :src="image.src" :alt="image.alt" width="1000" height="750" loading="lazy" />
                  <span class="project-card__shade" aria-hidden="true" />
                  <span class="project-card__meta">
                    <small>{{ String(index + 1).padStart(2, '0') }}</small>
                    <b>{{ image.alt }}</b>
                  </span>
                  <span class="project-card__open">
                    <Icon name="lucide:expand" aria-hidden="true" mode="svg" />
                  </span>
                </button>
              </article>
            </div>
          </Transition>
        </div>
      </div>
    </section>

    <section class="projects-footer">
      <div class="site-container projects-footer__inner">
        <div>
          <span>Индивидуальное проектирование</span>
          <p>
            Следующий проект
            <br />
            может быть вашим
          </p>
        </div>
        <div class="projects-footer__action">
          <small>Расскажите о задаче — предложим техническое решение и подготовим расчёт.</small>
          <NuxtLink to="/kontakty">
            Обсудить задачу
            <Icon name="lucide:arrow-right" aria-hidden="true" mode="svg" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <DialogRoot :open="viewerOpen" @update:open="setViewerOpen">
      <DialogPortal>
        <DialogOverlay class="portfolio-viewer__overlay" />
        <DialogContent v-if="selectedImage" class="portfolio-viewer__content">
          <DialogTitle class="portfolio-viewer__title">{{ selectedImage.alt }}</DialogTitle>
          <DialogDescription class="portfolio-viewer__description">Выполненный проект АБАТЭК</DialogDescription>
          <img :src="selectedImage.src" :alt="selectedImage.alt" width="1920" height="1280" />
          <div class="portfolio-viewer__caption">{{ selectedImage.alt }}</div>
          <button class="portfolio-viewer__prev" type="button" aria-label="Предыдущее фото" @click="moveViewer(-1)">
            <Icon name="lucide:arrow-left" aria-hidden="true" mode="svg" />
          </button>
          <button class="portfolio-viewer__next" type="button" aria-label="Следующее фото" @click="moveViewer(1)">
            <Icon name="lucide:arrow-right" aria-hidden="true" mode="svg" />
          </button>
          <DialogClose class="portfolio-viewer__close" aria-label="Закрыть фотографию">
            <Icon name="lucide:x" aria-hidden="true" mode="svg" />
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </div>
</template>

<style scoped lang="scss">
.projects-page {
  background: #f6f7f8;
}

.projects-hero {
  position: relative;
  min-height: 760px;
  overflow: hidden;
  color: #fff;
  background:
    radial-gradient(circle at 8% 90%, rgb(13 91 157 / 30%), transparent 30%),
    linear-gradient(135deg, #021426 0%, #052d50 100%);

  &::before {
    position: absolute;
    inset: 0;
    pointer-events: none;
    content: '';
    background-image:
      linear-gradient(rgb(255 255 255 / 4%) 1px, transparent 1px),
      linear-gradient(90deg, rgb(255 255 255 / 4%) 1px, transparent 1px);
    background-size: 72px 72px;
    mask-image: linear-gradient(90deg, #000, transparent 70%);
  }

  &__inner {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(500px, 0.85fr);
    gap: clamp(50px, 7vw, 120px);
    align-items: center;
    min-height: 760px;
    padding-block: 90px;
  }

  &__copy {
    position: relative;
    z-index: 2;
    max-width: 720px;
  }

  &__eyebrow {
    display: flex;
    gap: 14px;
    align-items: center;
    margin: 0 0 26px;
    font-size: 11px;
    font-weight: 850;
    color: $yellow;
    text-transform: uppercase;
    letter-spacing: 0.17em;

    &::before {
      width: 46px;
      height: 2px;
      content: '';
      background: $yellow;
    }
  }

  h1 {
    margin: 0;
    font-size: clamp(66px, 7.1vw, 108px);
    font-weight: 720;
    line-height: 0.88;
    letter-spacing: -0.07em;

    em {
      font-style: normal;
      color: $yellow;
    }
  }

  &__lead {
    max-width: 570px;
    margin: 34px 0 0;
    font-size: 16px;
    line-height: 1.7;
    color: #b9c9d8;
  }

  &__actions {
    display: flex;
    gap: 26px;
    align-items: center;
    margin-top: 38px;

    a {
      display: flex;
      gap: 28px;
      align-items: center;
      padding: 18px 22px;
      font-size: 12px;
      font-weight: 850;
      color: $navy;
      text-decoration: none;
      background: $yellow;
      border-radius: 7px;
      box-shadow: 0 18px 50px rgb(0 0 0 / 22%);

      svg {
        width: 20px;
        height: 20px;
      }
    }

    > span {
      font-size: 10px;
      line-height: 1.45;
      color: #8ea5b8;
      text-transform: uppercase;
      letter-spacing: 0.1em;

      b {
        margin-right: 5px;
        font-size: 17px;
        color: #fff;
      }
    }
  }

  &__visual {
    position: relative;
    height: 580px;
  }

  &__photo {
    position: absolute;
    padding: 0;
    margin: 0;
    overflow: hidden;
    background: #0b2339;
    border: 1px solid rgb(255 255 255 / 18%);
    border-radius: 20px;
    box-shadow: 0 38px 90px rgb(0 0 0 / 36%);
    animation: projects-image-in 1s ease-out both;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &--main {
      inset: 0 70px 0 0;

      &::after {
        position: absolute;
        inset: 0;
        content: '';
        background: linear-gradient(180deg, transparent 60%, rgb(1 16 31 / 80%));
      }

      figcaption {
        position: absolute;
        right: 28px;
        bottom: 25px;
        left: 28px;
        z-index: 1;
        display: flex;
        gap: 16px;
        align-items: center;
        font-size: 13px;
        font-weight: 750;

        span {
          font-size: 10px;
          color: $yellow;
        }
      }
    }

    &--small {
      right: 0;
      bottom: 45px;
      width: 210px;
      height: 165px;
      border: 8px solid #06233e;
      border-radius: 14px;
      animation-delay: 0.18s;
    }
  }

  &__stamp {
    position: absolute;
    top: 36px;
    right: 20px;
    display: grid;
    place-items: center;
    width: 112px;
    height: 112px;
    font-size: 9px;
    font-weight: 850;
    line-height: 1.35;
    color: $navy;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    background: $yellow;
    border: 7px solid #06233e;
    border-radius: 50%;
    box-shadow: 0 16px 40px rgb(0 0 0 / 28%);

    svg {
      width: 24px;
      height: 24px;
    }
  }
}

.projects-gallery {
  padding-block: 120px 140px;

  &__layout {
    display: grid;
    grid-template-columns: 300px minmax(0, 1fr);
    gap: clamp(45px, 6vw, 90px);
    align-items: start;
  }

  &__header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(240px, 380px);
    gap: 40px;
    align-items: end;
    padding: 4px 6px 38px;
    border-bottom: 1px solid #d9e0e5;

    p {
      margin: 0 0 11px;
      font-size: 10px;
      font-weight: 900;
      color: $blue;
      text-transform: uppercase;
      letter-spacing: 0.18em;
    }

    h2 {
      margin: 0;
      font-size: clamp(40px, 5vw, 68px);
      line-height: 1;
      color: $navy;
      letter-spacing: -0.055em;
    }

    > span {
      font-size: 14px;
      line-height: 1.65;
      color: $muted;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 22px;
    padding-top: 32px;
  }
}

.projects-nav {
  position: sticky;
  top: 110px;

  &__heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px 16px;
    font-size: 11px;
    font-weight: 900;
    color: #728599;
    text-transform: uppercase;
    letter-spacing: 0.14em;

    b {
      display: grid;
      place-items: center;
      width: 30px;
      height: 30px;
      font-size: 9px;
      color: $blue;
      background: #e6edf4;
      border-radius: 50%;
    }
  }

  &__tabs {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  &__tab {
    position: relative;
    display: grid;
    grid-template-columns: 28px 1fr auto;
    gap: 8px;
    align-items: center;
    min-height: 56px;
    padding: 0 14px;
    color: #607388;
    text-align: left;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 14px;
    transition:
      color 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;

    &:first-child {
      grid-template-columns: 1fr auto;
    }

    small {
      font-size: 9px;
      font-weight: 800;
      color: #9aabba;
    }

    span {
      font-size: 13px;
      font-weight: 750;
    }

    b {
      display: grid;
      place-items: center;
      min-width: 28px;
      height: 28px;
      font-size: 10px;
      font-weight: 850;
      color: #6d8295;
      background: #e8edf1;
      border-radius: 20px;
    }

    &:hover {
      color: $navy;
      background: rgb(255 255 255 / 70%);
      border-color: #e2e8ed;
      transform: translateX(3px);
    }

    &--active {
      color: $navy;
      background: #fff;
      border-color: rgb(7 87 164 / 12%);
      box-shadow: 0 12px 32px rgb(4 39 69 / 10%);
      transform: translateX(6px);

      &::before {
        position: absolute;
        top: 13px;
        bottom: 13px;
        left: -3px;
        width: 4px;
        content: '';
        background: $yellow;
        border-radius: 4px;
        box-shadow: 0 0 0 4px rgb(255 210 10 / 12%);
      }

      small {
        color: $blue;
      }

      b {
        color: #fff;
        background: $blue;
      }
    }
  }

  &__cta {
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    margin-top: 26px;
    font-size: 12px;
    font-weight: 850;
    color: #fff;
    text-decoration: none;
    background: linear-gradient(135deg, $navy, #07558f);
    border-radius: 14px;
    box-shadow: 0 16px 36px rgb(4 46 82 / 16%);

    svg {
      flex: 0 0 auto;
      width: 20px;
      height: 20px;
      color: $yellow;
    }
  }
}

.project-card {
  margin: 0;
  filter: drop-shadow(0 16px 24px rgb(5 34 59 / 10%));

  &--feature {
    grid-column: 1 / -1;

    button {
      aspect-ratio: 16 / 8.5;
    }
  }

  button {
    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: 4 / 3;
    padding: 0;
    overflow: hidden;
    color: #fff;
    text-align: left;
    background: $navy;
    border: 5px solid #fff;
    border-radius: 18px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.55s ease;
  }

  button:hover img {
    transform: scale(1.04);
  }

  &__shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 42%, rgb(2 17 32 / 88%) 100%);
    transition: background 0.3s ease;
  }

  button:hover &__shade {
    background: linear-gradient(180deg, rgb(2 17 32 / 8%) 20%, rgb(2 17 32 / 92%) 100%);
  }

  &__meta {
    position: absolute;
    right: 24px;
    bottom: 22px;
    left: 24px;
    display: flex;
    gap: 16px;
    align-items: flex-end;

    small {
      padding-bottom: 3px;
      font-size: 10px;
      font-weight: 900;
      color: $yellow;
      letter-spacing: 0.12em;
    }

    b {
      max-width: 520px;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
      line-height: 1.4;
      white-space: nowrap;
    }
  }

  &__open {
    position: absolute;
    top: 18px;
    right: 18px;
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    color: $navy;
    background: $yellow;
    border-radius: 50%;
    opacity: 0;
    transform: translateY(8px);
    transition:
      opacity 0.25s ease,
      transform 0.25s ease;

    svg {
      width: 17px;
      height: 17px;
    }
  }

  button:hover &__open {
    opacity: 1;
    transform: translateY(0);
  }
}

.projects-footer {
  padding-bottom: 70px;
  color: #fff;
  background: #f6f7f8;

  &__inner {
    display: flex;
    gap: 40px;
    align-items: center;
    justify-content: space-between;
    min-height: 390px;
    padding: 65px clamp(34px, 6vw, 82px);
    background:
      radial-gradient(circle at 90% 0%, rgb(21 108 181 / 38%), transparent 34%),
      linear-gradient(135deg, #02172b, #06345b);
    border-radius: 26px;
    box-shadow: 0 35px 80px rgb(2 32 59 / 20%);

    > div > span {
      display: block;
      margin-bottom: 18px;
      font-size: 10px;
      font-weight: 850;
      color: $yellow;
      text-transform: uppercase;
      letter-spacing: 0.16em;
    }

    p {
      margin: 0;
      font-size: clamp(42px, 5vw, 70px);
      font-weight: 760;
      line-height: 0.98;
      letter-spacing: -0.055em;
    }
  }

  &__action {
    width: min(100%, 330px);

    small {
      display: block;
      margin-bottom: 26px;
      font-size: 13px;
      line-height: 1.7;
      color: #afc0cf;
    }

    a {
      display: flex;
      gap: 28px;
      align-items: center;
      padding: 20px 24px;
      font-size: 13px;
      font-weight: 850;
      color: $navy;
      text-decoration: none;
      background: $yellow;
      border-radius: 7px;
    }

    svg {
      width: 21px;
      height: 21px;
    }
  }
}

.portfolio-viewer {
  &__overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgb(1 10 20 / 94%);
    backdrop-filter: blur(12px);
  }

  &__content {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 101;
    width: min(92vw, 1500px);
    height: min(88vh, 1000px);
    padding: 0;
    overflow: hidden;
    background: #031426;
    border: 1px solid rgb(255 255 255 / 18%);
    transform: translate(-50%, -50%);

    > img {
      width: 100%;
      height: 100%;
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

  &__caption {
    position: absolute;
    right: 100px;
    bottom: 24px;
    left: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    text-shadow: 0 2px 12px #000;
  }

  &__close,
  &__prev,
  &__next {
    position: absolute;
    display: grid;
    place-items: center;
    width: 50px;
    height: 50px;
    padding: 0;
    color: #fff;
    background: rgb(3 28 52 / 82%);
    border: 1px solid rgb(255 255 255 / 30%);
    border-radius: 50%;

    svg {
      width: 22px;
      height: 22px;
    }
  }

  &__close {
    top: 18px;
    right: 18px;
  }

  &__prev,
  &__next {
    top: 50%;
    transform: translateY(-50%);
  }

  &__prev {
    left: 18px;
  }

  &__next {
    right: 18px;
  }
}

.gallery-switch-enter-active,
.gallery-switch-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.gallery-switch-enter-from,
.gallery-switch-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@keyframes projects-image-in {
  from {
    opacity: 0;
    transform: scale(1.04);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: $tablet) {
  .projects-hero {
    &__inner {
      grid-template-columns: minmax(0, 1fr);
    }

    &__copy {
      max-width: 650px;
    }

    &__visual {
      position: absolute;
      inset: 80px -160px 80px auto;
      width: 58%;
      height: auto;
      opacity: 0.38;
    }

    &__photo--small,
    &__stamp {
      display: none;
    }
  }

  .projects-gallery {
    padding-top: 80px;

    &__layout {
      grid-template-columns: 1fr;
      gap: 52px;
    }
  }

  .projects-nav {
    position: static;

    &__tabs {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }

    &__tab {
      border: 1px solid transparent;
    }

    &__cta {
      display: none;
    }
  }
}

@media (max-width: $phone) {
  .projects-hero {
    min-height: 660px;

    &__inner {
      min-height: 660px;
      padding-block: 120px 56px;
    }

    h1 {
      font-size: clamp(42px, 13.5vw, 64px);
      line-height: 0.9;
    }

    &__lead {
      margin-top: 32px;
    }

    &__actions {
      align-items: flex-start;

      > span {
        display: none;
      }
    }

    &__visual {
      inset: 0;
      width: 100%;
      opacity: 0.22;
    }

    &__photo--main {
      inset: 0;
      border: 0;
      border-radius: 0;

      figcaption {
        display: none;
      }
    }
  }

  .projects-gallery {
    padding-block: 64px 80px;

    &__layout {
      gap: 42px;
    }

    &__header {
      grid-template-columns: 1fr;
      gap: 18px;
      padding-bottom: 28px;
    }

    &__grid {
      grid-template-columns: 1fr;
      gap: 14px;
      padding-top: 20px;
    }
  }

  .projects-nav {
    width: calc(100% + 28px);
    margin-left: -14px;
    overflow: hidden;

    &__heading {
      margin-inline: 14px;
    }

    &__tabs {
      display: flex;
      flex-direction: row;
      gap: 8px;
      padding: 14px;
      overflow-x: auto;
      scrollbar-width: none;
    }

    &__tab,
    &__tab:first-child {
      display: flex;
      flex: 0 0 auto;
      grid-template-columns: none;
      min-height: 44px;
      padding-inline: 15px;
      background: #fff;
      border: 1px solid #e0e7ec;
      border-radius: 30px;
      box-shadow: 0 6px 18px rgb(4 39 69 / 6%);

      small {
        display: none;
      }
    }

    &__tab--active {
      color: #fff;
      background: $blue;
      border-color: $blue;
      box-shadow: 0 10px 24px rgb(7 87 164 / 22%);
      transform: none;

      &::before {
        display: none;
      }

      b {
        color: $navy;
        background: $yellow;
      }
    }
  }

  .project-card,
  .project-card--feature {
    grid-column: auto;

    button {
      aspect-ratio: 4 / 3;
    }
  }

  .project-card__open {
    opacity: 1;
    transform: none;
  }

  .projects-footer__inner {
    flex-direction: column;
    align-items: flex-start;
    min-height: 390px;
    border-radius: 18px;
  }

  .portfolio-viewer__content {
    width: 100%;
    height: 100dvh;
    border: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .projects-hero__photo,
  .project-card img {
    transition: none;
    animation: none;
  }
}
</style>
