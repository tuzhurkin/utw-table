<template>
  <div class="per-page">
    <BaseSelect
      v-bind="perPageFilter"
      :model-value="perPage"
      @update:model-value="onPerPageUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_PER_PAGE, PER_PAGE_OPTIONS } from "~/constants/options";
import { normalizeFilterOptions } from "~/utils";
import type { BaseSelectValue } from "~/types/base";

defineOptions({
  name: "FiltersPerPage",
});

defineProps<{
  perPage: number;
}>();

const emit = defineEmits<{
  "update:perPage": [value: number];
}>();

const onPerPageUpdate = (value: BaseSelectValue) => {
  emit("update:perPage", Number(value));
};

const perPageFilter = {
  idx: "perPage",
  name: "perPage",
  placeholder: `Show ${DEFAULT_PER_PAGE}`,
  filterType: "select",
  options: normalizeFilterOptions(PER_PAGE_OPTIONS),
  triggerText: "Show",
  showAllOption: null,
};
</script>

<style scoped lang="scss"></style>
