<template>
  <div class="table">
    <Table>
      <template #head>
        <TableRow :cells="head" :is-body="false" @sort="onSorting" />
      </template>
      <template #body>
        <template v-if="!empty">
          <TableRow v-for="(row, index) in body" :key="index" :cells="row" :is-body="true" />
        </template>
        <template v-else>
          <TableRow :cells="emptyRowCells" :is-body="true" :empty="true" />
        </template>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import type { TableData } from "~/types/table";

type ProjectTableProps = TableData & {
  empty: boolean;
};

defineOptions({
  name: "ProjectTable",
});

const props = withDefaults(defineProps<ProjectTableProps>(), {
  empty: false,
});

const emit = defineEmits<{
  sort: [slug: string];
}>();

const onSorting = (slug: string) => {
  emit("sort", slug);
};

const emptyRowCells = computed(() => {
  return [{ name: "No data found", slug: "empty", colspan: props.head.length }];
});
</script>

<style scoped lang="scss">
.table {
  width: 100%;
  max-width: 100%;
}
</style>
