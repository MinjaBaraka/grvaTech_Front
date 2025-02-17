import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const message = ref(null)
  const router = useRouter()

  const API_BASE_URL = import.meta.env.PROD 
  ? 'https://grva-tech-api.vercel.app/api'  // Production URL
  : 'http://localhost:3000/api'  // Development URL


  // Register new user
  async function register(userData) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...userData,
          role: 'user' // Default role for new registrations
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Registration failed')
      }

      const data = await response.json()
      user.value = data.user
      localStorage.setItem('token', data.token)
      router.push('/')
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // Login user
  async function login(credentials) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Invalid credentials')
      }

      const data = await response.json()
      user.value = data.user
      localStorage.setItem('token', data.token)

      const redirectPath = localStorage.getItem('redirectPath') || '/'
      localStorage.removeItem('redirectPath')
      router.push(redirectPath)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // Logout user
  async function logout() {
    loading.value = true
    try {
      await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      user.value = null
      localStorage.removeItem('token')
      loading.value = false
      router.push('/auth/login')
    }
  }

  // Get user profile
  async function getProfile() {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('http://localhost:3000/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (!response.ok) throw new Error('Failed to fetch profile')

      const data = await response.json()
      user.value = data.user
    } catch (err) {
      error.value = err.message
      if (err.message.includes('401')) {
        logout()
      }
    } finally {
      loading.value = false
    }
  }

  // Update user profile
  async function updateProfile(profileData) {
    loading.value = true
    error.value = null
    message.value = null
    try {
      const response = await fetch('http://localhost:3000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(profileData)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to update profile')
      }

      const data = await response.json()
      user.value = data.user
      message.value = 'Profile updated successfully'
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // Check if user is authenticated
  function checkAuth() {
    const token = localStorage.getItem('token')
    if (token && !user.value) {
      getProfile() // Load user profile if we have token but no user data
    }
    return !!token
  }

  // Check if user is admin
  function isAdmin() {
    return user.value?.role === 'admin'
  }

  return {
    user,
    loading,
    error,
    message,
    register,
    login,
    logout,
    getProfile,
    updateProfile,
    checkAuth,
    isAdmin
  }
})
