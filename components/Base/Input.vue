<template>
  <input
    :id="idx"
    :name="name"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :value="modelValue"
    @input="input"
    @focus="focus"
    @blur="blur"
  />
</template>

<script setup lang="ts">
import type { BaseInputValue, BaseInputType } from "~/types/base";

type BaseInputProps = {
  idx: string;
  name: string;
  modelValue: BaseInputValue;
  type?: BaseInputType;
  placeholder?: string;
  disabled?: boolean;
};

defineOptions({
  name: "BaseInput",
});

withDefaults(defineProps<BaseInputProps>(), {
  idx: "",
  name: "",
  modelValue: null,
  type: "text",
  placeholder: "",
  disabled: false,
});

const emit = defineEmits<{
  "update:model-value": [value: BaseInputValue];
  focus: [];
  blur: [];
}>();

const input = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:model-value", target.value);
};
const focus = () => {
  emit("focus");
};
const blur = () => {
  emit("blur");
};
</script>

<style scoped lang="scss">
input {
  position: relative;
  display: block;
  width: 100%;
  height: 36px;
  padding: 8px;
  font-family: $main-font;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  letter-spacing: -0.28px;
  color: $color-grey-200;
  outline: none;
  border: none;
  background-color: transparent;
}
</style>
