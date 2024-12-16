<script lang="ts" setup>
defineProps({
  hasPrevious: Boolean,
  isLastStep: Boolean,
  isSubmitting: Boolean,
});
const emit = defineEmits(['validate-and-go']);

const { useAuthUser } = useAuth();
const user = useAuthUser();
const authModal = useAuthModal();
const toast = useToast();

const handleNavigation = async (step: number | null) => {
  if (step === null && !user.value) {
    toast.add({
      title: 'Authentication Required',
      description: 'Please sign in to complete your purchase.',
      color: 'orange'
    });
    
    await nextTick();
    
    authModal.open();

    return;
  }
  emit('validate-and-go', step);
};

const currentStep = inject<number>('currentStep', 0);
</script>

<template>
  <div class="flex items-center py-10 justify-evenly">
    <NuxtLink
      v-if="hasPrevious"
      :to="`/berletiv2/lepes/${currentStep - 1}`"
      class="flex items-center px-5 py-2 text-sm font-bold transition-all rounded-md group hover:shadow-md text-neutral-200 dark:text-neutral-800 bg-neutral-900 hover:ring-0 ring-1 ring-neutral-900 hover:bg-accent-100 dark:ring-neutral-400 dark:bg-neutral-300"
      title="Előző"
      @click.prevent="handleNavigation(currentStep - 1)"
    >
      <Icon 
        name="i-heroicons-chevron-double-left-16-solid"
        class="w-5 h-5 mr-2 transition transform group-hover:-translate-x-0.5"
      />
        Előző
    </NuxtLink>

    <NuxtLink
      v-if="!isLastStep"
      :to="`/berletiv2/lepes/${currentStep + 1}`"
      class="flex items-center px-5 py-2 text-sm font-bold transition-all rounded-md group hover:shadow-md text-dark-300 hover:ring-0 ring-1 ring-paktum-500 bg-paktum-500 hover:bg-accent-100 dark:text-neutral-800"
      title="Következő"
      @click.prevent="handleNavigation(currentStep + 1)"
    >
      Következő 
      <Icon 
        name="i-heroicons-chevron-double-right-16-solid" 
        class="w-5 h-5 ml-2 transition transform group-hover:translate-x-0.5"
      />
    </NuxtLink>

    <button
      v-if="isLastStep"
      type="submit"
      class="text-xl font-medium transition-all hover:underline text-dark-300 hover:text-orange-600 underline-offset-4"
      aria-label="Fizetés"
      :title="isSubmitting ? 'Fizetés folyamatban' : 'Fizetés'"
      @click.prevent="handleNavigation(null)"
    >
      <span v-if="isSubmitting">
        <Icon name="svg-spinners:bars-fade" class="inline-block w-6 h-6" />
      </span>
      <span v-else> Fizetés</span>
    </button>
  </div>
</template>
