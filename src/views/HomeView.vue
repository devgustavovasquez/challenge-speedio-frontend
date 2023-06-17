<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-green-300 py-2">
    <section
      class="grid h-screen max-h-[40rem] w-full max-w-5xl grid-cols-1 bg-zinc-100 shadow-lg sm:grid-cols-2 sm:rounded-lg"
    >
      <div class="flex h-full w-full flex-col items-center justify-center p-8">
        <TheSignInForm class="w-96" v-if="showLoginForm" :toggleForm="toggleForm" />
        <TheSignUpForm class="w-96" v-else :toggleForm="toggleForm" />

        <hr class="mt-10 w-1/2 border-gray-300" />
        <RouterLink class="mt-4 text-sm text-gray-500 hover:text-gray-600" to="/urls">
          Continue without signing in
        </RouterLink>
      </div>

      <div class="h-full w-full bg-zinc-200 p-8">
        <img src="../assets/svg/fingerprint.svg" alt="logo" class="h-full w-full" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TheSignInForm from '../components/TheSignInForm.vue'
import TheSignUpForm from '../components/TheSignUpForm.vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '../store/auth'

const showLoginForm = ref(true)

const router = useRouter()
const { isAuthenticated } = useAuth()

if (isAuthenticated) {
  router.push({ path: '/urls' })
}

const toggleForm = () => {
  showLoginForm.value = !showLoginForm.value
}
</script>
