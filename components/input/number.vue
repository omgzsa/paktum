<script setup lang="ts">
const props = defineProps({
  modelValue: Number,
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  width: { type: Number, default: 10 },
  disabled: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const { value } = useField('', undefined, {
  syncVModel: true,
});

const emitValue = () => {
  emit('update:modelValue', value.value);
};
</script>

<template>
  <input
    v-model="value"
    @input="emitValue"
    :disabled="props.disabled"
    type="number"
    :min="props.min"
    :max="props.max"
    :step="props.step"
    :class="`w-${props.width} h-6 md:h-7 transition-all border-none ring-1 focus:ring-paktum-500 md:px-2 md:pb-1.5 hover:border-neutral-950 focus:border-paktum-500 font-bold text-xs md:text-sm dark:bg-neutral-800 dark:text-neutral-100`"
  />
</template>
