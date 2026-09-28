<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui';
import { pageContent as content, pageData as page } from '~/data/pages/metallokonstruktsii-na-zakaz/data';
import { seo } from '~/data/pages/metallokonstruktsii-na-zakaz/seo';
import { gallery } from '~/data/pages/metallokonstruktsii-na-zakaz/gallery';
import { casesContent, projectCases } from '~/data/pages/metallokonstruktsii-na-zakaz/cases';

const activeCaseId = ref<string | null>(null);

const isRequestOpen = useState('project-request-open', () => false);
const requestContext = useState('project-request-context', () => '');
const breadcrumbs = seo.breadcrumbs.map((item, index) => ({
  label: item.name,
  ...(index === 0 ? { to: item.path } : {}),
}));
const openRequest = () => {
  requestContext.value = content.requestContext;
  isRequestOpen.value = true;
};
const openCaseRequest = async (context: string) => {
  activeCaseId.value = null;
  await nextTick();
  requestContext.value = context;
  isRequestOpen.value = true;
};
</script>

<template>
  <div class="custom-metal">
    <ProductIntroSection_02
      :title="page.introTitle"
      :image="page.image"
      :image-alt="page.imageAlt"
      :button-label="content.requestLabel"
      :eyebrow="content.eyebrow"
      @action="openRequest"
    >
      <template #breadcrumbs><BreadcrumbsNavigation :items="breadcrumbs" /></template>
      <p v-for="paragraph in page.intro" :key="paragraph">{{ paragraph }}</p>
    </ProductIntroSection_02>
    <nav class="custom-metal__nav site-container" :aria-label="content.navigationLabel">
      <a v-for="link in content.navigation" :key="link.id" class="custom-metal__link" :href="`#${link.id}`">
        {{ link.label }}
      </a>
    </nav>
    <ProductFactsSection_03 :facts="page.facts" />
    <div id="projects" class="custom-metal__section">
      <ProjectGallerySlider :images="gallery" :title="content.projectsTitle" />
    </div>
    <section id="cases" class="custom-metal__section content-section site-container">
      <h2 class="custom-metal__title">{{ casesContent.title }}</h2>
      <div class="custom-metal__cases-grid">
        <DialogRoot
          v-for="project in projectCases"
          :key="project.id"
          :open="activeCaseId === project.id"
          @update:open="activeCaseId = $event ? project.id : null"
        >
          <DialogTrigger :id="project.id" class="custom-metal__case-trigger">
            <img
              class="custom-metal__case-cover"
              :src="project.images[0]!.src"
              :alt="project.images[0]!.alt"
              :width="project.images[0]!.width"
              :height="project.images[0]!.height"
              loading="lazy"
              decoding="async"
            />
            <span class="custom-metal__case-preview">
              <span class="custom-metal__case-eyebrow">{{ project.eyebrow }}</span>
              <span class="custom-metal__case-name">{{ project.title }}</span>
              <span class="custom-metal__case-summary">{{ project.summary }}</span>
              <span class="custom-metal__case-more">{{ casesContent.openLabel }} →</span>
            </span>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay class="custom-metal__case-overlay" />
            <DialogContent
              class="custom-metal__case-dialog"
              @close-auto-focus="isRequestOpen && $event.preventDefault()"
            >
              <div class="custom-metal__case-toolbar">
                <DialogClose class="custom-metal__case-close">{{ casesContent.closeLabel }} ×</DialogClose>
              </div>
              <div class="content-section site-container">
                <p class="custom-metal__case-eyebrow">{{ project.eyebrow }}</p>
                <DialogTitle class="custom-metal__title">{{ project.title }}</DialogTitle>
                <DialogDescription class="custom-metal__text">{{ project.summary }}</DialogDescription>
                <div class="custom-metal__grid">
                  <div>
                    <h3 class="custom-metal__subtitle">{{ project.taskTitle }}</h3>
                    <p class="custom-metal__text">{{ project.task }}</p>
                    <h3 class="custom-metal__subtitle">{{ project.operationsTitle }}</h3>
                    <ol class="custom-metal__case-steps">
                      <li v-for="operation in project.operations" :key="operation" class="custom-metal__case-step">
                        {{ operation }}
                      </li>
                    </ol>
                  </div>
                  <div class="custom-metal__card">
                    <h3 class="custom-metal__subtitle">{{ project.resultTitle }}</h3>
                    <p class="custom-metal__text">{{ project.result }}</p>
                    <p class="custom-metal__text">{{ project.timingNote }}</p>
                    <UiButton @click="openCaseRequest(project.requestContext)">{{ project.requestLabel }}</UiButton>
                    <a class="custom-metal__case-link" :href="project.relatedHref" @click="activeCaseId = null">
                      {{ project.relatedLabel }}
                    </a>
                  </div>
                </div>
              </div>
              <SpecsTableSection
                :title="project.specs.title"
                :eyebrow="project.eyebrow"
                :columns="project.specs.headers"
                :rows="project.specs.rows"
              />
              <div class="content-section site-container">
                <h3 class="custom-metal__subtitle">{{ project.imagesTitle }}</h3>
                <div class="custom-metal__case-images">
                  <figure
                    v-for="(picture, index) in project.images"
                    :key="picture.src"
                    class="custom-metal__case-figure"
                  >
                    <a
                      class="custom-metal__case-image-link"
                      :href="picture.fullSrc"
                      :aria-label="picture.alt"
                      target="_blank"
                      rel="noopener"
                    >
                      <img
                        class="custom-metal__case-image"
                        :src="picture.src"
                        :srcset="`${picture.src} ${picture.width}w, ${picture.fullSrc} ${picture.fullWidth}w`"
                        :sizes="
                          index % 2 === 0 && index === project.images.length - 1
                            ? '100vw'
                            : '(max-width: 700px) 100vw, 50vw'
                        "
                        :alt="picture.alt"
                        :width="picture.width"
                        :height="picture.height"
                        loading="lazy"
                        decoding="async"
                      />
                    </a>
                    <figcaption class="custom-metal__model-caption">{{ picture.alt }}</figcaption>
                  </figure>
                </div>
              </div>
            </DialogContent>
          </DialogPortal>
        </DialogRoot>
      </div>
    </section>
    <section id="products" class="custom-metal__section content-section site-container">
      <h2 class="custom-metal__title">{{ content.productsTitle }}</h2>
      <p class="custom-metal__lead">{{ content.productsNote }}</p>
      <div class="custom-metal__grid">
        <article v-for="(section, index) in page.sections" :key="section.title" class="custom-metal__card">
          <span class="custom-metal__number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3 class="custom-metal__subtitle">{{ section.title }}</h3>
          <p v-for="paragraph in section.text" :key="paragraph" class="custom-metal__text">{{ paragraph }}</p>
        </article>
      </div>
    </section>
    <section id="requirements" class="custom-metal__section custom-metal__request">
      <div class="content-section site-container custom-metal__grid">
        <div>
          <h2 class="custom-metal__title">{{ content.requirementsTitle }}</h2>
          <p class="custom-metal__text">{{ content.requirementsNote }}</p>
          <ul class="custom-metal__list">
            <li v-for="item in content.requirements" :key="item" class="custom-metal__item">{{ item }}</li>
          </ul>
        </div>
        <div class="custom-metal__contact">
          <h3 class="custom-metal__subtitle">{{ content.emailLabel }}</h3>
          <a class="custom-metal__email" :href="content.emailHref">{{ content.email }}</a>
          <p class="custom-metal__text">{{ content.emailNote }}</p>
          <UiButton @click="openRequest">{{ content.requestLabel }}</UiButton>
        </div>
      </div>
    </section>
    <section id="production" class="custom-metal__section content-section site-container custom-metal__production">
      <div>
        <h2 class="custom-metal__production-title">{{ content.productionTitle }}</h2>
        <p class="custom-metal__text">{{ content.productionNote }}</p>
        <ul class="custom-metal__list">
          <li v-for="item in content.operations" :key="item" class="custom-metal__item">{{ item }}</li>
        </ul>
      </div>
      <div class="custom-metal__card">
        <h2 class="custom-metal__production-title">{{ content.priceTitle }}</h2>
        <p class="custom-metal__text">{{ content.priceText }}</p>
        <UiButton @click="openRequest">{{ content.requestLabel }}</UiButton>
      </div>
      <figure class="custom-metal__model">
        <img
          class="custom-metal__model-image"
          :src="content.model.src"
          :alt="content.model.alt"
          width="576"
          height="782"
          loading="lazy"
          decoding="async"
        />
        <figcaption class="custom-metal__model-caption">{{ content.model.alt }}</figcaption>
      </figure>
    </section>
    <div id="workflow" class="custom-metal__section">
      <ManufacturingStagesSection_last_02 v-bind="page.workflow" />
    </div>
    <div id="questions" class="custom-metal__section">
      <FaqSection_last_01 :title="content.faqTitle" :items="page.faq" tone="white" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.custom-metal {
  &__cases-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
  }

  &__case-trigger {
    display: flex;
    flex-direction: column;
    padding: 0;
    overflow: hidden;
    font: inherit;
    color: $ink;
    text-align: left;
    cursor: pointer;
    scroll-margin-top: 130px;
    background: #fff;
    border: 1px solid $line;
    border-radius: 16px;

    &:hover {
      border-color: $blue;
    }
  }

  &__case-cover {
    display: block;
    width: 100%;
    height: 240px;
    object-fit: contain;
    background: $soft;
  }

  &__case-preview {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
  }

  &__case-name {
    font-size: 21px;
    font-weight: 700;
    line-height: 1.35;
  }

  &__case-summary {
    font-size: 14px;
    line-height: 1.6;
    color: $muted;
  }

  &__case-more {
    margin-top: auto;
    font-weight: 700;
    color: $blue;
  }

  &__case-overlay {
    position: fixed;
    inset: 0;
    z-index: 120;
    background: rgba($navy, 0.8);
  }

  &__case-dialog {
    position: fixed;
    inset: 24px;
    z-index: 121;
    width: min(1100px, calc(100% - 48px));
    max-height: calc(100dvh - 48px);
    margin: auto;
    overflow: auto;
    overscroll-behavior: contain;
    background: #fff;
    border-radius: 16px;
  }

  &__case-toolbar {
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    justify-content: flex-end;
    padding: 12px 20px;
    background: #fff;
    border-bottom: 1px solid $line;
  }

  &__case-close {
    padding: 10px 14px;
    font: inherit;
    color: $navy;
    cursor: pointer;
    background: $soft;
    border: 1px solid $line;
    border-radius: 8px;
  }

  &__case-close:focus-visible,
  &__case-trigger:focus-visible {
    outline: 3px solid $yellow;
    outline-offset: 4px;
  }

  &__case-eyebrow {
    margin: 0 0 16px;
    font-weight: 700;
    color: $blue;
  }

  &__case-steps {
    display: grid;
    gap: 16px;
    padding-left: 24px;
    margin: 0;
  }

  &__case-step {
    padding-left: 8px;
    line-height: 1.75;
  }

  &__case-link {
    display: block;
    margin-top: 24px;
    color: $blue;
    text-underline-offset: 5px;
  }

  &__case-images {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px;
  }

  &__case-figure {
    min-width: 0;
    margin: 0;

    &:nth-child(odd):last-child {
      grid-column: 1 / -1;
    }
  }

  &__case-image-link {
    display: block;
    border: 1px solid $line;
    border-radius: 12px;
  }

  &__case-image-link:focus-visible,
  &__case-link:focus-visible {
    outline: 3px solid $yellow;
    outline-offset: 4px;
  }

  &__case-image {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 12px;
  }

  &__model {
    min-width: 0;
    margin: 0;
  }

  &__model-image {
    display: block;
    width: 100%;
    height: 360px;
    object-fit: contain;
  }

  &__model-caption {
    margin-top: 12px;
    font-size: 14px;
    line-height: 1.6;
    color: $muted;
  }

  &__section {
    scroll-margin-top: 130px;
  }

  &__production {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr) minmax(0, 0.8fr);
    gap: 28px;
    align-items: start;
  }

  &__production-title {
    margin: 0 0 22px;
    font-size: 28px;
    line-height: 1.25;
    color: $navy;
  }

  &__nav {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding-bottom: 36px;
  }

  &__link {
    padding: 12px 18px;
    color: $navy;
    text-decoration: none;
    background: $soft;
    border: 1px solid $line;
    border-radius: 8px;
  }

  &__link:hover {
    border-color: $blue;
  }

  &__link:focus-visible,
  &__email:focus-visible {
    outline: 3px solid $yellow;
    outline-offset: 4px;
  }

  &__title {
    margin: 0 0 22px;
    font-size: clamp(28px, 3.4vw, 44px);
    line-height: 1.16;
    color: $navy;
  }

  &__lead {
    max-width: 780px;
    margin: 0 0 32px;
    line-height: 1.75;
    color: $muted;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px;
  }

  &__card {
    padding: clamp(24px, 3vw, 40px);
    background: $soft;
    border: 1px solid $line;
    border-radius: 16px;
  }

  &__number {
    display: block;
    margin-bottom: 22px;
    font-size: 28px;
    font-weight: 800;
    color: $blue;
  }

  &__subtitle {
    margin: 0 0 16px;
    font-size: 24px;
    line-height: 1.3;
  }

  &__text {
    margin: 0 0 24px;
    line-height: 1.75;
  }

  &__request {
    color: #fff;
    background: $navy;
  }

  &__request &__title {
    color: #fff;
  }

  &__contact {
    align-self: center;
    padding: clamp(24px, 4vw, 48px);
    border: 1px solid rgba($line, 0.3);
    border-radius: 16px;
  }

  &__email {
    display: inline-block;
    margin-bottom: 24px;
    font-size: clamp(20px, 2.5vw, 32px);
    color: $yellow;
    overflow-wrap: anywhere;
    text-underline-offset: 6px;
  }

  &__list {
    display: grid;
    gap: 14px;
    padding: 0;
    margin: 24px 0 0;
    list-style: none;
  }

  &__item {
    padding-left: 18px;
    border-left: 3px solid $yellow;
  }
}

@media (width <= $tablet) {
  .custom-metal {
    &__cases-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    &__grid {
      grid-template-columns: 1fr;
    }

    &__production {
      grid-template-columns: 1fr;
    }

    &__model {
      justify-self: center;
      width: 100%;
      max-width: 400px;
    }
  }
}

@media (width <= $phone) {
  .custom-metal {
    &__cases-grid {
      grid-template-columns: 1fr;
    }

    &__case-dialog {
      inset: 8px;
      width: calc(100% - 16px);
      max-height: calc(100dvh - 16px);
    }

    &__case-images {
      grid-template-columns: 1fr;
    }

    &__nav {
      gap: 8px;
    }

    &__link {
      padding: 10px 12px;
      font-size: 14px;
    }
  }
}
</style>
