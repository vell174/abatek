<script setup lang="ts">
const isProjectRequestOpen = useState('project-request-open', () => false);

const stages = [
  { number: '01', label: 'Задача', icon: 'lucide:file-text' },
  { number: '02', label: 'Проект', icon: 'lucide:drafting-compass' },
  { number: '03', label: 'Производство', icon: 'lucide:factory' },
  { number: '04', label: 'Поставка', icon: 'lucide:truck' },
];
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
          <UiButton as-child size="large" rounded="pill">
            <button class="statement__action" type="button" @click="isProjectRequestOpen = true">
              Обсудить проект
              <Icon name="lucide:arrow-up-right" aria-hidden="true" mode="svg" />
            </button>
          </UiButton>
        </div>
      </div>
      <div class="statement__stages" aria-label="Этапы производственного процесса">
        <div v-for="stage in stages" :key="stage.number" class="statement__stage">
          <span class="statement__stage-icon">
            <Icon :name="stage.icon" size="23" aria-hidden="true" mode="svg" />
          </span>
          <span class="statement__stage-content">
            <small>{{ stage.number }}</small>
            <strong>{{ stage.label }}</strong>
          </span>
        </div>
      </div>
      <div class="statement__cycle">
        <span class="statement__cycle-icon">
          <Icon name="lucide:badge-check" size="27" aria-hidden="true" mode="svg" />
        </span>
        <span>
          <small>Полный цикл</small>
          <strong>В одной компании</strong>
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.statement {
  position: relative;
  min-height: 650px;
  padding-block: clamp(80px, 8vw, 120px);
  overflow: hidden;
  color: #fff;
  background:
    linear-gradient(90deg, rgb(2 18 36 / 97%) 0%, rgb(2 18 36 / 91%) 38%, rgb(2 18 36 / 38%) 70%, rgb(2 18 36 / 12%)),
    url('/images/production-process-2026.webp') center / cover no-repeat;

  &::after {
    position: absolute;
    inset: 20px;
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
    grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.6fr);
    gap: clamp(40px, 7vw, 110px);
    align-items: end;
    max-width: 1120px;
  }

  &__eyebrow {
    display: flex;
    gap: 12px;
    align-items: center;
    margin: 0 0 22px;
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
    font-size: clamp(44px, 5.1vw, 70px);
    line-height: 1.05;
    letter-spacing: -0.045em;
  }

  &__accent {
    display: block;
    margin-top: 6px;
    font-style: normal;
    color: #8dc5ff;
  }

  &__text {
    padding-left: 22px;
    margin: 0 0 5px;
    font-size: 16px;
    line-height: 1.75;
    color: #c4d5e5;
    border-left: 2px solid $yellow;
  }

  &__aside {
    display: flex;
    flex-direction: column;
    gap: 28px;
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

  &__stages {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    max-width: 1020px;
    margin-top: 54px;
  }

  &__stage {
    display: flex;
    gap: 14px;
    align-items: center;
    min-height: 82px;
    padding: 17px;
    background: linear-gradient(135deg, rgb(255 255 255 / 11%), rgb(255 255 255 / 6%));
    border: 1px solid rgb(255 255 255 / 17%);
    border-radius: 14px;
    box-shadow: inset 0 1px rgb(255 255 255 / 7%);
    backdrop-filter: blur(10px);
    transition:
      background 0.25s ease,
      border-color 0.25s ease,
      transform 0.25s ease;

    &:hover {
      background: linear-gradient(135deg, rgb(255 255 255 / 16%), rgb(255 255 255 / 9%));
      border-color: rgb(255 210 10 / 50%);
      box-shadow: 0 14px 32px rgb(0 0 0 / 15%);
      transform: translateY(-4px);
    }
  }

  &__cycle {
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    gap: 14px;
    align-items: center;
    min-width: 270px;
    min-height: 82px;
    padding: 12px 18px;
    color: $navy;
    background: linear-gradient(135deg, #ffe04c, $yellow);
    border: 1px solid $yellow;
    border-radius: 16px;
    box-shadow:
      0 18px 45px rgb(0 0 0 / 25%),
      0 0 42px rgb(255 210 10 / 18%);

    > span:last-child {
      display: flex;
      flex-direction: column;
    }

    small {
      margin-bottom: 3px;
      font-size: 11px;
      font-weight: 750;
      color: rgb(0 41 79 / 68%);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    strong {
      font-size: 17px;
      line-height: 1.25;
    }
  }

  &__cycle-icon {
    display: grid;
    place-items: center;
    width: 52px;
    height: 52px;
    color: $yellow;
    background: $navy;
    border-radius: 50%;

    svg {
      width: 27px;
      height: 27px;
    }
  }

  &__stage-icon {
    display: grid;
    flex: 0 0 auto;
    place-items: center;
    width: 48px;
    height: 48px;
    color: $navy;
    background: $yellow;
    border-radius: 9px;

    svg {
      width: 23px;
      height: 23px;
    }
  }

  &__stage-content {
    display: flex;
    flex-direction: column;

    small {
      margin-bottom: 2px;
      font-size: 11px;
      font-weight: 800;
      color: $yellow;
      letter-spacing: 0.1em;
    }

    strong {
      font-size: 15px;
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
      gap: 28px;
    }

    &__layout > *,
    &__aside {
      min-width: 0;
    }

    &__text {
      max-width: 600px;
    }

    &__stages {
      grid-template-columns: repeat(2, 1fr);
    }

    &__cycle {
      display: none;
    }
  }
}

@media (max-width: $phone) {
  .statement {
    min-height: 0;
    padding-block: 72px;
    background-position: 66% center;

    &::after {
      inset: 10px;
    }

    &__title {
      max-width: 100%;
      font-size: clamp(30px, 10vw, 40px);
      letter-spacing: -0.035em;
      overflow-wrap: anywhere;
    }

    &__text {
      padding-left: 16px;
    }

    &__action {
      max-width: 100%;
    }

    &__stages {
      grid-template-columns: 1fr;
      margin-top: 38px;
    }
  }
}
</style>
