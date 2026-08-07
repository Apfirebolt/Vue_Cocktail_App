<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto space-y-10">

      <!-- Hero Header Section -->
      <header class="text-center space-y-4 max-w-2xl mx-auto">
        <span class="text-xs font-semibold tracking-widest text-amber-400 uppercase bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
          Barware & Vessel Types
        </span>
        <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Cocktail Glasses
        </h1>
        <p class="text-slate-400 text-base sm:text-lg">
          Explore the various glassware types used to serve artisanal cocktails and spirits.
        </p>

        <!-- Search / Filter Input -->
        <div class="mt-6 relative max-w-md mx-auto">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Filter glasses (e.g., Highball, Coupe, Collins)..." 
            class="w-full pl-10 pr-10 py-3 bg-slate-800/90 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm sm:text-base shadow-inner"
          />
          <button 
            v-if="searchQuery" 
            @click="searchQuery = ''"
            class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </header>

      <!-- Loader State -->
      <div v-if="loading" class="flex justify-center py-20">
        <Loader />
      </div>

      <!-- Glasses Grid -->
      <div 
        v-else-if="filteredGlasses.length > 0" 
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div 
          v-for="glass in filteredGlasses" 
          :key="glass.strGlass" 
          class="group bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-2xl p-6 shadow-xl hover:border-amber-500/50 hover:bg-slate-800/90 hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 flex items-center justify-between cursor-pointer hover:-translate-y-1"
        >
          <div class="flex items-center space-x-4">
            <!-- Glassware Icon Badge -->
            <div class="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-amber-400/20 transition-all duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>

            <div>
              <h2 class="text-lg font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                {{ glass.strGlass }}
              </h2>
              <p class="text-xs text-slate-400 mt-0.5">Glassware type</p>
            </div>
          </div>

          <!-- Arrow Indicator -->
          <div class="text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16 bg-slate-800/40 border border-slate-700/50 rounded-2xl max-w-md mx-auto">
        <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-700/50 text-slate-400 mb-3">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-slate-200">No glass types found</h3>
        <p class="text-sm text-slate-400 mt-1">Try clearing your search query to view all barware types.</p>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import httpClient from '../plugins/interceptor';
import Loader from '../components/Loader.vue';

interface Glass {
  strGlass: string;
}

const glasses = ref<Glass[]>([]);
const searchQuery = ref<string>('');
const loading = ref<boolean>(false);

// Instant client-side filtering
const filteredGlasses = computed(() => {
  if (!searchQuery.value.trim()) return glasses.value;
  const q = searchQuery.value.toLowerCase().trim();
  return glasses.value.filter(g => g.strGlass.toLowerCase().includes(q));
});

onMounted(async () => {
  try {
    loading.value = true;
    const { data } = await httpClient.get<{ drinks: Glass[] | null }>('1/list.php?g=list');
    glasses.value = data.drinks || [];
  } catch (error) {
    console.error('Error fetching glasses:', error);
    glasses.value = [];
  } finally {
    loading.value = false;
  }
});
</script>