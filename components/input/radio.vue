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
    class=""
  >
</template>
