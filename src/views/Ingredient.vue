<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto space-y-10">

      <header class="text-center space-y-4 max-w-2xl mx-auto">
        <span class="text-xs font-semibold tracking-widest text-amber-400 uppercase bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
          Pantry & Spirits
        </span>
        <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Cocktail Ingredients
        </h1>
        <p class="text-slate-400 text-base sm:text-lg">
          Browse the full index of spirits, mixers, and garnishes used in our mixology database.
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
            placeholder="Filter ingredients (e.g., Gin, Lime, Mint)..." 
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

      <div v-if="loading" class="flex justify-center py-20">
        <Loader />
      </div>

      <div 
        v-else-if="filteredIngredients.length > 0" 
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6"
      >
        <div 
          v-for="ingredient in filteredIngredients" 
          :key="ingredient.strIngredient1" 
          class="group bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-2xl p-4 sm:p-5 shadow-lg hover:border-amber-500/40 hover:bg-slate-800/90 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-200 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer"
        >
          <!-- Dynamic The CocktailDB Ingredient Thumbnail -->
          <div class="relative w-20 h-20 sm:w-24 sm:w-24 flex items-center justify-center p-2 rounded-xl bg-slate-900/60 group-hover:scale-105 transition-transform duration-300">
            <img 
              :src="`https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(ingredient.strIngredient1)}-Small.png`" 
              :alt="ingredient.strIngredient1"
              class="max-w-full max-h-full object-contain filter drop-shadow-md"
              loading="lazy"
              @error="(e) => (e.target as HTMLImageElement).style.display = 'none'"
            />
          </div>

          <h2 class="text-sm sm:text-base font-semibold text-slate-200 group-hover:text-amber-400 transition-colors line-clamp-2">
            {{ ingredient.strIngredient1 }}
          </h2>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16 bg-slate-800/40 border border-slate-700/50 rounded-2xl max-w-md mx-auto">
        <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-700/50 text-slate-400 mb-3">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-slate-200">No ingredients match</h3>
        <p class="text-sm text-slate-400 mt-1">Try clearing your search query to see all ingredients.</p>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import httpClient from '../plugins/interceptor';
import Loader from '../components/Loader.vue';

interface Ingredient {
  strIngredient1: string;
}

const ingredients = ref<Ingredient[]>([]);
const searchQuery = ref<string>('');
const loading = ref<boolean>(false);

const filteredIngredients = computed(() => {
  if (!searchQuery.value.trim()) return ingredients.value;
  const q = searchQuery.value.toLowerCase().trim();
  return ingredients.value.filter(ing => ing.strIngredient1.toLowerCase().includes(q));
});

onMounted(async () => {
  try {
    loading.value = true;
    const { data } = await httpClient.get<{ drinks: Ingredient[] }>('1/list.php?i=list');
    ingredients.value = data.drinks || [];
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    ingredients.value = [];
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>