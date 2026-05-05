<template>
  <div class="table">
    <Table>
      <template #head>
        <TableRow :cells="head" :is-body="false" />
      </template>
      <template #body>
        <TableRow v-for="(row, index) in body" :key="index" :cells="row" :is-body="true" />
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import type { TableData } from "~/types/table";

type ProjectTableProps = TableData;

defineOptions({
  name: "ProjectTable",
});

defineProps<ProjectTableProps>();
</script>

<style scoped lang="scss">
.table {
  width: 100%;
  max-width: 100%;
}
</style>
