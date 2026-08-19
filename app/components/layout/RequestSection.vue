<template>
  <section class="request-section">
    <div class="site-container request-section__grid">
      <div class="request-section__content">
        <p class="request-section__eyebrow">Инженерная консультация</p>
        <h2 class="request-section__title">Обсудим вашу задачу</h2>
        <p class="request-section__text">
          Отправьте вводные данные — специалист свяжется с вами для уточнения деталей.
        </p>
        <div class="request-section__contacts">
          <a class="request-section__contact" href="tel:89511172210">
            <span class="request-section__contact-icon">
              <Icon name="lucide:phone-call" aria-hidden="true" mode="svg" />
            </span>
            <span class="request-section__contact-content">
              <small class="request-section__contact-label">WhatsApp, Viber</small>
              <strong>8 (951) 117-22-10</strong>
            </span>
            <Icon class="request-section__contact-arrow" name="lucide:arrow-up-right" aria-hidden="true" mode="svg" />
          </a>
          <a class="request-section__contact" href="tel:88005051915">
            <span class="request-section__contact-icon">
              <Icon name="lucide:phone" aria-hidden="true" mode="svg" />
            </span>
            <span class="request-section__contact-content">
              <small class="request-section__contact-label">Бесплатный номер</small>
              <strong>8 (800) 505-19-15</strong>
            </span>
            <Icon class="request-section__contact-arrow" name="lucide:arrow-up-right" aria-hidden="true" mode="svg" />
          </a>
          <a class="request-section__contact" href="mailto:zakaz@abatek.ru">
            <span class="request-section__contact-icon">
              <Icon name="lucide:mail" aria-hidden="true" mode="svg" />
            </span>
            <span class="request-section__contact-content">
              <small class="request-section__contact-label">Напишите на почту</small>
              <strong>zakaz@abatek.ru</strong>
            </span>
            <Icon class="request-section__contact-arrow" name="lucide:arrow-up-right" aria-hidden="true" mode="svg" />
          </a>
        </div>
      </div>
      <RequestForm />
    </div>
  </section>
</template>

<style scoped lang="scss">
.request-section {
  position: relative;
  padding-block: clamp(78px, 8vw, 118px);
  overflow: hidden;
  color: #fff;
  background:
    linear-gradient(105deg, $navy 0%, rgba($navy, 0.97) 52%, rgba($navy, 0.76)),
    url('/images/contact-detail-premium.webp') right center / cover no-repeat;

  &::before,
  &::after {
    position: absolute;
    pointer-events: none;
    content: '';
    border: 1px solid rgb(255 255 255 / 10%);
    border-radius: 50%;
  }

  &::before {
    top: -280px;
    left: -190px;
    width: 560px;
    height: 560px;
    box-shadow: 0 0 90px rgb(7 87 164 / 20%);
  }

  &::after {
    right: -120px;
    bottom: -240px;
    width: 480px;
    height: 480px;
    border-color: rgb(255 210 10 / 18%);
  }

  &__grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(360px, 0.9fr) minmax(520px, 1.1fr);
    gap: clamp(55px, 7vw, 110px);
    align-items: stretch;
  }

  &__content {
    display: flex;
    flex-direction: column;
    max-width: 560px;
    height: 100%;
  }

  &__eyebrow {
    margin: 0 0 18px;
    font-size: 11px;
    font-weight: 900;
    color: $yellow;
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }

  &__title {
    margin: 0;
    font-size: clamp(44px, 5vw, 68px);
    line-height: 1.03;
    letter-spacing: -0.05em;
  }

  &__text {
    max-width: 520px;
    margin: 24px 0 0;
    font-size: 16px;
    line-height: 1.7;
    color: #c2d1df;
  }

  &__contacts {
    display: grid;
    gap: 12px;
    padding-top: 34px;
    margin-top: auto;
  }

  &__contact {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 14px;
    align-items: center;
    padding: 14px 16px;
    text-decoration: none;
    background: rgb(255 255 255 / 7%);
    border: 1px solid rgb(255 255 255 / 12%);
    border-radius: 12px;
    transition:
      background 0.25s ease,
      border-color 0.25s ease,
      transform 0.25s ease;

    &:hover {
      background: rgb(255 255 255 / 11%);
      border-color: rgb(255 210 10 / 38%);
      transform: translateX(5px);
    }
  }

  &__contact-icon {
    display: grid;
    place-items: center;
    width: 52px;
    height: 52px;
    color: $navy;
    background: $yellow;
    border-radius: 10px;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  &__contact-content {
    display: flex;
    flex-direction: column;

    strong {
      font-size: 16px;
    }
  }

  &__contact-label {
    margin-bottom: 2px;
    font-size: 10px;
    color: #9db1c5;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  &__contact-arrow {
    width: 21px;
    height: 21px;
    color: #7f96aa;
  }
}

.request-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 17px;
  padding: clamp(24px, 3vw, 38px);
  background: rgb(255 255 255 / 9%);
  border: 1px solid rgb(255 255 255 / 18%);
  border-radius: 16px;
  box-shadow: 0 28px 80px rgb(0 0 0 / 24%);
  backdrop-filter: blur(14px);

  &__field {
    display: flex;
    flex-direction: column;
    gap: 7px;
    font-size: 12px;
    font-weight: 600;

    &--wide {
      grid-column: 1/-1;
    }

    &--consent {
      flex-direction: row;
      align-items: center;
    }
  }

  &__required {
    font-weight: 900;
    color: $yellow;
  }

  &__policy-link {
    font-weight: 700;
    color: $yellow;
    text-underline-offset: 3px;
  }

  &__control {
    width: 100%;
    min-height: 47px;
    padding: 12px;
    font-size: 14px;
    color: $ink;
    resize: vertical;
    background: #fff;
    border: 1px solid rgb(0 41 79 / 18%);
    border-radius: 6px;

    &::placeholder {
      color: #7d8b98;
      opacity: 1;
    }

    &--textarea {
      min-height: 150px;
    }
  }

  &__submit {
    grid-column: 1/-1;
    min-height: 56px;

    :deep(svg) {
      width: 20px;
      height: 20px;
      transition: transform 0.2s ease;
    }

    &:hover :deep(svg) {
      transform: translate(3px, -3px);
    }
  }

  &__success {
    grid-column: 1/-1;
    padding: 40px;
    text-align: center;
  }

  &__success-title {
    font-size: 28px;
  }
}

@media (max-width: $tablet) {
  .request-section {
    &__grid {
      grid-template-columns: 1fr 1.15fr;
      gap: 35px;
    }

    &__title {
      font-size: 46px;
    }
  }
}

@media (max-width: $phone) {
  .request-section {
    background-image:
      linear-gradient(105deg, $navy 0%, rgba($navy, 0.97) 52%, rgba($navy, 0.76)),
      url('/images/contact-detail-premium-mobile.webp');

    &__grid {
      grid-template-columns: 1fr;
    }

    &__title {
      font-size: 42px;
    }
  }

  .request-form {
    grid-template-columns: 1fr;
    padding: 18px;

    &__field--wide,
    &__submit {
      grid-column: auto;
    }
  }
}
</style>
