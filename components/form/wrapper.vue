<script setup lang="ts">
import { useForm } from 'vee-validate';
import { useRouter, useRoute } from 'vue-router';

const props = defineProps({
  validationSchema: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['submit']);

const stepCounter = ref(0);
const currentStepIdx = ref(0);
provide('STEP_COUNTER', stepCounter);
provide('CURRENT_STEP_INDEX', currentStepIdx);
const transitionDirection = ref('forward');

const router = useRouter();
const route = useRoute();

// Initialize current step index from the route parameter on load
onMounted(() => {
  const pageIndex = parseInt(route.query.page as string, 10);
  if (!isNaN(pageIndex) && pageIndex >= 0 && pageIndex < stepCounter.value) {
    currentStepIdx.value = pageIndex;
  }
});

watch(currentStepIdx, (newIndex) => {
  router.replace({ query: { page: newIndex.toString() } });
});

const isLastStep = computed(() => currentStepIdx.value === stepCounter.value - 1);
const hasPrevious = computed(() => currentStepIdx.value > 0);
const currentSchema = computed(() => props.validationSchema[currentStepIdx.value]);

const { values, handleSubmit, isSubmitting } = useForm({
  validationSchema: currentSchema,
  keepValuesOnUnmount: true,
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const onSubmit = handleSubmit((values) => {
  if (!isLastStep.value) {
    transitionDirection.value = 'forward';
    currentStepIdx.value++;
    scrollToTop();
    return;
  }

  emit('submit', values);
});

function goToPrev() {
  if (currentStepIdx.value === 0) return;
  transitionDirection.value = 'backward';
  scrollToTop();
  currentStepIdx.value--;
}
</script>


<template>
  <form @submit="onSubmit" class="mx-auto">
    <TransitionGroup
      :name="transitionDirection === 'forward' ? 'slide-forward' : 'slide-backward'"
    >
      <slot />
    </TransitionGroup>

    <div class="flex items-center py-10 justify-evenly">
      <button
        class="flex items-center px-5 py-2 text-sm font-bold transition-all rounded-md group hover:shadow-md text-neutral-200 bg-neutral-900 hover:ring-0 ring-1 ring-neutral-900 hover:bg-accent-100"
        v-if="hasPrevious"
        type="button"
        @click="goToPrev"
      >
      <Icon name="i-heroicons-chevron-double-left-16-solid" class="w-5 h-5 mr-2 transition transform group-hover:-translate-x-0.5" /> Előző
      </button>

      <button
        class="flex items-center px-5 py-2 text-sm font-bold transition-all rounded-md group hover:shadow-md text-dark-300 hover:ring-0 ring-1 ring-paktum-500 bg-paktum-500 hover:bg-accent-100"
        v-if="!isLastStep"
        type="submit"
      >
        Következő <Icon name="i-heroicons-chevron-double-right-16-solid" class="w-5 h-5 ml-2 transition transform group-hover:translate-x-0.5" />
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

    <!-- <ClientOnly>
      <pre wrap class="pb-10">{{ values }}</pre>
    </ClientOnly> -->
  </form>
</template>

<style>
.slide-forward-enter-active,
.slide-forward-leave-active {
  transition: all 0.25s ease;
}

.slide-forward-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-forward-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-backward-enter-active,
.slide-backward-leave-active {
  transition: all 0.25s ease;
}

.slide-backward-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-backward-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
