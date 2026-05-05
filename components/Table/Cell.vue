<template>
  <component :is="tag" :title="value" class="cell">
    <span>{{ value }}</span>
  </component>
</template>

<script setup lang="ts">
type TableCellProps = {
  value: string | number | boolean;
  tag: "th" | "td";
};

defineOptions({
  name: "TableCell",
});

withDefaults(defineProps<TableCellProps>(), {
  value: "",
  tag: "td",
});
</script>

<style scoped lang="scss"></style>
