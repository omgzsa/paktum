<script lang="ts" setup>
import { schemas } from './schemas.js';

// break down the validation steps into multiple schemas
const validationSchema = [];

/**
 * Only Called when the last step is submitted
 */
function onSubmit(formData: any) {
  console.log(JSON.stringify(formData, null, 2));
}

definePageMeta({
  layout: 'contract',
});
</script>

<template>
  <UContainer class="pt-10 md:gap-8 md:grid md:grid-cols-8">
    <!-- left aside -->
    <div class="col-span-1"></div>
    <FormWrapper
      :validation-schema="schemas"
      @submit="onSubmit"
      class="col-span-6"
    >
      <FormStep>
        <StepOne />
      </FormStep>

      <FormStep>
        <StepTwo />
      </FormStep>
    </FormWrapper>
    <!-- right aside -->
    <div class="col-span-1"></div>
  </UContainer>
</template>
