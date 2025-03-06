<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="bg-white p-8 rounded-lg shadow-lg">
            <h1 class="text-2xl font-bold mb-4">Welcome to Categories Page</h1>
            <p class="text-gray-700 mb-4">This is a basic page using Tailwind CSS and Vue 3 with TypeScript.</p>
            
            <Loader v-if="loading" />
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="category in categories" :key="category.strCategory" class="bg-gray-200 p-4 rounded-lg shadow">
                    <h2 class="text-xl font-bold">{{ category.strCategory }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Loader from '../components/Loader.vue';
import httpClient from '../plugins/interceptor';

interface Category {
    strCategory: string;
}

const categories = ref<Category[]>([]);
const loading = ref<boolean>(false);

onMounted(async () => {
    loading.value = true;
    try {
        const { data } = await httpClient.get<{ drinks: Category[] }>('1/list.php?c=list');
        if (data.drinks) {
            categories.value = data.drinks;
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
    } finally {
        loading.value = false;
    }
});

</script>