<script lang="ts" setup>
import { useField } from 'vee-validate';

const props = defineProps<{
  name: string,
  modelValue: string | number,
  options: string[],
  label?: string,
  placeholder?: string,
  disabled?: boolean,
}>();


const emit = defineEmits(['update:modelValue']);

const { value } = useField(() => props.name, undefined, {
  syncVModel: true,
  initialValue: props.modelValue,
});

watch(() => props.modelValue, (newValue) => {
  value.value = newValue;
});


watch(value, (newValue) => {
  emit('update:modelValue', newValue); 
});
</script>

<template>
  <div class="flex items-center gap-3">
    <label :for="props.name" class="text-xs md:text-sm whitespace-nowrap">
      {{ props.label }}
    </label>
    <USelectMenu 
      v-slot="{ open }" 
      v-model="value"
      :options="options"
      :ui="{
        background: 'bg-white dark:bg-neutral-900',
      }"
      class="w-full pr-1 sm:w-28"
    >
      <UButton color="white" variant="outline" class="justify-between flex-1 py-[2.25px] text-xs font-bold transition-all border-0 border-none rounded-md shadow-sm ring-1 focus:ring-paktum-500 hover:border-neutral-950 focus:border-paktum-500 md:text-sm dark:bg-neutral-800 dark:text-neutral-100 text-neutral-900 ring-inset ring-gray-300 placeholder:text-gray-400 hover:bg-none focus:ring-2 focus:ring-inset">
        {{ value }}

        <UIcon 
          name="i-heroicons-chevron-right-20-solid" 
          class="w-5 h-5 transition-transform" :class="[open && 'transform rotate-90']" 
        />
      </UButton>
    </USelectMenu>
  </div>
</template>

<style scoped>
/* */
</style>
