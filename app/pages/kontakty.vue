<script setup lang="ts">
import { seo } from '~/data/pages/kontakty/seo';

usePageSeo(seo);
</script>
<template>
  <div>
    <section class="contact-hero">
      <div class="site-container contact-hero__inner">
        <div class="contact-hero__copy">
          <p class="contact-hero__eyebrow">АБАТЭК · ENGINEERING PARTNER</p>
          <h1 class="contact-hero__title">Свяжитесь с командой, которая отвечает за результат</h1>
          <p class="contact-hero__text">
            Обсудим задачу, подберём конфигурацию и подготовим решение под ваше производство — от первого звонка до
            поставки оборудования.
          </p>
          <a class="contact-hero__link" href="#contacts">
            <span>Обсудить проект</span>
            <Icon name="lucide:arrow-down-right" aria-hidden="true" mode="svg" />
          </a>
        </div>
        <div class="contact-hero__meta">
          <span>01</span>
          <span>
            Контакты
            <br />
            и консультация
          </span>
        </div>
      </div>
    </section>
    <div id="contacts"><ContactGrid /></div>
    <ContactWorkflow />
  </div>
</template>

<style scoped lang="scss">
.contact-hero {
  position: relative;
  min-height: min(690px, 72vh);
  overflow: hidden;
  color: #fff;
  background:
    linear-gradient(90deg, rgb(2 11 22 / 92%) 0%, rgb(2 11 22 / 72%) 47%, rgb(2 11 22 / 15%) 100%),
    url('/images/contact-hero-premium.webp') center / cover;

  &::before {
    position: absolute;
    inset: 0;
    pointer-events: none;
    content: '';
    background-image:
      linear-gradient(rgb(255 255 255 / 14%) 1px, transparent 1px),
      linear-gradient(90deg, rgb(255 255 255 / 14%) 1px, transparent 1px);
    background-size: 72px 72px;
    opacity: 0.12;
    mask-image: linear-gradient(90deg, #000 0%, transparent 72%);
  }

  &::after {
    position: absolute;
    right: 7%;
    bottom: 12%;
    width: 160px;
    height: 160px;
    content: '';
    border: 1px solid rgb(255 210 10 / 55%);
    border-radius: 50%;
    box-shadow:
      0 0 0 22px rgb(255 210 10 / 7%),
      0 0 0 44px rgb(255 210 10 / 4%);
  }

  &__inner {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    min-height: min(690px, 72vh);
    padding-block: 120px 82px;
  }

  &__copy {
    max-width: 790px;
  }

  &__eyebrow {
    margin: 0 0 24px;
    font-size: 11px;
    font-weight: 900;
    color: $yellow;
    letter-spacing: 0.2em;
  }

  &__title {
    max-width: 820px;
    margin: 0;
    font-size: clamp(52px, 7.5vw, 112px);
    line-height: 0.98;
    letter-spacing: -0.06em;
    text-wrap: balance;
  }

  &__text {
    max-width: 590px;
    margin: 30px 0 0;
    font-size: 17px;
    line-height: 1.65;
    color: #c6d2de;
  }

  &__link {
    display: inline-flex;
    gap: 34px;
    align-items: center;
    padding: 17px 20px 17px 24px;
    margin-top: 38px;
    font-size: 13px;
    font-weight: 800;
    color: $navy;
    text-decoration: none;
    background: $yellow;
    border-radius: 3px;
    transition: transform 0.25s ease;
  }

  &__link svg {
    width: 19px;
  }

  &__link:hover {
    transform: translateY(-3px);
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 8px;
    font-size: 10px;
    font-weight: 800;
    line-height: 1.5;
    color: #8ea2b5;
    text-align: right;
    text-transform: uppercase;
    letter-spacing: 0.15em;
  }

  &__meta span:first-child {
    font-size: 40px;
    color: $yellow;
    letter-spacing: -0.04em;
  }
}

@media (max-width: $phone) {
  .contact-hero,
  .contact-hero__inner {
    min-height: 650px;
  }

  .contact-hero__inner {
    align-items: flex-start;
    padding-top: 105px;
  }

  .contact-hero__title {
    font-size: clamp(48px, 13vw, 72px);
  }

  .contact-hero__meta {
    display: none;
  }
}
</style>
