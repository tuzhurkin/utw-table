<template>
  <table>
    <TableHead v-if="slots.head">
      <slot name="head"></slot>
    </TableHead>
    <TableBody v-if="slots.body">
      <slot name="body"></slot>
    </TableBody>
  </table>
</template>

<script setup lang="ts">
defineOptions({
  name: "BaseTable",
});

const slots = defineSlots();
</script>

<style scoped lang="scss"></style>
