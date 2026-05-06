<template>
  <label for="page-count" class="page-count" :class="{ disabled }">
    <span>Page</span>
    <BaseInput
      idx="page-count"
      name="page-count"
      type="number"
      placeholder=""
      autocomplete="off"
      :disabled="disabled"
      :min="1"
      :max="totalPages"
      :model-value="currentPage"
      @update:model-value="onPageChange"
    />
    <span>of {{ totalPages }}</span>
  </label>
</template>

<script setup lang="ts">
import type { BaseInputValue } from "~/types/base";

defineOptions({
  name: "PaginationPageCount",
});

type PageCountProps = {
  currentPage: number;
  totalPages: number;
  disabled: boolean;
};

withDefaults(defineProps<PageCountProps>(), {
  currentPage: 1,
  totalPages: 1,
  disabled: false,
});

const emit = defineEmits<{
  "update:page": [value: number];
}>();

const onPageChange = (value: BaseInputValue) => {
  emit("update:page", Number(value));
};
</script>

<style scoped lang="scss">
.page-count {
  display: flex;
  align-items: center;
  gap: 2px;
  cursor: pointer;

  @include hover {
    :deep(input) {
      color: $color-yellow;
    }
  }

  span {
    font-size: 16px;
    line-height: 150%;
    color: $color-grey-200;
    white-space: nowrap;
    user-select: none;
  }

  :deep(input) {
    text-align: center;
    min-width: 0;
    padding: 0;
    transition: color $transition ease;
  }

  &.disabled {
    pointer-events: none;
    cursor: default;

    span,
    :deep(input) {
      color: $color-grey-500;
    }
  }
}
</style>
