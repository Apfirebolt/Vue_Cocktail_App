<template>
  <div class="flex justify-center items-center h-full px-4 py-6">
    <div class="loader ease-linear rounded-full border-8 border-t-8 border-secondary-200 h-64 w-64"></div>
  </div>
</template>

<script setup lang="ts">

</script>

<style>
.loader {
  border-top-color: #27391C;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
