<template>
  <button class="btn" :class="[type, { disabled }]" :disabled="disabled" @click="emit('click')">
    <span v-if="text">{{ text }}</span>
    <slot></slot>
    <BaseIcon v-if="icon" :name="icon" />
  </button>
</template>

<script setup lang="ts">
type BaseButtonProps = {
  type?: string;
  text?: string | number | null;
  icon?: string | null;
  disabled?: boolean;
};

defineOptions({
  name: "BaseButton",
});

withDefaults(defineProps<BaseButtonProps>(), {
  type: "primary",
  text: null,
  icon: null,
  disabled: false,
});

const emit = defineEmits<{
  click: [];
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
