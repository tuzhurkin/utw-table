<template>
  <div class="show-per-page">
    <BaseSelect
      idx="show-per-page"
      name="show-per-page"
      placeholder=""
      :focused="false"
      :options="options"
      :model-value="perPage"
      direction="top"
      trigger-text="Show"
      :disabled="disabled"
      @update:model-value="onPerPageChange"
    />
  </div>
</template>

<script setup lang="ts">
import type { BaseSelectValue, BaseSelectOption } from "~/types/base";

defineOptions({
  name: "PaginationShowPerPage",
});

type ShowPerPageProps = {
  options: BaseSelectOption[];
  perPage: number;
  disabled: boolean;
};

withDefaults(defineProps<ShowPerPageProps>(), {
  perPage: 1,
  disabled: false,
});

const emit = defineEmits<{
  "update:per-page": [value: number];
}>();

const onPerPageChange = (value: BaseSelectValue) => {
  emit("update:per-page", Number(value));
};
</script>

<style scoped lang="scss">
.show-per-page {
  :deep(.select) {
    @include hover {
      .trigger {
        .value {
          color: $color-yellow;
        }

        .icon {
          path {
            stroke: $color-yellow;
          }
        }
      }
    }

    &.active {
      .trigger {
        .value {
          color: $color-yellow;
        }

        .icon {
          path {
            stroke: $color-yellow;
          }
        }
      }
    }

    .trigger {
      height: 36px;
      padding: 0 6px;
      border: 2px solid $color-grey-700;
      background-color: $color-grey-700;

      .value {
        color: $color-grey-300;
      }

      .icon {
        path {
          stroke: $color-grey-300;
        }
      }
    }
  }
}
</style>
