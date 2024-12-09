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

      <form class="min-h-[70vh]">
        <slot />
      </form>

      <FormControls
        :has-previous="currentStep > 1"
        :is-last-step="currentStep === schemas.length"
        :is-submitting="isSubmitting"
        :current-step="currentStep"
        @validate-and-go="validateAndGo"
      />
      <!-- <pre wrap class="fixed right-0 text-[10px] leading-tight top-20 w-60">
        {{ values }}
      </pre> -->
    </main>

    <footer>
      <!-- footer content -->
    </footer>
  </UContainer>
</template>


<!-- <script setup lang="ts">
import { useForm } from 'vee-validate';
import { schemas } from '@/utils/schemas';

const router = useRouter();
const route = useRoute();

const currentStep = ref(parseInt(route.fullPath.split('/').pop() as string) || 1);
const currentSchema = ref(schemas[currentStep.value - 1]);

const { values, handleSubmit, isSubmitting, setFieldValue } = useForm({
  validationSchema: currentSchema,
  keepValuesOnUnmount: true,
});

provide('currentStep', currentStep);
provide('setFieldValue', setFieldValue);

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
  <UContainer as="div" class="py-4 pt-8">
    <header>
      <NavDesktop />
    </header>

    <main class="relative mt-16">
      <div class="grid grid-cols-12 gap-8">
        <div class="col-span-9">
          <FormProgress
            :current-step="currentStep"
            :total-steps="schemas.length"
          />
        </div>
        <div class="hidden col-span-3">
          <FormSummary
            :current-step="currentStep"
            :total-steps="schemas.length"
          />
        </div>

        <div class="col-span-9">
          <form class="min-h-[80vh] space-y-8">
            <slot />
          </form>

          <FormControls
            :has-previous="currentStep > 1"
            :is-last-step="currentStep === schemas.length"
            :is-submitting="isSubmitting"
            :current-step="currentStep"
            @validate-and-go="validateAndGo"
          />
        </div>
      </div>
    </main>

    <footer class="mt-16">
      // footer
    </footer>
  </UContainer>
</template> -->
