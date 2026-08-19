<script setup lang="ts">
import ScraperProductCard from '~/components/shared/card/ScraperProductCard.vue';
import { catalog } from '~/data/pages/rolgang/data-catalog';

const isProjectRequestOpen = useState('project-request-open', () => false);
const facts = [
  ['10 видов', 'типовых конструкций'],
  ['до 2+ т', 'масса штучного груза'],
  ['0 ₽', 'затраты на привод у гравитационных моделей'],
  ['под ТЗ', 'размеры и конфигурация'],
] satisfies Array<[string, string]>;
const gravityBenefits = [
  'Надёжная конструкция без сложных элементов',
  'Экономия площади производственных и складских помещений',
  'Возможность перемещения горячих грузов и работы в агрессивной среде',
  'Снижение затрат на транспортировку и складирование',
  'Ускорение рабочего процесса',
  'Быстрая окупаемость оборудования',
];
const poweredBenefits = [
  'Перемещение лёгких и крупногабаритных грузов разной формы',
  'Экономия площади и сокращение применения транспортных средств',
  'Работа в разных климатических условиях, включая отрицательные температуры',
  'Снижение затрат на транспортирование и складирование',
  'Отсутствие необходимости в дорогостоящем обслуживании',
];
const steps = [
  'Обсуждаем задачу, получаем техническое задание и уточняем параметры перемещаемого груза.',
  'Готовим технико-коммерческое предложение со стоимостью, сроками и комплектацией рольганга.',
  'Заключаем договор и согласовываем условия изготовления, оплаты и поставки оборудования.',
  'Разрабатываем и согласовываем чертежи общего вида роликового конвейера.',
  'Изготавливаем рольганг по утверждённому техническому заданию и проводим контроль качества.',
  'Организуем доставку готового роликового конвейера до склада заказчика.',
];
const faq = [
  {
    question: 'Чем приводной рольганг отличается от неприводного?',
    answer:
      'В приводном рольганге ролики вращаются от привода. В неприводном груз перемещается вручную или под действием собственного веса по наклонной трассе.',
  },
  {
    question: 'Какие грузы можно перевозить на роликовом конвейере?',
    answer:
      'Коробки, ящики, лотки, паллеты, кеги и другие штучные грузы с устойчивой опорной поверхностью. Тяжёлые серии рассчитаны на паллеты массой до 1500 кг и ящики массой более двух тонн.',
  },
  {
    question: 'Можно ли изготовить поворотную или разветвлённую линию?',
    answer:
      'Да. Рольганги объединяются в прямые, поворотные, накопительные, телескопические и многоуровневые системы под планировку объекта.',
  },
  {
    question: 'От чего зависит стоимость рольганга?',
    answer:
      'От веса, размеров и формы груза, габаритов конвейера, конфигурации трассы, поворотов и уклонов, типа привода, материалов и требуемой скорости.',
  },
];
</script>

<template>
  <div class="roller-page">
    <ProductIntroSection_02
      title="Роликовые конвейеры и рольганги"
      image="/images/26025724.webp"
      image-alt="Роликовый конвейер рольганг производства АБАТЭК"
      label="Собственное производство"
      label-icon="lucide:factory"
      @action="isProjectRequestOpen = true"
    >
      <template #breadcrumbs>
        <BreadcrumbsNavigation
          :items="[{ label: 'Главная', to: '/' }, { label: 'Каталог', to: '/#catalog' }, { label: 'Рольганги' }]"
        />
      </template>
      <p>
        Незаменимые элементы складского и производственного оборудования для эффективного перемещения и накопления
        крупных штучных грузов и групповой упаковки: коробок, ящиков, паллет и других товаров.
      </p>
    </ProductIntroSection_02>
    <ProductFactsSection_03 :facts="facts" />

    <section class="content-section site-container roller-page__overview">
      <div>
        <p class="roller-page__eyebrow">Автоматизация перемещения</p>
        <h2>Неприводные и приводные рольганги</h2>
      </div>
      <div>
        <p>
          На основе роликового конвейера можно автоматизировать отдельный участок производства, повысить скорость
          обработки материалов и снизить затраты на ручной труд.
        </p>
        <p>
          Разветвлённая гибкая система оптимизирует сортировку и транспортировку на складе или в логистическом центре,
          обеспечивает организованное движение товаров и ускоряет обработку заказов.
        </p>
      </div>
    </section>

    <section class="roller-page__types">
      <div class="content-section site-container roller-page__type-grid">
        <article>
          <p class="roller-page__eyebrow">Без привода</p>
          <h2>Неприводные рольганги</h2>
          <p>
            Гравитационные конвейеры, на которых груз движется под собственным весом вследствие небольшого наклона
            полотна.
          </p>
          <p>
            Оборудование применяется для подачи заготовок к станкам, перемещения продукции после металлообработки,
            сортировки материалов и оптимизации ручного труда.
          </p>
          <h3>Преимущества</h3>
          <ol>
            <li v-for="item in gravityBenefits" :key="item">{{ item }}</li>
          </ol>
        </article>
        <article>
          <p class="roller-page__eyebrow">С приводом</p>
          <h2>Приводные рольганги</h2>
          <p>
            Ролики вращаются от привода, а груз перемещается благодаря сцеплению его опорной поверхности с роликами.
          </p>
          <p>
            Применяются для коробок, ящиков, лотков, паллет и кег. Тяжёлая серия транспортирует паллеты массой до 1500
            кг и деревянные ящики массой более двух тонн, а также работает на участках накопления.
          </p>
          <h3>Преимущества</h3>
          <ol>
            <li v-for="item in poweredBenefits" :key="item">{{ item }}</li>
          </ol>
        </article>
      </div>
    </section>

    <section class="content-section site-container roller-page__catalog">
      <header>
        <div>
          <p class="roller-page__eyebrow">Изготовление на заказ</p>
          <h2>Виды роликовых конвейеров</h2>
        </div>
        <p>
          АБАТЭК изготавливает все разновидности рольгангов на собственном производстве, в том числе по чертежам
          заказчика.
        </p>
      </header>
      <div class="roller-page__product-grid">
        <ScraperProductCard
          v-for="(product, index) in catalog"
          :key="product.title"
          :product="product"
          :index="index"
          @action="isProjectRequestOpen = true"
        />
      </div>
    </section>

    <section class="roller-page__price">
      <div class="content-section site-container roller-page__price-grid">
        <div>
          <p class="roller-page__eyebrow">Проектирование</p>
          <h2>Стоимость роликового конвейера</h2>
        </div>
        <div>
          <p>
            Точная стоимость зависит от веса, габаритов, формы и упаковки груза, размеров и конфигурации транспортёра,
            сложности трассы, поворотов, уклонов и требуемой скорости движения.
          </p>
          <p>
            Рольганг может автоматизировать отдельный станок или стать основой многоуровневой разветвлённой системы,
            работающей в сложных температурных режимах и агрессивных средах.
          </p>
          <p>
            Специалисты подбирают материалы, оптимизируют конструкцию и сопровождают проект, обеспечивая надёжность,
            производительность и экономичность решения.
          </p>
          <button type="button" @click="isProjectRequestOpen = true">Рассчитать стоимость</button>
        </div>
      </div>
    </section>

    <ManufacturingStagesSection_last_02
      title="От задачи до готового рольганга"
      :items="steps"
      note="Сопровождаем проект на каждом этапе — от расчёта конструкции до изготовления и доставки готового рольганга."
    />
    <FaqSection_last_01 :items="faq" title="Частые вопросы о рольгангах" title-id="roller-faq-title" />
  </div>
</template>

<style scoped lang="scss">
.roller-page {
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

.roller-page__eyebrow {
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 900;
  color: $blue !important;
  text-transform: uppercase;
  letter-spacing: 0.16em;
}

.roller-page__overview,
.roller-page__price-grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: clamp(40px, 8vw, 100px);
}

.roller-page__types,
.roller-page__price {
  background: $soft;
}

.roller-page__type-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  article {
    padding: clamp(28px, 4vw, 46px);
    background: #fff;
    border-top: 5px solid $yellow;
    border-radius: 20px;
  }

  article + article {
    border-top-color: $blue;
  }

  h2 {
    font-size: clamp(30px, 3.3vw, 44px);
  }

  h3 {
    margin-top: 30px;
  }

  ol {
    padding-left: 22px;
  }
}

.roller-page__catalog header {
  display: grid;
  grid-template-columns: 1fr 0.65fr;
  gap: 50px;
  align-items: end;
  margin-bottom: 42px;

  > p {
    margin: 0;
  }
}

.roller-page__product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.roller-page__price button {
  padding: 16px 24px;
  font-weight: 800;
  color: $navy;
  cursor: pointer;
  background: $yellow;
  border: 0;
  border-radius: 7px;
}

@media (width <= $tablet) {
  .roller-page__overview,
  .roller-page__price-grid {
    grid-template-columns: 1fr;
  }

  .roller-page__product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (width <= $phone) {
  .roller-page__type-grid,
  .roller-page__catalog header,
  .roller-page__product-grid {
    grid-template-columns: 1fr;
  }
}
</style>
