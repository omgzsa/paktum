<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { schemas } from '@/utils/schemas';

const router = useRouter();
const currentStep = ref(1);
const currentSchema = ref(schemas[currentStep.value - 1]);

const { values, handleSubmit, isSubmitting } = useForm({
  validationSchema: currentSchema,
  keepValuesOnUnmount: true,
});

provide('currentStep', currentStep);

watch(currentStep, (newStep) => {
  currentSchema.value = schemas[newStep - 1] || schemas[0];
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
  <UContainer as="div">
    <header>
      <NavDesktop />
    </header>

    <main class="py-8">
      <p class="text-[10px] leading-tight">
        {{ values }}
      </p>
      <form>
        <slot />
      </form>
    </main>

    <FormControls
      :has-previous="currentStep > 1"
      :is-last-step="currentStep === schemas.length"
      :is-submitting="isSubmitting"
      :current-step="currentStep"
      @validate-and-go="validateAndGo"
    />

    <footer>
      <!-- footer content -->
    </footer>
  </UContainer>
</template>
