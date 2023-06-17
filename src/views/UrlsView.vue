<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-green-300 py-2">
    <main
      class="relative flex h-full max-h-[45rem] w-full max-w-6xl flex-1 overflow-hidden rounded-md bg-white p-4 shadow-md"
    >
      <div
        class="absolute left-1/2 top-5 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-b-full bg-green-300"
      >
        <RouterLink to="/dash">
          <div
            class="flex h-14 w-14 cursor-pointer items-center justify-center rounded-b-full bg-white"
          >
            <img src="../assets/svg/link-simple.svg" alt="link" class="h-6 w-6" />
          </div>
        </RouterLink>
      </div>
      <div class="mt-11 grid h-[40rem] w-full grid-cols-2">
        <div class="flex flex-col items-center justify-center">
          <TheCreateURLForm class="max-w-sm" />
        </div>
        <section class="flex flex-col items-center justify-start">
          <h1 class="mb-8 text-3xl font-bold text-green-500">TOP 100 Visited</h1>

          <div v-if="isFetching" class="flex h-full w-full items-center justify-center">
            <img src="../assets/svg/spin.svg" alt="spinner" class="h-5 w-5 animate-spin" />
          </div>
          <div class="flex max-h-[35rem] w-full max-w-sm flex-col overflow-y-auto">
            <div
              v-for="(url, index) in urls"
              :key="url.id"
              class="flex justify-between border-b border-gray-300 p-6"
            >
              <div class="flex flex-col items-start justify-start gap-2">
                <h2 class="text-lg font-bold text-green-500">{{ url.title }}</h2>
                <p class="text-gray-600">
                  Visits: <b>{{ url.count }}</b>
                </p>
              </div>

              <div class="flex flex-col items-end justify-end gap-2">
                <p class="text-gray-600">#{{ index + 1 }}</p>
                <a class="text-green-500 hover:underline" :href="url.url" target="_blank"
                  >Access URL</a
                >
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import TheCreateURLForm from '../components/TheCreateURLForm.vue'
import URLsService from '../services/urls/index'
import { toast } from 'vue3-toastify'

const urls = ref([])
const isFetching = ref(false)

const fetchURLs = async () => {
  isFetching.value = true
  try {
    const data = await URLsService.listRanking()
    urls.value = data
  } catch (error) {
    toast.error('Error fetching URLs')
  } finally {
    isFetching.value = false
  }
}

fetchURLs()
</script>
