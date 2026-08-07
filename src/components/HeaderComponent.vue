<template>
  <Disclosure 
    :class="[
      'fixed top-0 z-30 w-full transition-all duration-300 border-b',
      isScrolledDown 
        ? 'bg-slate-900/90 backdrop-blur-md border-slate-800/80 shadow-lg shadow-slate-950/20 py-1' 
        : 'bg-slate-900/60 backdrop-blur-sm border-slate-800/40 py-2'
    ]" 
    as="nav" 
    v-slot="{ open }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        
        <!-- Brand Logo -->
        <router-link to="/" class="flex items-center gap-2 group">
          <div class="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
            </svg>
          </div>
          <span class="text-xl font-extrabold tracking-wider text-slate-100 uppercase">
            Vue <span class="text-amber-400">Cocktails</span>
          </span>
        </router-link>

        <!-- Desktop Navigation & Dark Mode Toggle -->
        <div class="hidden md:flex items-center space-x-1 lg:space-x-2">
          <router-link
            v-for="link in links"
            :key="link.name"
            :to="link.href"
            active-class="bg-amber-400/10 text-amber-400 font-semibold border border-amber-400/20"
            class="text-slate-300 hover:text-white hover:bg-slate-800/80 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200"
          >
            {{ link.name }}
          </router-link>

          <!-- Dark Mode Switcher Icon Button -->
          <button 
            @click="toggleDarkMode" 
            type="button"
            aria-label="Toggle dark mode"
            class="ml-3 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-amber-400 hover:border-amber-400/30 transition-all duration-200 active:scale-95"
          >
            <!-- Sun Icon (for Dark Mode) -->
            <svg v-if="isDarkMode" class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            <!-- Moon Icon (for Light Mode) -->
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
          </button>
        </div>

        <!-- Mobile Menu Trigger -->
        <div class="flex items-center md:hidden space-x-2">
          <!-- Dark Mode Button (Mobile) -->
          <button 
            @click="toggleDarkMode" 
            type="button"
            class="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300"
          >
            <svg v-if="isDarkMode" class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
          </button>

          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>

      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <DisclosurePanel class="md:hidden border-t border-slate-800/80 bg-slate-900/95 backdrop-blur-md">
      <div class="px-4 pt-3 pb-4 space-y-1.5">
        <router-link
          v-for="link in links"
          :key="link.name"
          :to="link.href"
          active-class="bg-amber-400/10 text-amber-400 font-semibold border-l-2 border-amber-400"
          class="text-slate-300 hover:bg-slate-800 hover:text-white block px-3 py-2.5 rounded-lg text-base font-medium transition-colors"
        >
          {{ link.name }}
        </router-link>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { MenuIcon, XIcon } from "@heroicons/vue/outline";

interface Link {
  name: string;
  href: string;
}

const isDarkMode = ref<boolean>(false);
const isScrolledDown = ref<boolean>(false);

const links: Link[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Cocktails', href: '/cocktails' },
  { name: 'Ingredients', href: '/ingredients' },
  { name: 'Categories', href: '/categories' },
  { name: 'Glasses', href: '/glasses' },
];

const setDarkMode = (value: boolean): void => {
  isDarkMode.value = value;
  if (value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('darkMode', value.toString());
};

const checkScroll = (): void => {
  isScrolledDown.value = window.scrollY > 40;
};

const toggleDarkMode = (): void => {
  setDarkMode(!isDarkMode.value);
};

watch(isDarkMode, (newValue: boolean) => {
  setDarkMode(newValue);
});

onMounted((): void => {
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode !== null) {
    setDarkMode(savedDarkMode === 'true');
  } else {
    setDarkMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  checkScroll();
  window.addEventListener('scroll', checkScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>