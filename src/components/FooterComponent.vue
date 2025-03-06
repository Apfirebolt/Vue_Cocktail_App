<template>
  <footer class="py-4 bg-primary-200 text-secondary-300 dark:bg-slate-700 dark:text-white">
    <div class="container mx-auto px-4">
      <p class="text-center text-sm">
        &copy; {{ currentYear }} Cocktails DP Built with Vue 3, Typescript and Tailwind CSS
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
