<script setup lang="ts">
const isProjectRequestOpen = useState('project-request-open', () => false);

const metrics = [
  ['100–800 мм', 'диаметр шнека'],
  ['до 48 м', 'длина конвейера'],
  ['до 100 т/ч', 'производительность'],
  ['до 60°', 'угол наклона'],
] satisfies Array<[string, string]>;

const materials = ['Пылевидные', 'Порошкообразные', 'Зернистые', 'Мелкокусковые', 'Тестообразные'];

const diameters = [100, 125, 160, 200, 250, 320, 400, 500, 630, 800];

const faq = [
  {
    question: 'Как подобрать винтовой конвейер?',
    answer:
      'Для расчёта нужны характеристики материала, требуемая производительность, длина и конфигурация трассы, угол наклона, точки загрузки и выгрузки, температура и условия эксплуатации.',
  },
  {
    question: 'Какие материалы можно перемещать шнековым конвейером?',
    answer:
      'Оборудование применяют для пылевидных, порошкообразных, зернистых и мелкокусковых грузов. Возможность работы с липкими, влажными или абразивными материалами оценивается отдельно.',
  },
  {
    question: 'Чем отличается шнек в трубе от шнека в желобе?',
    answer:
      'Трубчатое исполнение обеспечивает закрытую герметичную подачу и допускает наклон до 60°. Желоб с крышкой удобнее осматривать и обслуживать; его применяют горизонтально или с наклоном до 45°.',
  },
  {
    question: 'Можно ли изготовить конвейер по индивидуальным размерам?',
    answer:
      'Да. АБАТЭК проектирует винтовые конвейеры по техническому заданию заказчика с учётом требуемой длины, диаметра шнека, производительности, материала исполнения и схемы разгрузки.',
  },
];
</script>

<template>
  <div class="screw-page">
    <ProductIntroSection_02
      title="Перемещение сыпучих материалов по заданной трассе"
      image="/images/26025489.webp"
      image-alt="Желобчатый винтовой конвейер АБАТЭК"
      button-label="Получить расчёт"
      label="Собственное производство"
      label-icon="lucide:factory"
      @action="isProjectRequestOpen = true"
    >
      <template #breadcrumbs>
        <BreadcrumbsNavigation
          :items="[
            { label: 'Главная', to: '/' },
            { label: 'Каталог', to: '/#catalog' },
            { label: 'Винтовые конвейеры' },
          ]"
        />
      </template>
      <p class="screw-page__lead">
        Винтовыми конвейерами (транспортерами) называют машины непрерывного транспорта для перемещения насыпных или
        тестообразных грузов с помощью винта, вращающегося в желобе. Загружаемый материал перемещается вдоль желоба
        аналогично гайке при вращении винта, закрепленного от осевого перемещения.
      </p>
    </ProductIntroSection_02>

    <ProductFactsSection_03 :facts="metrics" />

    <section class="content-section site-container screw-page__types">
      <header>
        <p class="screw-page__eyebrow">Купить винтовой конвейер</p>
        <h2>Шнековый транспортер под требуемые характеристики</h2>
        <p>
          В ООО «АБАТЭК» Вы можете купить из наличия либо заказать винтовой конвейер по требуемым характеристикам и быть
          уверены в высоком качестве исполнения, внимании ко всем деталям, ответственном подходе к изготовлению и
          своевременной сдаче заказов.
        </p>
        <p>
          Винтовые конвейеры относятся к группе транспортирующих машин без тягового органа и используются в химической и
          мукомольной промышленности, при производстве строительных материалов для транспортирования пылевидных,
          порошкообразных и реже мелкокусковых грузов в горизонтальном или вертикальном направлении.
        </p>
      </header>
      <div class="screw-page__type-grid">
        <article>
          <span>БКВ</span>
          <h3>Шнек в желобе</h3>
          <p>
            Разборный желоб с крышкой удобен для осмотра и обслуживания. Применяется горизонтально и под углом до 45°.
          </p>
        </article>
        <article>
          <span>УКВ</span>
          <h3>Шнек в трубе</h3>
          <p>
            Закрытое трубчатое исполнение обеспечивает герметичную подачу и позволяет строить трассы с наклоном до 60°.
          </p>
        </article>
        <article>
          <span>ПИТАТЕЛЬ</span>
          <h3>Цельное исполнение</h3>
          <p>
            Конвейеры-питатели без промежуточных опор изготавливаются длиной до 8 метров для равномерной дозированной
            подачи.
          </p>
        </article>
      </div>
    </section>

    <section class="screw-page__application">
      <div class="content-section site-container screw-page__application-grid">
        <div>
          <p class="screw-page__eyebrow">Области применения</p>
          <h2>Для промышленного сырья и готового продукта</h2>
          <p>
            Винтовыми конвейерами перемещают пылевидные, порошкообразные, зернистые, мелкокусковые и реже тестообразные
            грузы на сравнительно небольшое расстояние — до 40 м по горизонтали, до 30 м по вертикали.
          </p>
          <p>
            Длина горизонтальных винтовых конвейеров достигает 60 м, высота наклонных и вертикальных конвейеров — до 30
            м, производительность — до 100 т/ч.
          </p>
          <div class="screw-page__tags">
            <span v-for="item in materials" :key="item">{{ item }}</span>
          </div>
        </div>
        <aside>
          <span class="screw-page__notice-icon" aria-hidden="true">!</span>
          <h3>Важно учесть свойства материала</h3>
          <p>
            Винтовыми конвейерами не рекомендуется перемещать липкие и влажные, сильно уплотняющиеся и высокоабразивные
            грузы, а также грузы, дробление которых снижает их качество. Абразивные материалы быстро изнашивают винт и
            желоб; очень липкие грузы налипают на винт и вращаются вместе с ним, не перемещаясь вдоль желоба.
          </p>
        </aside>
      </div>
    </section>

    <section class="content-section site-container screw-page__construction-wrap">
      <div class="screw-page__construction">
        <div class="screw-page__construction-heading">
          <p class="screw-page__eyebrow">Конструкция</p>
          <h2>Секционная сборка и точная комплектация</h2>
          <div class="screw-page__section-line" aria-hidden="true">
            <span>Привод</span>
            <i></i>
            <span>Секции</span>
            <i></i>
            <span>Разгрузка</span>
          </div>
        </div>
        <div class="screw-page__construction-copy">
          <p>
            Винтовые конвейеры изготавливаются в двух исполнениях: БКВ — шнек в желобе, УКВ — шнек в трубе. Желобчатые
            конвейеры применяются с углом наклона до 45° к горизонту, а трубчатые — до 60°.
          </p>
          <ul>
            <li>
              <strong>1–2,5 м</strong>
              <span>Приводная, концевая и промежуточные секции</span>
            </li>
            <li>
              <strong>до 8 м</strong>
              <span>Цельные конвейеры-питатели без промежуточных опор</span>
            </li>
            <li>
              <strong>до 60°</strong>
              <span>Горизонтальная, наклонная или вертикальная трасса</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <div class="screw-page__scheme-band">
      <section class="content-section site-container screw-page__scheme" aria-label="Схемы винтовых конвейеров">
        <figure>
          <img
            src="/images/screw-26759703.webp"
            alt="Схемы направления подачи винтового конвейера"
            loading="lazy"
            decoding="async"
          />
        </figure>
        <figure>
          <img
            src="/images/screw-26759990.webp"
            alt="Трубчатый винтовой конвейер с приводом"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </section>
    </div>

    <section class="screw-page__pros-cons">
      <div class="content-section site-container">
        <header class="screw-page__pros-cons-heading">
          <div>
            <p class="screw-page__eyebrow">Особенности оборудования</p>
            <h2>Возможности и ограничения</h2>
          </div>
          <p>Учитываем свойства продукта и режим эксплуатации ещё на стадии подбора конструкции.</p>
        </header>
        <div class="screw-page__pros-cons-grid">
          <article class="screw-page__feature-card screw-page__feature-card--advantage">
            <div class="screw-page__feature-top">
              <span>01</span>
              <i aria-hidden="true">+</i>
            </div>
            <p class="screw-page__feature-label">Достоинства</p>
            <h3>Компактно и герметично</h3>
            <p>
              К достоинствам винтовых конвейеров относятся компактность, простота конструкции и обслуживания,
              безопасность обслуживания, надежность в эксплуатации, удобство промежуточной разгрузки, герметичность и
              пригодность для транспортирования горячих, пылящих и токсичных материалов, отсутствие потерь
              транспортируемых материалов.
            </p>
          </article>
          <article class="screw-page__feature-card screw-page__feature-card--limits">
            <div class="screw-page__feature-top">
              <span>02</span>
              <i aria-hidden="true">!</i>
            </div>
            <p class="screw-page__feature-label">Ограничения</p>
            <h3>Что проверяем до расчёта</h3>
            <p>
              Недостатками являются повышенная энергоемкость, измельчение грузов в процессе транспортирования,
              повышенный износ винта и желоба при транспортировании абразивных материалов, ограниченная длина, высокая
              чувствительность к перегрузкам, возможность образования заторов, непригодность для перемещения
              крупнокусковых, липких и сильно увлажненных материалов.
            </p>
          </article>
        </div>
      </div>
    </section>

    <div class="screw-page__sizes-band">
      <section class="content-section site-container screw-page__sizes">
        <div>
          <p class="screw-page__eyebrow">Типоразмеры</p>
          <h2>Диаметры шнека</h2>
          <p>Стандартный ряд завода. Также изготовим конвейер по размерам заказчика.</p>
        </div>
        <div class="screw-page__diameters">
          <span v-for="diameter in diameters" :key="diameter">
            <strong>{{ diameter }}</strong>
            мм
          </span>
        </div>
      </section>
    </div>

    <section class="screw-page__directions">
      <div class="content-section site-container">
        <p class="screw-page__eyebrow">Конфигурация трассы</p>
        <h2>Горизонтальные и вертикальные конвейеры</h2>
        <div class="screw-page__direction-grid">
          <article>
            <img
              src="/images/screw-26760005.webp"
              alt="Схема горизонтального винтового конвейера"
              width="480"
              height="466"
              loading="lazy"
              decoding="async"
            />
            <div>
              <h3>Горизонтальные</h3>
              <p>
                Состоят из неподвижного желоба в форме полуцилиндра, закрытого сверху крышкой; привода, включающего
                электродвигатель, редуктор и две муфты; приводного вала с витками транспортирующего винта; концевых и
                промежуточной подшипниковых опор; загрузочного и разгрузочного устройств.
              </p>
              <p>
                Насыпной груз подается в желоб через одно или несколько отверстий. Перемещение обеспечивается витками
                вращающегося винта вдоль оси конвейера, как гайка вдоль винта. Затем груз высыпается через разгрузочные
                отверстия с затворами, расположенные в днище желоба.
              </p>
            </div>
          </article>
          <article>
            <img
              src="/images/screw-26760009.webp"
              alt="Схемы вертикальных винтовых конвейеров"
              width="515"
              height="466"
              loading="lazy"
              decoding="async"
            />
            <div>
              <h3>Вертикальные</h3>
              <p>
                Относятся к конвейерам специального типа и состоят из вала со сплошными винтовыми витками, вращающегося
                в цилиндрическом кожухе, горизонтального винта-питателя и одного или двух раздельных приводов.
              </p>
              <p>
                Для создания необходимой центробежной силы винт вертикального конвейера имеет большую частоту вращения,
                чем винт горизонтального конвейера.
              </p>
              <p>
                Разгрузка производится через верхний патрубок в кожухе. Участок подачи груза выполняют с уменьшающимся к
                верху диаметром или уменьшенным шагом. При большой высоте для предотвращения биения вала устанавливают
                промежуточные подшипники.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <FaqSection_last_01
      :items="faq"
      title="Частые вопросы о винтовых конвейерах"
      title-id="screw-faq-title"
      tone="soft"
    />
  </div>
</template>

<style scoped lang="scss">
.screw-page {
  color: $ink;

  h2 {
    margin: 0;
    font-size: clamp(32px, 4vw, 54px);
    line-height: 1.06;
    letter-spacing: -0.045em;
  }

  p {
    line-height: 1.7;
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

  &__lead {
    max-width: 580px;
    margin: 18px 0 22px;
    font-size: 15px;
  }

  &__button {
    min-height: 54px;
    padding-inline: 28px;
    font-weight: 850;
    color: $navy;
    cursor: pointer;
    background: $yellow;
    border: 1px solid $yellow;
    border-radius: 7px;
  }

  &__photo {
    position: relative;
    justify-self: end;
    width: 100%;
    max-width: 680px;
    margin: 0;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 22px 55px rgb(3 35 68 / 14%);
  }

  &__photo img {
    display: block;
    width: 100%;
    height: clamp(240px, 26vw, 320px);
    object-fit: cover;
  }

  &__photo figcaption {
    position: absolute;
    right: 18px;
    bottom: 18px;
    padding: 10px 14px;
    font-size: 11px;
    font-weight: 800;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    background: rgb(3 35 68 / 80%);
    border-radius: 6px;
    backdrop-filter: blur(8px);
  }

  &__types header {
    max-width: 760px;
  }

  &__type-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    margin-top: 42px;
  }

  &__type-grid article {
    padding: 30px;
    border: 1px solid $line;
    border-radius: 15px;
  }

  &__type-grid article > span {
    display: inline-block;
    padding: 7px 10px;
    font-size: 11px;
    font-weight: 900;
    color: $blue;
    background: $soft;
    border-radius: 5px;
  }

  &__type-grid h3 {
    margin: 22px 0 10px;
    font-size: 23px;
  }

  &__type-grid p {
    margin: 0;
  }

  &__application {
    background: $soft;
  }

  &__application-grid {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: clamp(40px, 8vw, 100px);
    align-items: center;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
    margin-top: 28px;
  }

  &__tags span {
    padding: 10px 14px;
    font-size: 13px;
    font-weight: 750;
    background: #fff;
    border: 1px solid $line;
    border-radius: 99px;
  }

  &__application aside {
    padding: 34px;
    color: #fff;
    background: linear-gradient(135deg, $navy, #0b4d83);
    border-radius: 18px;
  }

  &__notice-icon {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    font-size: 20px;
    font-weight: 900;
    color: $yellow;
    border: 2px solid $yellow;
    border-radius: 50%;
  }

  &__application aside h3 {
    margin: 22px 0 10px;
    font-size: 24px;
  }

  &__application aside p {
    margin: 0;
    color: #c7d9e9;
  }

  &__construction-wrap {
    position: relative;
    padding-bottom: 48px;
  }

  &__construction {
    position: relative;
    display: grid;
    grid-template-columns: 0.8fr 1.2fr;
    gap: clamp(45px, 8vw, 110px);
    padding: clamp(32px, 5vw, 64px);
    overflow: hidden;
    background: linear-gradient(115deg, rgb(18 105 199 / 8%), transparent 52%), #fff;
    border: 1px solid rgb(18 105 199 / 14%);
    border-radius: 24px;
    box-shadow: 0 24px 70px rgb(3 35 68 / 9%);

    &::before {
      position: absolute;
      top: -105px;
      right: -75px;
      width: 300px;
      height: 300px;
      pointer-events: none;
      content: '';
      border: 1px solid rgb(18 105 199 / 9%);
      border-radius: 50%;
      box-shadow:
        0 0 0 34px rgb(18 105 199 / 3%),
        0 0 0 68px rgb(18 105 199 / 1.5%);
    }

    &::after {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 44%;
      height: 5px;
      content: '';
      background: linear-gradient(90deg, $yellow 0 72%, $blue 72%);
    }
  }

  &__construction-heading,
  &__construction-copy {
    position: relative;
    z-index: 1;
  }

  &__construction-copy > p {
    margin-top: 0;
    font-size: 17px;
  }

  &__section-line {
    display: flex;
    gap: 9px;
    align-items: center;
    margin-top: 38px;
  }

  &__section-line span {
    font-size: 9px;
    font-weight: 850;
    color: $blue;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  &__section-line i {
    position: relative;
    flex: 1;
    min-width: 18px;
    height: 2px;
    background: rgb(18 105 199 / 20%);

    &::after {
      position: absolute;
      top: 50%;
      right: 0;
      width: 6px;
      height: 6px;
      content: '';
      background: $yellow;
      border-radius: 50%;
      box-shadow: 0 0 0 4px rgb(255 210 10 / 16%);
      transform: translateY(-50%);
    }
  }

  &__construction ul {
    display: grid;
    gap: 10px;
    padding: 0;
    margin: 28px 0 0;
    list-style: none;
  }

  &__construction li {
    display: grid;
    grid-template-columns: 94px 1fr;
    gap: 18px;
    align-items: center;
    min-height: 76px;
    padding: 14px 18px;
    background: rgb(246 249 253 / 88%);
    border: 1px solid rgb(18 105 199 / 9%);
    border-radius: 12px;
    transition:
      background 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;

    &:hover {
      background: #fff;
      border-color: rgb(18 105 199 / 24%);
      box-shadow: 0 12px 30px rgb(3 35 68 / 8%);
      transform: translateX(5px);
    }
  }

  &__construction li strong {
    font-size: 19px;
    font-weight: 900;
    color: $blue;
    letter-spacing: -0.03em;
  }

  &__construction li span {
    font-size: 13px;
    font-weight: 650;
    line-height: 1.5;
    color: $ink;
  }

  &__scheme {
    display: grid;
    grid-template-columns: 1.35fr 0.65fr;
    gap: 20px;
    padding-top: 48px;
  }

  &__scheme-band {
    background: #e8f2fb;
  }

  &__scheme figure {
    display: grid;
    place-items: center;
    min-height: 300px;
    padding: 24px;
    margin: 0;
    background: #fff;
    border-radius: 15px;
  }

  &__scheme img {
    width: 100%;
    max-height: 330px;
    object-fit: contain;
  }

  &__pros-cons {
    position: relative;
    overflow: hidden;
    background: #fff;

    &::before {
      position: absolute;
      top: -160px;
      right: -100px;
      width: 360px;
      height: 360px;
      pointer-events: none;
      content: '';
      border: 1px solid rgb(18 105 199 / 8%);
      border-radius: 50%;
      box-shadow: 0 0 0 50px rgb(18 105 199 / 2%);
    }
  }

  &__pros-cons-heading {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 50px;
    align-items: end;
    margin-bottom: 40px;
  }

  &__pros-cons-heading > p {
    max-width: 460px;
    margin: 0 0 4px;
  }

  &__pros-cons-grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }

  &__feature-card {
    position: relative;
    min-height: 390px;
    padding: clamp(28px, 4vw, 46px);
    overflow: hidden;
    background: #fff;
    border: 1px solid rgb(18 105 199 / 11%);
    border-radius: 20px;
    box-shadow: 0 16px 45px rgb(3 35 68 / 6%);
    transition:
      border-color 0.22s ease,
      box-shadow 0.22s ease,
      transform 0.22s ease;

    &::after {
      position: absolute;
      right: -55px;
      bottom: -75px;
      width: 180px;
      height: 180px;
      pointer-events: none;
      content: '';
      border: 22px solid rgb(18 105 199 / 3%);
      border-radius: 50%;
    }

    &:hover {
      border-color: rgb(18 105 199 / 25%);
      box-shadow: 0 24px 54px rgb(3 35 68 / 11%);
      transform: translateY(-5px);
    }
  }

  &__feature-card--advantage {
    border-top: 5px solid $yellow;
  }

  &__feature-card--limits {
    border-top: 5px solid $blue;
  }

  &__feature-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 34px;
  }

  &__feature-top span {
    font-size: 12px;
    font-weight: 900;
    color: $blue;
    letter-spacing: 0.12em;
  }

  &__feature-top i {
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    font-size: 20px;
    font-style: normal;
    font-weight: 850;
    color: $navy;
    background: $yellow;
    border-radius: 50%;
  }

  &__feature-card--limits &__feature-top i {
    color: #fff;
    background: $blue;
  }

  &__feature-label {
    margin: 0 0 10px;
    font-size: 10px;
    font-weight: 900;
    color: $blue !important;
    text-transform: uppercase;
    letter-spacing: 0.14em;
  }

  &__feature-card h3 {
    max-width: 480px;
    margin: 0;
    font-size: clamp(27px, 3vw, 39px);
    line-height: 1.1;
    letter-spacing: -0.04em;
  }

  &__feature-card > p:last-child {
    position: relative;
    z-index: 1;
    max-width: 580px;
    margin: 24px 0 0;
  }

  &__sizes {
    display: grid;
    grid-template-columns: 0.75fr 1.25fr;
    gap: clamp(40px, 8vw, 100px);
    align-items: center;
  }

  &__sizes-band {
    background: $soft;
  }

  &__sizes > div > p:last-child {
    max-width: 530px;
  }

  &__diameters {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1px;
    background: $line;
  }

  &__diameters span {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    padding: 20px 8px;
    font-size: 11px;
    color: $muted;
    background: $soft;
  }

  &__diameters strong {
    font-size: 22px;
    color: $navy;
  }

  &__directions {
    background: #fff;
  }

  &__direction-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 42px;
  }

  &__direction-grid article {
    overflow: hidden;
    background: #fff;
    border: 1px solid $line;
    border-radius: 18px;
  }

  &__direction-grid img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
  }

  &__direction-grid article:nth-child(2) img {
    object-position: center 42%;
  }

  &__direction-grid article > div {
    padding: 28px;
  }

  &__direction-grid h3 {
    margin: 0 0 10px;
    font-size: 27px;
  }

  &__direction-grid p {
    margin: 0 0 14px;
  }

  &__direction-grid p:last-child {
    margin-bottom: 0;
  }
}

@media (max-width: $tablet) {
  .screw-page {
    &__application-grid,
    &__construction,
    &__scheme,
    &__sizes,
    &__pros-cons-heading {
      grid-template-columns: 1fr;
    }

    &__pros-cons-heading {
      gap: 20px;
    }

    &__photo {
      justify-self: start;
      max-width: 580px;
    }

    &__type-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media (max-width: $phone) {
  .screw-page {
    &__type-grid,
    &__pros-cons-grid,
    &__direction-grid {
      grid-template-columns: 1fr;
    }

    &__diameters {
      grid-template-columns: repeat(2, 1fr);
    }

    &__feature-card {
      min-height: 0;
    }

    &__photo img {
      height: 240px;
    }

    &__construction {
      padding: 28px 20px 34px;
      border-radius: 17px;
    }

    &__construction li {
      grid-template-columns: 1fr;
      gap: 5px;

      &:hover {
        transform: translateY(-2px);
      }
    }

    &__section-line {
      margin-top: 26px;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .screw-page__construction li {
    transition: none;
  }
}
</style>
