<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-lg">
            <h1 class="text-2xl font-bold mb-4">Welcome to Cocktails Page</h1>
            <p class="text-gray-700 mb-4">This is a basic page using Tailwind CSS and Vue 3 with TypeScript.</p>
            <div class="grid grid-cols-12 gap-2 mb-4">
                <input type="text" placeholder="Search ingredients..." class="col-span-8 p-2 border rounded"
                    v-model="searchQuery">
                <button class="col-span-2 bg-primary-200 text-white p-2 rounded" @click="searchCocktails">Search</button>
            </div>
            <Loader v-if="loading" />
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="cocktail in cocktails" :key="cocktail.idDrink" class="bg-gray-200 p-4 rounded-lg shadow">
                    <img :src="cocktail.strDrinkThumb" :alt="cocktail.strDrink"
                        class="w-full h-48 object-cover rounded-lg mb-4">
                    <h2 class="text-xl font-bold my-2">{{ cocktail.strDrink }}</h2>
                    <p class="text-gray-700">{{ cocktail.strInstructions }}</p>
                </div>
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
        const { data } = await httpClient.get<{ drinks: Cocktail[] }>(`1/search.php?s=${searchQuery.value}`);
        cocktails.value = data.drinks;
    } catch (error) {
        console.error('Error searching cocktails:', error);
    } finally {
        loading.value = false;
    }
};

onMounted(async () => {
    try {
        loading.value = true;
        const { data } = await httpClient.get<{ drinks: Cocktail[] }>('1/search.php?s=margarita');
        cocktails.value = data.drinks;
        console.log(cocktails.value);
    } catch (error) {
        console.error('Error fetching cocktails:', error);
    } finally {
        loading.value = false;
    }
});

</script>

<style scoped></style>