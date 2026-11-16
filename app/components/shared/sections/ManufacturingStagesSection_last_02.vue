<script setup lang="ts">
withDefaults(defineProps<{ title: string; items: string[]; note?: string; eyebrow?: string }>(), {
  eyebrow: 'Производственный цикл',
  note: '',
});
</script>
<template>
  <section class="manufacturing-stages">
    <div class="manufacturing-stages__inner site-container">
      <header>
        <div>
          <p class="manufacturing-stages__eyebrow">{{ eyebrow }}</p>
          <h2>{{ title }}</h2>
        </div>
        <p v-if="note" class="manufacturing-stages__note">{{ note }}</p>
      </header>
      <ol>
        <li v-for="(item, index) in items" :key="item">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <p>{{ item }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
<style scoped lang="scss">
.manufacturing-stages {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #dcebf8 0%, #e7f1fa 52%, #d6e8f7 100%);
}

.manufacturing-stages::before,
.manufacturing-stages::after {
  position: absolute;
  pointer-events: none;
  content: '';
  border: 1px solid rgb(7 87 164 / 9%);
  border-radius: 50%;
}

.manufacturing-stages::before {
  top: -190px;
  right: -110px;
  width: 430px;
  height: 430px;
  box-shadow:
    0 0 0 42px rgb(7 87 164 / 2.5%),
    0 0 0 84px rgb(7 87 164 / 1.5%);
}

.manufacturing-stages::after {
  bottom: -150px;
  left: -100px;
  width: 300px;
  height: 300px;
}

.manufacturing-stages__inner {
  position: relative;
  z-index: 1;
  padding-block: 56px;
}

.manufacturing-stages header {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(260px, 0.65fr);
  gap: clamp(24px, 4vw, 56px);
  align-items: end;
}

.manufacturing-stages__eyebrow {
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 900;
  color: $blue;
  text-transform: uppercase;
  letter-spacing: 0.16em;
}

.manufacturing-stages h2 {
  max-width: 900px;
  margin: 0;
  font-size: var(--section-heading-size);
  line-height: var(--section-heading-leading);
  color: $ink;
  letter-spacing: -0.045em;
}

.manufacturing-stages__note {
  padding: 10px 0 10px 18px;
  margin: 0;
  font-weight: 650;
  line-height: 1.5;
  color: $ink;
  border-left: 4px solid $yellow;
}

.manufacturing-stages ol {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 0;
  margin: 28px 0 0;
  list-style: none;
}

.manufacturing-stages li {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  padding: 16px;
  background: #fff;
  border: 1px solid rgb(7 87 164 / 10%);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgb(3 35 68 / 5%);
}

.manufacturing-stages li span {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  font-size: 12px;
  font-weight: 900;
  color: $navy;
  background: #e2effb;
  border: 1px solid rgb(7 87 164 / 22%);
  border-radius: 50%;
}

.manufacturing-stages li p {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.45;
  color: $ink;
}

@media (width <= $tablet) {
  .manufacturing-stages header {
    grid-template-columns: 1fr;
  }

  .manufacturing-stages ol {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (width <= $phone) {
  .manufacturing-stages__inner {
    padding-block: 40px;
  }

  .manufacturing-stages header {
    gap: 16px;
  }

  .manufacturing-stages ol {
    grid-template-columns: 1fr;
    margin-top: 20px;
  }
}
</style>
