<script setup lang="ts">
const steps = [
  {
    title: 'Обсуждение задачи',
    text: 'Уточняем условия работы и требования к оборудованию.',
    icon: 'lucide:messages-square',
  },
  {
    title: 'Подготовка предложения',
    text: 'Рассчитываем решение, сроки производства и стоимость.',
    icon: 'lucide:file-text',
  },
  {
    title: 'Заключение договора',
    text: 'Фиксируем комплектацию, этапы и обязательства сторон.',
    icon: 'lucide:file-signature',
  },
  {
    title: 'Согласование чертежей',
    text: 'Готовим документацию и утверждаем конструкцию.',
    icon: 'lucide:drafting-compass',
  },
  { title: 'Изготовление', text: 'Производим оборудование с поэтапным контролем качества.', icon: 'lucide:cog' },
  { title: 'Доставка', text: 'Комплектуем заказ и организуем отправку на объект.', icon: 'lucide:truck' },
];
</script>
<template>
  <section class="content-section site-container home-process">
    <div class="home-process__heading">
      <div class="home-process__heading-content">
        <p class="home-process__eyebrow">Прозрачный процесс</p>
        <h2 class="home-process__title">Как мы работаем</h2>
      </div>
      <p class="home-process__lead">
        Понятная последовательность — от первого обращения до поставки готового оборудования.
      </p>
    </div>
    <div class="home-process__grid">
      <article v-for="(step, index) in steps" :key="step.title" class="home-process__step">
        <b class="home-process__index">{{ String(index + 1).padStart(2, '0') }}</b>
        <span class="home-process__icon" aria-hidden="true">
          <Icon class="home-process__icon-symbol" :name="step.icon" mode="svg" />
        </span>
        <h3 class="home-process__step-name">{{ step.title }}</h3>
        <p class="home-process__step-text">{{ step.text }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.home-process {
  position: relative;

  &::before {
    position: absolute;
    top: 36px;
    right: 0;
    width: 220px;
    height: 220px;
    pointer-events: none;
    content: '';
    border: 1px solid rgb(18 105 199 / 8%);
    border-radius: 50%;
    box-shadow:
      0 0 0 32px rgb(18 105 199 / 2%),
      0 0 0 66px rgb(18 105 199 / 1.5%);
  }

  &__heading {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 40px;
    align-items: end;
    justify-content: space-between;
    margin-bottom: 44px;
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
    margin: 0;
    font-size: clamp(42px, 5vw, 64px);
    letter-spacing: -0.045em;
  }

  &__lead {
    max-width: 470px;
    margin: 0 0 7px;
    font-size: 17px;
    line-height: 1.65;
    color: $muted;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }

  &__step {
    position: relative;
    min-height: 270px;
    padding: 30px;
    background: linear-gradient(145deg, #fff, #f8fbff);
    border: 1px solid $line;
    border-radius: 20px;
    box-shadow: 0 10px 28px rgb(3 35 68 / 4%);
    transition:
      border-color 0.25s ease,
      box-shadow 0.25s ease,
      transform 0.25s ease;

    &::after {
      position: absolute;
      right: 30px;
      bottom: 24px;
      width: 44px;
      height: 3px;
      content: '';
      background: linear-gradient(90deg, $yellow, transparent);
      border-radius: 99px;
    }

    &:hover {
      border-color: rgb(18 105 199 / 32%);
      box-shadow: 0 24px 55px rgb(3 35 68 / 12%);
      transform: translateY(-6px);
    }

    &:hover .home-process__icon {
      color: #fff;
      background: $blue;
      transform: rotate(-4deg) scale(1.06);
    }
  }

  &__index {
    position: absolute;
    top: 30px;
    right: 30px;
    font-size: 14px;
    color: $blue;
  }

  &__icon {
    display: grid;
    place-items: center;
    width: 68px;
    height: 68px;
    margin-bottom: 34px;
    color: $blue;
    background: #edf5ff;
    border-radius: 20px;
    box-shadow: inset 0 0 0 1px rgb(18 105 199 / 8%);
    transition:
      color 0.25s ease,
      background 0.25s ease,
      transform 0.25s ease;

    &-symbol {
      width: 36px;
      height: 36px;
    }
  }

  &__step-name {
    margin: 0;
    font-size: 19px;
    font-weight: 800;
    line-height: 1.4;
  }

  &__step-text {
    max-width: 320px;
    margin: 12px 0 0;
    font-size: 14px;
    line-height: 1.65;
    color: $muted;
  }
}

@media (max-width: $tablet) {
  .home-process {
    &__heading {
      align-items: start;
    }

    &__grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media (max-width: $phone) {
  .home-process {
    &__heading {
      flex-direction: column;
      gap: 18px;
    }

    &__grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
