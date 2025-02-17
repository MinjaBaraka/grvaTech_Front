import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'
import { useRouter } from 'vue-router'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const authStore = useAuthStore()
  const router = useRouter()

  const total = computed(() => {
    return items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  })

  const itemCount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  function addToCart(product) {
    if (!authStore.checkAuth()) {
      // Save current path for redirect after login
      localStorage.setItem('redirectPath', router.currentRoute.value.fullPath)
      router.push('/auth/login')
      return
    }

    const existingItem = items.value.find(item => item._id === product._id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: 1
      })
    }
  }

  function removeFromCart(productId) {
    const index = items.value.findIndex(item => item._id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  function updateQuantity(productId, quantity) {
    const item = items.value.find(item => item._id === productId)
    if (item) {
      item.quantity = Math.max(0, quantity)
      if (item.quantity === 0) {
        removeFromCart(productId)
      }
    }
  }

  return {
    items,
    total,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity
  }
})
