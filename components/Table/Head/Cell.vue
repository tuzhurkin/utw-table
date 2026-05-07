<template>
  <th :title="String(value)" class="cell" :class="[slug, { sortable }]">
    <span>{{ value }}</span>
    <Transition name="icon-switch">
      <BaseIcon
        v-if="sortable && sortBy === slug"
        name="arrow-up"
        class="icon"
        :class="{ active: sortDirection === 'desc' }"
      />
    </Transition>
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

<style scoped lang="scss">
.icon-switch-enter-active,
.icon-switch-leave-active {
  transition: opacity 0.15s ease;
}

.icon-switch-enter-from,
.icon-switch-leave-to {
  opacity: 0;
}
</style>
