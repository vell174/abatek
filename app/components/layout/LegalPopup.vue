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

const props = defineProps<{ kind: 'personal-data' | 'privacy' }>();
const isPersonalData = computed(() => props.kind === 'personal-data');
const title = computed(() =>
  isPersonalData.value ? 'Согласие на обработку персональных данных' : 'Политика конфиденциальности',
);
const page = computed(() => (isPersonalData.value ? '/obrabotka-personalnyh-dannyh' : '/politika-konfidencialnosti'));
</script>

<template>
  <DialogRoot>
    <DialogTrigger class="legal-popup__trigger" @click.stop>{{ title.toLowerCase() }}</DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="legal-popup__overlay" />
      <DialogContent class="legal-popup__content">
        <div class="legal-popup__heading">
          <p class="legal-popup__eyebrow">Юридическая информация</p>
          <DialogTitle class="legal-popup__title">{{ title }}</DialogTitle>
          <DialogDescription class="legal-popup__description">
            {{
              isPersonalData
                ? 'Условия обработки сведений, отправленных через сайт.'
                : 'Как АБАТЭК получает, использует и защищает информацию.'
            }}
          </DialogDescription>
        </div>

        <div v-if="isPersonalData" class="legal-popup__body">
          <section>
            <h3>1. Предоставление согласия</h3>
            <p>Отмечая чекбокс и отправляя форму, пользователь даёт АБАТЭК согласие на обработку переданных данных.</p>
          </section>
          <section>
            <h3>2. Состав и цели обработки</h3>
            <p>
              Обрабатываются имя, телефон, электронная почта, содержание обращения и другие добровольно указанные
              сведения — для обратной связи, подготовки предложения и исполнения договора.
            </p>
          </section>
          <section>
            <h3>3. Срок и отзыв согласия</h3>
            <p>
              Согласие действует до достижения целей обработки или его отзыва письмом на
              <a href="mailto:zakaz@abatek.ru">zakaz@abatek.ru</a>
              .
            </p>
          </section>
        </div>
        <div v-else class="legal-popup__body">
          <section>
            <h3>1. Общие положения</h3>
            <p>
              АБАТЭК принимает организационные и технические меры для защиты информации, переданной посетителями сайта.
            </p>
          </section>
          <section>
            <h3>2. Использование данных</h3>
            <p>
              Данные используются для обработки обращений, обратной связи, подготовки предложений, работы и безопасности
              сайта.
            </p>
          </section>
          <section>
            <h3>3. Права пользователя</h3>
            <p>
              Запросить уточнение, блокирование или удаление данных можно по адресу
              <a href="mailto:zakaz@abatek.ru">zakaz@abatek.ru</a>
              .
            </p>
          </section>
        </div>

        <NuxtLink class="legal-popup__page-link" :to="page">Открыть полную версию на отдельной странице →</NuxtLink>
        <DialogClose class="legal-popup__close" aria-label="Закрыть документ">
          <Icon name="lucide:x" aria-hidden="true" mode="svg" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped lang="scss">
.legal-popup {
  &__trigger {
    padding: 0;
    font: inherit;
    font-weight: 800;
    color: $yellow;
    text-align: left;
    text-decoration: underline;
    text-underline-offset: 3px;
    background: transparent;
    border: 0;
  }

  &__overlay {
    position: fixed;
    inset: 0;
    z-index: 120;
    background: rgb(2 12 24 / 86%);
    backdrop-filter: blur(10px);

    &[data-state='open'] {
      animation: legal-fade-in 0.2s ease-out;
    }

    &[data-state='closed'] {
      animation: legal-fade-out 0.16s ease-in;
    }
  }

  &__content {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 121;
    width: min(760px, calc(100vw - 32px));
    max-height: calc(100vh - 32px);
    padding: clamp(26px, 4vw, 48px);
    overflow-y: auto;
    color: $ink;
    background: #fff;
    border: 1px solid rgb(255 255 255 / 30%);
    border-radius: 22px;
    box-shadow: 0 35px 110px rgb(0 0 0 / 56%);
    transform: translate(-50%, -50%);

    &[data-state='open'] {
      animation: legal-dialog-in 0.24s cubic-bezier(0.22, 1, 0.36, 1);
    }

    &[data-state='closed'] {
      animation: legal-dialog-out 0.16s ease-in;
    }
  }

  &__heading {
    padding-right: 58px;
    margin-bottom: 28px;
  }

  &__eyebrow {
    margin: 0 0 10px;
    font-size: 11px;
    font-weight: 900;
    color: $blue;
    text-transform: uppercase;
    letter-spacing: 0.14em;
  }

  &__title {
    margin: 0;
    font-size: clamp(30px, 4vw, 46px);
    line-height: 1.08;
    letter-spacing: -0.04em;
  }

  &__description {
    margin: 14px 0 0;
    line-height: 1.6;
    color: $muted;
  }

  &__body {
    display: grid;
    gap: 18px;
    padding: 24px;
    background: $soft;
    border-radius: 14px;
  }

  &__body section,
  &__body p {
    margin: 0;
  }

  &__body h3 {
    margin: 0 0 7px;
    font-size: 16px;
  }

  &__body p {
    font-size: 14px;
    line-height: 1.65;
    color: $muted;
  }

  &__body a {
    font-weight: 750;
    color: $blue;
  }

  &__page-link {
    display: inline-block;
    margin-top: 24px;
    font-size: 14px;
    font-weight: 800;
    color: $blue;
  }

  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    display: grid;
    place-items: center;
    width: 48px;
    height: 48px;
    padding: 0;
    color: #fff;
    background: $navy;
    border: 0;
    border-radius: 50%;

    svg {
      width: 31px;
      height: 31px;
      stroke-width: 2.4;
    }
  }
}

@keyframes legal-fade-in {
  from {
    opacity: 0;
  }
}

@keyframes legal-fade-out {
  to {
    opacity: 0;
  }
}

@keyframes legal-dialog-in {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.97);
  }
}

@keyframes legal-dialog-out {
  to {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.98);
  }
}

@media (max-width: $phone) {
  .legal-popup {
    &__content {
      inset: 0;
      width: 100%;
      height: 100dvh;
      max-height: none;
      padding: calc(env(safe-area-inset-top) + 30px) calc(env(safe-area-inset-right) + 20px)
        calc(env(safe-area-inset-bottom) + 30px) calc(env(safe-area-inset-left) + 20px);
      border: 0;
      border-radius: 0;
      transform: none;

      &[data-state='open'] {
        animation: mobile-legal-in 0.2s ease-out;
      }

      &[data-state='closed'] {
        animation: mobile-legal-out 0.16s ease-in;
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
}

@keyframes mobile-legal-in {
  from {
    opacity: 0;
    transform: scale(0.985);
  }
}

@keyframes mobile-legal-out {
  to {
    opacity: 0;
    transform: scale(0.99);
  }
}
</style>
