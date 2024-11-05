<!-- FormStep.vue -->
<script setup>
const currentIdx = inject('STEP_COUNTER').value++;
const formStepIdx = inject('CURRENT_STEP_INDEX');

const shouldShow = computed(() => {
  return currentIdx === formStepIdx.value;
});
</script>

<template>
  <div v-if="shouldShow">
    <slot />
    <slot name="hint" />
  </div>
</template>
