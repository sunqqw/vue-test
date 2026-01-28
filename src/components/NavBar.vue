<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const isMenuOpen = ref(false)
const isStuck = ref(false)

const links = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Timer', path: '/timer' },
  { name: 'Profile', path: '/profile' }
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const onScroll = () => {
  isStuck.value = window.scrollY >= 180
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <nav :class="[
    'w-full mb-6 transition-all duration-300 border backdrop-blur-sm',
    isStuck
      ? 'fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#181818]/95 shadow-xl border-gray-200 dark:border-gray-700'
      : 'relative bg-white/90 dark:bg-[#181818]/90 shadow-lg border-gray-100 dark:border-gray-800'
  ]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <RouterLink v-for="link in links" :key="link.path" :to="link.path"
              class="px-4 py-2 text-sm font-medium transition-all duration-200 relative group overflow-hidden"
              active-class="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <span class="relative z-10 px-4 py-2">{{ link.name }}</span>
              <div
                class="absolute inset-0 bg-gray-100 dark:bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-0">
              </div>
              <div
                class="absolute bottom-0 left-0 h-0.5 bg-indigo-500 transition-all duration-300 w-0 group-[.router-link-active]:w-full">
              </div>
            </RouterLink>
          </div>
        </div>
        <div class="-mr-2 flex md:hidden">
          <button @click="toggleMenu" type="button"
            class="bg-gray-100 dark:bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
            <span class="sr-only">Open main menu</span>
            <svg class="h-6 w-6" :class="{ 'hidden': isMenuOpen, 'block': !isMenuOpen }"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg class="h-6 w-6" :class="{ 'block': isMenuOpen, 'hidden': !isMenuOpen }"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
      :class="{ 'max-h-64 opacity-100': isMenuOpen, 'max-h-0 opacity-0': !isMenuOpen }">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 dark:bg-gray-900/50 rounded-b-xl">
        <RouterLink v-for="link in links" :key="link.path" :to="link.path" @click="isMenuOpen = false"
          class="block px-3 py-2 rounded-md text-base font-medium transition-colors"
          active-class="bg-indigo-500 text-white shadow-md"
          :class="[route.path !== link.path ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white' : '']">
          {{ link.name }}
        </RouterLink>
      </div>
    </div>
  </nav>
  <div v-if="isStuck" aria-hidden="true" class="h-16"></div>
</template>

<style scoped></style>
