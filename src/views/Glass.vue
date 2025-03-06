<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-lg">
            <h1 class="text-2xl font-bold mb-4">Welcome to Glasses Page</h1>
            <p class="text-gray-700 mb-4">This is a basic page using Tailwind CSS and Vue 3 with TypeScript.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="glass in glasses" :key="glass.strGlass" class="bg-gray-200 p-4 rounded-lg shadow">
                    <h2 class="text-xl font-bold">{{ glass.strGlass }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import httpClient from '../plugins/interceptor';

interface Glass {
    strGlass: string;
}

const glasses = ref<Glass[]>([]);
const loading = ref<boolean>(false);

onMounted(async () => {
    try {
        loading.value = true;
        const { data } = await httpClient.get<{ drinks: Glass[] }>('1/list.php?g=list');
        glasses.value = data.drinks;
    } catch (error) {
        console.error('Error fetching glasses:', error);
    } finally {
        loading.value = false;
    }
});

</script>