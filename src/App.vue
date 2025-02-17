<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
    <header class="py-6 px-4 shadow-sm bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <HelloWorld msg="Pay Service Online" />

          <nav class="mt-6 md:mt-0">
            <ul class="flex items-center space-x-8">
              <li>
                <RouterLink
                  to="/"
                  class="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                  :class="{ 'text-blue-600 border-b-2 border-blue-600': $route.path === '/' }"
                >
                  Home
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/about"
                  class="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                  :class="{ 'text-blue-600 border-b-2 border-blue-600': $route.path === '/about' }"
                >
                  About
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>
