<template>
  <div ref="parent" class="transition-container">
    <div v-if="modelValue" class="transition-wrapper">
      <slot/>
    </div>
  </div>
</template>

<script setup>
import { useAutoAnimate } from '@formkit/auto-animate/vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  duration: {
    type: Number,
    default: 300
  },
  easing: {
    type: String,
    default: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
});

const [parent] = useAutoAnimate({
  duration: props.duration,
  easing: props.easing,
  disrespectUserMotionPreference: false,
  keyframes: ({ initial }) => [
    { opacity: initial ? 1 : 0, transform: initial ? 'scale(1)' : 'scale(0.98)' },
    { opacity: initial ? 0 : 1, transform: initial ? 'scale(0.98)' : 'scale(1)' }
  ]
});
</script>

<style scoped>
.transition-container {
  width: 100%;
}

.transition-wrapper {
  width: 100%;
  transform-origin: center;
}
</style>
