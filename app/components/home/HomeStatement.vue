<script setup lang="ts">
const isProjectRequestOpen = useState('project-request-open', () => false);
</script>

<template>
  <section class="statement">
    <span class="statement__orbit statement__orbit--large" aria-hidden="true" />
    <span class="statement__orbit statement__orbit--small" aria-hidden="true" />
    <div class="site-container statement__container">
      <p class="statement__eyebrow">
        <span class="statement__eyebrow-line" aria-hidden="true" />
        Принцип работы
      </p>
      <div class="statement__layout">
        <h2 class="statement__title">
          От идеи до готового оборудования —
          <em class="statement__accent">единый производственный процесс</em>
        </h2>
        <div class="statement__aside">
          <p class="statement__text">
            Согласовываем технические вопросы, готовим предложение и чертежи, изготавливаем оборудование и организуем
            доставку.
          </p>
          <UiButton as-child size="medium" rounded="pill">
            <button class="statement__action" type="button" @click="isProjectRequestOpen = true">
              Обсудить проект
              <Icon name="lucide:arrow-up-right" aria-hidden="true" mode="svg" />
            </button>
          </UiButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.statement {
  position: relative;
  padding-block: 30px;
  overflow: hidden;
  color: #fff;
  background:
    linear-gradient(90deg, rgb(2 18 36 / 97%) 0%, rgb(2 18 36 / 91%) 38%, rgb(2 18 36 / 38%) 70%, rgb(2 18 36 / 12%)),
    url('/images/production-process-2026.webp') center / cover no-repeat;

  &::after {
    position: absolute;
    inset: 12px;
    pointer-events: none;
    content: '';
    border: 1px solid rgb(255 255 255 / 10%);
    border-radius: 12px;
  }

  &__container {
    position: relative;
    z-index: 1;
  }

  &__layout {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
    gap: 32px;
    align-items: center;
    max-width: 1120px;
  }

  &__eyebrow {
    display: flex;
    gap: 12px;
    align-items: center;
    margin: 0 0 9px;
    font-size: 12px;
    font-weight: 850;
    color: $yellow;
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }

  &__eyebrow-line {
    width: 34px;
    height: 2px;
    background: $yellow;
  }

  &__title {
    max-width: 820px;
    margin: 0;
    font-size: var(--section-heading-size);
    line-height: var(--section-heading-leading);
    letter-spacing: -0.045em;
  }

  &__accent {
    display: block;
    margin-top: 2px;
    font-style: normal;
    color: #8dc5ff;
  }

  &__text {
    padding-left: 14px;
    margin: 0 0 5px;
    font-size: 15px;
    line-height: 1.45;
    color: #c4d5e5;
    border-left: 2px solid $yellow;
  }

  &__aside {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  &__action {
    color: $navy;
    text-decoration: none;

    svg {
      width: 19px;
      height: 19px;
    }
  }

  &__orbit {
    position: absolute;
    pointer-events: none;
    border: 1px solid rgb(141 197 255 / 13%);
    border-radius: 50%;

    &--large {
      right: -180px;
      bottom: -380px;
      width: 720px;
      height: 720px;
      box-shadow: 0 0 0 70px rgb(141 197 255 / 2.5%);
    }

    &--small {
      top: -100px;
      left: 42%;
      width: 230px;
      height: 230px;
      border-color: rgb(255 210 10 / 12%);
    }
  }
}

@media (max-width: $tablet) {
  .statement {
    &__layout {
      grid-template-columns: 1fr;
      gap: 14px;
    }

    &__layout > *,
    &__aside {
      min-width: 0;
    }

    &__text {
      max-width: 600px;
    }
  }
}

@media (max-width: $phone) {
  .statement {
    min-height: 0;
    padding-block: 28px;
    background-position: 66% center;

    &::after {
      inset: 10px;
    }

    &__title {
      max-width: 100%;
      font-size: 28px;
      letter-spacing: -0.035em;
      overflow-wrap: anywhere;
    }

    &__text {
      padding-left: 14px;
    }

    &__action {
      max-width: 100%;
    }
  }
}
</style>
