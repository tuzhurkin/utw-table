<template>
  <div
    v-on-click-outside="onClickOutside"
    class="select"
    :class="[{ default: isDefault, active: open, focused, disabled }]"
  >
    <div class="trigger" :tabindex="disabled ? -1 : 0" @click="toggle">
      <span class="value">{{ displayValue }}</span>
      <BaseIcon name="chevron-down" />
    </div>
    <Transition name="options">
      <div v-show="open" class="options-box">
        <ul class="options">
          <li
            v-if="showAllOption"
            class="option all"
            @click="selectOption({ value: null, text: showAllOption })"
          >
            {{ showAllOption }}
          </li>
          <li
            v-for="option in options"
            :key="option.value ?? undefined"
            class="option"
            :class="{ selected: isSelected(option.value) }"
            @click="selectOption(option)"
          >
            {{ option.text }}
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";
import type { BaseSelectValue, BaseSelectOption, OptionValue } from "~/types/base";

type BaseSelectProps = {
  idx: string;
  name: string;
  modelValue: BaseSelectValue;
  options: BaseSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  focused?: boolean;
  triggerText?: string;
  showAllOption?: string | null;
};

defineOptions({
  name: "BaseSelect",
});

const props = withDefaults(defineProps<BaseSelectProps>(), {
  idx: "",
  name: "",
  modelValue: null,
  options: () => [],
  placeholder: "",
  disabled: false,
  focused: false,
  triggerText: "",
  showAllOption: null,
});

const emit = defineEmits<{
  "update:model-value": [value: BaseSelectValue, idx: string];
  change: [option: BaseSelectOption];
}>();

const open = ref(false);

const isSelected = (value: OptionValue) => {
  return props.modelValue === value;
};

const isDefault = computed(() => {
  return props.modelValue === null;
});

const displayValue = computed(() => {
  if (!props.modelValue) return props.placeholder || "";
  const selected = props.options.find(option => String(option.value) === String(props.modelValue));
  const text = props.triggerText
    ? `${props.triggerText} ${selected?.text || ""}`
    : selected?.text || "";
  return text;
});

const toggle = () => {
  if (props.disabled) return;

  open.value = !open.value;
};

const onClickOutside = () => {
  if (open.value) open.value = false;
};

const selectOption = (option: BaseSelectOption) => {
  emit("update:model-value", option.value, props.idx);
  emit("change", option);
  open.value = false;
};
</script>

<style scoped lang="scss">
.options-enter-active,
.options-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.options-enter-from,
.options-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.select {
  position: relative;
  width: 100%;

  @include hover {
    .trigger {
      border-color: $color-yellow-hover;

      :deep(.icon) {
        path {
          stroke: $color-yellow-hover;
        }
      }
    }
  }

  &.active {
    .trigger {
      border-color: $color-yellow-hover;

      :deep(.icon) {
        transform: rotate(180deg);

        path {
          stroke: $color-yellow-hover;
        }
      }
    }
  }

  &.focused {
    .trigger {
      border-color: $color-yellow-hover;

      :deep(.icon) {
        path {
          stroke: $color-yellow-hover;
        }
      }
    }
  }

  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &.default {
    .trigger {
      .value {
        color: $color-grey-500;
      }
    }
    .options-box {
      .options {
        .option {
          &.all {
            color: $color-grey-500;
          }
        }
      }
    }
  }

  &.top {
    .options-box {
      top: auto;
      bottom: calc(100% + 8px);
    }
  }

  .trigger {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 8px;
    width: 100%;
    height: 56px;
    padding: 8px 24px;
    border-radius: 50px;
    border: 2px solid $color-yellow;
    background-color: $color-grey-800;
    transition: border-color $transition ease;
    cursor: pointer;
    @include noTap;

    &:focus {
      outline: none;
      border-color: $color-yellow-hover;
    }

    .value {
      font-family: $main-font;
      font-weight: 400;
      font-size: 16px;
      line-height: 120%;
      letter-spacing: -0.28px;
      color: $color-grey-200;
      transition: color $transition ease;
      @include textOverflow;
    }

    :deep(.icon) {
      width: 16px;
      height: 16px;
      transition: transform $transition ease;

      path {
        stroke: $color-grey-500;
        transition: stroke $transition ease;
      }
    }
  }

  .options-box {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    z-index: 3;
    overflow: hidden;
    border-radius: 10px;
    background-color: $color-grey-700;
    box-shadow: 0 20px 32px rgba(0, 0, 0, 0.5);

    .options {
      max-height: 216px;
      overflow: auto;

      @include styledScrollbar(
        $trackbg: transparent,
        $thumbbg: $color-grey-500,
        $thumbbgactive: $color-grey-500,
        $radius: 8,
        $width: 2
      );

      .option {
        padding: 8px 16px;
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        letter-spacing: -0.28px;
        color: $color-grey-200;
        transition: color $transition ease;
        cursor: pointer;
        @include noTap;

        @include hover {
          background-color: $color-grey-600;
        }

        &.active {
          background-color: $color-grey-600;
        }

        &.selected {
          color: $color-yellow;
        }

        &:first-child {
          padding-top: 12px;
        }

        &:last-child {
          padding-bottom: 12px;
        }
      }
    }
  }
}
</style>
