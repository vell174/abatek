<script setup lang="ts">
const model = defineModel<boolean>({ default: false });
const inputId = useId();

withDefaults(
  defineProps<{
    name?: string;
    value?: string;
    required?: boolean;
    disabled?: boolean;
  }>(),
  {
    name: undefined,
    value: 'on',
    required: false,
    disabled: false,
  },
);
</script>

<template>
  <label class="ui-checkbox" :for="inputId" :data-disabled="disabled ? '' : undefined">
    <input
      :id="inputId"
      v-model="model"
      class="ui-checkbox__control"
      type="checkbox"
      :name="name"
      :value="value"
      :required="required"
      :disabled="disabled"
    />
    <span class="ui-checkbox__label"><slot /></span>
  </label>
</template>

<style scoped lang="scss">
.ui-checkbox {
  display: inline-flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;

  &[data-disabled] {
    cursor: not-allowed;
    opacity: 0.55;
  }

  &__control {
    flex: 0 0 auto;
    width: 24px;
    height: 24px;
    margin: 0;
    appearance: none;
    cursor: pointer;
    background: #fff;
    border: 2px solid rgb(255 255 255 / 55%);
    border-radius: 5px;

    &::after {
      display: block;
      width: 7px;
      height: 12px;
      margin: 2px 0 0 6px;
      content: '';
      border: solid $navy;
      border-width: 0 2px 2px 0;
      opacity: 0;
      transform: rotate(45deg);
    }

    &:checked {
      background: $yellow;
      border-color: $yellow;
    }

    &:checked::after {
      opacity: 1;
    }

    &:focus-visible {
      outline: 3px solid $yellow;
      outline-offset: 3px;
    }
  }

  &__label {
    line-height: 1.4;
  }
}
</style>
