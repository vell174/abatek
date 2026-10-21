<script setup lang="ts">
import type { GalleryImage } from '~/data/pages/_shared/types';

withDefaults(
  defineProps<{
    title: string;
    columns: string[];
    rows?: string[][];
    groupHeaders?: Array<{ label: string; colspan?: number; rowspan?: number }>;
    groups?: Array<{ label: string; description: string; image: GalleryImage; rows: string[][] }>;
    eyebrow?: string;
    tone?: 'white' | 'soft';
    compact?: boolean;
  }>(),
  {
    eyebrow: 'Типовые модели',
    tone: 'white',
    compact: false,
    rows: () => [],
    groupHeaders: () => [],
    groups: () => [],
  },
);
</script>
<template>
  <section
    class="specs-section"
    :class="[`specs-section--${tone}`, { 'specs-section--compact': compact, 'specs-section--grouped': groups?.length }]"
  >
    <div :class="compact ? 'specs-section__inner' : 'content-section site-container'">
      <p>{{ eyebrow }}</p>
      <h4 v-if="compact">{{ title }}</h4>
      <h2 v-else>{{ title }}</h2>
      <div>
        <table>
          <colgroup v-if="groups?.length">
            <col class="specs-section__column specs-section__column--type" />
            <col class="specs-section__column specs-section__column--sketch" />
            <col v-for="column in columns" :key="column" class="specs-section__column" />
            <col class="specs-section__column specs-section__column--capacity" />
          </colgroup>
          <thead>
            <tr v-if="groupHeaders?.length">
              <th
                v-for="header in groupHeaders"
                :key="header.label"
                :colspan="header.colspan ?? 1"
                :rowspan="header.rowspan ?? 1"
                :scope="header.colspan ? 'colgroup' : 'col'"
              >
                {{ header.label }}
              </th>
            </tr>
            <tr>
              <th v-for="column in columns" :key="column">{{ column }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="group in groups" :key="group.label">
              <tr v-for="(row, rowIndex) in group.rows" :key="`${group.label}-${rowIndex}`">
                <th
                  v-if="rowIndex === 0"
                  class="specs-section__group-label"
                  :rowspan="group.rows.length"
                  scope="rowgroup"
                >
                  <span class="specs-section__group-symbol">{{ group.label }}</span>
                  <span class="specs-section__group-description">({{ group.description }})</span>
                </th>
                <td v-if="rowIndex === 0" class="specs-section__group-image" :rowspan="group.rows.length">
                  <img
                    class="specs-section__sketch"
                    :src="group.image.src"
                    :alt="group.image.alt"
                    :width="group.image.width"
                    :height="group.image.height"
                    loading="lazy"
                    decoding="async"
                  />
                </td>
                <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
              </tr>
            </template>
            <tr v-for="(row, i) in rows" :key="i">
              <td v-for="(cell, j) in row" :key="j">{{ cell }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
.specs-section {
  background: #fff;
}

.specs-section--soft {
  background: $soft;
}

.specs-section--compact {
  margin-top: 28px;
  background: transparent;
}

.specs-section--compact h4 {
  margin: 0 0 18px;
  font-size: 22px;
  line-height: 1.2;
  color: $ink;
}

.specs-section p {
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 900;
  color: $blue;
  text-transform: uppercase;
  letter-spacing: 0.16em;
}

.specs-section h2 {
  max-width: 900px;
  margin: 0 0 38px;
  font-size: clamp(30px, 4vw, 54px);
  line-height: 1.07;
  color: $ink;
  letter-spacing: -0.045em;
}

.specs-section > div > div {
  overflow-x: auto;
  border: 1px solid $line;
  border-radius: 14px;
}

.specs-section table {
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
}

.specs-section th,
.specs-section td {
  padding: 15px 14px;
  text-align: left;
  border-bottom: 1px solid $line;
}

.specs-section thead th {
  font-size: 12px;
  color: #fff;
  background: $navy;
}

.specs-section:not(.specs-section--grouped) td:first-child {
  font-weight: 800;
  color: $blue;
}

.specs-section tbody tr:nth-child(even) {
  background: $soft;
}

.specs-section--grouped tbody tr:nth-child(odd) {
  background: #fff;
}

.specs-section--grouped table {
  min-width: 980px;
  table-layout: fixed;
}

.specs-section--grouped thead th {
  overflow-wrap: anywhere;
}

.specs-section--grouped tbody th,
.specs-section--grouped tbody td {
  padding: 8px 12px;
}

.specs-section__column--type {
  width: 120px;
}

.specs-section__column--sketch {
  width: 352px;
}

.specs-section__column--capacity {
  width: 110px;
}

.specs-section__group-label {
  font-size: 18px;
  font-weight: 800;
  vertical-align: middle;
  color: $blue;
  background: #fff;
}

.specs-section__group-symbol {
  display: block;
  margin-bottom: 12px;
  text-align: center;
}

.specs-section__group-description {
  display: block;
  width: max-content;
  margin: 0 auto;
  white-space: nowrap;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

.specs-section__group-image {
  vertical-align: top;
  background: #fff;
}

.specs-section__sketch {
  position: sticky;
  top: 24px;
  display: block;
  width: 320px;
  max-width: none;
  height: auto;
}
</style>
