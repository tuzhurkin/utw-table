<template>
  <div class="pagination">
    <div class="controls">
      <div class="part arrow">
        <BaseButton
          type="texted"
          icon="chevron-left-duo"
          :disabled="isPrevDisabled"
          @click="onFirstClick"
        />
        <BaseButton
          type="texted"
          icon="chevron-left"
          :disabled="isPrevDisabled"
          @click="onPrevClick"
        />
      </div>
      <div class="part arrow">
        <BaseButton
          type="texted"
          icon="chevron-right"
          :disabled="isNextDisabled"
          @click="onNextClick"
        />
        <BaseButton
          type="texted"
          icon="chevron-right-duo"
          :disabled="isNextDisabled"
          @click="onLastClick"
        />
      </div>
      <div class="part reload">
        <BaseButton type="texted" icon="reload" @click="onReloadClick" />
      </div>
    </div>
    <div class="tools">
      <div class="part count">
        <PaginationPageCount
          :current-page="page"
          :total-pages="totalPages"
          :disabled="total === 0"
          @update:page="onPageChange"
        />
      </div>
      <div class="part">
        <PaginationShowPerPage
          :options="perPageOptions"
          :per-page="perPage"
          :disabled="total === 0"
          @update:per-page="onPerPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BaseSelectOption } from "~/types/base";
import type { Pagination } from "~/types/table";

defineOptions({
  name: "Pagination",
});

type PaginationProps = Pagination;

const props = withDefaults(defineProps<PaginationProps>(), {
  page: 1,
  perPage: 10,
  totalPages: 1,
  total: 0,
});

const emit = defineEmits<{
  "update:page": [value: number];
  "update:per-page": [value: number];
  reload: [];
}>();

const isPrevDisabled = computed(() => props.page === 1 || props.total === 0);
const isNextDisabled = computed(() => props.page === props.totalPages || props.total === 0);

const onFirstClick = () => {
  emit("update:page", 1);
};
const onPrevClick = () => {
  emit("update:page", props.page - 1);
};
const onPageChange = (value: number) => {
  emit("update:page", value);
};
const onNextClick = () => {
  emit("update:page", props.page + 1);
};
const onLastClick = () => {
  emit("update:page", props.totalPages);
};
const onReloadClick = () => {
  emit("reload");
};

const perPageOptions: BaseSelectOption[] = [
  { value: 10, text: 10 },
  { value: 15, text: 15 },
  { value: 20, text: 20 },
];

const onPerPageChange = (value: number) => {
  emit("update:per-page", value);
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 20px 16px;
  background-color: $color-grey-700;
  border-radius: 16px;

  .controls,
  .tools {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;

    .part {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;
      min-height: 36px;

      &:not(:first-child) {
        padding-left: 10px;

        &::after {
          content: "";
          position: absolute;
          top: 20%;
          left: 0;
          width: 1px;
          height: 60%;
          border-right: 2px solid $color-grey-600;
        }
      }

      &.arrow {
        :deep(.icon) {
          width: 24px;
          height: 24px;
        }
      }

      &.count {
        padding-left: 0;
        padding-right: 8px;

        &::after {
          display: none;
        }
      }
    }
  }

  .tools {
    justify-content: flex-end;
  }
}
</style>
