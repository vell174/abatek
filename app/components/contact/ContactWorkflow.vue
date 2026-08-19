<script setup lang="ts">
const steps = [
  {
    number: '01',
    icon: 'lucide:messages-square',
    title: 'Обращение и обсуждение потребности',
    text: 'Позвоните нам или отправьте техническое задание на электронную почту. В кратчайшие сроки согласуем технические вопросы и приступим к расчёту стоимости оборудования.',
  },
  {
    number: '02',
    icon: 'lucide:file-chart-column-increasing',
    title: 'Разработка технико-коммерческого предложения',
    text: 'Рассчитаем стоимость оборудования, сроки изготовления, технические характеристики и комплектацию, учтём доставку до вашего склада.',
  },
  {
    number: '03',
    icon: 'lucide:file-check-2',
    title: 'Заключение договора поставки',
    text: 'Согласуем условия поставки, сроки изготовления и оплаты. Для постоянных заказчиков предусмотрены скидки и возможность изготовления с отсрочкой платежа.',
  },
  {
    number: '04',
    icon: 'lucide:ruler',
    title: 'Согласование чертежей',
    text: 'Предоставим чертежи общего вида оборудования для согласования. Срок разработки зависит от объёма и сложности работ.',
  },
  {
    number: '05',
    icon: 'lucide:factory',
    title: 'Изготовление оборудования',
    text: 'Изготовим оборудование по согласованному техническому заданию и чертежам. Сроки зависят от объёма, загрузки предприятия и сложности работ.',
  },
  {
    number: '06',
    icon: 'lucide:truck',
    title: 'Доставка оборудования до вашего склада',
    text: 'Берём на себя заботы по доставке оборудования до вашего склада. Срок зависит от региона расположения заказчика.',
  },
];
</script>

<template>
  <section class="workflow content-section site-container">
    <div class="workflow__intro">
      <div class="workflow__heading">
        <p class="workflow__eyebrow">Как мы работаем</p>
        <h2 class="workflow__title">От запроса до готового оборудования</h2>
        <p class="workflow__lead">Прозрачный процесс, понятные сроки и инженерная команда на каждом этапе проекта.</p>
      </div>
      <div class="workflow__image" role="img" aria-label="Прецизионные детали конвейера и инженерные чертежи"></div>
    </div>
    <div class="workflow__grid">
      <article v-for="step in steps" :key="step.number" class="workflow__item" :data-step="step.number">
        <div class="workflow__topline">
          <span class="workflow__number">{{ step.number }}</span>
          <Icon :name="step.icon" aria-hidden="true" mode="svg" />
        </div>
        <h3>{{ step.title }}</h3>
        <p>{{ step.text }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.workflow {
  position: relative;
  padding-block: clamp(70px, 8vw, 120px);
  overflow: hidden;

  &::before {
    position: absolute;
    top: 55px;
    right: -140px;
    width: 280px;
    height: 280px;
    content: '';
    border: 1px solid rgb(7 87 164 / 13%);
    border-radius: 50%;
    box-shadow:
      0 0 0 18px rgb(7 87 164 / 4%),
      0 0 0 38px rgb(7 87 164 / 3%);
  }

  &__heading {
    max-width: 560px;
  }

  &__eyebrow {
    margin: 0 0 12px;
    font-size: 11px;
    font-weight: 900;
    color: $blue;
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }

  &__title {
    margin: 0;
    font-size: clamp(38px, 5vw, 64px);
    line-height: 1.05;
    letter-spacing: -0.045em;
  }

  &__lead {
    max-width: 450px;
    margin: 22px 0 0;
    font-size: 16px;
    line-height: 1.65;
    color: $muted;
  }

  &__intro {
    display: grid;
    grid-template-columns: 0.85fr 1.15fr;
    gap: clamp(40px, 8vw, 120px);
    align-items: end;
    margin-bottom: 58px;
  }

  &__image {
    min-height: 300px;
    background: url('/images/contact-detail-premium.webp') center / cover;
    border-radius: 4px;
    box-shadow: 24px 24px 0 $yellow;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }

  &__item {
    position: relative;
    min-height: 245px;
    padding: 28px;
    overflow: hidden;
    border: 1px solid $line;
    border-radius: 12px;
    transition: 0.25s ease;

    &::after {
      position: absolute;
      right: 17px;
      bottom: -28px;
      font-size: 132px;
      font-weight: 900;
      line-height: 1;
      color: rgb(7 87 164 / 5%);
      letter-spacing: -0.08em;
      pointer-events: none;
      content: attr(data-step);
    }

    &:hover {
      border-color: rgb(7 87 164 / 45%);
      box-shadow: 0 15px 34px rgb(0 41 79 / 9%);
      transform: translateY(-4px);
    }
  }

  &__topline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 26px;

    svg {
      width: 23px;
      height: 23px;
      color: $yellow;
    }
  }

  &__number {
    display: grid;
    place-items: center;
    width: 48px;
    height: 48px;
    margin: 0;
    font-size: 15px;
    font-weight: 900;
    color: $navy;
    letter-spacing: 0.04em;
    background: $yellow;
    border-radius: 50%;
    box-shadow: 0 0 0 7px rgb(255 210 10 / 13%);
  }

  h3 {
    margin: 0 0 12px;
    font-size: 19px;
    line-height: 1.2;
  }

  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.65;
    color: $muted;
  }
}

@media (max-width: $tablet) {
  .workflow__intro {
    grid-template-columns: 1fr;
  }

  .workflow__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: $phone) {
  .workflow__image {
    min-height: 220px;
    box-shadow: 10px 10px 0 $yellow;
  }

  .workflow__grid {
    grid-template-columns: 1fr;
  }
}
</style>
