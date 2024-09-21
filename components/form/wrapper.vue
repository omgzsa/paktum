<script setup lang="ts">
import { useForm } from 'vee-validate';

const props = defineProps({
  validationSchema: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['submit']);
const currentStepIdx = ref(0);

// Injects the starting step, child <form-steps> will use this to generate their ids
const stepCounter = ref(0);
provide('STEP_COUNTER', stepCounter);

// Inject the live ref of the current index to child components
// will be used to toggle each form-step visibility
provide('CURRENT_STEP_INDEX', currentStepIdx);

const isLastStep = computed(() => {
  return currentStepIdx.value === stepCounter.value - 1;
});

const hasPrevious = computed(() => {
  return currentStepIdx.value > 0;
});

// extracts the indivdual step schema
const currentSchema = computed(() => {
  return props.validationSchema[currentStepIdx.value];
});

const { values, handleSubmit, isSubmitting } = useForm({
  // vee-validate will be aware of computed schema changes
  validationSchema: currentSchema,
  // turn this on so each step values won't get removed when you move back or to the next step
  keepValuesOnUnmount: true,
});

// We are using the "submit" handler to progress to next steps
// and to submit the form if its the last step
const onSubmit = handleSubmit((values) => {
  if (!isLastStep.value) {
    currentStepIdx.value++;

    return;
  }

  // Let the parent know the form was filled across all steps
  emit('submit', values);
});

function goToPrev() {
  if (currentStepIdx.value === 0) {
    return;
  }

  currentStepIdx.value--;
}
</script>

<template>
  <form @submit="onSubmit" class="max-w-2xl mx-auto">
    <TransitionGroup name="slide-fade">
      <slot />
    </TransitionGroup>

    <div class="flex justify-between max-w-2xl py-10 mx-auto">
      <button
        class="flex items-center text-base font-medium transition-all text-dark-300 hover:text-dark-100 hover:ring-0 ring-1 ring-gray-300 px-3 pt-1.5 pb-1 hover:bg-accent-100"
        v-if="hasPrevious"
        type="button"
        @click="goToPrev"
      >
        Előző
      </button>

      <button
        class="flex items-center ml-auto text-base font-medium transition-all text-dark-300 hover:text-dark-100 hover:ring-0 ring-1 ring-gray-300 px-3 pt-1.5 pb-1 hover:bg-accent-100"
        v-if="!isLastStep"
        type="submit"
      >
        Következő
      </button>

      <button
        class="text-xl font-medium transition-all hover:underline text-dark-300 hover:text-orange-600 underline-offset-4"
        v-if="isLastStep"
        type="submit"
      >
        <span v-if="isSubmitting">
          <Icon name="svg-spinners:bars-fade" class="inline-block w-6 h-6" />
        </span>
        <span v-else> Fizetés</span>
      </button>
    </div>

    <ClientOnly>
      <pre>{{ values }}</pre>
    </ClientOnly>
  </form>
</template>

<style>
.slide-fade-move,
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.slide-fade-leave-active {
  position: absolute;
}
</style>
