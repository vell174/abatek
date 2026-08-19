<script setup lang="ts">
const categories = [
  {
    label: 'Электроножи для резки конвейерных лент и технических пластин',
    to: '/elektronoji-dlya-rezki-konveyernih-lent-tehnicheskih-plastin',
    icon: 'lucide:scissors',
    image: '/images/26025762.webp',
  },
  {
    label: 'Конвейеры ленточные, питатели ленточные',
    to: '/lentochnye-konvejery',
    icon: 'lucide:move-right',
    image: '/images/26007483.webp',
  },
  {
    label: 'Конвейеры и питатели винтовые (шнековые)',
    to: '/vintovye-konvejery',
    icon: 'lucide:workflow',
    image: '/images/26025489.webp',
  },
  {
    label: 'Резервуары РГС (горизонтальные стальные) и РВС',
    to: '/rezervuary',
    icon: 'lucide:cylinder',
    image: '/images/26007519.webp',
  },
  {
    label: 'Силосы для хранения сыпучих материалов',
    to: '/silosy',
    icon: 'lucide:warehouse',
    image: '/images/26025737.webp',
  },
  {
    label: 'Рольганги',
    to: '/rolgang',
    icon: 'lucide:circle-dot-dashed',
    image: '/images/26025724.webp',
  },
  {
    label: 'Металлоконструкции и металлоизделия по чертежам Заказчика',
    to: '/metallokonstruktsii-na-zakaz',
    icon: 'lucide:blocks',
    image: '/images/26025719.webp',
  },
  {
    label: 'Циклоны систем аспирации (пылеудаления)',
    to: '/ciklony',
    icon: 'lucide:wind',
    image: '/images/26007568.webp',
  },
  {
    label: 'Комплектующие к ленточному конвейеру',
    to: '/komplektuyushie-k-konvejeram',
    icon: 'lucide:settings',
    image: '/images/26009358.webp',
  },
  {
    label: 'Затворы для выгрузки сыпучих материалов их бункеров и силосов',
    to: '/shlyuzovyezatvory',
    icon: 'lucide:panel-top-close',
    image: '/images/26025795.webp',
  },
  {
    label: 'Шнеки для конвейеров',
    to: '/shneki-konveera',
    icon: 'lucide:rotate-3d',
    image: '/images/26775297.webp',
  },
  {
    label: 'Элеваторы ковшовые (цепные и ленточные)',
    to: '/elevatory',
    icon: 'lucide:arrow-up-from-line',
    image: '/images/26025838.webp',
  },
  {
    label: 'Конвейеры (транспортеры) скребковые',
    to: '/konveyery-skrebkovye',
    icon: 'lucide:link',
    image: '/images/26009368.webp',
  },
  {
    label: 'Транспортёр для погрузки колотых дров',
    to: '/transporterdlyadrov',
    icon: 'lucide:truck',
    image: '/images/26009373.webp',
  },
];
</script>

<template>
  <section id="catalog" class="content-section site-container home-categories">
    <div class="home-categories__heading">
      <div>
        <h2 class="home-categories__title">Каталог оборудования</h2>
        <p class="home-categories__subtitle">Каталог производимого и поставляемого конвейерного оборудования</p>
      </div>
    </div>
    <div class="home-categories__grid">
      <NuxtLink v-for="category in categories" :key="category.to" class="home-categories__item" :to="category.to">
        <img
          class="home-categories__image"
          :src="category.image"
          :alt="category.label"
          width="720"
          height="480"
          loading="lazy"
          decoding="async"
        />
        <span class="home-categories__shade" aria-hidden="true" />
        <Icon class="home-categories__arrow" name="lucide:arrow-up-right" aria-hidden="true" mode="svg" />
        <span class="home-categories__content">
          <strong class="home-categories__name">{{ category.label }}</strong>
          <span class="home-categories__caption">Открыть раздел каталога</span>
        </span>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
.home-categories {
  &__heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    margin-bottom: 38px;
  }

  &__title {
    margin: 0;
    font-size: clamp(36px, 4vw, 54px);
    letter-spacing: -0.035em;
  }

  &__subtitle {
    max-width: 720px;
    margin: 14px 0 0;
    font-size: 17px;
    line-height: 1.5;
    color: $muted;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  &__item {
    position: relative;
    display: flex;
    align-items: end;
    min-height: 320px;
    padding: 26px;
    overflow: hidden;
    color: #fff;
    text-decoration: none;
    background: $navy;
    border: 1px solid rgb(255 255 255 / 8%);
    border-radius: 20px;
    transition:
      border-color 0.2s,
      box-shadow 0.2s,
      transform 0.2s;

    &:hover {
      border-color: $blue;
      box-shadow: 0 22px 50px rgb(3 35 68 / 12%);
      transform: translateY(-5px);
    }

    &:hover .home-categories__image {
      transform: scale(1.055);
    }
  }

  &__image,
  &__shade {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  &__image {
    object-fit: cover;
    transition: transform 0.55s ease;
  }

  &__shade {
    background: linear-gradient(180deg, rgb(3 22 43 / 22%) 0%, rgb(3 22 43 / 58%) 48%, rgb(3 17 34 / 98%) 100%);
  }

  &__content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 20px;
    padding-right: 48px;
    border-top: 1px solid rgb(255 255 255 / 28%);
  }

  &__name {
    display: block;
    max-width: 340px;
    font-size: 22px;
    font-weight: 750;
    line-height: 1.25;
    color: #fff;
    text-shadow: 0 2px 14px rgb(0 0 0 / 65%);
  }

  &__caption {
    margin-top: 9px;
    font-size: 12px;
    font-weight: 650;
    color: rgb(255 255 255 / 72%);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  &__arrow {
    position: absolute;
    right: 26px;
    bottom: 28px;
    z-index: 1;
    width: 30px;
    height: 30px;
    color: $yellow;
  }
}

@media (max-width: $tablet) {
  .home-categories__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: $phone) {
  .home-categories {
    &__heading {
      flex-direction: column;
      gap: 12px;
      align-items: start;
    }

    &__grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
