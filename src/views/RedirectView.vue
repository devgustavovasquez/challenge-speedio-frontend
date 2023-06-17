<script setup>
import { useRoute, RouterView } from 'vue-router'
import URLsService from '../services/urls'
const {
  params: { url }
} = useRoute()

const redirect = async () => {
  const { redirectURL } = await URLsService.getOrigin({ url })

  window.location.href = redirectURL
}

redirect()
</script>

<template>
  <RouterView>
    <div class="flex h-screen w-full items-center justify-center">
      <img src="../assets/svg/spin.svg" alt="spinner" class="h-5 w-5 animate-spin" />
    </div>
  </RouterView>
</template>
