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
import { projects } from '~/data/projects';

const featuredProjects = projects.slice(0, 6);
const [emblaRef, emblaApi] = emblaCarouselVue({ align: 'start', loop: true });
const selectedProject = ref<(typeof projects)[number] | null>(null);
const dialogOpen = ref(false);

const scrollPrev = () => emblaApi.value?.scrollPrev();
const scrollNext = () => emblaApi.value?.scrollNext();
const openProject = (project: (typeof projects)[number]) => {
  selectedProject.value = project;
  dialogOpen.value = true;
};
const setDialogOpen = (open: boolean) => {
  dialogOpen.value = open;
};
</script>

<template>
  <section class="content-section content-section--soft home-projects">
    <div class="site-container home-projects__container">
      <div class="home-projects__heading">
        <div class="home-projects__heading-content">
          <p class="home-projects__eyebrow">Практический опыт</p>
          <h2 class="home-projects__title">Выполненные проекты конвейерного оборудования</h2>
        </div>
        <div class="home-projects__actions">
          <button class="home-projects__control" type="button" aria-label="Предыдущий проект" @click="scrollPrev">
            <Icon name="lucide:arrow-left" aria-hidden="true" mode="svg" />
          </button>
          <button class="home-projects__control" type="button" aria-label="Следующий проект" @click="scrollNext">
            <Icon name="lucide:arrow-right" aria-hidden="true" mode="svg" />
          </button>
          <NuxtLink class="home-projects__link" to="/primery-rabot">Все примеры →</NuxtLink>
        </div>
      </div>
      <div ref="emblaRef" class="home-projects__viewport">
        <div class="home-projects__track">
          <article v-for="(project, index) in featuredProjects" :key="project.title" class="home-projects__slide">
            <button class="home-projects__card" type="button" @click="openProject(project)">
              <img
                class="home-projects__image"
                :src="project.image"
                :alt="project.title"
                width="900"
                height="650"
                loading="lazy"
              />
              <span class="home-projects__shade" aria-hidden="true" />
              <span class="home-projects__number">{{ String(index + 1).padStart(2, '0') }}</span>
              <h3 class="home-projects__name">{{ project.title }}</h3>
            </button>
          </article>
        </div>
      </div>
      <DialogRoot :open="dialogOpen" @update:open="setDialogOpen">
        <DialogPortal>
          <DialogOverlay class="project-viewer__overlay" />
          <DialogContent v-if="selectedProject" class="project-viewer__content">
            <DialogTitle class="project-viewer__title">{{ selectedProject.title }}</DialogTitle>
            <DialogDescription class="project-viewer__description">
              Выполненный проект компании АБАТЭК
            </DialogDescription>
            <img
              class="project-viewer__image"
              :src="selectedProject.image"
              :alt="selectedProject.title"
              width="1600"
              height="1100"
            />
            <DialogClose class="project-viewer__close" aria-label="Закрыть изображение">
              <Icon name="lucide:x" aria-hidden="true" mode="svg" />
            </DialogClose>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </div>
  </section>
</template>

<style scoped lang="scss">
.home-projects {
  &__heading {
    display: flex;
    gap: 32px;
    align-items: end;
    justify-content: space-between;
    margin-bottom: 34px;
  }

  &__eyebrow {
    margin: 0 0 14px;
    font-size: 13px;
    font-weight: 900;
    color: $blue;
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }

  &__title {
    max-width: 920px;
    margin: 0;
    font-size: clamp(42px, 5vw, 64px);
    line-height: 1.06;
    letter-spacing: -0.045em;
  }

  &__actions {
    display: flex;
    flex-shrink: 0;
    gap: 10px;
    align-items: center;
  }

  &__control {
    display: grid;
    place-items: center;
    width: 48px;
    height: 48px;
    padding: 0;
    color: $navy;
    cursor: pointer;
    background: #fff;
    border: 1px solid rgb(3 35 68 / 16%);
    border-radius: 50%;
    transition: 0.2s ease;

    &:hover {
      color: #fff;
      background: $blue;
      border-color: $blue;
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }

  &__link {
    margin-left: 10px;
    font-size: 16px;
    font-weight: 800;
    text-decoration: none;
  }

  &__viewport {
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
  }

  &__card {
    position: relative;
    display: block;
    width: 100%;
    min-height: 390px;
    padding: 0;
    overflow: hidden;
    color: inherit;
    text-align: left;
    cursor: zoom-in;
    background: $navy;
    border: 0;
    border-radius: 20px;

    &:hover .home-projects__image {
      transform: scale(1.035);
    }
  }

  &__image,
  &__shade {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  &__image {
    object-fit: cover;
    transition: transform 0.45s ease;
  }

  &__shade {
    background: linear-gradient(180deg, transparent 35%, rgb(3 17 34 / 92%) 100%);
  }

  &__number {
    position: absolute;
    top: 24px;
    left: 26px;
    z-index: 1;
    display: grid;
    place-items: center;
    width: 54px;
    height: 54px;
    font-size: 17px;
    font-weight: 900;
    color: $yellow;
    letter-spacing: 0.06em;
    background: rgb(3 22 43 / 86%);
    border: 1px solid rgb(255 202 40 / 72%);
    border-radius: 16px;
    box-shadow:
      0 12px 30px rgb(0 0 0 / 28%),
      inset 0 0 0 1px rgb(255 255 255 / 8%);
    backdrop-filter: blur(10px);
  }

  &__name {
    position: absolute;
    right: 28px;
    bottom: 26px;
    left: 28px;
    z-index: 1;
    margin: 0;
    font-size: 21px;
    line-height: 1.35;
    color: #fff;
  }
}

.project-viewer {
  &__overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgb(2 12 24 / 90%);
    backdrop-filter: blur(12px);

    &[data-state='open'] {
      animation: project-overlay-in 220ms ease-out;
    }

    &[data-state='closed'] {
      animation: project-overlay-out 180ms ease-in;
    }
  }

  &__content {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 101;
    width: min(94vw, 1500px);
    max-height: 94vh;
    padding: 0;
    overflow: hidden;
    background: #071a2e;
    border: 1px solid rgb(255 255 255 / 18%);
    border-radius: 22px;
    box-shadow: 0 30px 100px rgb(0 0 0 / 60%);
    transform: translate(-50%, -50%);

    &[data-state='open'] {
      animation: project-dialog-in 240ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    &[data-state='closed'] {
      animation: project-dialog-out 180ms ease-in;
    }
  }

  &__title,
  &__description {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    white-space: nowrap;
    border: 0;
    clip-path: inset(50%);
  }

  &__image {
    display: block;
    width: 100%;
    max-height: 94vh;
    object-fit: contain;
  }

  &__close {
    position: absolute;
    top: 18px;
    right: 18px;
    display: grid;
    place-items: center;
    width: 48px;
    height: 48px;
    padding: 0;
    color: #fff;
    cursor: pointer;
    background: rgb(3 22 43 / 82%);
    border: 1px solid rgb(255 255 255 / 32%);
    border-radius: 50%;
    box-shadow: 0 8px 24px rgb(0 0 0 / 32%);
    backdrop-filter: blur(8px);

    svg {
      width: 32px;
      height: 32px;
      stroke-width: 2.4;
    }
  }
}

@keyframes project-overlay-in {
  from {
    opacity: 0;
  }
}

@keyframes project-overlay-out {
  to {
    opacity: 0;
  }
}

@keyframes project-dialog-in {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.965);
  }
}

@keyframes project-dialog-out {
  to {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.975);
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-viewer__overlay,
  .project-viewer__content {
    animation-duration: 1ms !important;
  }
}

@media (max-width: $tablet) {
  .home-projects__slide {
    flex-basis: 50%;
  }
}

@media (max-width: $phone) {
  .home-projects {
    &__heading {
      flex-direction: column;
      align-items: start;
    }

    &__actions {
      width: 100%;
    }

    &__link {
      margin-left: auto;
    }

    &__slide {
      flex-basis: 100%;
    }

    &__card {
      min-height: 360px;
    }
  }

  .project-viewer {
    &__content {
      inset: 0;
      width: 100%;
      height: 100dvh;
      max-height: none;
      padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
      background: #020c18;
      border: 0;
      border-radius: 0;
      transform: none;

      &[data-state='open'] {
        animation: mobile-popup-in 0.2s ease-out;
      }

      &[data-state='closed'] {
        animation: mobile-popup-out 0.16s ease-in;
      }
    }

    &__image {
      width: 100%;
      height: 100%;
      max-height: none;
    }

    &__close {
      top: calc(env(safe-area-inset-top) + 14px);
      right: calc(env(safe-area-inset-right) + 14px);
    }
  }
}

@keyframes mobile-popup-in {
  from {
    opacity: 0;
    transform: scale(0.985);
  }
}

@keyframes mobile-popup-out {
  to {
    opacity: 0;
    transform: scale(0.99);
  }
}
</style>
