<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '../stores/products'
import ProductCard from '../components/ProductCard.vue'

const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProducts()
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Our Products</h1>

    <div v-if="productStore.loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
    </div>

    <div v-else-if="productStore.error" class="text-red-600 text-center py-8">
      {{ productStore.error }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard
        v-for="product in productStore.products"
        :key="product._id"
        :product="product"
      />
    </div>
  </div>
</template>
