<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-lg">
            <h1 class="text-2xl font-bold mb-4">Welcome to Ingredients Page</h1>
            <p class="text-gray-700 mb-4">This is a basic page using Tailwind CSS and Vue 3 with TypeScript.</p>
            
            <Loader v-if="loading" />
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="ingredient in ingredients" :key="ingredient.strIngredient1" class="bg-secondary-200 p-4 rounded-lg shadow">
                    <h2 class="text-xl font-bold">{{ ingredient.strIngredient1 }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import httpClient from '../plugins/interceptor';
import Loader from '../components/Loader.vue';

interface Ingredient {
    strIngredient1: string;
}

const ingredients = ref<Ingredient[]>([]);
const loading = ref<boolean>(false);

onMounted(async () => {
    try {

    } catch (error) {
        console.error('Error fetching ingredients:', error);
    } finally {
        loading.value = false;
    }
    const { data } = await httpClient.get<{ drinks: Ingredient[] }>('1/list.php?i=list');
    ingredients.value = data.drinks;
    console.log(ingredients.value);
});

</script>

<style scoped>
</style>
