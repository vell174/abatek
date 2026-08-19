<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot, Label } from 'reka-ui';

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
  <Label class="ui-checkbox" :for="inputId" :data-disabled="disabled ? '' : undefined">
    <CheckboxRoot
      :id="inputId"
      v-model="model"
      class="ui-checkbox__control"
      :name="name"
      :value="value"
      :required="required"
      :disabled="disabled"
    >
      <CheckboxIndicator class="ui-checkbox__indicator">
        <Icon name="lucide:check" size="21" aria-hidden="true" mode="svg" />
      </CheckboxIndicator>
    </CheckboxRoot>
    <span class="ui-checkbox__label"><slot /></span>
  </Label>
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
    display: grid;
    flex: 0 0 auto;
    place-items: center;
    width: 24px;
    height: 24px;
    padding: 0;
    color: $navy;
    cursor: pointer;
    background: #fff;
    border: 2px solid rgb(255 255 255 / 55%);
    border-radius: 5px;

    &[data-state='checked'] {
      background: $yellow;
      border-color: $yellow;
    }
  }

  &__indicator {
    display: grid;
    place-items: center;
    width: 21px;
    height: 21px;
    font-size: 21px;
  }

  &__label {
    line-height: 1.4;
  }
}
</style>
