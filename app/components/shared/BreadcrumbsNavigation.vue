<script setup lang="ts">
import { Primitive } from 'reka-ui';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

defineProps<{ items: BreadcrumbItem[] }>();
</script>

<template>
  <Primitive as="nav" class="breadcrumbs" aria-label="Хлебные крошки">
    <Primitive as="ol" class="breadcrumbs__list">
      <Primitive v-for="(item, index) in items" :key="`${item.label}-${index}`" as="li" class="breadcrumbs__item">
        <NuxtLink v-if="item.to" :to="item.to">{{ item.label }}</NuxtLink>
        <Primitive v-else as="span" aria-current="page">{{ item.label }}</Primitive>
        <Icon v-if="index < items.length - 1" name="lucide:chevron-right" mode="svg" aria-hidden="true" />
      </Primitive>
    </Primitive>
  </Primitive>
</template>

<style scoped lang="scss">
.breadcrumbs__list {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  align-items: center;
  min-width: 0;
  padding: 0;
  margin: 0;
  list-style: none;
}

.breadcrumbs__item {
  display: inline-flex;
  gap: 7px;
  align-items: center;
  min-width: 0;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.4;
  color: $muted;
}

.breadcrumbs__item a {
  color: #0757a4;
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumbs__item a:hover {
  color: #052f55;
}

.breadcrumbs__item :deep(svg) {
  flex: 0 0 auto;
  width: 14px;
  height: 14px;
  color: #0757a4;
  stroke-width: 2;
}

.breadcrumbs__item [aria-current='page'] {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (width <= $phone) {
  .breadcrumbs__item:last-child {
    max-width: 100%;
  }

  .breadcrumbs__item [aria-current='page'] {
    overflow-wrap: anywhere;
    white-space: normal;
  }
}
</style>
