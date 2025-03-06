
<template>
  <div class="bg-secondary-300">
    <HeaderComponent />
    <main class="mt-16">
      <router-view />
    </main>
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import FooterComponent from './components/FooterComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';
</script>



