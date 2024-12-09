<script lang="ts" setup>
import { ref } from 'vue';

defineProps({
  iconName: {
    type: String,
    required: true,
  },
  iconSize: {
    type: [String, Number],
    default: 20,
  },
});

const hover = ref(false);
</script>

<template>
  <div
    class="relative flex items-center w-full mt-2 cursor-default"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <Icon 
      :name="iconName"
      :size="iconSize" 
      class="text-neutral-800 dark:text-neutral-400 xs:px-1.5 ml-1 xs:py-1"
    />
    
    <span
      class="px-1 py-0.5 xs:px-1.5 xs:py-1 sm:px-0 sm:pl-1.5 sm:pr-2.5 absolute flex items-center gap-2 text-xs transition-all duration-300 will-change-auto ease-in-out origin-left scale-x-0 rounded-full shadow opacity-0 bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200"
      :class="{
        'scale-x-100 opacity-100': hover,
      }"
    >
      <Icon 
        :name="iconName"
        :size="iconSize"
        class="text-neutral-800 dark:text-neutral-400 shrink-0 xs:px-1.5 xs:py-1"
      />
      <slot />
    </span>
  </div>
</template>
