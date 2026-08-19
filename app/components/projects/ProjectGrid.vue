<script setup lang="ts">
import { projects } from '~/data/projects';
</script>
<template>
  <div class="project-grid">
    <article v-for="(project, index) in projects" :key="project.title" class="project-grid__item">
      <div class="project-grid__media">
        <img
          class="project-grid__image"
          :src="project.image"
          :alt="project.title"
          width="720"
          height="540"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="project-grid__content">
        <span class="project-grid__index">{{ String(index + 1).padStart(2, '0') }}</span>
        <h2 class="project-grid__title">{{ project.title }}</h2>
      </div>
    </article>
  </div>
</template>

<style scoped lang="scss">
.project-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;

  &__item {
    overflow: hidden;
    background: #fff;
    border: 1px solid rgb(0 41 79 / 9%);
    border-radius: 16px;
    box-shadow: 0 10px 28px rgb(0 29 57 / 7%);
    transition:
      box-shadow 0.3s ease,
      transform 0.3s ease;
  }

  &__item:hover {
    box-shadow: 0 18px 38px rgb(0 29 57 / 12%);
    transform: translateY(-4px);
  }

  &__media {
    position: relative;
    display: grid;
    place-items: center;
    aspect-ratio: 3 / 2;
    overflow: hidden;
    background: #dce5ec;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.45s ease;
  }

  &__item:hover &__image {
    transform: scale(1.02);
  }

  &__content {
    position: relative;
    min-height: 118px;
    padding: 22px 22px 24px 78px;
    color: $navy;
    background: #fff;
  }

  &__title {
    margin: 0;
    font-size: clamp(16px, 1.25vw, 19px);
    line-height: 1.3;
    text-wrap: balance;
  }

  &__index {
    position: absolute;
    top: 22px;
    left: 22px;
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    font-size: 13px;
    font-weight: 900;
    color: $navy;
    background: $yellow;
    border-radius: 50%;
  }
}

@media (max-width: $phone) {
  .project-grid {
    grid-template-columns: 1fr;
  }

  .project-grid__content {
    min-height: 0;
    padding: 20px 20px 22px 74px;
  }

  .project-grid__index {
    top: 19px;
    left: 20px;
  }
}
</style>
