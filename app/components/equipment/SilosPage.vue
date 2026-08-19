<script setup lang="ts">
import { catalog } from '~/data/pages/silosy/data-catalog';

const isProjectRequestOpen = useState('project-request-open', () => false);

const facts = [
  ['12–48 м³', 'цельносварные модели'],
  ['до 900 м³', 'сборно-разборные модели'],
  ['4–8+ мм', 'толщина металла'],
  ['Ст3 / 09Г2С', 'марки стали'],
] satisfies Array<[string, string]>;

const baseEquipment = [
  'Опорная конструкция',
  'Ёмкость силоса',
  'Лестница',
  'Ограждение верхней площадки',
  'Труба для закачки цемента',
];
const extraEquipment = [
  'Дисковый затвор или шиберная задвижка',
  'Фильтр цемента',
  'Клапан избыточного давления',
  'Система аэрации',
  'Вибраторы',
  'Датчики уровня',
];
const productionStages = [
  'Утверждение технического задания',
  'Разработка чертежей в разделах КМ и КМД',
  'Раскладка карты обечайки из стальных листов',
  'Вальцовка обечаек необходимого диаметра',
  'Изготовление конуса и крышки',
  'Сборка корпуса из обечаек на кантователях',
  'Опрессовка сжатым воздухом и обмыливание швов',
  'Врезка фланцев и трубной обвязки',
  'Установка силосной банки на опоры',
  'Грунтовка и покраска',
  'Монтаж навесного оборудования',
];
const workSteps = [
  [
    'Обращение и обсуждение потребности',
    'Позвоните нам или отправьте техническое задание. В кратчайшие сроки согласуем технические вопросы и приступим к расчёту стоимости.',
  ],
  [
    'Разработка технико-коммерческого предложения',
    'Рассчитаем стоимость, сроки изготовления, характеристики и комплектацию, учтём доставку до вашего склада.',
  ],
  [
    'Заключение договора поставки',
    'Согласуем условия поставки, сроки и оплату. Для постоянных заказчиков предусмотрены скидки и возможность отсрочки платежа.',
  ],
  [
    'Согласование чертежей',
    'Предоставим чертежи общего вида для согласования. Срок разработки зависит от объёма и сложности работ.',
  ],
  [
    'Изготовление оборудования',
    'Изготовим силос по согласованному техническому заданию и чертежам. Срок указывается уже в технико-коммерческом предложении.',
  ],
  ['Доставка до вашего склада', 'Организацию доставки берём на себя. Срок зависит от региона расположения заказчика.'],
];
const deliveryStages = workSteps.map(([title, description]) => `${title}. ${description}`);
const faq = [
  {
    question: 'Какие материалы можно хранить в силосе?',
    answer:
      'Силосы предназначены для цемента, песка, зерна, полипропиленовых гранул и других сыпучих материалов с учётом их характеристик.',
  },
  {
    question: 'Можно ли заказать силос нестандартного объёма?',
    answer:
      'Да. Кроме типового ряда АБАТЭК изготавливает силосы других объёмов, в том числе сборно-разборные конструкции по техническому заданию.',
  },
  {
    question: 'В чём отличие цельносварного силоса от разборного?',
    answer:
      'Цельносварной силос полностью собирается на заводе и доставляется готовым. Разборный производится панелями и собирается непосредственно на монтажной площадке.',
  },
  {
    question: 'От чего зависит цена силоса?',
    answer:
      'Стоимость зависит от объёма, назначения, марки и толщины стали, комплектации, условий эксплуатации, способа монтажа и региона доставки.',
  },
];
</script>

<template>
  <div class="silos-page">
    <ProductIntroSection_02
      title="Силосы для хранения сыпучих материалов"
      image="/images/26025737.webp"
      image-alt="Металлический силос для хранения сыпучих материалов"
      label="Собственное производство"
      label-icon="lucide:factory"
      @action="isProjectRequestOpen = true"
    >
      <template #breadcrumbs>
        <BreadcrumbsNavigation
          :items="[{ label: 'Главная', to: '/' }, { label: 'Каталог', to: '/#catalog' }, { label: 'Силосы' }]"
        />
      </template>
      <p>
        Изготавливаем цельносварные силосы объёмом от 12 до 48 м³. Конструкции собираются на производстве и перевозятся
        в готовом виде. Подходят для цемента, песка, полипропиленовых гранул и других сыпучих материалов.
      </p>
      <p>По желанию заказчика возможно изготовление силосов других объёмов, а также разборных моделей.</p>
    </ProductIntroSection_02>

    <ProductFactsSection_03 :facts="facts" />

    <section class="content-section site-container silos-page__equipment">
      <header>
        <p class="silos-page__eyebrow">Оснащение</p>
        <h2>Комплектация силоса</h2>
      </header>
      <div class="silos-page__equipment-grid">
        <article>
          <h3>Базовая комплектация</h3>
          <ul>
            <li v-for="item in baseEquipment" :key="item">{{ item }}</li>
          </ul>
        </article>
        <article>
          <h3>Дополнительное оборудование</h3>
          <ul>
            <li v-for="item in extraEquipment" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </section>

    <ManufacturingStagesSection_last_02
      title="Этапы изготовления силоса для зерна, цемента и песка"
      :items="productionStages"
      note="Контролируем весь цикл — от технического задания до монтажа навесного оборудования."
    />

    <section class="content-section site-container silos-page__materials">
      <div>
        <p class="silos-page__eyebrow">Материал изготовления</p>
        <h2>Сталь под климат и условия эксплуатации</h2>
      </div>
      <div>
        <p>
          Силосы для цемента изготавливаются из стали Ст3Сп5 и 09Г2С-14. Ст3 применяется для центральных и южных
          регионов России, 09Г2С-14 — для северных. Толщина металла составляет от 4 до 8 мм и более в зависимости от
          проекта, объёма и хранимого сырья.
        </p>
        <h3>Для кого это подходит</h3>
        <p>
          Мы производим агрегаты разного объёма для крупных и средних фермерских хозяйств. Оборудование помогает
          сокращать потери масложировым и комбикормовым заводам, мельницам и другим промышленным предприятиям.
        </p>
      </div>
    </section>

    <section class="silos-page__installation">
      <div class="content-section site-container">
        <p class="silos-page__eyebrow">Монтаж</p>
        <h2>Способы выполнения монтажных работ</h2>
        <div class="silos-page__cards">
          <article>
            <strong>до 50 м³</strong>
            <h3>Заводская сборка</h3>
            <p>
              Небольшие конструкции собираются на заводе и доставляются готовыми. Фундамент и опорный металлический
              каркас подготавливаются заранее.
            </p>
          </article>
          <article>
            <strong>крупные модели</strong>
            <h3>Секционная сборка</h3>
            <p>Секции соединяются на объекте сварным или болтовым способом.</p>
          </article>
          <article>
            <strong>особо крупные</strong>
            <h3>Рулонирование</h3>
            <p>Крупные секции сворачиваются для транспортировки, а на площадке разворачиваются и собираются.</p>
          </article>
        </div>
      </div>
    </section>

    <SpecsTableSection
      title="Характеристики цельносварных силосов"
      eyebrow="Типовой ряд"
      :columns="['Наименование', 'Объём, м³', 'Вместимость, т', 'Диаметр × высота, мм']"
      :rows="catalog"
    />

    <section class="silos-page__production">
      <div class="content-section site-container silos-page__production-grid">
        <div>
          <p class="silos-page__eyebrow">Контроль качества</p>
          <h2>Производство силосов</h2>
        </div>
        <div>
          <p>
            Уже при приёмке металла проводится входной контроль. По технологической карте металл поступает со склада на
            заготовительный участок, где аттестованные специалисты выполняют сборку и сварку. Изделия проходят испытания
            на герметичность, контрольную сборку и нанесение лакокрасочного покрытия.
          </p>
          <p>
            АБАТЭК — завод-производитель с необходимыми материальными и трудовыми ресурсами. Особое внимание уделяется
            технологическому оснащению, а продукция соответствует европейским стандартам.
          </p>
          <p>
            Силосы могут эксплуатироваться внутри цехов и на открытом воздухе. Производим как цельносварные, так и
            сборные модели.
          </p>
        </div>
      </div>
    </section>

    <section class="content-section site-container silos-page__methods">
      <p class="silos-page__eyebrow">Конструкция</p>
      <h2>Методы изготовления силоса</h2>
      <div class="silos-page__method-grid">
        <article>
          <span>8–150 м³</span>
          <h3>Цельносварные силосы</h3>
          <p>
            Диаметр 2400–4500 мм. Полностью готовы к эксплуатации, надёжны и долговечны; требуют транспортировки
            грузовым автомобилем и установки на объекте.
          </p>
        </article>
        <article>
          <span>24–900 м³</span>
          <h3>Сборно-разборные силосы</h3>
          <p>
            Диаметр 3500–7600 мм. Собираются из заводских стальных панелей, которые соединяются непосредственно на
            монтажной площадке.
          </p>
        </article>
      </div>
      <p>Для обоих методов используется сталь Ст3 или 09Г2С.</p>
    </section>

    <section class="silos-page__price">
      <div class="content-section site-container silos-page__price-grid">
        <div>
          <p class="silos-page__eyebrow">Стоимость</p>
          <h2>Как купить силос или узнать цену</h2>
        </div>
        <div>
          <p>
            Позвоните специалистам по телефону 8 (800) 505-19-15, чтобы узнать ориентировочную стоимость нужной ёмкости.
            Цена может существенно различаться в зависимости от модификации, назначения и условий эксплуатации.
          </p>
          <button type="button" @click="isProjectRequestOpen = true">Запросить расчёт</button>
        </div>
      </div>
    </section>

    <ManufacturingStagesSection_last_02
      title="От заявки до доставки"
      :items="deliveryStages"
      eyebrow="Работа с заказом"
      note="Фиксируем технические решения, стоимость и сроки до запуска производства, затем организуем доставку готового силоса."
    />

    <FaqSection_last_01 :items="faq" title="Частые вопросы о силосах" title-id="silos-faq-title" />
  </div>
</template>

<style scoped lang="scss">
.silos-page {
  color: $ink;

  h2 {
    margin: 0;
    font-size: clamp(30px, 4vw, 54px);
    line-height: 1.07;
    letter-spacing: -0.045em;
  }

  p,
  li {
    line-height: 1.7;
    color: $muted;
  }
}

.silos-page__eyebrow {
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 900;
  color: $blue !important;
  text-transform: uppercase;
  letter-spacing: 0.16em;
}

.silos-page__equipment header,
.silos-page__catalog > h2,
.silos-page__methods > h2,
.silos-page__process > h2 {
  max-width: 850px;
  margin-bottom: 38px;
}

.silos-page__equipment-grid,
.silos-page__method-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;

  article {
    padding: 34px;
    background: $soft;
    border-radius: 18px;
  }

  h3 {
    margin-top: 0;
    font-size: 26px;
  }
}

.silos-page__installation,
.silos-page__production,
.silos-page__price {
  background: $soft;
}

.silos-page__stages {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #edf5fc 0%, $soft 58%, #e8f2fb 100%);

  &::before,
  &::after {
    position: absolute;
    pointer-events: none;
    content: '';
    border: 1px solid rgb(7 87 164 / 9%);
    border-radius: 50%;
  }

  &::before {
    top: -190px;
    right: -110px;
    width: 430px;
    height: 430px;
    box-shadow:
      0 0 0 42px rgb(7 87 164 / 2.5%),
      0 0 0 84px rgb(7 87 164 / 1.5%);
  }

  &::after {
    bottom: -150px;
    left: -100px;
    width: 300px;
    height: 300px;
  }
}

.silos-page__stages > div {
  position: relative;
  z-index: 1;
}

.silos-page__stages-header {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(260px, 0.65fr);
  gap: clamp(32px, 7vw, 90px);
  align-items: end;

  h2 {
    max-width: 900px;
  }
}

.silos-page__stages-note {
  padding: 20px 0 20px 24px;
  margin: 0;
  font-weight: 650;
  color: $ink !important;
  border-left: 4px solid $yellow;
}

.silos-page__stages ol {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 0;
  margin-top: 48px;
  list-style: none;

  li {
    position: relative;
    padding: 22px;
    font-weight: 650;
    color: $ink;
    background: rgb(255 255 255 / 92%);
    border: 1px solid rgb(7 87 164 / 10%);
    border-radius: 16px;
    box-shadow: 0 10px 30px rgb(3 35 68 / 5%);
    opacity: 0;
    transform: translateY(14px);
    transition:
      border-color 0.22s ease,
      box-shadow 0.22s ease,
      transform 0.22s ease;
    animation: silos-stage-in 0.5s ease-out forwards;

    &::after {
      position: absolute;
      right: 18px;
      bottom: 0;
      left: 18px;
      height: 3px;
      content: '';
      background: linear-gradient(90deg, $yellow, $blue);
      border-radius: 4px 4px 0 0;
      opacity: 0;
      transform: scaleX(0.35);
      transition:
        opacity 0.22s ease,
        transform 0.22s ease;
    }

    &:hover {
      border-color: rgb(7 87 164 / 24%);
      box-shadow: 0 18px 38px rgb(3 35 68 / 10%);
      transform: translateY(-5px);

      &::after {
        opacity: 1;
        transform: scaleX(1);
      }
    }

    @for $index from 1 through 11 {
      &:nth-child(#{$index}) {
        animation-delay: #{($index - 1) * 0.055}s;
      }
    }
  }

  span {
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    margin-bottom: 18px;
    font-weight: 900;
    color: $navy;
    background: #e2effb;
    border: 1px solid rgb(7 87 164 / 22%);
    border-radius: 50%;
    box-shadow: inset 0 0 0 4px rgb(255 255 255 / 65%);
  }

  p {
    margin: 0;
    font-weight: 700;
    line-height: 1.55;
    color: $ink;
  }
}

@keyframes silos-stage-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.silos-page__materials,
.silos-page__production-grid,
.silos-page__price-grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: clamp(40px, 8vw, 100px);
}

.silos-page__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-top: 38px;

  article {
    padding: 32px;
    background: #fff;
    border-radius: 18px;
  }

  strong {
    color: $blue;
  }

  h3 {
    font-size: 24px;
  }
}

.silos-page__table-wrap {
  overflow-x: auto;
  border: 1px solid $line;
  border-radius: 14px;
}

.silos-page table {
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;

  th,
  td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid $line;
  }

  th {
    color: #fff;
    background: $navy;
  }

  td:first-child {
    font-weight: 800;
    color: $blue;
  }

  tbody tr:nth-child(even) {
    background: $soft;
  }
}

.silos-page__method-grid article {
  border-top: 5px solid $yellow;

  span {
    font-weight: 900;
    color: $blue;
  }
}

.silos-page__price button {
  padding: 16px 24px;
  font-weight: 800;
  color: $navy;
  cursor: pointer;
  background: $yellow;
  border: 0;
  border-radius: 7px;
}

.silos-page__process ol {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  padding: 0;
  list-style: none;

  li {
    display: grid;
    grid-template-columns: 48px 1fr;
    gap: 16px;
    padding: 28px;
    background: $soft;
    border-radius: 16px;
  }

  span {
    font-weight: 900;
    color: $blue;
  }

  h3 {
    margin: 0 0 8px;
  }

  p {
    margin: 0;
  }
}

@media (width <= $tablet) {
  .silos-page__materials,
  .silos-page__production-grid,
  .silos-page__price-grid {
    grid-template-columns: 1fr;
  }

  .silos-page__stages ol,
  .silos-page__cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .silos-page__stages-header {
    grid-template-columns: 1fr;
  }
}

@media (width <= $phone) {
  .silos-page__equipment-grid,
  .silos-page__method-grid,
  .silos-page__stages ol,
  .silos-page__cards,
  .silos-page__process ol {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .silos-page__stages ol li {
    opacity: 1;
    transform: none;
    transition: none;
    animation: none;
  }
}
</style>
