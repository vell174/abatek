<script setup lang="ts">
const contacts = [
  { label: 'WhatsApp, Viber', value: '8 (951) 117-22-10', href: 'tel:89511172210', icon: 'lucide:message-circle' },
  {
    label: 'Бесплатный номер',
    value: '8 (800) 505-19-15',
    href: 'tel:88005051915',
    icon: 'lucide:phone-call',
  },
  { label: 'Электронная почта', value: 'zakaz@abatek.ru', href: 'mailto:zakaz@abatek.ru', icon: 'lucide:mail' },
];
</script>
<template>
  <section class="content-section site-container contacts">
    <a v-for="contact in contacts" :key="contact.value" class="contacts__item" :href="contact.href">
      <span class="contacts__topline">
        <Icon :name="contact.icon" aria-hidden="true" mode="svg" />
        <span class="contacts__label">{{ contact.label }}</span>
      </span>
      <strong class="contacts__value">{{ contact.value }}</strong>
    </a>
    <div class="contacts__item">
      <span class="contacts__topline">
        <Icon name="lucide:clock-3" aria-hidden="true" mode="svg" />
        <span class="contacts__label">Режим приёма заявок</span>
      </span>
      <strong class="contacts__value">Круглосуточно</strong>
    </div>
    <div class="contacts__item contacts__item--wide">
      <span class="contacts__topline">
        <Icon name="lucide:map-pin" aria-hidden="true" mode="svg" />
        <span class="contacts__label">Адрес</span>
      </span>
      <strong class="contacts__value contacts__value--small">
        г. Челябинск, ул. Енисейская, Индустриальный парк «Станкомаш»
      </strong>
    </div>
    <div class="contacts__item contacts__item--wide contacts__item--legal">
      <span class="contacts__topline">
        <Icon name="lucide:building-2" aria-hidden="true" mode="svg" />
        <span class="contacts__label">Реквизиты</span>
      </span>
      <strong class="contacts__value contacts__value--small">ООО «АБАТЭК»</strong>
      <span class="contacts__legal-line">ИНН 7448222190 · КПП 744801001 · ОГРН 744801001</span>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contacts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding-block: clamp(70px, 8vw, 120px) 30px;

  &__item {
    display: flex;
    flex-direction: column;
    min-height: 195px;
    padding: 30px;
    text-decoration: none;
    background: linear-gradient(145deg, #fff 0%, #f5f8fc 100%);
    border: 1px solid rgb(7 87 164 / 16%);
    border-radius: 4px;
    box-shadow: 0 12px 28px rgb(0 41 79 / 6%);
    transition: 0.25s ease;

    &:hover {
      background: $navy;
      border-color: $navy;

      .contacts__label,
      .contacts__legal-line {
        color: #9fb3c6;
      }

      .contacts__value {
        color: #fff;
      }
    }

    &--wide {
      grid-column: 1 / -1;
      min-height: 145px;
    }

    &--legal {
      min-height: 125px;
    }
  }

  &__label {
    font-size: 14px;
    font-weight: 700;
    color: $muted;
  }

  &__topline {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: auto;

    svg {
      width: 19px;
      height: 19px;
      color: $yellow;
    }
  }

  &__value {
    font-size: clamp(28px, 3.5vw, 44px);
    line-height: 1.08;
    letter-spacing: -0.035em;

    &--small {
      font-size: clamp(22px, 2.8vw, 34px);
      line-height: 1.2;
    }
  }

  &__legal-line {
    margin-top: 8px;
    font-size: 14px;
    color: $muted;
  }
}

@media (max-width: $phone) {
  .contacts {
    grid-template-columns: 1fr;

    &__item--wide {
      grid-column: auto;
    }
  }
}
</style>
