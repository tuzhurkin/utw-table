<template>
  <div class="project">
    <div class="project-table">
      <ProjectTable :head="tableHead" :body="tableBody" />
    </div>
    <div class="project-pagination">
      <Pagination
        :page="page"
        :per-page="perPage"
        :total-pages="totalPages"
        :total="total"
        @update:page="setPage"
        @update:per-page="setPerPage"
      />
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

const { paginatedUsers, page, perPage, totalPages, total, setPage, setPerPage } = useUsers(users);
const { tableHead, tableBody } = useTable(paginatedUsers);
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
  padding: 0 250px;

  .project-table {
    margin-bottom: 120px;
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
    padding: 0 250px 16px;
    background-color: $color-grey-900;

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
      width: 80%;
      margin: 0 auto;
    }
  }
}
</style>
