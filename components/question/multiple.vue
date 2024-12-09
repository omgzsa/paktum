<script lang="ts" setup>
defineProps({
  bordered: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    class="max-w-2xl px-2 py-8 mx-auto space-y-5 border-b border-b-neutral-200 dark:border-b-neutral-600 xs:py-5 xs:px-4 md:px-5 lg:px-7 md:py-7 lg:py-9"
    :class="{ 'border rounded-md bg-neutral-100/90 z-0 border-neutral-500 border-b-neutral-500 dark:bg-neutral-900 dark:border-neutral-700' : bordered }"
  >
    <slot />
  </div>
</template>
