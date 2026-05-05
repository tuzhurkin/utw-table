<template>
  <input
    :id="idx"
    ref="input"
    :name="name"
    :type="type"
    :autocomplete="autocomplete"
    :placeholder="placeholder"
    :disabled="disabled"
    :value="modelValue"
    :min="min"
    :max="max"
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
  type: BaseInputType;
  modelValue: BaseInputValue;
  placeholder: string;
  autocomplete: string;
  disabled: boolean;
  min?: number;
  max?: number;
};

defineOptions({
  name: "BaseInput",
});

const props = withDefaults(defineProps<BaseInputProps>(), {
  idx: "",
  name: "",
  type: "text",
  autocomplete: "off",
  placeholder: "",
  modelValue: null,
  disabled: false,
  min: undefined,
  max: undefined,
});

const emit = defineEmits<{
  "update:model-value": [value: BaseInputValue];
  focus: [];
  blur: [];
}>();

const isNumberInputValid = (value: BaseInputValue): boolean => {
  if (!(props.type === "number" && value !== "")) return false;

  const numValue = Number(value);
  if (isNaN(numValue)) return false;
  if (props.max !== undefined && numValue > props.max) return false;
  if (props.min !== undefined && numValue < props.min) return false;
  return true;
};

const input = (event: Event) => {
  const target = event.target;
  let value = (target as HTMLInputElement).value;

  if (props.type === "number") {
    if (!isNumberInputValid(value)) {
      (target as HTMLInputElement).value = props.modelValue as string;
      return;
    }
  }

  emit("update:model-value", value);
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
  color: $color-black;
  outline: none;
  border: none;
  background-color: transparent;
}
</style>
