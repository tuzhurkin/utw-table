<template>
  <tr>
    <TableCell
      v-for="cell in cells"
      :key="cell.slug"
      :value="cell.name"
      :tag="isBody ? 'td' : 'th'"
    />
  </tr>
</template>

<script setup lang="ts">
import type { TableRow } from "~/types/table";

type TableRowProps = TableRow;

defineOptions({
  name: "TableRow",
});

defineProps<TableRowProps>();
</script>

<style scoped lang="scss"></style>
