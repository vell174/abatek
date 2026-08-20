<script setup lang="ts">
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui';
import { catalogGroups } from '~/data/navigation/catalog';

const route = useRoute();
const isProjectRequestOpen = useState('project-request-open', () => false);
const normalizedRoutePath = computed(() => route.path.replace(/\/+$/, '') || '/');
const isActiveCatalogItem = (to: string) => normalizedRoutePath.value === to;
const activeCatalogGroup = computed(() => {
  const index = catalogGroups.findIndex((group) => group.items.some((item) => isActiveCatalogItem(item.to)));
  return index >= 0 ? `catalog-${index}` : undefined;
});
const openCatalogGroup = ref<string>();
watch(
  activeCatalogGroup,
  (group) => {
    openCatalogGroup.value = group;
  },
  { immediate: true },
);
const closeCatalogMenu = () => {
  (document.activeElement as HTMLElement | null)?.blur();
};
const email = 'zakaz@abatek.ru';
const isEmailCopied = ref(false);
let copyFeedbackTimeout: ReturnType<typeof setTimeout> | undefined;
const copyEmail = async () => {
  await navigator.clipboard.writeText(email);
  isEmailCopied.value = true;
  clearTimeout(copyFeedbackTimeout);
  copyFeedbackTimeout = setTimeout(() => {
    isEmailCopied.value = false;
  }, 2000);
};
const links: Array<{ label: string; to: string; catalog?: boolean }> = [
  { label: 'Каталог', to: '/#catalog', catalog: true },
  { label: 'Примеры работ', to: '/primery-rabot' },
  { label: 'О компании', to: '/o-kompanii' },
  { label: 'Контакты', to: '/kontakty' },
];
</script>

<template>
  <header class="site-header">
    <div class="site-container site-header__inner">
      <AppLogo />
      <nav class="site-navigation" aria-label="Основная навигация">
        <ul class="site-navigation__list">
          <li v-for="link in links" :key="link.to" class="site-navigation__item">
            <NuxtLink
              class="site-navigation__link"
              :class="{ 'site-navigation__link--active': route.path === link.to }"
              :to="link.to"
              @click="closeCatalogMenu"
            >
              {{ link.label }}
              <Icon
                v-if="link.catalog"
                class="site-navigation__chevron"
                name="lucide:chevron-down"
                aria-hidden="true"
                mode="svg"
              />
            </NuxtLink>
            <div v-if="link.catalog" class="catalog-menu">
              <div class="catalog-menu__heading">
                <strong>Каталог оборудования</strong>
                <NuxtLink to="/#catalog" @click="closeCatalogMenu">Обзор каталога →</NuxtLink>
              </div>
              <div class="catalog-menu__grid">
                <section v-for="group in catalogGroups" :key="group.title" class="catalog-menu__group">
                  <h3 class="catalog-menu__title">{{ group.title }}</h3>
                  <ul class="catalog-menu__list">
                    <li v-for="item in group.items" :key="`${group.title}-${item.label}`">
                      <NuxtLink
                        class="catalog-menu__link"
                        :class="{ 'catalog-menu__link--active': isActiveCatalogItem(item.to) }"
                        :to="item.to"
                        :aria-current="isActiveCatalogItem(item.to) ? 'page' : undefined"
                        @click="closeCatalogMenu"
                      >
                        {{ item.label }}
                      </NuxtLink>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </li>
        </ul>
      </nav>
      <div class="site-header__phone">
        <span class="site-header__phone-content">
          <a class="site-header__phone-link" href="tel:89511172210">
            <Icon name="lucide:message-circle" aria-hidden="true" mode="svg" />
            <span class="site-header__phone-details">
              <strong>8 (951) 117-22-10</strong>
              <small>WhatsApp, Viber</small>
            </span>
          </a>
          <a class="site-header__phone-link" href="tel:88005051915">
            <Icon name="lucide:phone-call" aria-hidden="true" mode="svg" />
            <span class="site-header__phone-details">
              <strong>8 (800) 505-19-15</strong>
              <small>бесплатный номер</small>
            </span>
          </a>
          <span class="site-header__email">
            <a class="site-header__phone-link site-header__phone-link--email" :href="`mailto:${email}`">
              <Icon name="lucide:mail" aria-hidden="true" mode="svg" />
              <span class="site-header__phone-details">
                <strong>{{ email }}</strong>
                <small>приём заявок круглосуточно</small>
              </span>
            </a>
            <button class="site-header__email-copy" type="button" @click="copyEmail">
              {{ isEmailCopied ? '(скопировано)' : '(копировать)' }}
            </button>
          </span>
        </span>
      </div>
      <DialogRoot v-model:open="isProjectRequestOpen">
        <DialogTrigger class="site-header__action">Обсудить проект</DialogTrigger>
        <DialogPortal>
          <DialogOverlay class="project-request__overlay" />
          <DialogContent class="project-request__content">
            <div class="project-request__heading">
              <p class="project-request__eyebrow">Инженерная консультация</p>
              <DialogTitle class="project-request__title">Обсудим вашу задачу</DialogTitle>
              <DialogDescription class="project-request__description">
                Отправьте вводные данные — специалист свяжется с вами для уточнения деталей.
              </DialogDescription>
            </div>
            <RequestForm class="project-request__form" />
            <DialogClose class="project-request__close" aria-label="Закрыть форму">
              <Icon name="lucide:x" aria-hidden="true" mode="svg" />
            </DialogClose>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
      <DialogRoot>
        <DialogTrigger class="mobile-menu__trigger" aria-label="Открыть меню">
          <span class="mobile-menu__trigger-line" />
          <span class="mobile-menu__trigger-line" />
          <span class="mobile-menu__trigger-line" />
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay class="mobile-menu__overlay" />
          <DialogContent class="mobile-menu__panel">
            <div class="mobile-menu__heading">
              <DialogTitle class="mobile-menu__title">Навигация</DialogTitle>
              <DialogDescription class="mobile-menu__description">Разделы сайта АБАТЭК</DialogDescription>
            </div>
            <DialogClose class="mobile-menu__close" aria-label="Закрыть меню">
              <Icon name="lucide:x" aria-hidden="true" mode="svg" />
            </DialogClose>
            <nav class="mobile-menu__navigation" aria-label="Мобильная навигация">
              <DialogClose v-for="link in links" :key="link.to" as-child>
                <NuxtLink class="mobile-menu__link" :to="link.to">{{ link.label }}</NuxtLink>
              </DialogClose>
            </nav>
            <div class="mobile-menu__catalog">
              <AccordionRoot v-model="openCatalogGroup" type="single" collapsible>
                <AccordionItem
                  v-for="(group, groupIndex) in catalogGroups"
                  :key="group.title"
                  class="mobile-menu__catalog-group"
                  :value="`catalog-${groupIndex}`"
                >
                  <AccordionHeader class="mobile-menu__catalog-header">
                    <AccordionTrigger
                      class="mobile-menu__catalog-trigger"
                      :class="{
                        'mobile-menu__catalog-trigger--active': activeCatalogGroup === `catalog-${groupIndex}`,
                      }"
                    >
                      <span>{{ group.title }}</span>
                      <Icon name="lucide:chevron-down" aria-hidden="true" mode="svg" />
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent class="mobile-menu__catalog-content">
                    <ul>
                      <li v-for="item in group.items" :key="item.to">
                        <DialogClose as-child>
                          <NuxtLink
                            :to="item.to"
                            :class="{ 'mobile-menu__catalog-link--active': isActiveCatalogItem(item.to) }"
                            :aria-current="isActiveCatalogItem(item.to) ? 'page' : undefined"
                          >
                            {{ item.label }}
                          </NuxtLink>
                        </DialogClose>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </AccordionRoot>
            </div>
            <div class="mobile-menu__contacts">
              <a class="mobile-menu__contact-link" href="tel:89511172210">
                8 (951) 117-22-10
                <small>WhatsApp, Viber</small>
              </a>
              <a class="mobile-menu__contact-link" href="tel:88005051915">
                8 (800) 505-19-15
                <small>бесплатный номер</small>
              </a>
              <span class="mobile-menu__email">
                <a class="mobile-menu__contact-link" :href="`mailto:${email}`">{{ email }}</a>
                <button class="mobile-menu__email-copy" type="button" @click="copyEmail">
                  {{ isEmailCopied ? '(скопировано)' : '(копировать)' }}
                </button>
              </span>
            </div>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </div>
  </header>
</template>

<style scoped lang="scss">
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgb(255 255 255 / 94%);
  border-bottom: 1px solid #e9eef4;
  backdrop-filter: blur(16px);

  &__inner {
    display: grid;
    grid-template-columns: auto minmax(360px, 1fr) auto auto;
    gap: clamp(16px, 1.8vw, 28px);
    align-items: center;
    min-height: 116px;
  }

  &__phone {
    display: flex;
    gap: 9px;
    align-items: center;
    white-space: nowrap;
  }

  &__phone-content {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 7px;
  }

  &__phone-link {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 8px;
    align-items: center;
    padding: 8px 11px;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: -0.01em;
    text-decoration: none;
    background: $soft;
    border: 1px solid rgb(0 41 79 / 8%);
    border-radius: 9px;
    transition:
      background 0.2s ease,
      border-color 0.2s ease,
      transform 0.2s ease;

    &:hover {
      color: $navy;
      background: $yellow;
      border-color: $yellow;
      box-shadow: 0 8px 20px rgb(255 210 10 / 20%);
      transform: translateY(-2px);

      small,
      svg {
        color: $navy;
      }
    }

    > svg {
      width: 18px;
      height: 18px;
      color: $blue;
    }

    &--email {
      grid-column: 1/-1;
      padding-block: 5px;
    }
  }

  &__phone-details {
    display: flex;
    flex-direction: column;

    strong {
      font-weight: 650;
      line-height: 1.2;
    }

    small {
      margin-top: 2px;
      font-size: 10px;
      font-weight: 500;
      color: $muted;
      letter-spacing: 0;
    }
  }

  &__email {
    display: flex;
    grid-column: 1/-1;
    gap: 8px;
    align-items: center;
  }

  &__email-copy {
    padding: 0;
    font-size: 12px;
    font-weight: 600;
    color: $muted;
    cursor: pointer;
    background: transparent;
    border: 0;

    &:hover,
    &:focus-visible {
      color: $blue;
    }
  }

  &__action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    padding-inline: 22px;
    font-size: 14px;
    font-weight: 800;
    color: $navy;
    white-space: nowrap;
    text-decoration: none;
    background: $yellow;
    border: 1px solid $yellow;
    border-radius: 6px;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      box-shadow: 0 10px 24px rgba($yellow, 0.26);
      transform: translateY(-2px);
    }
  }
}

.site-navigation {
  min-width: 0;

  &__item {
    position: relative;

    &:hover .catalog-menu,
    &:focus-within .catalog-menu {
      visibility: visible;
      pointer-events: auto;
      opacity: 1;
      transform: translate(-22%, 0);
    }
  }

  &__list {
    display: flex;
    gap: clamp(15px, 1.8vw, 28px);
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__link {
    position: relative;
    display: flex;
    gap: 5px;
    align-items: center;
    padding-block: 16px;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
    text-decoration: none;

    &::after {
      position: absolute;
      right: 0;
      bottom: 3px;
      left: 0;
      height: 2px;
      content: '';
      background: $yellow;
      transform: scaleX(0);
      transition: transform 0.2s;
    }

    &:hover::after,
    &--active::after {
      transform: scaleX(1);
    }
  }

  &__chevron {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
  }

  &__item:hover &__chevron,
  &__item:focus-within &__chevron {
    transform: rotate(180deg);
  }
}

.catalog-menu {
  position: absolute;
  top: calc(100% - 2px);
  left: 50%;
  z-index: 25;
  visibility: hidden;
  width: min(1180px, calc(100vw - 48px));
  max-height: min(740px, calc(100vh - 150px));
  padding: 26px;
  overflow-y: auto;
  pointer-events: none;
  background: #fff;
  border: 1px solid rgb(3 35 68 / 11%);
  border-radius: 18px;
  box-shadow: 0 28px 80px rgb(3 22 43 / 20%);
  opacity: 0;
  transform: translate(-22%, 12px);
  transition:
    visibility 0.2s,
    opacity 0.2s ease,
    transform 0.2s ease;

  &::before {
    position: absolute;
    right: 0;
    bottom: 100%;
    left: 0;
    height: 18px;
    content: '';
  }

  &__heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 18px;
    margin-bottom: 22px;
    border-bottom: 1px solid rgb(3 35 68 / 10%);

    strong {
      font-size: 20px;
      color: $navy;
    }

    a {
      font-size: 13px;
      font-weight: 800;
      color: $blue;
      text-decoration: none;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 26px 34px;
  }

  &__group:nth-child(2) {
    grid-row: span 2;
  }

  &__title {
    padding-bottom: 9px;
    margin: 0 0 7px;
    font-size: 13px;
    font-weight: 900;
    color: $navy;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    border-bottom: 2px solid $yellow;
  }

  &__list {
    display: grid;
    gap: 1px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__link {
    position: relative;
    display: block;
    padding: 7px 8px;
    font-size: 14px;
    font-weight: 650;
    line-height: 1.35;
    color: $ink;
    text-decoration: none;
    border-radius: 7px;
    transition:
      color 0.18s ease,
      background 0.18s ease,
      transform 0.18s ease;

    &:hover,
    &:focus-visible,
    &--active {
      color: $blue;
      background: $soft;
      transform: translateX(3px);
    }

    &--active {
      font-weight: 850;
      box-shadow: inset 3px 0 $yellow;
    }

    &--nested {
      padding-left: 22px;
      color: $muted;

      &::before {
        position: absolute;
        top: 50%;
        left: 9px;
        width: 6px;
        height: 1px;
        content: '';
        background: $blue;
      }
    }
  }
}

@media (width <= 1200px) {
  .site-header {
    &__inner {
      grid-template-columns: auto minmax(330px, 1fr) auto auto;
      min-height: 108px;
    }

    &__phone-content {
      grid-template-columns: 1fr;
      gap: 1px;
    }

    &__phone-link {
      padding: 3px 5px;
      background: transparent;
      border-color: transparent;

      small {
        display: none;
      }
    }
  }
}

.mobile-menu {
  &__trigger {
    display: none;
    background: transparent;
    border: 0;
  }

  &__trigger-line {
    display: block;
    width: 24px;
    height: 2px;
    margin: 5px;
    background: $navy;
  }

  &__overlay {
    position: fixed;
    inset: 0;
    z-index: 30;
    background: rgba($navy, 0.7);
    backdrop-filter: blur(5px);

    &[data-state='open'] {
      animation: overlay-in 0.22s ease-out;
    }

    &[data-state='closed'] {
      animation: overlay-out 0.2s ease-in;
    }
  }

  &__panel {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 31;
    width: min(390px, 90vw);
    padding: 32px;
    overflow-y: auto;
    color: #fff;
    background: $navy;
    box-shadow: -25px 0 70px rgb(0 0 0 / 30%);

    &[data-state='open'] {
      animation: panel-in 0.28s ease-out;
    }

    &[data-state='closed'] {
      animation: panel-out 0.24s ease-in;
    }
  }

  &__heading {
    padding-bottom: 24px;
    border-bottom: 1px solid rgb(255 255 255 / 12%);
  }

  &__title {
    margin: 0;
    font-size: 26px;
  }

  &__description {
    margin: 6px 0 0;
    font-size: 12px;
    color: #9db1c5;
  }

  &__close {
    position: absolute;
    top: 24px;
    right: 24px;
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    padding: 0;
    color: #fff;
    appearance: none;
    cursor: pointer;
    background: transparent;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 50%;

    svg {
      width: 22px;
      height: 22px;
    }
  }

  &__navigation,
  &__contacts {
    display: grid;
    margin-top: 36px;
  }

  &__link {
    padding: 18px 0;
    font-size: 24px;
    font-weight: 700;
    text-decoration: none;
    border-bottom: 1px solid rgb(255 255 255 / 12%);
  }

  &__catalog {
    margin-top: 24px;

    &-group {
      border-bottom: 1px solid rgb(255 255 255 / 12%);
    }

    &-header {
      margin: 0;
    }

    &-trigger {
      display: flex;
      gap: 16px;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 14px 0;
      font-weight: 800;
      color: $yellow;
      cursor: pointer;
      background: transparent;
      border: 0;

      svg {
        flex: 0 0 auto;
        width: 18px;
        height: 18px;
        transition: transform 0.2s ease;
      }

      &[data-state='open'] svg {
        transform: rotate(180deg);
      }

      &--active {
        color: #fff;
      }
    }

    &-content {
      overflow: hidden;

      &[data-state='open'] {
        animation: catalog-accordion-down 0.2s ease-out;
      }

      &[data-state='closed'] {
        animation: catalog-accordion-up 0.18s ease-in;
      }
    }

    &-content ul {
      display: grid;
      gap: 2px;
      padding: 0 0 14px;
      margin: 0;
      list-style: none;
    }

    &-content a {
      display: block;
      padding: 8px 0 8px 12px;
      font-size: 14px;
      line-height: 1.35;
      color: #dce8f2;
      text-decoration: none;
      border-left: 2px solid rgb(255 255 255 / 15%);
    }

    &-content &-link--active {
      font-weight: 800;
      color: $navy;
      background: $yellow;
      border-left-color: $yellow;
      border-radius: 0 7px 7px 0;
    }

    @keyframes catalog-accordion-down {
      from {
        height: 0;
      }

      to {
        height: var(--reka-accordion-content-height);
      }
    }

    @keyframes catalog-accordion-up {
      from {
        height: var(--reka-accordion-content-height);
      }

      to {
        height: 0;
      }
    }
  }

  &__contacts {
    gap: 8px;
  }

  &__contact-link {
    display: flex;
    flex-direction: column;
    font-weight: 800;
    color: $yellow;
    text-decoration: none;

    small {
      font-size: 11px;
      font-weight: 500;
      color: #9db1c5;
    }
  }

  &__email {
    display: flex;
    gap: 8px;
    align-items: baseline;
  }

  &__email-copy {
    padding: 0;
    font-size: 12px;
    color: #9db1c5;
    cursor: pointer;
    background: transparent;
    border: 0;

    &:hover,
    &:focus-visible {
      color: #fff;
    }
  }
}

.project-request {
  &__overlay {
    position: fixed;
    inset: 0;
    z-index: 40;
    background: rgb(2 12 24 / 82%);
    backdrop-filter: blur(10px);

    &[data-state='open'] {
      animation: overlay-in 0.22s ease-out;
    }

    &[data-state='closed'] {
      animation: overlay-out 0.18s ease-in;
    }
  }

  &__content {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 41;
    width: min(920px, calc(100vw - 32px));
    max-height: calc(100vh - 32px);
    padding: clamp(24px, 4vw, 46px);
    overflow-y: auto;
    color: #fff;
    background:
      linear-gradient(125deg, rgba($navy, 0.98), rgba($navy, 0.91)),
      url('/images/26026123.webp') center / cover;
    border: 1px solid rgb(255 255 255 / 18%);
    border-radius: 22px;
    box-shadow: 0 35px 110px rgb(0 0 0 / 58%);
    transform: translate(-50%, -50%);

    &[data-state='open'] {
      animation: request-dialog-in 0.25s cubic-bezier(0.22, 1, 0.36, 1);
    }

    &[data-state='closed'] {
      animation: request-dialog-out 0.18s ease-in;
    }
  }

  &__heading {
    max-width: 680px;
    padding-right: 64px;
    margin-bottom: 26px;
  }

  &__eyebrow {
    margin: 0 0 10px;
    font-size: 11px;
    font-weight: 900;
    color: $yellow;
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }

  &__title {
    margin: 0;
    font-size: clamp(34px, 5vw, 54px);
    line-height: 1.05;
    letter-spacing: -0.045em;
  }

  &__description {
    margin: 14px 0 0;
    line-height: 1.6;
    color: #c2d1df;
  }

  &__close {
    position: absolute;
    top: 22px;
    right: 22px;
    display: grid;
    place-items: center;
    width: 46px;
    height: 46px;
    padding: 0;
    color: #fff;
    cursor: pointer;
    background: rgb(255 255 255 / 9%);
    border: 1px solid rgb(255 255 255 / 24%);
    border-radius: 50%;

    :deep(svg) {
      width: 30px;
      height: 30px;
      stroke-width: 2.4;
    }
  }
}

@keyframes overlay-in {
  from {
    opacity: 0;
  }
}

@keyframes overlay-out {
  to {
    opacity: 0;
  }
}

@keyframes panel-in {
  from {
    transform: translateX(100%);
  }
}

@keyframes panel-out {
  to {
    transform: translateX(100%);
  }
}

@keyframes request-dialog-in {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.97);
  }
}

@keyframes request-dialog-out {
  to {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.98);
  }
}

@media (width <= 980px) {
  .site-header {
    &__inner {
      display: flex;
    }

    &__phone,
    &__action {
      display: none;
    }
  }

  .site-navigation {
    display: none;
  }

  .mobile-menu__trigger {
    display: block;
    margin-left: auto;
  }
}

@media (max-width: $phone) {
  .site-header__inner {
    min-height: 70px;
  }

  .project-request {
    &__content {
      inset: 0;
      width: 100%;
      height: 100dvh;
      max-height: none;
      padding: calc(env(safe-area-inset-top) + 28px) calc(env(safe-area-inset-right) + 18px)
        calc(env(safe-area-inset-bottom) + 28px) calc(env(safe-area-inset-left) + 18px);
      border: 0;
      border-radius: 0;
      transform: none;

      &[data-state='open'] {
        animation: mobile-request-in 0.2s ease-out;
      }

      &[data-state='closed'] {
        animation: mobile-request-out 0.16s ease-in;
      }
    }

    &__heading {
      padding-right: 54px;
    }

    &__close {
      top: calc(env(safe-area-inset-top) + 14px);
      right: calc(env(safe-area-inset-right) + 14px);
    }
  }

  .mobile-menu {
    &__panel {
      width: 100%;
      padding: calc(env(safe-area-inset-top) + 28px) calc(env(safe-area-inset-right) + 24px)
        calc(env(safe-area-inset-bottom) + 28px) calc(env(safe-area-inset-left) + 24px);
    }

    &__close {
      top: calc(env(safe-area-inset-top) + 18px);
      right: calc(env(safe-area-inset-right) + 18px);
    }
  }
}

@keyframes mobile-request-in {
  from {
    opacity: 0;
    transform: scale(0.985);
  }
}

@keyframes mobile-request-out {
  to {
    opacity: 0;
    transform: scale(0.99);
  }
}
</style>
