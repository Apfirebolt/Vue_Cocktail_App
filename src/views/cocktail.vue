<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto space-y-10">
      
      <!-- Hero Header Section -->
      <header class="text-center space-y-4 max-w-2xl mx-auto">
        <span class="text-xs font-semibold tracking-widest text-amber-400 uppercase bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
          Mixology Explorer
        </span>
        <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Discover Extraordinary Cocktails
        </h1>
        <p class="text-slate-400 text-base sm:text-lg">
          Explore world-class cocktail recipes, ingredients, and preparation steps.
        </p>

        <!-- Search Bar -->
        <form @submit.prevent="searchCocktails" class="mt-6 flex flex-col sm:flex-row gap-3 pt-2">
          <div class="relative flex-1">
            <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search by cocktail name (e.g., Mojito, Margarita)..." 
              class="w-full pl-10 pr-4 py-3 bg-slate-800/90 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm sm:text-base shadow-inner"
            />
          </div>
          <button 
            type="submit"
            :disabled="loading"
            class="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-[0.98] disabled:opacity-50 text-slate-950 font-semibold rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Search</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </form>
      </header>

      <!-- Loader State -->
      <div v-if="loading" class="flex justify-center py-20">
        <Loader />
      </div>

      <!-- Cocktail Grid -->
      <div 
        v-else-if="cocktails && cocktails.length > 0" 
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <article 
          v-for="cocktail in cocktails" 
          :key="cocktail.idDrink" 
          class="group bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-2xl overflow-hidden shadow-xl hover:border-slate-500/50 hover:shadow-2xl transition-all duration-300 flex flex-col hover:-translate-y-1"
        >
          <!-- Thumbnail Image -->
          <div class="relative aspect-square overflow-hidden bg-slate-900">
            <img 
              :src="cocktail.strDrinkThumb" 
              :alt="cocktail.strDrink"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
          </div>

          <!-- Card Content -->
          <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
            <div>
              <h2 class="text-xl font-bold text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-1">
                {{ cocktail.strDrink }}
              </h2>
              <p class="text-xs text-slate-400 font-mono mt-1">
                ID: #{{ cocktail.idDrink }}
              </p>
            </div>

            <p class="text-sm text-slate-300 leading-relaxed line-clamp-3">
              {{ cocktail.strInstructions || 'No instructions provided for this cocktail.' }}
            </p>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16 bg-slate-800/40 border border-slate-700/50 rounded-2xl max-w-md mx-auto">
        <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-700/50 text-slate-400 mb-3">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-slate-200">No cocktails found</h3>
        <p class="text-sm text-slate-400 mt-1">Try searching for a different keyword or ingredient.</p>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import httpClient from '../plugins/interceptor';
import Loader from '../components/Loader.vue';

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
}

const cocktails = ref<Cocktail[]>([]);
const searchQuery = ref<string>('');
const loading = ref<boolean>(false);

const searchCocktails = async () => {
  try {
    loading.value = true;
    const query = searchQuery.value.trim();
    const { data } = await httpClient.get<{ drinks: Cocktail[] | null }>(`1/search.php?s=${query}`);
    cocktails.value = data.drinks || [];
  } catch (error) {
    console.error('Error searching cocktails:', error);
    cocktails.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  searchQuery.value = 'margarita';
  await searchCocktails();
});
</script>

<style scoped>
/* Modern line clamp rules to keep uniform card heights */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>