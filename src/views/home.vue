<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto space-y-10">

      <!-- Hero Header Section -->
      <header class="text-center space-y-4 max-w-2xl mx-auto">
        <span class="text-xs font-semibold tracking-widest text-amber-400 uppercase bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
          Daily Inspiration
        </span>
        <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Cocktail of the Moment
        </h1>
        <p class="text-slate-400 text-base sm:text-lg">
          Let chance decide your next mix. Click below to generate a new random recipe!
        </p>

        <!-- Refresh Button -->
        <div class="pt-2">
          <button 
            @click="fetchRandomCocktail" 
            :disabled="loading"
            class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 disabled:opacity-50 text-slate-950 font-semibold rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-200"
          >
            <svg 
              class="w-5 h-5" 
              :class="{ 'animate-spin': loading }" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            <span>Surprise Me Again</span>
          </button>
        </div>
      </header>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-20">
        <Loader />
      </div>

      <!-- Hero Showcase Card for Random Cocktail -->
      <div v-else-if="cocktail" class="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-3xl overflow-hidden shadow-2xl">
        <div class="grid grid-cols-1 md:grid-cols-2">
          
          <!-- Image Section -->
          <div class="relative aspect-square md:aspect-auto overflow-hidden bg-slate-950">
            <img 
              :src="cocktail.strDrinkThumb" 
              :alt="cocktail.strDrink"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent md:hidden"></div>
            <span class="absolute top-4 left-4 text-xs font-semibold bg-slate-900/80 backdrop-blur-md text-amber-400 border border-slate-700/80 px-3 py-1 rounded-full">
              Category: {{ cocktail.strCategory || 'Cocktail' }}
            </span>
          </div>

          <!-- Content Section -->
          <div class="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div class="space-y-4">
              <div>
                <h2 class="text-3xl font-extrabold text-white tracking-tight">
                  {{ cocktail.strDrink }}
                </h2>
                <div class="flex items-center gap-2 mt-2 text-xs text-slate-400 font-mono">
                  <span>ID: #{{ cocktail.idDrink }}</span>
                  <span>•</span>
                  <span>{{ cocktail.strAlcoholic || 'Alcoholic' }}</span>
                </div>
              </div>

              <!-- Glassware Badge -->
              <div v-if="cocktail.strGlass" class="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
                <svg class="w-4 h-4 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span>Serve in: <strong class="text-slate-100 font-medium">{{ cocktail.strGlass }}</strong></span>
              </div>

              <!-- Preparation Instructions -->
              <div class="space-y-2">
                <h3 class="text-sm font-semibold uppercase tracking-wider text-amber-400">
                  Instructions
                </h3>
                <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {{ cocktail.strInstructions || 'No instructions provided.' }}
                </p>
              </div>
            </div>

            <div class="pt-2 border-t border-slate-700/50 flex justify-between items-center text-xs text-slate-400">
              <span>Ready to mix? Enjoy responsibly.</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import httpClient from '../plugins/interceptor';
import Loader from '../components/Loader.vue';

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  strCategory?: string;
  strGlass?: string;
  strAlcoholic?: string;
}

const loading = ref<boolean>(false);
const cocktails = ref<Cocktail[]>([]);

const cocktail = computed(() => cocktails.value[0] || null);

const fetchRandomCocktail = async () => {
  try {
    loading.value = true;
    const { data } = await httpClient.get<{ drinks: Cocktail[] }>('1/random.php');
    cocktails.value = data.drinks || [];
  } catch (error) {
    console.error('Error fetching random cocktail:', error);
    cocktails.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchRandomCocktail();
});
</script>