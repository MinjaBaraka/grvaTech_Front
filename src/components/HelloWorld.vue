<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="flex flex-col items-center p-8 bg-white rounded-lg shadow-md">
    <h1 class="text-3xl font-bold text-primary mb-4">{{ msg }}</h1>
    <div class="flex flex-col items-center gap-4">
      <div class="p-4 bg-gray-50 rounded-lg">
        <h3 class="text-lg text-gray-700 text-center">
          Welcome to your new application powered by modern technologies
        </h3>
      </div>
    </div>
  </div>
</template>
