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

const { value } = useField(`${props.name}-${props.id}`, undefined, {
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
    class="flex items-start gap-2 text-xs cursor-pointer md:text-sm" 
    :for="id" 
    :class="{'cursor-not-allowed': props.disabled }"
  >
  <input
    :id="id"
    v-model="value"
    :value="props.label"
    type="checkbox"
    class="relative transition-all border-2 rounded-sm appearance-none peer border-neutral-700 hover:border-neutral-950 checked:hover:bg-paktum-500 before:opacity-0 checked:border-paktum-500 checked:bg-paktum-500 hover:before:opacity-10 before:bg-paktum-500 checked:hover:before:opacity-0 focus:ring-2 focus:ring-paktum-500 focus:ring-opacity-50 ring-paktum-500 text-paktum-500"
    :disabled="props.disabled"
    :class="{ 'opacity-50 cursor-not-allowed checked:bg-neutral-500 checked:border-neutral-300 checked:hover:bg-neutral-500': props.disabled }"
  />
    {{ label }}
  </label>
</template>
