<script lang="ts" setup>
defineProps({
  title: String,
  placement: String,
  subText: String,
  bordered: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    class="relative flex flex-col max-w-2xl p-2 mx-auto space-y-4 border-b xs:p-3 sm:p-6 lg:p-8 border-b-neutral-200"
    :class="{ 'border rounded-md bg-neutral-100/90 z-0 pb-6 border-neutral-500 border-b-neutral-500 dark:bg-neutral-800' : bordered }"
  >
    <slot name="hint" />
    <h2 class="pb-3">
      <span>{{ placement }}</span> {{ title }}
    </h2>
    <p v-if="subText" class="pb-3">{{ subText }}</p>
    <div class="pb-4 space-y-3">
      <slot />
    </div>
  </div>
</template>
