<script setup lang="ts">
import { AccordionContent, AccordionHeader, AccordionItem, AccordionRoot, AccordionTrigger } from 'reka-ui';

interface FaqItem {
  question: string;
  answer: string;
}

withDefaults(
  defineProps<{
    items: FaqItem[];
    title: string;
    eyebrow?: string;
    titleId?: string;
    tone?: 'soft' | 'white';
  }>(),
  {
    eyebrow: 'Ответы специалиста',
    titleId: 'faq-title',
    tone: 'soft',
  },
);
</script>

<template>
  <section class="faq-section" :class="`faq-section--${tone}`" :aria-labelledby="titleId">
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
          <AccordionContent class="faq-section__content">
            <p>{{ item.answer }}</p>
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

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 17px;
    height: 17px;
    transform: translate(-50%, -50%);
    transition: opacity 0.18s ease;
  }
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

  p {
    max-width: 720px;
    padding: 0 48px 22px 0;
    margin: 0;
    line-height: 1.7;
    color: $muted;
  }
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
  .faq-section__inner {
    padding-top: 44px;
  }
}
</style>
