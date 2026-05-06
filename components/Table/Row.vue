<template>
  <tr>
    <template v-if="isBody">
      <TableBodyCell v-for="cell in cells" :key="cell.slug" :value="cell.name" />
    </template>
    <template v-else>
      <TableHeadCell
        v-for="cell in cells"
        :key="cell.slug"
        :slug="cell.slug"
        :value="cell.name"
        :sortable="cell.sortable"
        @click="onSortableClick(cell)"
      />
    </template>
  </tr>
</template>

<script setup lang="ts">
import type { TableRow, TableCell } from "~/types/table";

type TableRowProps = TableRow;

defineOptions({
  name: "TableRow",
});

defineProps<TableRowProps>();

const emit = defineEmits<{
  sort: [slug: string];
}>();

const onSortableClick = (cell: TableCell) => {
  if (!cell.sortable) return;
  emit("sort", cell.slug);
};
</script>

<style scoped lang="scss"></style>
