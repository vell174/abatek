<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import { Primitive } from 'reka-ui';

withDefaults(
  defineProps<
    PrimitiveProps & {
      type?: 'button' | 'submit' | 'reset';
      disabled?: boolean;
      variant?: 'primary' | 'secondary';
      size?: 'medium' | 'large';
      rounded?: 'default' | 'pill';
    }
  >(),
  {
    as: 'button',
    type: 'button',
    disabled: false,
    variant: 'primary',
    size: 'medium',
    rounded: 'default',
  },
);
</script>

<template>
  <Primitive
    class="ui-button"
    :class="[`ui-button--${variant}`, `ui-button--${size}`, `ui-button--rounded-${rounded}`]"
    :as="as"
    :as-child="asChild"
    :type="as === 'button' ? type : undefined"
    :disabled="disabled"
  >
    <slot />
  </Primitive>
</template>

<style scoped lang="scss">
.ui-button {
  display: inline-flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding-inline: 24px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 7px;
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  &--primary {
    color: $navy;
    background: $yellow;
    border-color: $yellow;

    &:hover:not(:disabled) {
      box-shadow: 0 10px 24px rgba($yellow, 0.26);
    }
  }

  &--secondary {
    color: #fff;
    background: $navy;
    border-color: $navy;
  }

  &--large {
    min-height: 58px;
    padding-inline: 30px;
    font-size: 16px;
  }

  &--rounded-pill {
    border-radius: 999px;
  }
}
</style>
