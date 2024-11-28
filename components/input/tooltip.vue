<script setup>
defineProps({
  label: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  ui: {
    type: Object,
    default: () => ({
      background: 'bg-neutral-800',
      color: 'text-neutral-200',
    }),
  },
});
</script>

<template>
  <UTooltip :label="label" :text="text" :ui="ui" class="-top-1 xs:-top-1.5 md:-top-1">
    <UButton
      :padded="false"
      color="gray"
      variant="soft"
      class="flex items-center justify-center w-5 h-5 rounded-md xs:-top-1 xs:w-6 xs:h-6 bg-zinc-200 dark:bg-zinc-800/90 pb-0.5 text-xs xs:text-sm hover:bg-zinc-300 dark:hover:bg-zinc-700/90 transition-all"
    >
      §
    </UButton>
  </UTooltip>
</template>
