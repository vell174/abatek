<script setup lang="ts">
defineProps<{ facts: Array<[string, string]> }>();
</script>

<template>
  <section class="product-facts-03">
    <div class="site-container product-facts-03__grid">
      <article v-for="fact in facts" :key="fact[1]">
        <strong>{{ fact[0] }}</strong>
        <span>{{ fact[1] }}</span>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.product-facts-03 {
  background: var(--page-deep, #052f55);
}

.product-facts-03__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  padding-block: 0;
  background: rgb(255 255 255 / 14%);
}

.product-facts-03 article {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 150px;
  padding: 28px;
  background: var(--page-deep, #052f55);
}

.product-facts-03 strong {
  font-size: clamp(23px, 2.6vw, 36px);
  color: #f5c518;
  letter-spacing: -0.04em;
}

.product-facts-03 span {
  margin-top: 7px;
  font-size: 14px;
  color: rgb(255 255 255 / 72%);
}

@media (width <= $tablet) {
  .product-facts-03__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (width <= $phone) {
  .product-facts-03 article {
    min-height: 125px;
    padding: 20px;
  }
}
</style>
