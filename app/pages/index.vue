<script setup lang="ts">
import { seo } from '~/data/pages/glavnaya/seo';

usePageSeo(seo);
</script>
<template>
  <div>
    <HomeHero />
    <HomeTrust />
    <HomeCategories />
    <HomeStatement />
    <HomeProcess />
    <HomeProjects />
  </div>
</template>
