<script setup lang="ts">
withDefaults(
  defineProps<{ title: string; columns: string[]; rows: string[][]; eyebrow?: string; tone?: 'white' | 'soft' }>(),
  { eyebrow: 'Типовые модели', tone: 'white' },
);
</script>
<template>
  <section class="specs-section" :class="`specs-section--${tone}`">
    <div class="content-section site-container">
      <p>{{ eyebrow }}</p>
      <h2>{{ title }}</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th v-for="column in columns" :key="column">{{ column }}</th>
            </tr>
          </thead>
          <tbody>
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

.specs-section th {
  font-size: 12px;
  color: #fff;
  background: $navy;
}

.specs-section td:first-child {
  font-weight: 800;
  color: $blue;
}

.specs-section tbody tr:nth-child(even) {
  background: $soft;
}
</style>
