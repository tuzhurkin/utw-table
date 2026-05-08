<template>
  <div class="pagination">
    <div class="part arrow">
      <BaseButton
        type="texted"
        icon="chevron-left"
        :disabled="isPrevDisabled"
        @click="onPrevClick"
      />
    </div>
    <div class="part count" :class="{ disabled: total === 0 }">
      <span>{{ page }} / {{ totalPages }}</span>
    </div>
    <div class="part arrow">
      <BaseButton
        type="texted"
        icon="chevron-right"
        :disabled="isNextDisabled"
        @click="onNextClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "Pagination",
});

type PaginationProps = {
  page: number;
  totalPages: number;
  total: number;
};

const props = defineProps<PaginationProps>();

const emit = defineEmits<{
  "update:page": [value: number];
}>();

const isPrevDisabled = computed(() => props.page === 1 || props.total === 0);
const isNextDisabled = computed(() => props.page === props.totalPages || props.total === 0);

const onPrevClick = () => {
  emit("update:page", props.page - 1);
};
const onNextClick = () => {
  emit("update:page", props.page + 1);
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background-color: $color-grey-700;
  border-radius: 50px;

  .part {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: opacity $transition ease;

    .btn {
      min-width: 36px;
      min-height: 36px;

      :deep(.icon) {
        width: 28px;
        height: 28px;
      }
    }

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
}
</style>
