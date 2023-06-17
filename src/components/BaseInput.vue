<template>
  <div class="flex w-full flex-col items-start gap-1">
    <label class="text-sm font-semibold text-gray-700" :for="modelValue">{{ label }}</label>
    <input
      class="w-full rounded-md border border-gray-300 bg-gray-200 px-4 py-2 text-gray-700 focus:border-green-500 focus:bg-white focus:outline-none"
      :name="modelValue"
      :type="modelValue"
      :value="modelValue"
      placeholder="Enter your {{ label }}"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String
  },
  modelValue: {
    type: String,
    default: ''
  }
})
</script>
