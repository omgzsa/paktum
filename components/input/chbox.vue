<script setup>
import { useField } from 'vee-validate';

const props = defineProps({
  modelValue: [String, Array],
  name: String,
  id: String,
  label: String,
  disabled: Boolean,
});

const emit = defineEmits(['update:modelValue', 'update:extraInput']);

const { value, checked } = useField(`${props.name}-${props.id}`, undefined, {
    type: 'checkbox',
    checkedValue: props.label,
    uncheckedValue: null,
    label: props.label,
  }
);

watch(value, (newValue) => {
  if (newValue) {
    emit('update:modelValue', [...props.modelValue, props.label]);
  } else {
    emit('update:modelValue', props.modelValue.filter(item => item !== props.label));
  }
});
</script>

<template>
  <label 
    class="flex items-start gap-2 text-xs cursor-pointer xs:gap-3 md:text-sm" 
    :for="id" 
    :class="{ 'cursor-not-allowed': props.disabled }"
  >
  <input
    :id="id"
    v-model="value"
    :value="props.label"
    type="checkbox"
    class="mt-0.5"
    :disabled="props.disabled"
    :class="{ 'opacity-50 cursor-not-allowed checked:bg-neutral-500 checked:border-neutral-300 checked:hover:bg-neutral-500': props.disabled }"
  >
    <p class="text-xs md:text-sm">
      {{ label }}
    </p>
  </label>
</template>
