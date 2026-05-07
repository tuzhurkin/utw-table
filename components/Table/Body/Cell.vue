<template>
  <td :title="String(value)" class="cell" :class="slug" :colspan="colspan">
    <span>{{ value }}</span>
  </td>
</template>

<script setup lang="ts">
defineOptions({
  name: "TableBodyCell",
});

type TableBodyCellProps = {
  value: string | number | boolean;
  slug: string;
  colspan?: number;
};

withDefaults(defineProps<TableBodyCellProps>(), {
  value: "",
  slug: "",
  colspan: 1,
});
</script>

<style scoped lang="scss"></style>
