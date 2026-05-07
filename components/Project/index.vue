<template>
  <div class="project">
    <div class="project-filters">
      <Filters :filters="filtersData" />
    </div>
    <div ref="table" class="project-table">
      <ProjectTable :head="tableHead" :body="tableBody" :empty="isDataEmpty" @sort="onSorting" />
    </div>
    <div class="project-pagination">
      <Pagination :page="page" :total-pages="totalPages" :total="total" @update:page="setPage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { users } from "~/data/users";
import { useUsers } from "~/composables/useUsers";
import { useTable } from "~/composables/useTable";

defineOptions({
  name: "Project",
});

const {
  page,
  perPage,
  total,
  totalPages,
  isDataEmpty,
  filtersData,
  filters,
  filteredUsers,
  sortedUsers,
  paginatedUsers,
  sortBy,
  sortDirection,
  onSorting,
  setPage,
} = useUsers(users);
const { tableHead, tableBody } = useTable(paginatedUsers);

provide("sortBy", sortBy);
provide("sortDirection", sortDirection);

// scroll to table top when page changes
const tableEl = useTemplateRef<HTMLDivElement>("table");
watch(page, () => {
  tableEl.value?.scrollTo({ top: 0, behavior: "smooth" });
});
</script>

<style scoped lang="scss">
$color-bg-gradient: $color-grey-900;

.project {
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 200px;

  @media (max-width: $lg) {
    padding: 0 56px;
  }

  @media (max-width: $md) {
    row-gap: 16px;
    padding: 0 16px;
  }

  .project-filters {
    margin-top: 32px;

    @media (max-width: $sm) {
      margin-top: 16px;
    }
  }

  .project-table {
    margin-bottom: 90px;
    padding-bottom: 16px;
    width: 100%;
    max-height: calc(100vh - 210px); // = 32 + 32 + 56 + 90
    overflow: auto;
    @include noScrollbar;

    @media (max-width: $md) {
      margin-left: -16px;
      margin-right: -16px;
      width: calc(100% + 32px);
      max-height: calc(100vh - 250px); // = 16 + 16 + 128 + 90
    }
  }

  .project-pagination {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 200px 16px;
    background-color: $color-grey-900;

    @media (max-width: $lg) {
      padding: 0 56px 16px;
    }

    @media (max-width: $md) {
      padding: 0 16px 16px;
    }

    &::before {
      content: "";
      position: absolute;
      bottom: 100%;
      left: 0;
      right: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      pointer-events: none;
      background: linear-gradient(
        0deg,
        $color-bg-gradient 0%,
        rgba($color-bg-gradient, 0.991353) 6.67%,
        rgba($color-bg-gradient, 0.96449) 13.33%,
        rgba($color-bg-gradient, 0.91834) 20%,
        rgba($color-bg-gradient, 0.852589) 26.67%,
        rgba($color-bg-gradient, 0.768225) 33.33%,
        rgba($color-bg-gradient, 0.668116) 40%,
        rgba($color-bg-gradient, 0.557309) 46.67%,
        rgba($color-bg-gradient, 0.442691) 53.33%,
        rgba($color-bg-gradient, 0.331884) 60%,
        rgba($color-bg-gradient, 0.231775) 66.67%,
        rgba($color-bg-gradient, 0.147411) 73.33%,
        rgba($color-bg-gradient, 0.0816599) 80%,
        rgba($color-bg-gradient, 0.03551) 86.67%,
        rgba($color-bg-gradient, 0.0086472) 93.33%,
        rgba($color-bg-gradient, 0) 100%
      );
    }

    .pagination {
      margin: 0 auto;
    }
  }
}
</style>
