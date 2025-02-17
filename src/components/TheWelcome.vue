<script setup>
// Sample product data (in real app this would likely come from an API/store)
const products = [
  {
    id: 1,
    name: 'Premium Headphones',
    price: 199.99,
    image: '/images/headphones.jpg',
    description: 'High-quality wireless headphones with noise cancellation'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 299.99,
    image: '/images/smartwatch.jpg',
    description: 'Feature-rich smartwatch with health tracking'
  },
  {
    id: 3,
    name: 'Wireless Speaker',
    price: 149.99,
    image: '/images/speaker.jpg',
    description: 'Portable bluetooth speaker with premium sound'
  }
]
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
    <div v-for="product in products" :key="product.id"
         class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div class="aspect-w-16 aspect-h-9 bg-gray-100">
        <!-- Replace with actual images in production -->
        <div class="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
          Product Image
        </div>
      </div>

      <div class="p-4">
        <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ product.name }}</h2>
        <p class="text-gray-600 text-sm mb-3">{{ product.description }}</p>
        <div class="flex items-center justify-between">
          <span class="text-2xl font-bold text-blue-600">${{ product.price }}</span>
          <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
