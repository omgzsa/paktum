<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { schemas } from '@/utils/schemas';
// import { useContractStore } from '@/stores/contract';

// const contractStore = useContractStore();

const router = useRouter();
const route = useRoute();

// Extract the step from route.fullPath (e.g., "/berletiv2/lepes/3")
const currentStep = ref(parseInt(route.fullPath.split('/').pop() as string) || 1);
const currentSchema = ref(schemas[currentStep.value - 1]);

const { values, handleSubmit, isSubmitting, setFieldValue } = useForm({
  validationSchema: currentSchema,
  keepValuesOnUnmount: true,
});

const isLeftAsideOpen = ref(false)
const isRightAsideOpen = ref(false)

provide('currentStep', currentStep);
provide('setFieldValue', setFieldValue);

// Watch for changes in the route to update currentStep
watch(() => route.fullPath, (newPath) => {
  const newStep = parseInt(newPath.split('/').pop() as string);
  currentStep.value = newStep || 1;
});

function validateAndGo(step: number | null) {
  if (step) {
    handleSubmit(() => {
      currentStep.value = step;
      router.push({ path: `/berletiv2/lepes/${step}` });
    })();
  } else {
    handleSubmit(() => {
      console.log(JSON.stringify(values, null, 2));
    })();
  }
}
</script>


<template>
  <UContainer as="div" class="space-y-10">
    <header>
      <NavDesktop />
    </header>

    <main class="relative space-y-10">

      <FormProgress
        :current-step="currentStep"
        :total-steps="schemas.length"
      />

      <form>
        <slot />
      </form>

      <FormControls
        :has-previous="currentStep > 1"
        :is-last-step="currentStep === schemas.length"
        :is-submitting="isSubmitting"
        :current-step="currentStep"
        @validate-and-go="validateAndGo"
      />
      <!-- <p class="bottom-0 right-0 w-full text-xs leading-tight">
        {{ values }}
      </p> -->
      <!-- Mobile Sticky Buttons -->
      <div class="fixed z-50 flex flex-col gap-2 bottom-4 right-4">
        <UButton
          icon="i-heroicons-bars-3"
          color="white"
          variant="solid"
          class="glass-effect"
          @click="isLeftAsideOpen = true"
        />
        <UButton
          icon="i-heroicons-ellipsis-vertical"
          color="white"
          variant="solid"
          class="glass-effect"
          @click="isRightAsideOpen = true"
        />
      </div>
    
    </main>

    <footer>
      <!-- footer content -->
    </footer>
  </UContainer>
</template>
