<template>
  <tr>
    <template v-if="isBody">
      <TableBodyCell
        v-for="cell in cells"
        :key="cell.slug"
        :value="cell.name"
        :slug="cell.slug"
        :colspan="empty ? cell.colspan : 1"
      />
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

type TableRowProps = TableRow & {
  empty?: boolean;
};

defineOptions({
  name: "TableRow",
});

withDefaults(defineProps<TableRowProps>(), {
  empty: false,
});

const emit = defineEmits<{
  sort: [slug: string];
}>();

const onSortableClick = (cell: TableCell) => {
  if (!cell.sortable) return;
  emit("sort", cell.slug);
};
</script>

<style scoped lang="scss"></style>
