<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
    <img
      :src="product.images[0]"
      :alt="product.name"
      class="w-full h-48 object-cover rounded-t-lg"
    >
    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-semibold text-gray-800">{{ product.name }}</h3>
        <div class="flex items-center">
          <span class="text-yellow-400">★</span>
          <span class="text-sm text-gray-600 ml-1">{{ product.ratings.average }}</span>
        </div>
      </div>
      <p class="text-gray-600 text-sm mt-1 line-clamp-2">{{ product.description }}</p>
      <div class="mt-4 flex justify-between items-center">
        <div>
          <span class="text-blue-600 font-bold">${{ product.price }}</span>
          <span class="text-sm text-gray-500 ml-2">In Stock: {{ product.stock }}</span>
        </div>
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          @click="$router.push(`/product/${product._id}`)"
        >
          View Details
        </button>
      </div>
    </div>
  </div>
</template>
