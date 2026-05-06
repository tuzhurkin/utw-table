<template>
  <th :title="String(value)" class="cell" :class="{ sortable }">
    <span>{{ value }}</span>
    <template v-if="sortable && sortBy === slug">
      <BaseIcon v-if="sortDirection === 'asc'" name="arrow-up" class="icon" />
      <BaseIcon v-else-if="sortDirection === 'desc'" name="arrow-down" class="icon" />
    </template>
  </th>
</template>

<script setup lang="ts">
defineOptions({
  name: "TableHeadCell",
});

type TableHeadCellProps = {
  slug: string;
  value: string | number | boolean;
  sortable?: boolean;
};

withDefaults(defineProps<TableHeadCellProps>(), {
  slug: "",
  value: "",
  sortable: false,
});

const sortBy = inject("sortBy");
const sortDirection = inject("sortDirection");
</script>

<style scoped lang="scss"></style>
