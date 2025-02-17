<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { RouterLink } from 'vue-router'

const authStore = useAuthStore()
const email = ref('')

async function handleSubmit() {
  await authStore.forgotPassword(email.value)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset your password
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label for="email" class="sr-only">Email address</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          >
        </div>

        <div v-if="authStore.error" class="text-red-600 text-center">
          {{ authStore.error }}
        </div>

        <div v-if="authStore.message" class="text-green-600 text-center">
          {{ authStore.message }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="authStore.loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span v-if="authStore.loading">Sending reset link...</span>
            <span v-else>Send reset link</span>
          </button>
        </div>

        <div class="text-center">
          <RouterLink
            to="/auth/login"
            class="font-medium text-sm text-blue-600 hover:text-blue-500"
          >
            Back to login
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>
