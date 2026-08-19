<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{ error: NuxtError }>();

const statusCode = computed(() => Number(props.error?.statusCode || 500));
const isNotFound = computed(() => statusCode.value === 404);
const title = computed(() => (isNotFound.value ? 'Такой страницы нет' : 'Что-то пошло не так'));
const description = computed(() =>
  isNotFound.value
    ? 'Возможно, адрес изменился или страница была удалена. Вернитесь на главную или откройте каталог оборудования.'
    : 'Мы уже знаем о проблеме. Попробуйте обновить страницу или вернитесь на главную — ваши данные не потеряны.',
);

useSeoMeta({
  title: () => `${statusCode.value} — ${title.value} | АБАТЭК`,
  description: () => description.value,
  robots: 'noindex, nofollow',
});

const goHome = () => clearError({ redirect: '/' });
const goCatalog = () => clearError({ redirect: '/#catalog' });
const retry = () => window.location.reload();
</script>

<template>
  <main class="system-error">
    <div class="system-error__glow system-error__glow--one" />
    <div class="system-error__glow system-error__glow--two" />
    <div class="system-error__shell">
      <NuxtLink class="system-error__brand" to="/" aria-label="АБАТЭК — на главную">
        <AppLogo />
      </NuxtLink>

      <section class="system-error__card" :class="{ 'system-error__card--server': !isNotFound }">
        <div class="system-error__visual" aria-hidden="true">
          <span>{{ statusCode }}</span>
          <div class="system-error__orbit">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div class="system-error__content">
          <p class="system-error__eyebrow">Системная страница</p>
          <h1>{{ title }}</h1>
          <p class="system-error__description">{{ description }}</p>
          <div class="system-error__actions">
            <button type="button" class="system-error__primary" @click="goHome">На главную</button>
            <button v-if="isNotFound" type="button" class="system-error__secondary" @click="goCatalog">
              Открыть каталог
            </button>
            <button v-else type="button" class="system-error__secondary" @click="retry">Обновить страницу</button>
          </div>
          <p class="system-error__support">
            Нужна помощь?
            <a href="tel:+78005051915">8 (800) 505-19-15</a>
          </p>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped lang="scss">
.system-error {
  position: relative;
  display: grid;
  min-height: 100vh;
  overflow: hidden;
  color: #fff;
  background: linear-gradient(145deg, #041f38 0%, #07345d 58%, #0b4b80 100%);
}

.system-error__shell {
  position: relative;
  z-index: 1;
  width: min(1180px, calc(100% - 40px));
  padding-block: 34px 60px;
  margin-inline: auto;
}

.system-error__brand {
  display: inline-flex;
  width: 160px;
  color: #fff;
  filter: brightness(0) invert(1);
}

.system-error__card {
  display: grid;
  grid-template-columns: minmax(300px, 0.8fr) minmax(0, 1.2fr);
  min-height: 580px;
  margin-top: 48px;
  overflow: hidden;
  background: rgb(255 255 255 / 9%);
  border: 1px solid rgb(255 255 255 / 16%);
  border-radius: 30px;
  box-shadow: 0 35px 100px rgb(0 0 0 / 25%);
  backdrop-filter: blur(16px);
}

.system-error__visual {
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: linear-gradient(155deg, #ffd65c, #f5ad24);
}

.system-error__card--server .system-error__visual {
  background: linear-gradient(155deg, #ff896d, #e24e44);
}

.system-error__visual > span {
  position: relative;
  z-index: 2;
  font-size: clamp(90px, 14vw, 190px);
  font-weight: 950;
  line-height: 1;
  color: #062b4c;
  letter-spacing: -0.09em;
  text-shadow: 0 12px 35px rgb(255 255 255 / 24%);
}

.system-error__orbit {
  position: absolute;
  width: 330px;
  height: 330px;
  border: 1px solid rgb(6 43 76 / 25%);
  border-radius: 50%;
  animation: error-orbit 16s linear infinite;
}

.system-error__orbit::before,
.system-error__orbit::after {
  position: absolute;
  inset: 38px;
  content: '';
  border: 1px solid rgb(6 43 76 / 18%);
  border-radius: 50%;
}

.system-error__orbit::after {
  inset: 80px;
}

.system-error__orbit i {
  position: absolute;
  width: 13px;
  height: 13px;
  background: #062b4c;
  border-radius: 50%;
}

.system-error__orbit i:nth-child(1) {
  top: 25px;
  left: 80px;
}

.system-error__orbit i:nth-child(2) {
  right: 2px;
  bottom: 115px;
}

.system-error__orbit i:nth-child(3) {
  bottom: 15px;
  left: 92px;
}

.system-error__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(38px, 7vw, 90px);
}

.system-error__eyebrow {
  margin: 0 0 17px;
  font-size: 11px;
  font-weight: 900;
  color: #ffd65c;
  text-transform: uppercase;
  letter-spacing: 0.18em;
}

.system-error h1 {
  max-width: 620px;
  margin: 0;
  font-size: clamp(42px, 6vw, 78px);
  line-height: 0.98;
  letter-spacing: -0.055em;
}

.system-error__description {
  max-width: 620px;
  margin: 25px 0 0;
  font-size: 17px;
  line-height: 1.7;
  color: rgb(255 255 255 / 72%);
}

.system-error__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
}

.system-error__actions button {
  min-height: 56px;
  padding-inline: 27px;
  font-size: 16px;
  font-weight: 850;
  cursor: pointer;
  border-radius: 8px;
  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.system-error__actions button:hover {
  transform: translateY(-2px);
}

.system-error__primary {
  color: #062b4c;
  background: #ffd65c;
  border: 1px solid #ffd65c;
}

.system-error__secondary {
  color: #fff;
  background: transparent;
  border: 1px solid rgb(255 255 255 / 35%);
}

.system-error__support {
  margin: 38px 0 0;
  font-size: 13px;
  color: rgb(255 255 255 / 55%);
}

.system-error__support a {
  font-weight: 800;
  color: #fff;
}

.system-error__glow {
  position: absolute;
  width: 450px;
  height: 450px;
  background: #1684d2;
  border-radius: 50%;
  opacity: 0.16;
  filter: blur(80px);
}

.system-error__glow--one {
  top: -220px;
  right: -100px;
}

.system-error__glow--two {
  bottom: -300px;
  left: -130px;
}

@keyframes error-orbit {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .system-error__orbit {
    animation: none;
  }
}

@media (width <= $tablet) {
  .system-error__card {
    grid-template-columns: 1fr;
  }

  .system-error__visual {
    min-height: 260px;
  }
}

@media (width <= $phone) {
  .system-error__shell {
    width: min(100% - 24px, 1180px);
    padding-top: 24px;
  }

  .system-error__card {
    margin-top: 28px;
    border-radius: 20px;
  }

  .system-error__content {
    padding: 34px 24px 42px;
  }

  .system-error__actions {
    flex-direction: column;
  }

  .system-error__actions button {
    width: 100%;
  }
}
</style>
