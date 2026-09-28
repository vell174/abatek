<script setup lang="ts">
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
</script>

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
              <small class="request-section__contact-label">Telegramm, MAX</small>
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
          <div class="request-section__contact request-section__contact--email">
            <a class="request-section__email-link" :href="`mailto:${email}`">
              <span class="request-section__contact-icon">
                <Icon name="lucide:mail" aria-hidden="true" mode="svg" />
              </span>
              <span class="request-section__contact-content">
                <small class="request-section__contact-label">Напишите на почту</small>
                <strong>{{ email }}</strong>
              </span>
            </a>
            <button class="request-section__email-copy" type="button" @click="copyEmail">
              {{ isEmailCopied ? '(скопировано)' : '(копировать)' }}
            </button>
          </div>
        </div>
      </div>
      <RequestForm compact />
    </div>
  </section>
</template>

<style scoped lang="scss">
.request-section {
  position: relative;
  padding-block: clamp(40px, 4.5vw, 60px);
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
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: clamp(28px, 4vw, 56px);
    align-items: start;
  }

  &__content {
    display: flex;
    flex-direction: column;
    max-width: 560px;
    height: 100%;
  }

  &__eyebrow {
    margin: 0 0 12px;
    font-size: 11px;
    font-weight: 900;
    color: $yellow;
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }

  &__title {
    margin: 0;
    font-size: clamp(32px, 3.5vw, 46px);
    line-height: 1.03;
    letter-spacing: -0.05em;
  }

  &__text {
    max-width: 520px;
    margin: 16px 0 0;
    font-size: 15px;
    line-height: 1.6;
    color: #c2d1df;
  }

  &__contacts {
    display: grid;
    gap: 8px;
    padding-top: 22px;
  }

  &__contact {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 10px;
    align-items: center;
    padding: 10px 12px;
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

    &--email {
      grid-template-columns: 1fr auto;
    }
  }

  &__email-link {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px;
    align-items: center;
    text-decoration: none;
  }

  &__email-copy {
    padding: 0;
    font-size: 12px;
    font-weight: 600;
    color: #9db1c5;
    cursor: pointer;
    background: transparent;
    border: 0;

    &:hover,
    &:focus-visible {
      color: #fff;
    }
  }

  &__contact-icon {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    color: $navy;
    background: $yellow;
    border-radius: 10px;

    svg {
      width: 20px;
      height: 20px;
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

@media (max-width: $tablet) {
  .request-section {
    &__grid {
      grid-template-columns: 1fr 1.15fr;
      gap: 24px;
    }

    &__title {
      font-size: 36px;
    }

    &__contact--email {
      grid-template-columns: 1fr;
      gap: 6px;
    }

    &__email-copy {
      justify-self: start;
      margin-left: 50px;
    }
  }
}

@media (max-width: $phone) {
  .request-section {
    padding-block: 32px;
    background-image:
      linear-gradient(105deg, $navy 0%, rgba($navy, 0.97) 52%, rgba($navy, 0.76)),
      url('/images/contact-detail-premium-mobile.webp');

    &__grid {
      grid-template-columns: 1fr;
      gap: 24px;
    }

    &__title {
      font-size: 32px;
    }
  }
}
</style>
