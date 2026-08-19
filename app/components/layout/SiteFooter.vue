<template>
  <footer class="footer">
    <div class="site-container footer__main">
      <div class="footer__company">
        <AppLogo />
        <p class="footer__description">
          Производство и поставка
          <br />
          конвейерного оборудования.
        </p>
      </div>
      <div class="footer__column">
        <h3 class="footer__title">Оборудование</h3>
        <NuxtLink class="footer__link" to="/#catalog">Каталог</NuxtLink>
        <NuxtLink class="footer__link" to="/primery-rabot">Примеры работ</NuxtLink>
      </div>
      <div class="footer__column">
        <h3 class="footer__title">Компания</h3>
        <NuxtLink class="footer__link" to="/o-kompanii">О компании</NuxtLink>
        <NuxtLink class="footer__link" to="/kontakty">Контакты</NuxtLink>
        <NuxtLink class="footer__link" to="/politika-konfidencialnosti">Конфиденциальность</NuxtLink>
        <NuxtLink class="footer__link" to="/obrabotka-personalnyh-dannyh">Обработка данных</NuxtLink>
        <NuxtLink class="footer__link" to="/politika-fajlov-kuki">Cookie</NuxtLink>
      </div>
      <div class="footer__column">
        <h3 class="footer__title">Связаться</h3>
        <a class="footer__link" href="tel:89511172210">
          8 (951) 117-22-10
          <small class="footer__phone-note">WhatsApp, Viber</small>
        </a>
        <a class="footer__link" href="tel:88005051915">
          8 (800) 505-19-15
          <small class="footer__phone-note">бесплатный номер</small>
        </a>
        <a class="footer__link" href="mailto:zakaz@abatek.ru">zakaz@abatek.ru</a>
        <small class="footer__note">Заявки круглосуточно</small>
      </div>
    </div>
    <div class="site-container footer__bottom">
      <span class="footer__copyright">© 2026 АБАТЭК</span>
      <span class="footer__caption">Промышленное конвейерное оборудование</span>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  padding: 46px 0 18px;
  color: #aebed0;
  background: #001d39;

  &__main {
    display: grid;
    grid-template-columns: 1.5fr repeat(3, 1fr);
    gap: 50px;
  }

  &__title {
    margin: 0 0 18px;
    font-size: 13px;
    color: #fff;
  }

  &__description,
  &__link,
  &__note {
    display: block;
    margin: 6px 0;
    font-size: 12px;
    line-height: 1.7;
    text-decoration: none;
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    margin-top: 40px;
    font-size: 10px;
    border-top: 1px solid rgb(255 255 255 / 10%);
  }

  &__phone-note {
    margin-left: 5px;
    color: #7f96aa;
  }
}

:deep(.logo) {
  color: #fff;
}

@media (max-width: $phone) {
  .footer {
    &__main {
      grid-template-columns: 1fr;
      gap: 26px;
    }

    &__bottom {
      flex-direction: column;
      gap: 8px;
    }
  }
}
</style>
