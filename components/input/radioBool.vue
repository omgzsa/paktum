<script setup lang="ts">
import { useField } from 'vee-validate';

const props = defineProps<{
  modelValue: boolean;
  name: string;
  label: string;
}>();

const emit = defineEmits(['update:modelValue']);

const { value } = useField<boolean>(props.name, undefined, {
  syncVModel: true,
  initialValue: props.modelValue as boolean,
});

const emitValues = (e: Event) => {
  const isChecked = (e.target as HTMLInputElement).checked;
  emit('update:modelValue', isChecked);
  value.value = isChecked;
};
</script>

<template>
  <label
    :for="props.name"
    class="flex items-start gap-1.5 xs:gap-3 cursor-pointer"
  >
    <input
      :id="props.name"
      v-model="value"
      :name="props.name"
      :checked="props.modelValue"
      :value="props.modelValue"
      type="radio"
      class="relative transition-all border-2 appearance-none cursor-pointer border-zinc-500 -z-10 peer checked:border-paktum-500 checked:bg-paktum-500 focus:ring-paktum-500 focus:ring-opacity-50 ring-paktum-500 text-paktum-500"
      @change="emitValues"
    >
    <p class="text-xs md:text-sm">{{ props.label }}</p>
  </label>
</template>
