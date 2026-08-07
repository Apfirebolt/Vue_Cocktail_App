<template>
  <footer class="bg-slate-900 text-slate-400 border-t border-slate-800/80 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        <!-- Brand & Description -->
        <div class="space-y-1">
          <div class="flex items-center justify-center md:justify-start gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span class="text-lg font-bold tracking-wider text-slate-100 uppercase">
              Cocktails <span class="text-amber-400">DP</span>
            </span>
          </div>
          <p class="text-xs text-slate-400 max-w-sm">
            Crafted with Vue 3, TypeScript, and Tailwind CSS.
          </p>
        </div>

        <!-- Tech Stack Badges / Metadata -->
        <div class="flex flex-wrap items-center justify-center gap-2 text-xs">
          <span class="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700/60 text-slate-300">
            Vue 3
          </span>
          <span class="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700/60 text-slate-300">
            TypeScript
          </span>
          <span class="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700/60 text-slate-300">
            Tailwind CSS
          </span>
        </div>

        <!-- Copyright -->
        <div class="text-xs text-slate-400">
          &copy; {{ currentYear }} <span class="font-medium text-slate-300">Cocktails DP</span>. All rights reserved.
        </div>

      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>