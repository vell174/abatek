<script setup lang="ts">
import { seo } from '~/data/pages/o-kompanii/seo';
import { companyFaq } from '~/data/pages/_shared/faq';

usePageSeo(seo);

const isProjectRequestOpen = useState('project-request-open', () => false);

const facts: Array<[string, string]> = [
  ['Полный цикл', 'от задачи до поставки'],
  ['По вашему ТЗ', 'индивидуальная конструкция'],
  ['Россия и СНГ', 'организация доставки'],
  ['Контроль', 'на каждом этапе проекта'],
];

const advantages = [
  {
    icon: 'lucide:drafting-compass',
    title: 'Инженерный расчёт',
    text: 'Изучаем условия эксплуатации, параметры груза и требования к производительности.',
  },
  {
    icon: 'lucide:file-check-2',
    title: 'Согласование документации',
    text: 'До запуска в производство предоставляем чертежи общего вида на согласование.',
  },
  {
    icon: 'lucide:factory',
    title: 'Собственное изготовление',
    text: 'Контролируем ключевые этапы производства и соответствие оборудования проекту.',
  },
  {
    icon: 'lucide:truck',
    title: 'Организация поставки',
    text: 'Подготавливаем оборудование к отгрузке и организуем доставку до склада заказчика.',
  },
];
</script>

<template>
  <div class="about-page">
    <section class="about-hero">
      <img
        class="about-hero__image"
        src="/images/about-production-hero-2026.webp"
        alt="Производство конвейерного оборудования АБАТЭК"
        width="1672"
        height="939"
      />
      <span class="about-hero__overlay" aria-hidden="true" />
      <div class="site-container about-hero__inner">
        <p class="about-hero__eyebrow">
          <span />
          О компании АБАТЭК
        </p>
        <h1 class="about-hero__title">Инженерные решения, которые работают на производстве</h1>
        <p class="about-hero__text">
          Проектируем и изготавливаем конвейерное оборудование под условия конкретного предприятия — от обсуждения
          задачи до поставки готовой конструкции.
        </p>
        <div class="about-hero__actions">
          <NuxtLink class="about-hero__button" to="/#catalog">Смотреть оборудование</NuxtLink>
          <NuxtLink class="about-hero__link" to="/kontakty">
            Обсудить проект
            <Icon name="lucide:arrow-up-right" aria-hidden="true" mode="svg" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <ProductIntroSection_02
      eyebrow="Наш подход"
      title="Начинаем не с оборудования, а с вашей производственной задачи"
      image="/images/about-production-hero-2026.webp"
      image-alt="Производство конвейерного оборудования АБАТЭК"
      button-label="Обсудить проект"
      label="Инженерное производство АБАТЭК"
      @action="isProjectRequestOpen = true"
    >
      <p>
        Универсального конвейера для всех предприятий не существует. На конструкцию влияют свойства груза,
        производительность, длина трассы, угол подъёма, среда эксплуатации и требования к обслуживанию.
      </p>
      <p>
        Поэтому специалисты АБАТЭК сначала собирают исходные данные, затем готовят техническое решение и только после
        согласования документации передают проект в производство.
      </p>
    </ProductIntroSection_02>

    <ProductFactsSection_03 :facts="facts" />

    <section class="company-advantages">
      <div class="site-container">
        <div class="company-advantages__heading">
          <div>
            <p>Почему АБАТЭК</p>
            <h2>Ответственность на каждом этапе</h2>
          </div>
          <span class="company-advantages__caption">
            Инженерный подход, который превращает задачу в рабочее решение
          </span>
        </div>
        <div class="company-advantages__grid">
          <article v-for="advantage in advantages" :key="advantage.title" class="company-advantages__card">
            <span class="company-advantages__icon"><Icon :name="advantage.icon" aria-hidden="true" mode="svg" /></span>
            <div class="company-advantages__card-body">
              <h3>{{ advantage.title }}</h3>
              <p>{{ advantage.text }}</p>
              <span class="company-advantages__line" aria-hidden="true" />
            </div>
          </article>
        </div>
      </div>
    </section>

    <ContactWorkflow />

    <section class="site-container company-banner">
      <div>
        <p class="company-banner__eyebrow">Есть техническое задание?</p>
        <h2>Подготовим решение для вашей производственной линии</h2>
      </div>
      <NuxtLink class="company-banner__button" to="/kontakty">
        Отправить запрос
        <Icon name="lucide:send" aria-hidden="true" mode="svg" />
      </NuxtLink>
    </section>

    <FaqSection_last_01
      :items="companyFaq"
      title="Важное перед началом проекта"
      title-id="company-faq-title"
      tone="white"
    />
  </div>
</template>

<style scoped lang="scss">
.about-hero {
  position: relative;
  min-height: min(790px, calc(100vh - 90px));
  overflow: hidden;
  color: #fff;
  background: $navy;

  &__image,
  &__overlay {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  &__image {
    object-fit: cover;
    animation: hero-reveal 1s ease-out both;
  }

  &__overlay {
    background: linear-gradient(90deg, rgb(2 14 28 / 96%) 0%, rgb(2 14 28 / 84%) 42%, rgb(2 14 28 / 20%) 76%);
  }

  &__inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 650px;
    padding-block: 80px 150px;
  }

  &__eyebrow {
    display: flex;
    gap: 10px;
    align-items: center;
    margin: 0 0 22px;
    font-size: 12px;
    font-weight: 850;
    color: $yellow;
    text-transform: uppercase;
    letter-spacing: 0.16em;

    span {
      width: 32px;
      height: 2px;
      background: $yellow;
    }
  }

  &__title {
    max-width: 880px;
    margin: 0;
    font-size: clamp(50px, 6.2vw, 88px);
    line-height: 0.98;
    letter-spacing: -0.06em;
  }

  &__text {
    max-width: 680px;
    margin: 28px 0 0;
    font-size: clamp(16px, 1.5vw, 20px);
    line-height: 1.65;
    color: #c9d7e5;
  }

  &__actions {
    display: flex;
    gap: 26px;
    align-items: center;
    margin-top: 38px;
  }

  &__button,
  &__link {
    font-weight: 800;
    text-decoration: none;
  }

  &__button {
    padding: 16px 25px;
    color: $navy;
    background: $yellow;
    border-radius: 8px;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-3px);
    }
  }

  &__link {
    display: flex;
    gap: 8px;
    align-items: center;

    svg {
      width: 19px;
      height: 19px;
    }
  }

  &__facts {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: rgb(3 22 43 / 74%);
    border-top: 1px solid rgb(255 255 255 / 15%);
    backdrop-filter: blur(14px);

    div {
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding: 26px 34px;
      border-right: 1px solid rgb(255 255 255 / 13%);
    }

    strong {
      font-size: 17px;
      color: $yellow;
    }

    span {
      font-size: 12px;
      color: #aebfd0;
    }
  }
}

.company-intro {
  display: grid;
  grid-template-columns: 1fr 0.85fr;
  gap: clamp(50px, 8vw, 120px);
  align-items: start;

  &__eyebrow,
  .company-advantages__heading p,
  .company-process__heading p {
    margin: 0 0 14px;
    font-size: 11px;
    font-weight: 900;
    color: $blue;
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }

  h2 {
    margin: 0;
    font-size: clamp(38px, 5vw, 62px);
    line-height: 1.05;
    letter-spacing: -0.05em;
  }

  &__copy {
    font-size: 16px;
    line-height: 1.75;
    color: $muted;

    p:first-child {
      margin-top: 0;
    }

    a {
      display: inline-block;
      margin-top: 12px;
      font-weight: 850;
      color: $blue;
      text-decoration: none;
    }
  }
}

.company-advantages {
  position: relative;
  padding-block: 92px;
  margin-block: 0;
  color: #fff;
  background:
    linear-gradient(135deg, rgb(2 14 28 / 99%), rgb(0 41 79 / 96%)),
    url('/images/contact-detail-premium.webp') center / cover;
  border-top: 1px solid rgb(255 210 10 / 24%);

  &__heading {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 50px;
    align-items: end;
    justify-content: space-between;
    margin-bottom: 52px;

    p {
      color: $yellow;
    }

    h2 {
      max-width: 720px;
      margin: 0;
      font-size: clamp(38px, 4.5vw, 58px);
      line-height: 1.05;
      letter-spacing: -0.05em;
    }
  }

  &__caption {
    max-width: 285px;
    padding-bottom: 5px;
    font-size: 14px;
    line-height: 1.55;
    color: #aebfd0;
  }

  &__grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  &__card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 330px;
    padding: 28px;
    overflow: hidden;
    background: linear-gradient(150deg, rgb(255 255 255 / 11%), rgb(255 255 255 / 4%));
    border: 1px solid rgb(255 255 255 / 17%);
    border-radius: 6px;
    transition:
      background 0.25s ease,
      transform 0.25s ease,
      border-color 0.25s ease;

    &:hover {
      background: rgb(255 255 255 / 10%);
      border-color: rgb(255 210 10 / 50%);
      transform: translateY(-6px);
    }

    &-body {
      margin-top: auto;
    }

    h3 {
      margin: 70px 0 12px;
      font-size: 21px;
    }

    p {
      margin: 0;
      font-size: 14px;
      line-height: 1.65;
      color: #aebfd0;
    }
  }

  &__icon {
    display: grid;
    place-items: center;
    width: 58px;
    height: 58px;
    color: $navy;
    background: $yellow;
    border-radius: 14px;

    svg {
      width: 29px;
      height: 29px;
    }
  }

  &__line {
    display: block;
    width: 100%;
    height: 2px;
    margin-top: 14px;
    background: linear-gradient(90deg, $yellow 0 24%, rgb(255 255 255 / 12%) 24%);
  }
}

.company-process {
  &__heading {
    display: grid;
    grid-template-columns: 0.45fr 1fr;
    gap: 40px;
    align-items: end;
    margin-bottom: 46px;

    p {
      margin: 0;
      font-size: 11px;
      font-weight: 900;
      color: $blue;
      text-transform: uppercase;
      letter-spacing: 0.16em;
    }

    h2 {
      margin: 0;
      font-size: clamp(38px, 5vw, 60px);
      line-height: 1.05;
      letter-spacing: -0.05em;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    padding: 0;
    margin: 0;
    list-style: none;
    border-top: 1px solid $line;
  }

  &__item {
    position: relative;
    min-height: 280px;
    padding: 28px 24px;
    border-right: 1px solid $line;

    h3 {
      margin: 70px 0 10px;
      font-size: 20px;
    }

    p {
      margin: 0;
      font-size: 13px;
      line-height: 1.6;
      color: $muted;
    }
  }

  &__number {
    font-size: 13px;
    font-weight: 900;
    color: $blue;
  }

  &__icon {
    position: absolute;
    top: 25px;
    right: 22px;
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    color: $blue;
    background: $soft;
    border-radius: 50%;
  }
}

.company-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: clamp(34px, 5vw, 64px);
  margin-bottom: 40px;
  color: #fff;
  background: linear-gradient(120deg, $blue, $navy);
  border-radius: 22px;
  box-shadow: 0 24px 70px rgb(3 35 68 / 18%);

  &__eyebrow {
    margin: 0 0 10px;
    font-size: 11px;
    font-weight: 900;
    color: $yellow;
    text-transform: uppercase;
    letter-spacing: 0.15em;
  }

  h2 {
    max-width: 780px;
    margin: 0;
    font-size: clamp(30px, 4vw, 48px);
    line-height: 1.08;
    letter-spacing: -0.045em;
  }

  &__button {
    display: flex;
    flex-shrink: 0;
    gap: 10px;
    align-items: center;
    padding: 16px 22px;
    margin-left: 40px;
    font-weight: 850;
    color: $navy;
    text-decoration: none;
    background: $yellow;
    border-radius: 9px;
  }
}

@keyframes hero-reveal {
  from {
    opacity: 0;
    transform: scale(1.03);
  }
}

@media (max-width: $tablet) {
  .company-advantages__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .company-process__list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: $phone) {
  .about-hero {
    min-height: 760px;

    &__overlay {
      background: linear-gradient(90deg, rgb(2 14 28 / 96%), rgb(2 14 28 / 65%));
    }

    &__inner {
      min-height: 600px;
      padding-bottom: 190px;
    }

    &__title {
      font-size: 48px;
    }

    &__facts {
      grid-template-columns: 1fr;

      div {
        padding: 12px 20px;
      }
    }
  }

  .company-intro,
  .company-process__heading {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .company-advantages {
    &__heading {
      flex-direction: column;
      align-items: flex-start;
    }

    &__grid {
      grid-template-columns: 1fr;
    }

    &__card {
      min-height: 280px;
    }
  }

  .company-process__list {
    grid-template-columns: 1fr;
  }

  .company-process__item {
    min-height: 220px;
    border-bottom: 1px solid $line;
  }

  .company-banner {
    flex-direction: column;
    gap: 28px;
    align-items: flex-start;

    &__button {
      margin-left: 0;
    }
  }
}
</style>
