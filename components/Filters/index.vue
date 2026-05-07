<template>
  <div class="filters">
    <div v-for="filter in filters" :key="filter.idx" class="filter" :class="[filter.filterType]">
      <BaseSearch
        v-if="filter.filterType === 'search'"
        v-bind="filter"
        :model-value="searchInput"
        :loading="isSearching"
        @update:model-value="onSearchInput"
      />
      <BaseSelect
        v-if="filter.filterType === 'select'"
        v-bind="filter"
        :model-value="filter.value"
        @update:model-value="onSelectUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BaseInputValue, BaseSelectValue } from "~/types/base";
import type { Filter } from "~/types/table";

type FiltersProps = {
  filters: Filter[];
};

const SEARCH_DEBOUNCE_MS = 300;

defineOptions({
  name: "Filters",
});

const props = defineProps<FiltersProps>();

const searchFilter = computed(() => props.filters.find(f => f.filterType === "search"));
const searchInput = ref<BaseInputValue>(searchFilter.value?.value ?? "");
const isSearching = ref(false);
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

watch(
  () => searchFilter.value?.value,
  val => {
    if (val !== undefined && val !== searchInput.value) {
      searchInput.value = val;
    }
  }
);

const doSearch = (value: BaseInputValue, idx: string) => {
  if (value === null || value === undefined) return;

  const filter = props.filters.find(f => f.idx === idx);
  if (filter) filter.value = value;
  isSearching.value = false;
  debounceTimer = null;
};

const onSearchInput = (value: BaseInputValue, idx: string) => {
  if (value === null || value === undefined) return;

  searchInput.value = value;
  if (debounceTimer) clearTimeout(debounceTimer);
  // no debounce on search clear
  if (!value) {
    doSearch(value, idx);
    return;
  }
  isSearching.value = true;
  debounceTimer = setTimeout(() => doSearch(value, idx), SEARCH_DEBOUNCE_MS);
};

onUnmounted(() => {
  if (debounceTimer) clearTimeout(debounceTimer);
});

const onSelectUpdate = (value: BaseSelectValue, idx: string) => {
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
