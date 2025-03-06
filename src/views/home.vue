<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-lg">
            <h1 class="text-2xl font-bold mb-4">Welcome to Home Page</h1>
            <p class="text-gray-700">Here you'd get a random cocktail</p>

            <Loader v-if="loading" />
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
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

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import httpClient from '../plugins/interceptor';
import Loader from '../components/Loader.vue';

interface Cocktail {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
    strInstructions: string;
}

const loading = ref<boolean>(false);
const cocktails = ref<Cocktail[]>([]);

onMounted(async () => {
    try {
        const { data } = await httpClient.get<{ drinks: Cocktail[] }>('1/random.php');
        cocktails.value = data.drinks;
    } catch (error) {
        console.error('Error fetching cocktails:', error);
    } finally {
        loading.value = false;
    }
});
</script>