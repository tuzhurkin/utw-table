<template>
  <component
    :is="tag"
    class="btn"
    :class="[type, { disabled }]"
    :type="tag === 'button' ? tagType : null"
    :to="to || undefined"
    :href="href"
    :target="target"
    :disabled="tag === 'button' ? disabled : null"
    @click="emit('click')"
  >
    <BaseIcon v-if="iconBefore" :name="iconBefore" class="before" />
    <span v-if="text">{{ text }}</span>
    <slot></slot>
    <BaseIcon v-if="icon" :name="icon" class="after" @click="emit('icon-click')" />
  </component>
</template>

<script setup lang="ts">
import type { BaseButtonType } from "~/types/base";

type BaseButtonProps = {
  tag?: string;
  tagType?: string;
  type?: BaseButtonType;
  text?: string | number | null;
  to?: string | object | null;
  href?: string | null;
  target?: string | null;
  disabled?: boolean;
  iconBefore?: string | null;
  icon?: string | null;
};

defineOptions({
  name: "BaseButton",
});

withDefaults(defineProps<BaseButtonProps>(), {
  tag: "button",
  tagType: "button",
  type: "primary",
  text: null,
  to: null,
  href: null,
  target: null,
  disabled: false,
  iconBefore: null,
  icon: null,
});

const emit = defineEmits<{
  click: [];
  "icon-click": [];
}>();
</script>

<style scoped lang="scss">
button,
.btn {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  width: auto;
  height: auto;
  border: none;
  outline: none;
  box-shadow: none;
  background: none;
  text-decoration: none;
  @include noTap;
  @include maskSafari;

  flex-shrink: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  will-change: transform;

  :deep(.icon) {
    flex-shrink: 0;
    overflow: visible;

    path,
    rect,
    circle {
      &[stroke] {
        transition: stroke $transition ease;
      }
      &[fill] {
        transition: fill $transition ease;
      }
    }
  }

  &.primary {
    column-gap: 10px;
    min-height: 50px;
    height: auto;
    padding: 0 32px;
    border-radius: 32px;
    border: 2px solid $color-yellow;
    background-color: transparent;
    transition:
      color $transition ease,
      background-color $transition ease,
      border-color $transition ease,
      transform $transition ease;

    font-family: $main-font;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 150%;
    color: $color-yellow;

    span {
      font-family: inherit;
      font-style: inherit;
      font-weight: inherit;
      font-size: inherit;
      line-height: inherit;
      letter-spacing: inherit;
      color: inherit;
    }
    :deep(.icon) {
      width: 24px;
      height: 24px;
      object-fit: contain;
      object-position: center;

      path[stroke],
      rect[stroke],
      circle[stroke] {
        transition: stroke $transition ease;
        stroke: $color-yellow;
      }
      path[fill],
      rect[fill],
      circle[fill] {
        transition: fill $transition ease;
        fill: $color-yellow;
      }
    }
    @include hover {
      border-color: $color-yellow-hover;
      color: $color-yellow-hover;

      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-yellow-hover;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-yellow-hover;
        }
      }
    }
    &:focus {
      border-color: $color-yellow-hover;
      color: $color-yellow-hover;

      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-yellow-hover;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-yellow-hover;
        }
      }
    }
    &:active {
      transform: scale(0.97);
      border-color: $color-yellow-hover;
      color: $color-yellow-hover;

      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-yellow-hover;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-yellow-hover;
        }
      }
    }
    &:disabled,
    &.disabled {
      pointer-events: none;
      cursor: default;
      border-color: $color-grey-500;
      color: $color-grey-500;

      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-grey-500;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-grey-500;
        }
      }
    }

    &.yellow {
      background-color: $color-yellow;
      border-color: $color-yellow;
      color: $color-black;

      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-black;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-black;
        }
      }
      @include hover {
        background-color: $color-yellow-hover;
        border-color: $color-yellow-hover;
      }
      &:focus {
        background-color: $color-yellow-hover;
        border-color: $color-yellow-hover;
      }
      &:active {
        transform: scale(0.97);
        background-color: $color-yellow-hover;
        border-color: $color-yellow-hover;
      }
      &:disabled,
      &.disabled {
        background-color: $color-grey-500;
        border-color: $color-grey-500;
      }
    }
  }

  &.icony {
    min-width: 36px;
    min-height: 36px;
    height: auto;
    border-radius: 6px;
    border: 2px solid $color-yellow;
    transition:
      color $transition ease,
      background-color $transition ease,
      border-color $transition ease,
      transform $transition ease;

    :deep(.icon) {
      width: 24px;
      height: 24px;
      object-fit: contain;
      object-position: center;

      path[stroke],
      rect[stroke],
      circle[stroke] {
        transition: stroke $transition ease;
        stroke: $color-yellow;
      }
      path[fill],
      rect[fill],
      circle[fill] {
        transition: fill $transition ease;
        fill: $color-yellow;
      }
    }
    @include hover {
      border-color: $color-yellow-hover;
      // background-color: $color-white;
      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-yellow-hover;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-yellow-hover;
        }
      }
    }
    &:focus {
      border-color: $color-yellow-hover;
      // background-color: $color-white;
      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-yellow-hover;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-yellow-hover;
        }
      }
    }
    &:active {
      transform: scale(0.88);
      border-color: $color-yellow-hover;
      // background-color: $color-white;
      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-yellow-hover;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-yellow-hover;
        }
      }
    }
    &:disabled,
    &.disabled {
      pointer-events: none;
      cursor: default;
      border-color: $color-grey-500;
      background-color: transparent;
      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-grey-500;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-grey-500;
        }
      }
    }
  }

  &.texted {
    column-gap: 6px;
    font-family: $main-font;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 150%;
    color: $color-grey-200;
    transition: color $transition ease;

    span {
      font-family: inherit;
      font-style: inherit;
      font-weight: inherit;
      font-size: inherit;
      line-height: inherit;
      letter-spacing: inherit;
      color: inherit;
    }
    :deep(.icon) {
      width: 16px;
      height: 16px;
      object-fit: contain;
      object-position: center;

      path[stroke],
      rect[stroke],
      circle[stroke] {
        transition: stroke $transition ease;
        stroke: $color-grey-200;
      }
      path[fill],
      rect[fill],
      circle[fill] {
        transition: fill $transition ease;
        fill: $color-grey-200;
      }
    }
    @include hover {
      color: $color-white;
      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-white;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-white;
        }
      }
    }
    &:focus {
      color: $color-white;
      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-white;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-white;
        }
      }
    }
    &:active {
      color: $color-white;
      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-white;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-white;
        }
      }
    }
    &:disabled,
    &.disabled {
      pointer-events: none;
      cursor: default;
      color: $color-grey-500;
      :deep(.icon) {
        path[stroke],
        rect[stroke],
        circle[stroke] {
          stroke: $color-grey-500;
        }
        path[fill],
        rect[fill],
        circle[fill] {
          fill: $color-grey-500;
        }
      }
    }
  }
}
</style>
