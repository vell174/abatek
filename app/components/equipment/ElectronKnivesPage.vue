<script setup lang="ts">
import { catalog } from '~/data/pages/elektronoji-dlya-rezki-konveyernih-lent-tehnicheskih-plastin/data-catalog';
import { electronKnivesFaq } from '~/data/pages/elektronoji-dlya-rezki-konveyernih-lent-tehnicheskih-plastin/data';

const isProjectRequestOpen = useState('project-request-open', () => false);

const facts: Array<[string, string]> = [
  ['до 25 мм', 'толщина разрезаемого материала'],
  ['200 мм', 'диаметр режущего диска'],
  ['9 кг', 'масса электроножа'],
  ['2 исполнения', 'проводное и аккумуляторное'],
];

const materials = [
  {
    title: 'Конвейерные ленты',
    text: 'Резинотканевые, полиуретановые и ПВХ-ленты, а также полиэфирные сетки. Подходит для продольного и поперечного раскроя без разлохмачивания слоёв и оплавления кромки.',
  },
  {
    title: 'Технические пластины',
    text: 'Текстолит, стеклотекстолит, гетинакс, фторопласт (PTFE), полиамид (капролон), полиацеталь, полипропилен и оргстекло. В зависимости от модели возможен раскрой листов толщиной от 0,5 до 20 мм и более.',
  },
  {
    title: 'Резинотехнические изделия',
    text: 'Листовая резина, эластомеры и силиконы. Инструмент не растягивает материал и помогает получать заготовки с точной геометрией.',
  },
  {
    title: 'Ткани и композиты',
    text: 'Стеклоткань, углеткань, кевлар и арамидные материалы для производственных и ремонтных задач.',
  },
];

const applications = [
  'Подготовка ровного стыка конвейерной ленты перед горячей или холодной вулканизацией.',
  'Раскрой уплотнений, прокладок, скребков и направляющих из резины и технических пластин.',
  'Продольная и поперечная резка полотна при производстве конвейерных систем.',
  'Универсальный раскрой материалов в ремонтных мастерских и сервисных центрах.',
];

const users = [
  'Сервисные бригады, выполняющие стыковку и ремонт конвейерных лент.',
  'Предприятия и склады, занимающиеся продажей конвейерной ленты.',
  'Службы предприятий, которые самостоятельно стыкуют ленты и футеруют оборудование листовыми материалами.',
];
</script>

<template>
  <div class="knife-page">
    <ProductIntroSection_02
      eyebrow="Профессиональный раскрой материалов"
      title="Электроножи для точной и быстрой резки"
      image="/images/52715351.webp"
      image-alt="Аккумуляторный дисковой электронож АБАТЭК для резки конвейерных лент"
      button-label="Получить консультацию"
      label="Собственное производство"
      label-icon="lucide:factory"
      @action="isProjectRequestOpen = true"
    >
      <template #breadcrumbs>
        <BreadcrumbsNavigation
          :items="[{ label: 'Главная', to: '/' }, { label: 'Каталог', to: '/#catalog' }, { label: 'Электроножи' }]"
        />
      </template>
      <p>
        Электроножи предназначены для аккуратного раскроя конвейерных лент, технических пластин, резинотканевых и
        полимерных полотен. Оборудование подходит для постоянной промышленной эксплуатации, сервисных работ и подготовки
        лент к стыковке.
      </p>
      <p>
        Компания «АБАТЭК» предлагает оборудование, расходные материалы и поддержку для электроножевой резки, позволяющие
        получать стабильный результат при производственных нагрузках.
      </p>
      <p>
        Инструмент помогает вести рез по заданной линии и снижает риск повреждения дорогостоящей ленты. Доступны
        проводное и аккумуляторное исполнения, а также сменные режущие диски.
      </p>
    </ProductIntroSection_02>

    <ProductFactsSection_03 :facts="facts" />

    <section class="knife-page__catalog">
      <div class="site-container">
        <p class="knife-page__eyebrow">Производимые модели</p>
        <h2 class="knife-page__section-title">Проводные и аккумуляторные электроножи</h2>
        <div class="knife-page__product-list">
          <article v-for="product in catalog" :key="product.name" class="knife-page__product">
            <div class="knife-page__product-media">
              <img :src="product.image" :alt="product.alt" width="900" height="700" />
            </div>
            <div class="knife-page__product-content">
              <p class="knife-page__price">Цена по запросу</p>
              <h3>{{ product.name }}</h3>
              <dl class="knife-page__specs">
                <div v-for="spec in product.specs" :key="spec[0]" class="knife-page__spec">
                  <dt>{{ spec[0] }}</dt>
                  <dd>{{ spec[1] }}</dd>
                </div>
              </dl>
              <button class="knife-page__button" type="button" @click="isProjectRequestOpen = true">Заказать</button>
            </div>
          </article>
        </div>

        <article class="knife-page__blade">
          <div class="knife-page__blade-media">
            <img src="/images/26552451.webp" alt="Дисковой нож АРН-200-32-2" width="800" height="600" />
          </div>
          <div>
            <p class="knife-page__price">Расходный материал · цена по запросу</p>
            <h3>Нож дисковой АРН-200-32-2</h3>
            <p>
              Диск изготавливается из нержавеющей инструментальной стали и проходит криогенную термическую обработку,
              которая увеличивает срок службы режущей кромки.
            </p>
            <p>
              При интенсивной ежедневной работе рекомендуется проверять заточку и ориентировочно раз в два месяца
              затачивать либо менять диск. Работа затупленным ножом повышает нагрузку и может привести к нагреву и
              повреждению привода.
            </p>
            <button class="knife-page__button" type="button" @click="isProjectRequestOpen = true">Заказать диск</button>
          </div>
        </article>
      </div>
    </section>

    <section class="content-section site-container knife-page__details">
      <article class="knife-page__article">
        <p class="knife-page__eyebrow">Назначение</p>
        <h2 class="knife-page__section-title">Кому подходит оборудование</h2>
        <p>
          Электронож ДР20 предназначен для быстрой и безопасной продольной и поперечной резки конвейерной ленты.
          Инструмент помогает провести рез по заданной линии и не испортить дорогостоящий материал.
        </p>
        <ul class="knife-page__list">
          <li v-for="user in users" :key="user">{{ user }}</li>
        </ul>
      </article>
      <article class="knife-page__article">
        <p class="knife-page__eyebrow">Принцип работы</p>
        <h2 class="knife-page__section-title">Как работает электронож</h2>
        <p>
          Привод сообщает режущему элементу движение, благодаря которому инструмент проходит через вязкие, многослойные
          и упругие материалы с меньшим усилием. Материал разделяется без сильной деформации и перегрева кромки. В
          зависимости от задачи применяются прямые, сегментные или дисковые лезвия.
        </p>
        <p>
          В отличие от обычного механического ножа лезвие не только давит на материал и раздвигает его структуру, но
          аккуратно разделяет слои. Это особенно важно при работе с вязкими, упругими и многослойными полотнами.
        </p>
      </article>
    </section>

    <section class="knife-page__video-band">
      <div class="site-container knife-page__video-section">
        <div class="knife-page__video">
          <iframe
            src="https://rutube.ru/play/embed/75093ff18792eab437373d6fbebd8df8/?from=partner"
            title="Электронож для резки конвейерных лент"
            loading="lazy"
            allow="autoplay; encrypted-media; fullscreen; screen-wake-lock; accelerometer; clipboard-write"
            allowfullscreen
          />
        </div>
        <div>
          <p class="knife-page__eyebrow">Электронож в работе</p>
          <h2 class="knife-page__section-title">Резка конвейерной ленты</h2>
          <p>Демонстрация работы оборудования на производственном материале.</p>
        </div>
      </div>
    </section>

    <section class="knife-page__materials">
      <div class="site-container">
        <p class="knife-page__eyebrow">Возможности оборудования</p>
        <h2 class="knife-page__section-title">Какие материалы можно резать</h2>
        <div class="knife-page__card-grid">
          <article v-for="material in materials" :key="material.title" class="knife-page__card">
            <h3>{{ material.title }}</h3>
            <p>{{ material.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="content-section knife-page__applications">
      <div class="site-container knife-page__applications-container">
        <div>
          <p class="knife-page__eyebrow">Практическое применение</p>
          <h2 class="knife-page__section-title">Задачи в производстве и ремонте</h2>
        </div>
        <ol class="knife-page__application-list">
          <li v-for="(application, index) in applications" :key="application">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <p>{{ application }}</p>
          </li>
        </ol>
      </div>
    </section>

    <FaqSection_last_01
      :items="electronKnivesFaq"
      title="Частые вопросы об электроножах"
      title-id="electron-knives-faq-title"
    />

    <section class="knife-page__related">
      <div class="site-container knife-page__related-container">
        <div>
          <p class="knife-page__eyebrow">Связанное оборудование</p>
          <h2 class="knife-page__section-title">Полезные разделы каталога</h2>
        </div>
        <nav class="knife-page__related-links" aria-label="Связанные разделы">
          <NuxtLink to="/lentochnye-konvejery">
            <span>Ленточные конвейеры</span>
            <Icon name="lucide:arrow-up-right" aria-hidden="true" mode="svg" />
          </NuxtLink>
          <NuxtLink to="/komplektuyushie-k-konvejeram">
            <span>Комплектующие к конвейерам</span>
            <Icon name="lucide:arrow-up-right" aria-hidden="true" mode="svg" />
          </NuxtLink>
          <NuxtLink to="/primery-rabot">
            <span>Выполненные проекты</span>
            <Icon name="lucide:arrow-up-right" aria-hidden="true" mode="svg" />
          </NuxtLink>
        </nav>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.knife-page {
  color: $ink;

  p {
    line-height: 1.72;
    color: $muted;
  }

  &__eyebrow {
    margin: 0 0 12px;
    font-size: 11px;
    font-weight: 900;
    color: $blue !important;
    text-transform: uppercase;
    letter-spacing: 0.16em;
  }

  &__section-title {
    max-width: 900px;
    margin: 0 0 24px;
    font-size: clamp(32px, 4vw, 52px);
    line-height: 1.08;
    letter-spacing: -0.04em;
  }

  &__product-media,
  &__blade-media {
    margin: 0;
    overflow: hidden;
    background: $soft;
    border-radius: 18px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 54px;
    padding-inline: 28px;
    margin-top: 14px;
    font-weight: 850;
    color: $navy;
    cursor: pointer;
    background: $yellow;
    border: 1px solid $yellow;
    border-radius: 7px;
  }

  &__catalog,
  &__materials {
    padding-block: clamp(52px, 6vw, 76px) clamp(70px, 8vw, 110px);
    background: $soft;
  }

  &__product-list {
    display: grid;
    gap: 26px;
    margin-top: 42px;
  }

  &__product {
    display: grid;
    grid-template-columns: minmax(300px, 0.8fr) minmax(0, 1.2fr);
    gap: clamp(28px, 5vw, 65px);
    padding: clamp(24px, 4vw, 48px);
    background: #fff;
    border: 1px solid $line;
    border-radius: 20px;
  }

  &__product-media {
    min-height: 430px;
    padding: 25px;
  }

  &__product-content h3,
  &__blade h3 {
    margin: 0 0 24px;
    font-size: clamp(26px, 3vw, 38px);
    letter-spacing: -0.035em;
  }

  &__price {
    margin: 0 0 8px !important;
    font-size: 12px;
    font-weight: 900;
    color: $blue !important;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  &__specs {
    margin: 0;
    border-top: 1px solid $line;
  }

  &__spec {
    display: grid;
    grid-template-columns: minmax(150px, 0.8fr) 1.2fr;
    gap: 22px;
    padding-block: 11px;
    border-bottom: 1px solid $line;

    dt {
      color: $muted;
    }

    dd {
      margin: 0;
      font-weight: 700;
    }
  }

  &__blade {
    display: grid;
    grid-template-columns: minmax(240px, 0.6fr) minmax(0, 1.4fr);
    gap: clamp(30px, 5vw, 60px);
    align-items: center;
    padding: clamp(24px, 4vw, 46px);
    margin-top: 26px;
    background: $navy;
    border-radius: 20px;

    h3,
    p {
      color: #fff;
    }
  }

  &__blade-media {
    aspect-ratio: 4/3;
  }

  &__details {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(35px, 7vw, 90px);
    padding-top: 58px;
  }

  &__article {
    padding-top: 24px;
    border-top: 3px solid $yellow;
  }

  &__list {
    display: grid;
    gap: 12px;
    padding: 0;
    margin: 24px 0 0;
    list-style: none;

    li {
      position: relative;
      padding-left: 24px;
      line-height: 1.6;
      color: $muted;

      &::before {
        position: absolute;
        top: 0.65em;
        left: 0;
        width: 8px;
        height: 8px;
        content: '';
        background: $yellow;
        border-radius: 50%;
      }
    }
  }

  &__video-section {
    display: grid;
    grid-template-columns: minmax(0, 1.35fr) minmax(240px, 0.65fr);
    gap: clamp(35px, 6vw, 80px);
    align-items: center;
    padding-block: clamp(52px, 6vw, 72px) clamp(70px, 8vw, 100px);
  }

  &__video-band {
    color: #fff;
    background: linear-gradient(110deg, #0a3761, $navy);

    .knife-page__eyebrow {
      color: $yellow !important;
    }

    .knife-page__section-title {
      color: #fff;
    }

    p {
      color: #c5d7e8;
    }
  }

  &__video {
    position: relative;
    overflow: hidden;
    background: $navy;
    border-radius: 18px;
    box-shadow: 0 24px 65px rgb(3 35 68 / 18%);

    &::before {
      display: block;
      padding-top: 56.25%;
      content: '';
    }

    iframe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
  }

  &__card-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
    margin-top: 38px;
  }

  &__card {
    padding: 30px;
    background: #fff;
    border: 1px solid $line;
    border-radius: 14px;

    h3 {
      margin: 0 0 12px;
      font-size: 21px;
    }

    p {
      margin: 0;
    }
  }

  &__applications {
    position: relative;
    padding-top: 58px;
    overflow: hidden;
    background: #fff;
    isolation: isolate;

    &::before {
      position: absolute;
      top: -120px;
      left: -100px;
      z-index: -1;
      width: 290px;
      height: 290px;
      pointer-events: none;
      content: '';
      border: 1px solid rgb(18 105 199 / 6%);
      border-radius: 50%;
      box-shadow:
        0 0 0 34px rgb(18 105 199 / 1.5%),
        0 0 0 70px rgb(18 105 199 / 1%);
    }

    &::after {
      position: absolute;
      right: -30px;
      bottom: 28px;
      z-index: -1;
      width: 190px;
      height: 90px;
      pointer-events: none;
      content: '';
      background: repeating-linear-gradient(-45deg, transparent 0 9px, rgb(18 105 199 / 4%) 10px 11px);
      transform: skewX(-12deg);
    }
  }

  &__applications-container {
    display: grid;
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    gap: clamp(40px, 7vw, 100px);

    > div {
      position: relative;
      padding-top: 18px;

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 58px;
        height: 3px;
        content: '';
        background: linear-gradient(90deg, $yellow 0 65%, $blue 65%);
        border-radius: 99px;
      }
    }
  }

  &__application-list {
    position: relative;
    display: grid;
    gap: 12px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__application-list li {
    display: grid;
    grid-template-columns: 62px 1fr;
    gap: 20px;
    align-items: center;
    min-height: 92px;
    padding: 18px 22px;
    background: rgb(255 255 255 / 88%);
    border: 1px solid rgb(18 105 199 / 10%);
    border-radius: 14px;
    box-shadow: 0 10px 28px rgb(3 35 68 / 4%);
    backdrop-filter: blur(8px);
    transition:
      border-color 0.22s ease,
      box-shadow 0.22s ease,
      transform 0.22s ease;

    &:hover {
      border-color: rgb(18 105 199 / 28%);
      box-shadow: 0 16px 34px rgb(3 35 68 / 9%);
      transform: translateX(5px);
    }

    span {
      display: grid;
      place-items: center;
      width: 58px;
      height: 58px;
      font-size: 14px;
      font-weight: 900;
      color: $navy;
      background: linear-gradient(135deg, #ffe76c, $yellow);
      border-radius: 50%;
      box-shadow: 0 7px 18px rgb(255 210 10 / 24%);
    }

    p {
      margin: 0;
      font-weight: 580;
      line-height: 1.58;
      color: $ink;
    }
  }

  &__related {
    position: relative;
    padding-block: 44px 58px;
    overflow: hidden;
    color: $ink;
    background: linear-gradient(110deg, rgb(18 105 199 / 7%), transparent 48%), #fff;

    &::before {
      position: absolute;
      top: -150px;
      right: -90px;
      width: 360px;
      height: 360px;
      pointer-events: none;
      content: '';
      border: 1px solid rgb(18 105 199 / 8%);
      border-radius: 50%;
      box-shadow:
        0 0 0 45px rgb(18 105 199 / 2%),
        0 0 0 90px rgb(18 105 199 / 1%);
    }

    .knife-page__section-title {
      margin-bottom: 0;
      color: $ink;
    }
  }

  &__related-container {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr);
    gap: 50px;
    align-items: center;
  }

  &__related-links {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;

    a {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 28px;
      align-items: center;
      justify-content: space-between;
      min-height: 150px;
      padding: 24px;
      overflow: hidden;
      font-size: 15px;
      font-weight: 780;
      line-height: 1.4;
      color: $navy;
      text-decoration: none;
      background: linear-gradient(145deg, #fff, #f4f8fd);
      border: 1px solid rgb(18 105 199 / 12%);
      border-radius: 14px;
      box-shadow: 0 12px 32px rgb(3 35 68 / 6%);
      transition:
        background 0.2s ease,
        border-color 0.2s ease,
        transform 0.2s ease;

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 72px;
        height: 3px;
        content: '';
        background: $yellow;
        transition: width 0.25s ease;
      }

      span {
        align-self: flex-start;
        max-width: 180px;
      }

      svg {
        align-self: flex-end;
        width: 28px;
        height: 28px;
        color: $yellow;
        transition: transform 0.2s ease;
      }

      &:hover {
        background: #fff;
        border-color: rgb(18 105 199 / 35%);
        box-shadow: 0 18px 40px rgb(3 35 68 / 11%);
        transform: translateY(-5px);

        &::before {
          width: 100%;
        }

        svg {
          transform: translate(3px, -3px);
        }
      }
    }
  }
}

@media (max-width: $tablet) {
  .knife-page {
    &__product,
    &__blade,
    &__video-section {
      grid-template-columns: 1fr;
    }

    &__applications-container {
      grid-template-columns: 1fr;
    }

    &__related-container {
      grid-template-columns: 1fr;
    }
  }
}

@media (max-width: $phone) {
  .knife-page {
    &__details,
    &__applications {
      padding-top: 44px;
    }

    &__catalog,
    &__materials,
    &__video-section {
      padding-top: 44px;
    }

    &__section-title {
      overflow-wrap: anywhere;
    }

    &__details,
    &__card-grid {
      grid-template-columns: 1fr;
    }

    &__related-links {
      grid-template-columns: 1fr;
    }

    &__application-list li {
      grid-template-columns: 50px 1fr;
      gap: 14px;
      min-height: 0;
      padding: 16px;

      &:hover {
        transform: translateY(-2px);
      }

      span {
        width: 48px;
        height: 48px;
        font-size: 12px;
      }
    }

    &__product-media {
      min-height: 300px;
    }

    &__spec {
      grid-template-columns: 1fr;
      gap: 4px;
    }
  }
}
</style>
