<template>
  <NuxtLink class="logo" to="/" aria-label="АБАТЭК — главная">
    <span class="logo__sign">A</span>
    <span class="logo__text">
      <b class="logo__name">АБАТЭК</b>
      <small class="logo__caption">конвейерные решения</small>
    </span>
  </NuxtLink>
</template>

<style scoped lang="scss">
.logo {
  display: inline-flex;
  gap: 11px;
  align-items: center;
  color: $blue;
  text-decoration: none;

  &__sign {
    display: grid;
    place-items: center;
    width: 38px;
    aspect-ratio: 1;
    font-weight: 900;
    border: 6px solid $yellow;
    border-right-color: $blue;
    border-radius: 50%;
  }

  &__name,
  &__caption {
    display: block;
  }

  &__name {
    font-size: 29px;
    letter-spacing: 0.06em;
  }

  &__caption {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.14em;
  }
}
</style>
