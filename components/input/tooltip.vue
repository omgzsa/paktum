<script setup>
// const model = defineModel('visible', { type: Boolean, default: true });

const props = defineProps({
  label: String,
  text: String,
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
  <UTooltip :label="label" :text="text" :ui="ui">
    <UButton
      :padded="false"
      color="gray"
      variant="ghost"
      class="flex items-center justify-center w-5 h-5 rounded-md xs:-top-1 xs:w-6 xs:h-6 bg-zinc-200 dark:bg-zinc-800/90 -z-10 -mt-1 sm:-mt-1 pb-0.5 text-xs xs:text-sm"
    >
      §
    </UButton>
  </UTooltip>
</template>
