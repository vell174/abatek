<script setup lang="ts">
import { Primitive } from 'reka-ui';
import { vMaska } from 'maska/vue';

const model = defineModel<string>();

withDefaults(
  defineProps<{
    type?: 'text' | 'tel' | 'email' | 'password' | 'search' | 'url';
    /** Маска maska: строка, массив вариантов или функция от введённого значения */
    mask?: string | string[] | ((value: string) => string);
  }>(),
  {
    type: 'text',
    mask: undefined,
  },
);

function updateValue(event: Event) {
  model.value = (event.target as HTMLInputElement).value;
}
</script>

<template>
  <Primitive
    v-if="mask"
    v-maska="{ mask }"
    as="input"
    class="ui-input"
    :type="type"
    :value="model"
    @input="updateValue"
  />
  <Primitive v-else as="input" class="ui-input" :type="type" :value="model" @input="updateValue" />
</template>

<style scoped lang="scss">
.ui-input {
  width: 100%;
  min-height: 47px;
  padding: 12px;
  font-size: 14px;
  color: $ink;
  background: #fff;
  border: 1px solid rgb(0 41 79 / 18%);
  border-radius: 6px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    border-color: $blue;
    box-shadow: 0 0 0 3px rgb(0 110 184 / 13%);
  }

  &::placeholder {
    color: #7d8b98;
    opacity: 1;
  }

  &:disabled {
    cursor: not-allowed;
    background: #edf1f4;
    opacity: 0.7;
  }
}
</style>
