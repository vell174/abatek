<script setup lang="ts">
import { Primitive } from 'reka-ui';

type CookieConsent = 'all' | 'necessary';

const isVisible = ref(false);
const consentCookie = useCookie<CookieConsent | null>('abatek_cookie_consent', {
  default: () => null,
  maxAge: 60 * 60 * 24 * 365,
  sameSite: 'lax',
});

onMounted(() => {
  isVisible.value = consentCookie.value === null;
});

function saveConsent(value: CookieConsent) {
  consentCookie.value = value;
  isVisible.value = false;
}
</script>

<template>
  <Transition name="cookie-banner">
    <Primitive v-if="isVisible" as="section" class="cookie-banner" aria-label="Настройки файлов cookie">
      <div class="cookie-banner__content">
        <strong class="cookie-banner__title">Мы используем cookie</strong>
        <p class="cookie-banner__text">
          Необходимые cookie помогают сайту работать. Дополнительные cookie можно разрешить для улучшения сайта.
          Подробнее — в
          <NuxtLink class="cookie-banner__link" to="/politika-fajlov-kuki">политике cookie</NuxtLink>
          .
        </p>
      </div>
      <div class="cookie-banner__actions">
        <UiButton variant="secondary" @click="saveConsent('necessary')">Только необходимые</UiButton>
        <UiButton @click="saveConsent('all')">Принять все</UiButton>
      </div>
    </Primitive>
  </Transition>
</template>

<style scoped lang="scss">
.cookie-banner {
  position: fixed;
  right: 24px;
  bottom: 24px;
  left: 24px;
  z-index: 50;
  display: flex;
  gap: 30px;
  align-items: center;
  justify-content: space-between;
  width: min(1120px, calc(100% - 48px));
  padding: 22px 24px;
  margin-inline: auto;
  color: #fff;
  background: rgb(0 29 57 / 97%);
  border: 1px solid rgb(255 255 255 / 16%);
  border-radius: 14px;
  box-shadow: 0 20px 70px rgb(0 0 0 / 28%);
  backdrop-filter: blur(16px);

  &__content {
    max-width: 680px;
  }

  &__title {
    display: block;
    margin-bottom: 5px;
    font-size: 17px;
  }

  &__text {
    margin: 0;
    font-size: 13px;
    line-height: 1.6;
    color: #c2d1df;
  }

  &__link {
    font-weight: 700;
    color: $yellow;
  }

  &__actions {
    display: flex;
    flex: 0 0 auto;
    gap: 10px;
  }
}

.cookie-banner-enter-active,
.cookie-banner-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.cookie-banner-enter-from,
.cookie-banner-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: $phone) {
  .cookie-banner {
    right: 14px;
    bottom: 14px;
    left: 14px;
    flex-direction: column;
    gap: 18px;
    align-items: stretch;
    width: auto;
    padding: 20px;

    &__actions {
      display: grid;
    }
  }
}
</style>
