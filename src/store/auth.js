import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'))

  function setToken(tokenValue) {
    localStorage.setItem('token', tokenValue)
    token.value = tokenValue
  }

  function setUser(userValue) {
    localStorage.setItem('user', JSON.stringify(userValue))
  }

  const isAuthenticated = computed(() => {
    return !!token.value
  })

  function clear() {
    localStorage.removeItem('token')
    token.value = ''
  }

  return {
    token,
    setToken,
    setUser,
    isAuthenticated,
    clear
  }
})
