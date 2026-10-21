<script setup lang="ts">
defineProps<{
  title: string;
  links: Array<{ label: string; to: string; description: string }>;
}>();
</script>

<template>
  <section class="related-product-links content-section site-container" :aria-label="title">
    <h2 class="related-product-links__title">{{ title }}</h2>
    <nav class="related-product-links__list" :aria-label="title">
      <NuxtLink v-for="link in links" :key="link.to" class="related-product-links__link" :to="link.to">
        <span class="related-product-links__label">{{ link.label }}</span>
        <span class="related-product-links__description">{{ link.description }}</span>
        <span class="related-product-links__arrow" aria-hidden="true">↗</span>
      </NuxtLink>
    </nav>
  </section>
</template>

<style scoped lang="scss">
@use '~/assets/styles/mixins' as *;

.related-product-links {
  &__title {
    margin: 0 0 24px;
    font-size: clamp(26px, 3vw, 38px);
    line-height: 1.2;
    color: $ink;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  &__link {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 140px;
    padding: 24px 56px 24px 24px;
    color: $ink;
    text-decoration: none;
    background: $soft;
    border: 1px solid $line;
    border-radius: 16px;
    transition:
      border-color 0.2s ease,
      transform 0.2s ease;

    &:hover {
      border-color: $blue;
      transform: translateY(-2px);
    }

    &:focus-visible {
      outline: 3px solid $blue;
      outline-offset: 3px;
    }
  }

  &__label {
    font-size: 20px;
    font-weight: 700;
    line-height: 1.3;
  }

  &__description {
    font-size: 14px;
    line-height: 1.55;
    color: $muted;
  }

  &__arrow {
    position: absolute;
    top: 24px;
    right: 24px;
    font-size: 22px;
    line-height: 1;
    color: $blue;
  }
}

@include phone {
  .related-product-links {
    &__list {
      grid-template-columns: 1fr;
    }
  }
}
</style>
