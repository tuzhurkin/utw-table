<template>
  <label :for="idx" class="search" :class="{ focused }">
    <BaseInput
      :idx="idx"
      :name="name"
      :type="type"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :disabled="disabled"
      :model-value="modelValue"
      @update:model-value="updateModelValue"
      @focus="focus"
      @blur="blur"
    />
    <Transition name="clear">
      <div v-show="!!modelValue" class="clear-btn">
        <BaseButton type="texted" icon="close" @click="onClearButtonClick" />
      </div>
    </Transition>
    <!-- <BaseButton
      type="primary yellow"
      icon="search"
      class="search-btn"
      :disabled="!modelValue"
      @click="onSearchButtonClick"
    /> -->
  </label>
</template>

<script setup lang="ts">
import type { BaseInputType, BaseInputValue } from "~/types/base";

type BaseSearchProps = {
  idx: string;
  name: string;
  modelValue: BaseInputValue;
  placeholder: string;
  type?: BaseInputType;
  autocomplete?: string;
  disabled?: boolean;
};

defineOptions({
  name: "BaseSearch",
});

const props = withDefaults(defineProps<BaseSearchProps>(), {
  idx: "",
  name: "",
  type: "text",
  modelValue: null,
  placeholder: "",
  autocomplete: "off",
  disabled: false,
});

const emit = defineEmits<{
  "update:model-value": [value: BaseInputValue, idx: string];
  focus: [];
  blur: [];
  search: [value: BaseInputValue];
}>();
const focused = ref(false);

const updateModelValue = (value: BaseInputValue) => {
  emit("update:model-value", value, props.idx);
};

const focus = () => {
  focused.value = true;
  emit("focus");
};

const blur = () => {
  if (!props.modelValue) focused.value = false;
};

const onClearButtonClick = () => {
  emit("update:model-value", "", props.idx);
};

// const onSearchButtonClick = () => {
//   emit("search", props.modelValue);
// };

watch(
  () => props.modelValue,
  value => {
    focused.value = Boolean(value);
  }
);
</script>

<style scoped lang="scss">
.clear-enter-active,
.clear-leave-active {
  transition: opacity 0.1s ease;
}
.clear-enter-from,
.clear-leave-to {
  opacity: 0;
}

.search {
  position: relative;
  display: flex;
  align-items: center;
  column-gap: 16px;
  transition: border-color $transition ease;

  &.focused {
    :deep(input) {
      border-color: $color-yellow-hover;
    }
  }

  :deep(input) {
    height: 56px;
    // padding: 8px 60px 8px 24px;
    padding: 8px 24px;
    border-radius: 50px;
    color: $color-grey-200;
    border: 2px solid $color-yellow;
    background-color: $color-grey-800;
    transition: border-color $transition ease;
  }

  .clear-btn {
    position: absolute;
    right: 20px; // 90px;
    top: 50%;
    transform: translate(0, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;

    :deep(.btn) {
      width: 32px;
      height: 32px;
      padding: 0;
      border-radius: 50px;

      .icon {
        width: 20px;
        height: 20px;
      }
    }
  }

  :deep(.search-btn) {
    width: 56px;
    height: 56px;
    padding: 0;
    border-radius: 50px;

    .icon {
      path,
      rect,
      circle {
        stroke-width: 2;
      }
    }
  }
}
</style>
