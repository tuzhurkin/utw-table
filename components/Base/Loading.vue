<template>
  <div class="preloader">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle :fill="color" :stroke="color" stroke-width="15" r="15" cx="40" cy="65">
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="1.2"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.4"
        ></animate>
      </circle>
      <circle :fill="color" :stroke="color" stroke-width="15" r="15" cx="100" cy="65">
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="1.2"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.2"
        ></animate>
      </circle>
      <circle :fill="color" :stroke="color" stroke-width="15" r="15" cx="160" cy="65">
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="1.2"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="0"
        ></animate>
      </circle>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "BasePreloader",
});

const color = "#fcad17";
</script>

<style scoped lang="scss">
.preloader {
  display: table;
  margin: auto;
  z-index: 50;

  svg {
    display: block;
    width: 80px;
    height: 80px;
  }
}
</style>
