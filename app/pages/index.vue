<script setup lang="ts">
import { seo } from '~/data/pages/glavnaya/seo';

usePageSeo(seo);

// LCP-изображение первого экрана задаётся фоном в CSS — форсируем ранний запрос.
// Мобильным отдаём облегчённый вариант, чтобы не тратить полосу на 1600px.
useHead({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: '/images/home-hero-welding-2026-mobile.webp',
      type: 'image/webp',
      media: '(max-width: 700px)',
      fetchpriority: 'high',
    },
    {
      rel: 'preload',
      as: 'image',
      href: '/images/home-hero-welding-2026.webp',
      type: 'image/webp',
      media: '(min-width: 701px)',
      fetchpriority: 'high',
    },
  ],
});
</script>
<template>
  <div>
    <HomeHero />
    <HomeTrust />
    <LazyHomeCategories hydrate-on-visible />
    <LazyHomeStatement hydrate-on-visible />
    <LazyHomeProcess hydrate-on-visible />
    <LazyHomeProjects hydrate-on-visible />
  </div>
</template>
