<template>
  <div class="filters">
    <div v-for="filter in filters" :key="filter.idx" class="filter" :class="[filter.filterType]">
      <BaseSearch
        v-if="filter.filterType === 'search'"
        :idx="filter.idx"
        :name="filter.name"
        :placeholder="filter.placeholder"
        :model-value="searchInput"
        :loading="isSearching"
        @update:model-value="onSearchInput"
      />
      <BaseSelect
        v-if="filter.filterType === 'select'"
        :idx="filter.idx"
        :name="filter.name"
        :placeholder="filter.placeholder"
        :options="filter.options"
        :trigger-text="filter.triggerText"
        :show-all-option="filter.showAllOption"
        :model-value="filter.value"
        @update:model-value="onSelectUpdate"
      />
    </div>
    <div class="filter">
      <FiltersPerPage :per-page="perPage" @update:per-page="onPerPageUpdate" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BaseSelectValue } from "~/types/base";
import type { Filter } from "~/types/table";
import { useSearchDebounce } from "~/composables/useSearchDebounce";

type FiltersProps = {
  filters: Filter[];
  perPage: number;
};

defineOptions({
  name: "Filters",
});

const props = defineProps<FiltersProps>();

const emit = defineEmits<{
  "update:perPage": [value: number];
}>();

const searchFilter = computed(() => props.filters.find(f => f.filterType === "search"));
const { searchInput, isSearching, onSearchInput } = useSearchDebounce(searchFilter);

const onSelectUpdate = (value: BaseSelectValue, idx: string) => {
  const filter = props.filters.find(filter => filter.idx === idx);
  if (filter && filter.filterType === "select") {
    if (value === null) {
      filter.value = value;
      return;
    }
    const option = filter.options.find(option => option.value === value);
    if (option) filter.value = option.value;
  }
};

const onPerPageUpdate = (value: number) => {
  emit("update:perPage", value);
};
</script>

<style scoped lang="scss">
.filters {
  display: flex;
  gap: 16px;

  @media (max-width: $sm) {
    flex-wrap: wrap;
  }

  .filter {
    &.search {
      flex: 2;

      @media (max-width: $sm) {
        flex-basis: 100%;
      }
    }
    &.select {
      flex: 1;
    }
  }
}
</style>
