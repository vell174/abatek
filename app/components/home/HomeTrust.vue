<script setup lang="ts">
const items = [
  { title: 'Собственное производство', icon: 'lucide:factory' },
  { title: 'Конструкторская работа', icon: 'lucide:ruler' },
  { title: 'Контроль этапов', icon: 'lucide:badge-check' },
  { title: 'Поставка по России', icon: 'lucide:truck' },
];
</script>
<template>
  <section class="trust" aria-label="Принципы работы">
    <div class="site-container trust__grid">
      <div v-for="item in items" :key="item.title" class="trust__item">
        <span class="trust__icon">
          <Icon class="trust__icon-symbol" :name="item.icon" aria-hidden="true" mode="svg" />
        </span>
        <strong class="trust__text">{{ item.title }}</strong>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.trust {
  position: relative;
  z-index: 2;
  padding-block: 12px 0;
  background: #fff;

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    color: #fff;
    background: linear-gradient(120deg, $blue, $navy);
    border-radius: 20px;
    box-shadow: 0 24px 60px rgba($navy, 0.2);
  }

  &__item {
    display: flex;
    gap: 12px;
    align-items: center;
    min-height: 70px;
    padding: 12px 18px;
    border-right: 1px solid rgb(255 255 255 / 14%);
  }

  &__icon {
    display: grid;
    flex: 0 0 38px;
    place-items: center;
    width: 38px;
    height: 38px;
    color: $yellow;
    background: rgb(255 255 255 / 8%);
    border: 1px solid rgb(255 255 255 / 12%);
    border-radius: 12px;

    &-symbol {
      width: 25px;
      height: 25px;
    }
  }

  &__text {
    font-size: 14px;
    line-height: 1.35;
  }
}

@media (max-width: $tablet) {
  .trust__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: $phone) {
  .trust {
    padding-top: 12px;

    &__grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    &__item {
      gap: 8px;
      min-height: 76px;
      padding: 11px;
      border-bottom: 1px solid rgb(255 255 255 / 12%);

      &:nth-child(even) {
        border-right: 0;
      }
    }

    &__icon {
      flex-basis: 32px;
      width: 32px;
      height: 32px;
    }

    &__text {
      font-size: 13px;
    }
  }
}
</style>
