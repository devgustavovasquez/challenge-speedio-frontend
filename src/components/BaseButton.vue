<template>
  <button
    class="flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
    v-bind="$attrs"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>
