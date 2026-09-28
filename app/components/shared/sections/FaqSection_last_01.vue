<script setup lang="ts">
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger } from 'reka-ui';
import type { GalleryImage } from '~/data/pages/_shared/types';

interface FaqItem {
  question: string;
  answerTitle?: string;
  image?: GalleryImage;
  answer: string | string[];
}

withDefaults(
  defineProps<{
    items: FaqItem[];
    title: string;
    eyebrow?: string;
    titleId?: string;
    tone?: 'soft' | 'white';
    layout?: 'split' | 'cards';
    preserveContent?: boolean;
  }>(),
  {
    eyebrow: 'Ответы специалиста',
    titleId: 'faq-title',
    tone: 'soft',
    layout: 'split',
    preserveContent: false,
  },
);
</script>

<template>
  <section class="faq-section" :class="[`faq-section--${tone}`, `faq-section--${layout}`]" :aria-labelledby="titleId">
    <div class="content-section site-container faq-section__inner">
      <div>
        <p class="faq-section__eyebrow">{{ eyebrow }}</p>
        <h2 :id="titleId" class="faq-section__title">{{ title }}</h2>
      </div>
      <AccordionRoot class="faq-section__list" type="single" collapsible>
        <AccordionItem
          v-for="(item, index) in items"
          :key="item.question"
          class="faq-section__item"
          :value="`faq-${index}`"
        >
          <AccordionHeader class="faq-section__header">
            <AccordionTrigger class="faq-section__trigger">
              <span>{{ item.question }}</span>
              <span class="faq-section__icon" aria-hidden="true">
                <Icon class="faq-section__icon-plus" name="lucide:plus" mode="svg" />
                <Icon class="faq-section__icon-minus" name="lucide:minus" mode="svg" />
              </span>
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent
            class="faq-section__content"
            :class="[preserveContent && 'faq-section__content--persistent']"
            :force-mount="preserveContent"
          >
            <h3 v-if="item.answerTitle" class="faq-section__answer-title">{{ item.answerTitle }}</h3>
            <img
              v-if="item.image"
              class="faq-section__image"
              :src="item.image.src"
              :alt="item.image.alt"
              :width="item.image.width ?? 480"
              :height="item.image.height ?? 320"
              :style="item.image.imageFit ? { objectFit: item.image.imageFit } : undefined"
              loading="lazy"
              decoding="async"
            />
            <p
              v-for="paragraph in Array.isArray(item.answer) ? item.answer : [item.answer]"
              :key="paragraph"
              class="faq-section__paragraph"
            >
              {{ paragraph }}
            </p>
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>
    </div>
  </section>
</template>

<style scoped lang="scss">
.faq-section {
  background: $soft;
}

.faq-section--white {
  background: #fff;
}

.faq-section__inner {
  display: grid;
  grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.3fr);
  gap: clamp(40px, 7vw, 90px);
  padding-top: 58px;
}

.faq-section__eyebrow {
  margin: 0 0 16px;
  font-size: 12px;
  font-weight: 850;
  color: $blue;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

.faq-section__title {
  margin: 0;
  font-size: clamp(28px, 3.4vw, 46px);
  line-height: 1.04;
  color: $ink;
  letter-spacing: -0.045em;
}

.faq-section__list {
  border-top: 1px solid $line;
}

.faq-section__item {
  border-bottom: 1px solid $line;
}

.faq-section__header {
  margin: 0;
}

.faq-section__trigger {
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 22px 0;
  font-size: 17px;
  font-weight: 780;
  line-height: 1.4;
  color: $ink;
  text-align: left;
  cursor: pointer;
  background: transparent;
  border: 0;
}

.faq-section__icon {
  position: relative;
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 30px;
  height: 30px;
  color: $blue;
  background: #fff;
  border-radius: 50%;
}

.faq-section__icon-plus,
.faq-section__icon-minus {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 17px;
  height: 17px;
  transform: translate(-50%, -50%);
  transition: opacity 0.18s ease;
}

.faq-section__icon-minus {
  opacity: 0;
}

.faq-section__trigger[data-state='open'] .faq-section__icon-plus {
  opacity: 0;
}

.faq-section__trigger[data-state='open'] .faq-section__icon-minus {
  opacity: 1;
}

.faq-section__content {
  overflow: hidden;

  &[data-state='open'] {
    animation: faq-accordion-down 0.25s ease-out;
  }

  &[data-state='closed'] {
    animation: faq-accordion-up 0.2s ease-out;
  }

  &--persistent[data-state='closed'] {
    display: none;
  }
}

.faq-section__paragraph {
  max-width: 720px;
  padding: 0 48px 22px 0;
  margin: 0;
  line-height: 1.7;
  color: $muted;
}

.faq-section__answer-title {
  padding: 0 48px 16px 0;
  margin: 0;
  font-size: 17px;
  line-height: 1.4;
  color: $ink;
}

.faq-section__image {
  display: block;
  width: min(100%, 360px);
  height: 200px;
  margin: 0 0 18px;
  object-fit: cover;
  border-radius: 12px;
}

.faq-section--cards .faq-section__inner {
  grid-template-columns: minmax(0, 1fr);
  gap: 32px;
}

.faq-section--cards .faq-section__list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  align-items: start;
  border-top: 0;
}

.faq-section--cards .faq-section__item {
  padding: 0 24px;
  background: $soft;
  border: 1px solid $line;
  border-radius: 16px;
}

@keyframes faq-accordion-down {
  from {
    height: 0;
  }

  to {
    height: var(--reka-accordion-content-height);
  }
}

@keyframes faq-accordion-up {
  from {
    height: var(--reka-accordion-content-height);
  }

  to {
    height: 0;
  }
}

@media (width <= $tablet) {
  .faq-section__inner {
    grid-template-columns: 1fr;
  }
}

@media (width <= $phone) {
  .faq-section--cards .faq-section__list {
    grid-template-columns: minmax(0, 1fr);
  }

  .faq-section__inner {
    padding-top: 44px;
  }
}
</style>
