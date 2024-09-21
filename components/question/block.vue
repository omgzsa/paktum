<script lang="ts" setup>
defineProps({
  title: String,
  placement: String,
  subText: String,
});
</script>

<template>
  <div
    class="relative flex flex-col max-w-2xl py-6 mx-auto space-y-4 border-b border-b-neutral-200"
  >
    <slot name="hint" />
    <h2 class="pb-3">
      <span>{{ placement }}</span> {{ title }}
    </h2>
    <p v-if="subText" class="pb-3">{{ subText }}</p>
    <div class="space-y-2">
      <slot />
    </div>
  </div>
</template>
