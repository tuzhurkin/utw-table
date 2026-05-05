<template>
  <div class="project">
    <ProjectTable :head="tableHead" :body="tableBody" />
  </div>
</template>

<script setup lang="ts">
import { useTable } from "~/composables/useTable";
import { users } from "~/data/users";

defineOptions({
  name: "Project",
});

const { tableHead, tableBody } = useTable(users);
</script>

<style scoped lang="scss">
.project {
  width: 50%;
  margin: 0 auto;
  padding: 50px 0;
}
</style>
