<template>
  <div class="flex w-full flex-col items-center justify-center">
    <h1 class="mb-8 text-3xl font-bold text-green-500">Sign In</h1>
    <form class="flex w-full flex-col items-center justify-center gap-2" @submit.prevent="submit">
      <BaseInput v-model="email" type="email" label="Email" placeholder="Enter your email" />
      <BaseInput
        v-model="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
      />
      <div class="mt-4 flex w-full items-center justify-center gap-2">
        <BaseButton
          class="bg-green-500 text-white hover:bg-green-600 focus:ring-green-500"
          type="submit"
          :disabled="disabledButton"
        >
          <img
            v-if="disabledButton"
            src="../assets/svg/spin.svg"
            alt="spinner"
            class="h-5 w-5 animate-spin"
          />
          <span v-else>Sign In</span>
        </BaseButton>
        <BaseButton
          class="bg-zinc-400 text-white hover:bg-zinc-500 focus:ring-zinc-400"
          @click="toggleForm"
          >Switch to Sign Up</BaseButton
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'
import UsersService from '../services/users/index'
import { toast } from 'vue3-toastify'
import { useAuth } from '../store/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')

const disabledButton = ref(false)
const router = useRouter()
const { setToken } = useAuth()

const submit = async () => {
  disabledButton.value = true
  try {
    const { token } = await UsersService.login({ email: email.value, password: password.value })

    setToken(token)
    toast.success('Sign In Success')
    router.push({ path: '/urls' })
  } catch (error) {
    toast.error(error.message)
  } finally {
    disabledButton.value = false
  }
}

defineProps(['toggleForm'])
</script>
