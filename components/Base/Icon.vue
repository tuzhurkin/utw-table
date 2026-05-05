<template>
  <span v-if="iconSvg" class="icon" :class="[name]" v-html="iconSvg"></span>
</template>

<script setup lang="ts">
type BaseIconProps = {
  name: string;
  stroke?: string;
  fill?: string;
};

const props = withDefaults(defineProps<BaseIconProps>(), {
  stroke: "",
  fill: "",
});

const icons = import.meta.glob<string>("@/assets/images/icons/*.svg", {
  eager: true,
  query: "?raw",
  import: "default",
});

const iconSvg = computed(() => {
  return icons[`/assets/images/icons/${props.name}.svg`] ?? null;
});
</script>

<style scoped lang="scss">
.icon {
  flex-shrink: 0;
  user-select: none;

  :deep(svg) {
    display: block;
    width: 100%;
    height: 100%;
  }

  :deep(path[stroke]),
  :deep(rect[stroke]),
  :deep(circle[stroke]) {
    stroke: currentColor;
  }

  :deep(path[fill]:not([fill="none"])),
  :deep(rect[fill]:not([fill="none"])),
  :deep(circle[fill]:not([fill="none"])) {
    fill: currentColor;
  }

  &.fill {
    :deep(path),
    :deep(rect),
    :deep(circle) {
      transition: fill $transition ease;
    }
  }

  &:not(.fill) {
    :deep(path),
    :deep(rect),
    :deep(circle) {
      transition: stroke $transition ease;
    }
  }
}
</style>
