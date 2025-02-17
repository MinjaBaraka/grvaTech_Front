import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
export const useProductStore = defineStore('products', () => {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

    // Use your Vercel deployment URL
    // const API_BASE_URL = import.meta.env.PROD 
    // ? 'https://vercel.com/minjabarakas-projects/grva-tech-api' 
    // : 'http://localhost:3000/api'  

     const API_BASE_URL = 'https://vercel.com/minjabarakas-projects/grva-tech-api'


  async function fetchProducts() {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(`${API_BASE_URL}/api/services`)
      products.value = response.data
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
      const response = await axios.get(`${API_BASE_URL}/api/services/${id}`)
      if (!response.ok) throw new Error('Product not found')
      return response.data
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
