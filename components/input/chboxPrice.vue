<script setup>
import { useField } from 'vee-validate';

const props = defineProps({
  modelValue: Boolean,
  name: String,
  label: String,
  price: String,
});

const { value, checked, handleChange, errorMessage } = useField(
  () => props.name,
  undefined,
  {
    syncVModel: true,
    type: 'checkbox',
    checkedValue: true,
    uncheckedValue: false,
  }
);
</script>

<template>
  <label class="flex items-center gap-2 text-xs sm:gap-4 sm:text-sm">
    <input
      v-model="value"
      :checked="checked"
      @change="handleChange"
      type="checkbox"
      class="relative transition-all border-2 rounded-sm appearance-none cursor-pointer peer border-neutral-700 hover:border-neutral-950 checked:hover:bg-paktum-500 before:opacity-0 checked:border-paktum-500 checked:bg-paktum-500 hover:before:opacity-10 before:bg-paktum-500 checked:hover:before:opacity-0 focus:ring-2 focus:ring-paktum-500 focus:ring-opacity-50 ring-paktum-500 text-paktum-500"
    />
    {{ label }}
    <span
      v-if="price && checked === true"
      class="ml-auto text-xs italic text-neutral-700 dark:text-neutral-400"
    >
      + {{ price }} Ft
    </span>
  </label>
  <!-- <span v-if="errorMessage" class="text-xs text-red-600">{{
    errorMessage
  }}</span> -->
</template>
