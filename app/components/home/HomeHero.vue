<script setup lang="ts">
const isProjectRequestOpen = useState('project-request-open', () => false);
</script>

<template>
  <section class="home-hero">
    <div class="site-container home-hero__content">
      <p class="home-hero__eyebrow">Собственное производство</p>
      <h1 class="home-hero__title">
        Конвейерные решения
        <br />
        для вашего
        <em class="home-hero__accent">бизнеса</em>
      </h1>
      <p class="home-hero__text">
        Проектируем, производим и поставляем конвейерное оборудование по согласованному техническому заданию.
      </p>
      <div class="home-hero__actions">
        <button class="home-hero__action" type="button" @click="isProjectRequestOpen = true">
          Получить консультацию
        </button>
        <NuxtLink class="home-hero__action home-hero__action--ghost" to="/#catalog">Смотреть каталог</NuxtLink>
      </div>
    </div>
    <div class="home-hero__index">
      АБАТЭК
      <span class="home-hero__year">/ 2026</span>
    </div>
  </section>
</template>

<style scoped lang="scss">
.home-hero {
  position: relative;
  min-height: 650px;
  overflow: hidden;
  color: #fff;
  background:
    linear-gradient(90deg, rgb(2 13 31 / 22%) 0%, transparent 58%),
    url('/images/home-hero-welding-2026.webp') center / cover no-repeat;

  &::after {
    position: absolute;
    inset: auto -5% -48% 50%;
    width: 820px;
    aspect-ratio: 1;
    content: '';
    background: repeating-radial-gradient(circle, transparent 0 38px, rgb(255 255 255 / 7%) 39px 40px);
    border: 1px solid rgb(255 255 255 / 14%);
    border-radius: 50%;
  }

  &__content {
    position: relative;
    z-index: 1;
    padding-block: 96px 120px;
  }

  &__eyebrow {
    margin: 0 0 14px;
    font-size: 13px;
    font-weight: 900;
    color: $yellow;
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }

  &__title {
    max-width: 720px;
    margin: 0;
    font-size: clamp(58px, 6.5vw, 88px);
    line-height: 0.98;
    letter-spacing: -0.045em;
  }

  &__accent,
  &__year {
    color: $yellow;
  }

  &__accent {
    font-style: normal;
  }

  &__text {
    max-width: 620px;
    margin: 30px 0;
    font-size: 19px;
    line-height: 1.6;
    color: #cfdae6;
  }

  &__actions {
    position: relative;
    z-index: 3;
    display: flex;
    gap: 16px;
  }

  &__action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 58px;
    padding: 0 32px;
    font-size: 15px;
    font-weight: 800;
    color: $navy;
    text-decoration: none;
    cursor: pointer;
    background: $yellow;
    border: 1px solid $yellow;
    border-radius: 6px;
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-2px);
    }

    &--ghost {
      color: #fff;
      background: transparent;
      border-color: rgb(255 255 255 / 55%);
    }
  }

  &__index {
    position: absolute;
    right: 5%;
    bottom: 34px;
    font-size: 13px;
    color: rgb(255 255 255 / 60%);
    letter-spacing: 0.15em;
  }
}

@media (max-width: $phone) {
  .home-hero {
    min-height: 620px;

    &__content {
      padding-top: 76px;
    }

    &__title {
      font-size: clamp(46px, 13vw, 64px);
    }

    &__text {
      font-size: 16px;
    }

    &__actions {
      flex-direction: column;
      align-items: stretch;
      max-width: 280px;
    }
  }
}
</style>
