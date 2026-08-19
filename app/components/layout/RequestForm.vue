<script setup lang="ts">
const route = useRoute();
const sent = ref(false);
const sending = ref(false);
const failed = ref(false);

// Маски телефонов стран СНГ; страна определяется по введённому коду.
// Без «+» в начале считаем номер российским/казахстанским.
const cisPhoneMasks: Record<string, string> = {
  '375': '+375 (##) ###-##-##', // Беларусь
  '374': '+374 (##) ###-###', // Армения
  '373': '+373 (##) ###-###', // Молдова
  '992': '+992 (##) ###-##-##', // Таджикистан
  '993': '+993 (##) ##-##-##', // Туркменистан
  '994': '+994 (##) ###-##-##', // Азербайджан
  '996': '+996 (###) ###-###', // Киргизия
  '998': '+998 (##) ###-##-##', // Узбекистан
  '7': '+7 (###) ###-##-##', // Россия, Казахстан
};

function phoneMask(value: string): string {
  const compact = value.replace(/[^\d+]/g, '');
  if (!compact.startsWith('+')) return cisPhoneMasks['7'];
  const digits = compact.slice(1);
  for (const code of Object.keys(cisPhoneMasks)) {
    if (digits.startsWith(code)) return cisPhoneMasks[code];
  }
  // Код страны ещё не набран целиком — не навязываем формат
  return '+###############';
}

async function submitRequest(event: Event) {
  if (sending.value) return;
  const form = event.target as HTMLFormElement;
  const data = new FormData(form);
  sending.value = true;
  failed.value = false;
  try {
    await $fetch('/api/request', {
      method: 'POST',
      body: {
        name: data.get('name'),
        phone: data.get('phone'),
        email: data.get('email'),
        message: data.get('message'),
        page: route.fullPath,
      },
    });
    sent.value = true;
  } catch {
    failed.value = true;
  } finally {
    sending.value = false;
  }
}
</script>

<template>
  <form class="request-form" @submit.prevent="submitRequest">
    <template v-if="!sent">
      <label class="request-form__field">
        <span>
          Ваше имя
          <span class="request-form__required" aria-hidden="true">*</span>
        </span>
        <UiInput name="name" autocomplete="name" placeholder="Например, Александр" required />
      </label>
      <label class="request-form__field">
        <span>
          Телефон
          <span class="request-form__required" aria-hidden="true">*</span>
        </span>
        <UiInput
          name="phone"
          type="tel"
          autocomplete="tel"
          placeholder="+7 (___) ___-__-__"
          :mask="phoneMask"
          required
        />
      </label>
      <label class="request-form__field request-form__field--wide">
        <span>
          E-mail
          <span class="request-form__optional">необязательно</span>
        </span>
        <UiInput name="email" type="email" autocomplete="email" placeholder="mail@example.ru" />
      </label>
      <label class="request-form__field request-form__field--wide">
        Кратко о задаче
        <textarea
          class="request-form__control request-form__control--textarea"
          name="message"
          rows="6"
          placeholder="Опишите оборудование, производительность, условия эксплуатации и другие детали"
        />
      </label>
      <UiCheckbox
        class="request-form__field request-form__field--consent request-form__field--wide"
        name="consent"
        required
      >
        Согласен на
        <LegalPopup kind="personal-data" />
      </UiCheckbox>
      <UiCheckbox
        class="request-form__field request-form__field--consent request-form__field--wide"
        name="privacy"
        required
      >
        Принимаю
        <LegalPopup kind="privacy" />
      </UiCheckbox>
      <UiButton class="request-form__submit" type="submit" size="large" rounded="pill" :disabled="sending">
        <span>{{ sending ? 'Отправляем…' : 'Отправить заявку' }}</span>
        <Icon name="lucide:send" aria-hidden="true" mode="svg" />
      </UiButton>
      <p v-if="failed" class="request-form__error" role="alert">
        Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.
      </p>
    </template>
    <div v-else class="request-form__success" role="status" aria-live="polite">
      <div class="request-form__success-icon" aria-hidden="true">
        <svg class="request-form__success-svg" viewBox="0 0 52 52">
          <circle class="request-form__success-circle" cx="26" cy="26" r="24" />
          <path class="request-form__success-check" d="M15 27l8 8 15-16" />
        </svg>
      </div>
      <strong class="request-form__success-title">Заявка принята</strong>
      <p class="request-form__success-text">Спасибо! Мы свяжемся с вами.</p>
    </div>
  </form>
</template>

<style scoped lang="scss">
.request-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 17px;
  padding: clamp(24px, 3vw, 38px);
  color: #fff;
  background: rgb(255 255 255 / 9%);
  border: 1px solid rgb(255 255 255 / 18%);
  border-radius: 16px;
  box-shadow: 0 28px 80px rgb(0 0 0 / 24%);
  backdrop-filter: blur(14px);

  &__field {
    display: flex;
    flex-direction: column;
    gap: 9px;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.35;
    color: #fff;

    &--wide {
      grid-column: 1/-1;
    }

    &--consent {
      flex-direction: row;
      align-items: center;
    }
  }

  &__required,
  &__policy-link {
    font-weight: 800;
    color: $yellow;
  }

  &__optional {
    margin-left: 5px;
    font-size: 11px;
    font-weight: 500;
    color: rgb(255 255 255 / 68%);
  }

  &__policy-link {
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
  }

  &__error {
    grid-column: 1/-1;
    font-size: 13px;
    font-weight: 600;
    color: $yellow;
  }

  &__success {
    position: relative;
    display: grid;
    grid-column: 1/-1;
    gap: 10px;
    place-content: center;
    justify-items: center;
    min-height: 100%;
    padding: clamp(48px, 7vw, 76px) 32px;
    overflow: hidden;
    text-align: center;
    background: radial-gradient(circle at 50% 22%, rgba($green, 0.2), transparent 38%), rgb(255 255 255 / 5%);
    border: 1px solid rgb(255 255 255 / 12%);
    border-radius: 14px;
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 12%);

    &::before,
    &::after {
      position: absolute;
      pointer-events: none;
      content: '';
      border: 1px solid rgba($green, 0.16);
      border-radius: 50%;
    }

    &::before {
      top: -145px;
      width: 290px;
      height: 290px;
    }

    &::after {
      top: -105px;
      width: 210px;
      height: 210px;
    }
  }

  &__success-icon {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    width: 108px;
    height: 108px;
    margin-bottom: 12px;
    background: linear-gradient(145deg, rgb(255 255 255 / 14%), rgb(255 255 255 / 5%));
    border: 1px solid rgba($green, 0.42);
    border-radius: 50%;
    box-shadow:
      0 18px 50px rgba($green, 0.22),
      inset 0 0 26px rgba($green, 0.12);
    animation: request-success-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }

  &__success-svg {
    width: 72px;
    height: 72px;
    overflow: visible;
    fill: none;
  }

  &__success-circle {
    stroke: rgba($green, 0.35);
    stroke-width: 2;
    stroke-dasharray: 151;
    stroke-dashoffset: 151;
    transform: rotate(-90deg);
    transform-origin: center;
    animation: request-success-draw 0.7s ease-out 0.15s forwards;
  }

  &__success-check {
    stroke: $green;
    stroke-width: 4;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 60;
    stroke-dashoffset: 60;
    animation: request-success-draw 0.45s ease-out 0.65s forwards;
  }

  &__success-title {
    position: relative;
    z-index: 1;
    font-size: clamp(28px, 3vw, 36px);
    line-height: 1.1;
    color: #fff;
    letter-spacing: -0.035em;
    animation: request-success-rise 0.5s ease-out 0.35s both;
  }

  &__success-text {
    position: relative;
    z-index: 1;
    margin: 0;
    font-size: 15px;
    line-height: 1.6;
    color: rgb(255 255 255 / 72%);
    animation: request-success-rise 0.5s ease-out 0.5s both;
  }
}

@keyframes request-success-pop {
  from {
    opacity: 0;
    transform: scale(0.4);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes request-success-draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes request-success-rise {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .request-form {
    &__success-icon,
    &__success-circle,
    &__success-check,
    &__success-title,
    &__success-text {
      animation-duration: 0.01s;
      animation-delay: 0s;
    }
  }
}

@media (max-width: $phone) {
  .request-form {
    grid-template-columns: 1fr;
    padding: 18px;

    &__field--wide,
    &__submit {
      grid-column: auto;
    }

    &__success {
      padding: 46px 20px;
    }

    &__success-icon {
      width: 96px;
      height: 96px;
    }
  }
}
</style>
