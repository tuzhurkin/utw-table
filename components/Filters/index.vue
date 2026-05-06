<template>
  <div class="filters">
    <div v-for="filter in filters" :key="filter.idx" class="filter">
      <BaseSearch
        v-if="filter.filterType === 'search'"
        v-bind="filter"
        :model-value="filter.value"
        @update:model-value="onSearchUpdate"
      />
      <BaseSelect
        v-if="filter.filterType === 'select'"
        v-bind="filter"
        :model-value="filter.value"
        @update:model-value="onRoleUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BaseInputValue, BaseSelectValue } from "~/types/base";
import type { Filter } from "~/types/table";

defineOptions({
  name: "Filters",
});

type FiltersProps = {
  filters: Filter[];
};

const props = defineProps<FiltersProps>();

const onSearchUpdate = (value: BaseInputValue, idx: string) => {
  if (value === null || value === undefined) return;

  const filter = props.filters.find(filter => filter.idx === idx);
  if (filter) {
    filter.value = value;
  }
};

const onRoleUpdate = (value: BaseSelectValue, idx: string) => {
  if (value === null || value === undefined) return;

  const filter = props.filters.find(filter => filter.idx === idx);
  if (filter && filter.options) {
    const option = filter.options.find(option => option.value === value);
    if (option) filter.value = option.value;
  }
};
</script>

<style scoped lang="scss">
.filters {
  display: flex;
  align-items: center;
  gap: 16px;

  .filter {
    flex: 1;
  }
}
</style>
