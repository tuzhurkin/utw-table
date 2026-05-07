import type { BaseInputValue } from "~/types/base";
import type { Filter } from "~/types/table";
import { SEARCH_DEBOUNCE_MS } from "~/constants/options";

export const useSearchDebounce = (searchFilter: ComputedRef<Filter | undefined>) => {
  const searchInput = ref<BaseInputValue>(searchFilter.value?.value ?? "");
  const isSearching = ref(false);
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  const doSearch = (value: BaseInputValue) => {
    if (searchFilter.value) searchFilter.value.value = value ?? "";
    isSearching.value = false;
    debounceTimer = null;
  };

  const onSearchInput = (value: BaseInputValue) => {
    if (value === null || value === undefined) return;

    searchInput.value = value;
    if (debounceTimer) clearTimeout(debounceTimer);

    // no debounce on search clear
    if (!value) {
      doSearch(value);
      return;
    }

    isSearching.value = true;
    debounceTimer = setTimeout(() => doSearch(value), SEARCH_DEBOUNCE_MS);
  };

  // sync with query params restoration
  watch(
    () => searchFilter.value?.value,
    val => {
      if (val !== undefined && val !== searchInput.value) {
        searchInput.value = val;
      }
    }
  );

  onUnmounted(() => {
    if (debounceTimer) clearTimeout(debounceTimer);
  });

  return {
    isSearching,
    searchInput,
    onSearchInput,
  };
};
