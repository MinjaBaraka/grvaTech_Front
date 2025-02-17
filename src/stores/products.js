import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('products', () => {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

    // Use your Vercel deployment URL
    // const API_BASE_URL = import.meta.env.PROD 
    // ? 'https://grva-tech-api.vercel.app/api'  
    // : 'http://localhost:3000/api'  

     const API_BASE_URL = 'https://grva-tech-api.vercel.app'


  async function fetchProducts() {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE_URL}/api/services`)
      products.value = await response.json()
    } catch (err) {
      error.value = 'Failed to load products'
      console.error('Error loading products:', err)
    } finally {
      loading.value = false
    }
  }

  async function fetchProductById(id) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE_URL}/api/services/${id}`)
      if (!response.ok) throw new Error('Product not found')
      return await response.json()
    } catch (err) {
      error.value = err.message
      console.error('Error loading product:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductById
  }
})
