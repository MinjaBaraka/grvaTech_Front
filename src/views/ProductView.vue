<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/products'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const product = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    product.value = await productStore.fetchProductById(route.params.id)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

function addToCart() {
  if (product.value) {
    cartStore.addToCart(product.value)
  }
}
</script>

<template>
  <div v-if="loading" class="text-center py-8">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
  </div>

  <div v-else-if="error" class="text-red-600 text-center py-8">
    {{ error }}
  </div>

  <div v-else-if="product" class="bg-white rounded-lg shadow-sm p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="space-y-4">
        <img
          :src="product.images[0]"
          :alt="product.name"
          class="w-full rounded-lg"
        >
        <div class="grid grid-cols-3 gap-2">
          <img
            v-for="(image, index) in product.images.slice(1)"
            :key="index"
            :src="image"
            :alt="`${product.name} view ${index + 2}`"
            class="w-full rounded-lg cursor-pointer hover:opacity-75"
          >
        </div>
      </div>

      <div>
        <div class="flex justify-between items-start">
          <h1 class="text-3xl font-bold text-gray-800">{{ product.name }}</h1>
          <div class="flex items-center">
            <span class="text-yellow-400 text-xl">★</span>
            <span class="text-gray-600 ml-1">{{ product.ratings.average }}</span>
            <span class="text-gray-400 text-sm ml-1">({{ product.ratings.count }} reviews)</span>
          </div>
        </div>

        <p class="text-2xl font-bold text-blue-600 mt-4">${{ product.price }}</p>
        <p class="text-gray-600 mt-4">{{ product.description }}</p>

        <div class="mt-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-3">Specifications</h2>
          <ul class="list-disc list-inside text-gray-600">
            <li v-for="spec in product.specifications" :key="spec">{{ spec }}</li>
          </ul>
        </div>

        <div class="mt-6" v-if="product.colors.length > 0">
          <h2 class="text-xl font-semibold text-gray-800 mb-3">Available Colors</h2>
          <div class="flex gap-2">
            <span
              v-for="color in product.colors"
              :key="color"
              class="px-3 py-1 bg-gray-100 rounded-full text-sm"
            >
              {{ color }}
            </span>
          </div>
        </div>

        <button
          class="mt-8 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          :disabled="!product || product.stock === 0"
          @click="addToCart"
        >
          {{ !product ? 'Loading...' : product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
        </button>
      </div>
    </div>
  </div>
</template>
