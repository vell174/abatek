<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <div>
    <PageHeroSection_01 eyebrow="Правовая информация" :title="title" :text="description" />
    <section class="legal-document content-section">
      <article class="site-container legal-document__content">
        <p class="legal-document__updated">Дата публикации: 14 августа 2026 года</p>
        <slot />
      </article>
    </section>
  </div>
</template>

<style scoped lang="scss">
.legal-document {
  background: $soft;

  &__content {
    max-width: 920px;
    padding: clamp(28px, 5vw, 58px);
    background: #fff;
    border: 1px solid rgb(0 41 79 / 9%);
    border-radius: 16px;
    box-shadow: 0 14px 42px rgb(0 29 57 / 7%);
  }

  &__updated {
    padding-bottom: 22px;
    margin: 0 0 30px;
    font-size: 13px;
    color: $muted;
    border-bottom: 1px solid rgb(0 41 79 / 10%);
  }

  :deep(h2) {
    margin: 38px 0 14px;
    font-size: clamp(22px, 3vw, 30px);
    color: $navy;
  }

  :deep(h2:first-of-type) {
    margin-top: 0;
  }

  :deep(p),
  :deep(li) {
    font-size: 15px;
    line-height: 1.75;
    color: #40566a;
  }

  :deep(ul) {
    padding-left: 22px;
  }

  :deep(a) {
    font-weight: 700;
    color: $blue;
  }
}
</style>
