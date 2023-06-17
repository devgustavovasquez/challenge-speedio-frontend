<template>
  <div class="flex w-full flex-col items-center justify-center">
    <h1 class="mb-8 text-3xl font-bold text-green-500">Shorten your URL</h1>
    <form class="flex w-full flex-col items-center justify-center gap-2" @submit.prevent="submit">
      <BaseInput v-model="title" placeholder="Choose a title" class="text-gray-500" />
      <BaseInput v-model="url" placeholder="Type your URL" class="bg-gray-100 text-gray-500" />

      <BaseButton
        class="bg-green-500 text-white hover:bg-green-600 focus:ring-green-500"
        type="submit"
        :disabled="disabledButton"
        >Shorten</BaseButton
      >

      <div v-if="shortenedURL" class="mt-4 flex items-center justify-center">
        <span
          class="cursor-pointer text-green-500"
          :class="{ 'text-green-600': copySuccess }"
          @click="copyToClipboard(shortenedURL)"
        >
          <span v-if="copySuccess" class="copy-success">Copied!</span>
          <span v-else>Click to copy</span>
        </span>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'
import URLsService from '../services/urls/index'
import { toast } from 'vue3-toastify'
import { useAuth } from '../store/auth'

const copySuccess = ref(false)

const disabledButton = ref(false)
const url = ref('')
const title = ref('')
const shortenedURL = ref('')

const { token } = useAuth()

const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      copySuccess.value = true
      setTimeout(() => {
        copySuccess.value = false
      }, 2000)
    })
    .catch(() => {
      toast.error("Couldn't copy to clipboard.")
    })
}

const submit = async () => {
  disabledButton.value = true
  shortenedURL.value = ''

  try {
    const { short } = await URLsService.create({ url: url.value, title: title.value, token })
    shortenedURL.value = `${window.location.origin}/${short}`
  } catch (error) {
    toast.error(error.message)
  } finally {
    disabledButton.value = false
  }
}
</script>
