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

defineProps<{
  title: string;
  description: string;
  actionLabel: string;
  documentUrl: string;
}>();

const isOpen = ref(false);
</script>

<template>
  <section class="technical-reference">
    <div class="site-container content-section">
      <article class="technical-reference__card">
        <div class="technical-reference__content">
          <p class="technical-reference__eyebrow">Справочные данные</p>
          <h2 class="technical-reference__title">{{ title }}</h2>
          <p class="technical-reference__description">{{ description }}</p>
        </div>
        <button class="technical-reference__action" type="button" @click="isOpen = true">
          <Icon name="lucide:table-properties" aria-hidden="true" />
          {{ actionLabel }}
        </button>
      </article>
    </div>

    <DialogRoot :open="isOpen" @update:open="isOpen = $event">
      <DialogPortal>
        <DialogOverlay class="technical-reference__overlay" />
        <DialogContent class="technical-reference__dialog">
          <div class="technical-reference__dialog-heading">
            <div>
              <DialogTitle class="technical-reference__dialog-title">{{ title }}</DialogTitle>
              <DialogDescription class="technical-reference__dialog-description">
                Таблица типовых размеров и схемы приводных барабанов.
              </DialogDescription>
            </div>
            <DialogClose class="technical-reference__close" aria-label="Закрыть таблицу">
              <Icon name="lucide:x" aria-hidden="true" />
            </DialogClose>
          </div>
          <object class="technical-reference__document" :data="documentUrl" type="application/pdf">
            <a :href="documentUrl" target="_blank" rel="noopener">Открыть таблицу в новом окне</a>
          </object>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </section>
</template>

<style scoped lang="scss">
@use 'sass:color';

.technical-reference {
  background: $soft;

  &__card {
    display: flex;
    gap: 32px;
    align-items: center;
    justify-content: space-between;
    padding: clamp(28px, 4vw, 48px);
    background: #fff;
    border: 1px solid $line;
    border-radius: 20px;
    box-shadow: 0 16px 38px rgba($navy, 0.08);
  }

  &__content {
    max-width: 760px;
  }

  &__eyebrow {
    margin: 0 0 12px;
    font-size: 11px;
    font-weight: 800;
    color: $blue;
    text-transform: uppercase;
    letter-spacing: 0.14em;
  }

  &__title {
    margin: 0;
    font-size: clamp(26px, 3.2vw, 40px);
    line-height: 1.12;
    color: $navy;
    letter-spacing: -0.03em;
  }

  &__description {
    max-width: 700px;
    margin: 16px 0 0;
    line-height: 1.65;
    color: $muted;
  }

  &__action {
    display: inline-flex;
    flex: 0 0 auto;
    gap: 10px;
    align-items: center;
    justify-content: center;
    min-height: 52px;
    padding: 14px 22px;
    font: inherit;
    font-weight: 700;
    color: $navy;
    cursor: pointer;
    background: $yellow;
    border: 0;
    border-radius: 8px;
    transition:
      background 0.2s ease,
      transform 0.2s ease;

    &:hover {
      background: color.adjust($yellow, $lightness: 8%);
      transform: translateY(-2px);
    }

    &:focus-visible {
      outline: 3px solid rgba($blue, 0.35);
      outline-offset: 3px;
    }

    svg {
      width: 19px;
      height: 19px;
    }
  }

  &__overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgba($navy, 0.72);
  }

  &__dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 101;
    display: flex;
    flex-direction: column;
    width: min(1180px, calc(100vw - 40px));
    height: min(860px, calc(100vh - 40px));
    padding: 24px;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 24px 70px rgba($navy, 0.3);
    transform: translate(-50%, -50%);
  }

  &__dialog-heading {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 18px;
  }

  &__dialog-title {
    margin: 0;
    font-size: clamp(22px, 3vw, 32px);
    line-height: 1.2;
    color: $navy;
  }

  &__dialog-description {
    margin: 8px 0 0;
    color: $muted;
  }

  &__close {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    color: $navy;
    cursor: pointer;
    background: $soft;
    border: 0;
    border-radius: 50%;

    &:focus-visible {
      outline: 3px solid rgba($blue, 0.35);
      outline-offset: 3px;
    }
  }

  &__document {
    flex: 1;
    width: 100%;
    min-height: 0;
    border: 1px solid $line;
    border-radius: 8px;
  }
}

@media (max-width: $phone) {
  .technical-reference {
    &__card {
      display: block;
      padding: 26px 22px;
    }

    &__action {
      width: 100%;
      margin-top: 24px;
    }

    &__dialog {
      width: calc(100vw - 20px);
      height: calc(100vh - 20px);
      padding: 16px;
      border-radius: 12px;
    }

    &__dialog-heading {
      gap: 12px;
      margin-bottom: 12px;
    }

    &__dialog-description {
      display: none;
    }
  }
}
</style>
