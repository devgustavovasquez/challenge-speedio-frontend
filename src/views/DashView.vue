<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-green-300 py-2">
    <main
      class="relative flex h-full max-h-[45rem] w-full max-w-6xl flex-1 overflow-hidden rounded-md bg-white p-4 shadow-md"
    >
      <div
        class="absolute left-1/2 top-5 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-b-full bg-green-300"
      >
        <RouterLink to="/urls">
          <div
            class="flex h-14 w-14 cursor-pointer items-center justify-center rounded-b-full bg-white"
          >
            <img src="../assets/svg/trend-up.svg" alt="link" class="h-6 w-6" />
          </div>
        </RouterLink>
      </div>
      <div class="mt-11 flex h-[40rem] w-full flex-col items-center justify-start">
        <h1 class="mb-7 mt-4 text-3xl font-bold text-green-500">Dashboard</h1>
        <div class="mx-auto grid grid-cols-6 gap-4">
          <div
            v-for="url in urls"
            :key="url.id"
            class="mb-4 flex h-40 w-40 flex-col items-start justify-start rounded-md bg-gray-100 p-3 shadow-md"
          >
            <div class="flex flex-col items-start justify-start gap-2">
              <p class="text-sm font-bold text-green-500">{{ url.title }}</p>
              <a
                :href="url.originalUrl"
                target="_blank"
                class="cursor-pointer text-xs font-bold text-zinc-400 hover:text-zinc-500 hover:underline"
              >
                Link
              </a>
            </div>

            <button class="ml-auto mt-auto" @click="deleteURL(url.id)">
              <img src="../assets/svg/trash.svg" alt="trash" class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'
import URLsService from '../services/urls/index'
import { toast } from 'vue3-toastify'
import { useAuth } from '../store/auth'

const urls = ref([])
const isFetching = ref(false)
const router = useRouter()
const { isAuthenticated, token } = useAuth()

if (!isAuthenticated) {
  router.push('/')
}

const fetchURLs = async () => {
  isFetching.value = true
  try {
    const data = await URLsService.listByUser({ token })
    urls.value = data
  } catch (error) {
    toast.error('Error fetching URLs')
  } finally {
    isFetching.value = false
  }
}

const deleteURL = async (id) => {
  try {
    await URLsService.deleteUrl({ id, token })
    toast.success('URL deleted')
    fetchURLs()
  } catch (error) {
    toast.error('Error deleting URL')
  }
}

fetchURLs()
</script>
