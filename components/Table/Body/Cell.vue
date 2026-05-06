<template>
  <td :title="String(value)" class="cell">
    <span>{{ value }}</span>
  </td>
</template>

<script setup lang="ts">
defineOptions({
  name: "TableBodyCell",
});

type TableBodyCellProps = {
  value: string | number | boolean;
};

withDefaults(defineProps<TableBodyCellProps>(), {
  value: "",
});
</script>

<style scoped lang="scss"></style>
