<script setup lang="ts">
const props = defineProps({
  // modelValue: String,
  name: String,
  optionId: String,
});

const model = defineModel('modelValue');

// const emit = defineEmits(['update:modelValue']);

// const emitValue = () => {
//   emit('update:modelValue', model.value);
// };
</script>

<template>
  <input
    :id="props.optionId"
    v-model="model"
    :value="props.optionId"
    :name="props.name"
    type="radio"
    class="relative transition-all border-2 appearance-none cursor-pointer border-zinc-500 -z-10 peer checked:border-paktum-500 checked:bg-paktum-500 focus:ring-paktum-500 focus:ring-opacity-50 ring-paktum-500 text-paktum-500"
  >
</template>
