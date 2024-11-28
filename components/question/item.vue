<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  subText: {
    type: String,
    default: ''
  },
  price: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div class="relative flex flex-col space-y-5">
    <slot name="hint" />
    <h2 v-if="title" class="flex items-center justify-between gap-2">
      {{ title }}
      <div v-if="price" class="text-xs italic font-normal text-neutral-700 dark:text-neutral-400">
        {{ price }}
      </div>
    </h2>
    <p v-if="subText">{{ subText }}</p>
    <div class="space-y-3">
      <slot />
    </div>
  </div>
</template>
